// AI Master — сервер: сайт, REST API, админ-панель, заявки в Telegram.

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// --- .env ---
(function loadEnv() {
  const f = path.join(__dirname, '..', '.env');
  if (!fs.existsSync(f)) return;
  for (const line of fs.readFileSync(f, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
})();

const express = require('express');
const store = require('./db');
const tg = require('./telegram');

store.load();
const db = () => store.db;

const PORT = Number(process.env.PORT) || 3000;
const ADMIN_LOGIN = process.env.ADMIN_LOGIN || 'admin';
let ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
if (!ADMIN_PASSWORD) {
  ADMIN_PASSWORD = crypto.randomBytes(9).toString('base64url');
  console.warn(`[admin] ADMIN_PASSWORD не задан в .env — временный пароль: ${ADMIN_PASSWORD}`);
}

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(express.json({ limit: '400kb' }));
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  next();
});

// ---------- helpers ----------
const now = () => new Date().toISOString();
const token = () => crypto.randomBytes(24).toString('base64url');
const clean = (v, max = 300) => String(v ?? '').replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, max);
const normPhone = (p) => { const d = String(p || '').replace(/\D/g, ''); return d.length === 9 ? '998' + d : d; };
const prettyPhone = (d) => d.length === 12 ? `+${d.slice(0, 3)} ${d.slice(3, 5)} ${d.slice(5, 8)} ${d.slice(8, 10)} ${d.slice(10)}` : '+' + d;
const bad = (res, code, msg) => res.status(code).json({ error: msg });
function safeEq(a, b) { const x = Buffer.from(String(a)), y = Buffer.from(String(b)); return x.length === y.length && crypto.timingSafeEqual(x, y); }

// простой лимит запросов по IP
const hits = new Map();
function limit(key, max, windowMs) {
  return (req, res, next) => {
    const k = key + ':' + req.ip; const t = Date.now();
    const arr = (hits.get(k) || []).filter((x) => t - x < windowMs);
    if (arr.length >= max) return bad(res, 429, 'Слишком много запросов. Попробуйте через несколько минут.');
    arr.push(t); hits.set(k, arr); next();
  };
}
setInterval(() => { const t = Date.now(); for (const [k, v] of hits) if (!v.some((x) => t - x < 3600e3)) hits.delete(k); }, 600e3).unref();

function allLessons(c) { return c.modules.flatMap((m) => m.l); }
function findLesson(lid) { for (const c of db().courses) for (const l of allLessons(c)) if (l.id === lid) return { c, l }; return null; }
function hasSub(u) { return u && u.sub && u.sub.status === 'active' && new Date(u.sub.until) > new Date(); }
function hasAccess(u, c, l) { return (l && l.free) || c.price === 0 || (u && (u.owned.includes(c.id) || hasSub(u))); }

function publicUser(u) {
  return { id: u.id, phone: u.phone, name: u.name, owned: u.owned, sub: u.sub, state: u.state || {}, createdAt: u.createdAt };
}

function userFrom(req) {
  const h = req.get('authorization') || '';
  const t = h.startsWith('Bearer ') ? h.slice(7) : '';
  const s = t && db().sessions[t];
  if (!s || s.exp < Date.now()) return null;
  return db().users.find((u) => u.id === s.userId) || null;
}
function auth(req, res, next) { const u = userFrom(req); if (!u) return bad(res, 401, 'Нужно войти'); req.user = u; next(); }

function adminAuth(req, res, next) {
  const h = req.get('authorization') || '';
  const t = h.startsWith('Bearer ') ? h.slice(7) : '';
  const s = t && db().adminSessions[t];
  if (!s || s.exp < Date.now()) return bad(res, 401, 'Сессия администратора истекла');
  next();
}

// ---------- public API ----------
app.get('/api/health', (req, res) => res.json({ ok: true }));

app.get('/api/catalog', (req, res) => {
  const s = db().settings;
  res.json({
    courses: db().courses.filter((c) => c.published).sort((a, b) => (a.order || 0) - (b.order || 0)),
    plans: db().plans,
    settings: { smsDemo: s.smsDemo, paymentsDemo: s.paymentsDemo, contactPhone: s.contactPhone, contactTelegram: s.contactTelegram }
  });
});

app.get('/api/lessons/:id', (req, res) => {
  const f = findLesson(req.params.id);
  if (!f || !f.c.published) return bad(res, 404, 'Урок не найден');
  const u = userFrom(req);
  if (!hasAccess(u, f.c, f.l)) return res.status(402).json({ error: 'locked', courseId: f.c.id });
  const data = db().lessons[f.l.id] || null;
  res.json({ lesson: data });
});

// --- заявки ---
app.post('/api/leads', limit('lead', 6, 10 * 60e3), async (req, res) => {
  const b = req.body || {};
  if (b.website) return res.json({ ok: true }); // honeypot для ботов
  const name = clean(b.name, 80), phoneDigits = normPhone(b.phone);
  if (name.length < 2) return bad(res, 400, 'Укажите имя');
  if (phoneDigits.length < 11 || phoneDigits.length > 13) return bad(res, 400, 'Укажите номер телефона полностью');
  const type = tg.LEAD_TYPES[b.type] ? b.type : 'consult';
  const course = b.courseId ? db().courses.find((c) => c.id === b.courseId) : null;
  const lead = {
    id: ++db().seq.lead,
    type, name, phone: prettyPhone(phoneDigits),
    company: clean(b.company, 120), size: clean(b.size, 40), goal: clean(b.goal, 160),
    contactWay: clean(b.contactWay, 40), message: clean(b.message, 1000),
    courseId: course?.id || '', courseTitle: course?.title || '',
    page: clean(b.page, 120), status: 'new', note: '',
    createdAt: now(), tg: { ok: false, error: 'ещё не отправлено' }
  };
  db().leads.unshift(lead);
  store.save();
  if (db().settings.notifyLeads) {
    lead.tg = await tg.send(tg.leadText(lead));
    if (!lead.tg.ok) console.error(`[telegram] заявка #${lead.id} не отправлена: ${lead.tg.error}`);
    store.save();
  }
  res.json({ ok: true, id: lead.id });
});

// --- вход по телефону (SMS — демо) ---
app.post('/api/auth/request', limit('otp', 5, 10 * 60e3), (req, res) => {
  const p = normPhone(req.body?.phone);
  if (p.length !== 12 || !p.startsWith('998')) return bad(res, 400, 'Введите номер полностью: +998 XX XXX XX XX');
  const s = db().settings;
  const code = s.smsDemo ? String(s.demoCode || '1234') : String(crypto.randomInt(1000, 10000));
  db().otp[p] = { code, exp: Date.now() + 120e3, tries: 0 };
  store.save();
  // TODO: при подключении SMS-шлюза (Eskiz / Play Mobile) отправить код здесь.
  res.json({ ok: true, demo: s.smsDemo, ttl: 120 });
});

app.post('/api/auth/verify', limit('otpv', 15, 10 * 60e3), async (req, res) => {
  const p = normPhone(req.body?.phone), code = clean(req.body?.code, 8);
  const o = db().otp[p];
  if (!o || o.exp < Date.now()) return bad(res, 400, 'Код истёк — запросите новый');
  if (++o.tries > 5) { delete db().otp[p]; store.save(); return bad(res, 400, 'Слишком много попыток — запросите новый код'); }
  if (!safeEq(o.code, code)) { store.save(); return bad(res, 400, 'Неверный код'); }
  delete db().otp[p];
  let u = db().users.find((x) => x.phone === prettyPhone(p));
  let isNew = false;
  if (!u) {
    isNew = true;
    u = { id: ++db().seq.user, phone: prettyPhone(p), name: clean(req.body?.name, 60) || 'Студент', owned: [], sub: null, state: {}, createdAt: now(), lastSeen: now() };
    db().users.push(u);
  }
  const t = token();
  db().sessions[t] = { userId: u.id, exp: Date.now() + 30 * 864e5 };
  store.save();
  if (isNew && db().settings.notifySignups) tg.send(tg.signupText(u)).catch(() => {});
  res.json({ token: t, user: publicUser(u), isNew });
});

app.post('/api/auth/logout', (req, res) => {
  const h = req.get('authorization') || '';
  if (h.startsWith('Bearer ')) { delete db().sessions[h.slice(7)]; store.save(); }
  res.json({ ok: true });
});

// --- кабинет ---
app.get('/api/me', auth, (req, res) => { req.user.lastSeen = now(); store.save(); res.json({ user: publicUser(req.user) }); });

app.put('/api/me', auth, (req, res) => {
  const name = clean(req.body?.name, 60);
  if (name) req.user.name = name;
  store.save();
  res.json({ user: publicUser(req.user) });
});

app.put('/api/me/state', auth, (req, res) => {
  const st = req.body?.state;
  if (!st || typeof st !== 'object') return bad(res, 400, 'Нет данных');
  if (JSON.stringify(st).length > 300000) return bad(res, 413, 'Слишком большой объём данных');
  req.user.state = st;
  store.save();
  res.json({ ok: true });
});

app.get('/api/me/orders', auth, (req, res) => res.json({ orders: db().orders.filter((o) => o.userId === req.user.id) }));
app.get('/api/me/certs', auth, (req, res) => res.json({ certs: db().certs.filter((c) => c.userId === req.user.id) }));

app.post('/api/me/certs', auth, (req, res) => {
  const c = db().courses.find((x) => x.id === req.body?.courseId);
  if (!c) return bad(res, 404, 'Курс не найден');
  const done = (req.user.state && req.user.state.done) || {};
  if (!allLessons(c).every((l) => done[l.id])) return bad(res, 400, 'Сначала пройдите все уроки курса');
  let cert = db().certs.find((x) => x.userId === req.user.id && x.courseId === c.id);
  if (!cert) {
    let no; do { no = 'AIM-2026-' + crypto.randomInt(100000, 999999); } while (db().certs.some((x) => x.no === no));
    cert = { no, name: req.user.name, course: c.title, courseId: c.id, hours: c.hours, date: new Date().toLocaleDateString('ru-RU'), userId: req.user.id };
    db().certs.push(cert);
    store.save();
  }
  res.json({ cert });
});

app.get('/api/certs/:no', (req, res) => {
  const c = db().certs.find((x) => x.no === clean(req.params.no, 30).toUpperCase());
  if (!c) return bad(res, 404, 'Сертификат не найден');
  res.json({ cert: { no: c.no, name: c.name, course: c.course, hours: c.hours, date: c.date } });
});

// --- заказы и оплата (демо) ---
function itemFor(key) {
  if (key.startsWith('course-')) { const c = db().courses.find((x) => x.id === key.slice(7) && x.published); return c && c.price > 0 ? { key, type: 'course', ref: c.id, title: `Курс «${c.title}»`, amount: c.price } : null; }
  const p = db().plans.find((x) => x.id === key); return p ? { key, type: 'sub', ref: p.id, months: p.months, title: `Подписка на ${p.months} мес.`, amount: p.price } : null;
}
function findPromo(code) { const c = clean(code, 40).toUpperCase(); return db().promos.find((p) => p.code === c && p.active && p.used < p.limit); }
function discount(amount, promo) { if (!promo) return 0; return Math.min(amount, promo.type === 'pct' ? Math.round(amount * promo.val / 100) : promo.val); }

app.post('/api/promo', limit('promo', 20, 10 * 60e3), (req, res) => {
  const p = findPromo(req.body?.code);
  if (!p) return bad(res, 404, 'Промокод не найден или истёк');
  res.json({ promo: { code: p.code, type: p.type, val: p.val } });
});

app.post('/api/orders', auth, (req, res) => {
  const it = itemFor(clean(req.body?.item, 60));
  if (!it) return bad(res, 400, 'Товар не найден');
  const method = ['Click', 'Payme'].includes(req.body?.method) ? req.body.method : 'Click';
  const promo = req.body?.promo ? findPromo(req.body.promo) : null;
  const disc = discount(it.amount, promo);
  const o = {
    id: 'ORD-' + (++db().seq.order), userId: req.user.id, key: it.key, type: it.type, ref: it.ref, months: it.months || null,
    title: it.title, price: it.amount, discount: disc, promo: promo?.code || '', amount: it.amount - disc,
    method, status: 'pending', demo: !!db().settings.paymentsDemo, createdAt: now(), log: [`Заказ создан · ожидает оплаты через ${method}`]
  };
  db().orders.unshift(o);
  store.save();
  res.json({ order: o });
});

function grant(o) {
  const u = db().users.find((x) => x.id === o.userId);
  if (!u) return;
  if (o.type === 'course' && !u.owned.includes(o.ref)) u.owned.push(o.ref);
  if (o.type === 'sub') {
    const base = hasSub(u) ? new Date(u.sub.until) : new Date();
    base.setMonth(base.getMonth() + o.months);
    u.sub = { status: 'active', months: o.months, until: base.toISOString(), auto: true, method: o.method };
  }
  return u;
}

// Демо-оплата. В рабочей версии статус меняется только по callback от Click / Payme.
app.post('/api/orders/:id/pay-demo', auth, async (req, res) => {
  const o = db().orders.find((x) => x.id === req.params.id && x.userId === req.user.id);
  if (!o) return bad(res, 404, 'Заказ не найден');
  if (!db().settings.paymentsDemo) return bad(res, 400, 'Демо-оплата отключена');
  if (o.status !== 'pending') return res.json({ order: o, user: publicUser(req.user) });
  o.status = 'paid'; o.paidAt = now();
  o.log.push(`[демо] ${o.method}: платёж подтверждён`, 'Доступ открыт');
  if (o.promo) { const p = db().promos.find((x) => x.code === o.promo); if (p) p.used++; }
  const u = grant(o);
  store.save();
  if (db().settings.notifyOrders) tg.send(tg.orderText(o, u)).catch(() => {});
  res.json({ order: o, user: publicUser(u) });
});

app.post('/api/orders/:id/cancel', auth, (req, res) => {
  const o = db().orders.find((x) => x.id === req.params.id && x.userId === req.user.id);
  if (!o) return bad(res, 404, 'Заказ не найден');
  if (o.status === 'pending') { o.status = 'cancelled'; o.log.push('Пользователь отменил оплату'); store.save(); }
  res.json({ order: o });
});

app.post('/api/me/sub/auto', auth, (req, res) => {
  if (!req.user.sub) return bad(res, 400, 'Подписки нет');
  req.user.sub.auto = !!req.body?.auto; store.save();
  res.json({ user: publicUser(req.user) });
});

// ---------- admin API ----------
const A = express.Router();

A.post('/login', limit('adm', 10, 15 * 60e3), (req, res) => {
  const { login, password } = req.body || {};
  if (!safeEq(login || '', ADMIN_LOGIN) || !safeEq(password || '', ADMIN_PASSWORD)) return bad(res, 401, 'Неверный логин или пароль');
  const t = token();
  db().adminSessions[t] = { exp: Date.now() + 12 * 3600e3 };
  for (const [k, v] of Object.entries(db().adminSessions)) if (v.exp < Date.now()) delete db().adminSessions[k];
  store.save();
  res.json({ token: t });
});

A.use(adminAuth);

A.post('/logout', (req, res) => { delete db().adminSessions[(req.get('authorization') || '').slice(7)]; store.save(); res.json({ ok: true }); });

A.get('/stats', (req, res) => {
  const d = db(); const t = Date.now();
  const since = (days) => (x) => t - new Date(x.createdAt).getTime() < days * 864e5;
  const paid = d.orders.filter((o) => o.status === 'paid');
  const days = [];
  for (let i = 13; i >= 0; i--) {
    const day = new Date(t - i * 864e5).toISOString().slice(0, 10);
    days.push({ day, leads: d.leads.filter((l) => l.createdAt.slice(0, 10) === day).length, users: d.users.filter((u) => u.createdAt.slice(0, 10) === day).length });
  }
  res.json({
    leadsNew: d.leads.filter((l) => l.status === 'new').length,
    leads7: d.leads.filter(since(7)).length,
    leadsTotal: d.leads.length,
    users: d.users.length, users7: d.users.filter(since(7)).length,
    activeSubs: d.users.filter(hasSub).length,
    revenue: paid.reduce((a, o) => a + o.amount, 0),
    revenue30: paid.filter((o) => t - new Date(o.paidAt).getTime() < 30 * 864e5).reduce((a, o) => a + o.amount, 0),
    ordersPaid: paid.length,
    tgFailed: d.leads.filter((l) => d.settings.notifyLeads && l.tg && !l.tg.ok).length,
    byType: Object.keys(tg.LEAD_TYPES).map((k) => ({ type: k, n: d.leads.filter((l) => l.type === k).length })),
    days,
    recentLeads: d.leads.slice(0, 6)
  });
});

// заявки
A.get('/leads', (req, res) => res.json({ leads: db().leads, types: tg.LEAD_TYPES }));
A.patch('/leads/:id', (req, res) => {
  const l = db().leads.find((x) => x.id === Number(req.params.id)); if (!l) return bad(res, 404, 'Нет заявки');
  if (['new', 'work', 'done', 'rejected'].includes(req.body?.status)) l.status = req.body.status;
  if (req.body?.note !== undefined) l.note = clean(req.body.note, 2000);
  l.updatedAt = now(); store.save(); res.json({ lead: l });
});
A.post('/leads/:id/resend', async (req, res) => {
  const l = db().leads.find((x) => x.id === Number(req.params.id)); if (!l) return bad(res, 404, 'Нет заявки');
  l.tg = await tg.send(tg.leadText(l)); store.save(); res.json({ lead: l });
});
A.delete('/leads/:id', (req, res) => { db().leads = db().leads.filter((x) => x.id !== Number(req.params.id)); store.save(); res.json({ ok: true }); });
A.get('/leads.csv', (req, res) => {
  const q = (v) => '"' + String(v ?? '').replace(/"/g, '""') + '"';
  const rows = [['ID', 'Дата', 'Тип', 'Имя', 'Телефон', 'Компания', 'Сотрудников', 'Курс', 'Цель', 'Комментарий', 'Статус', 'Заметка']]
    .concat(db().leads.map((l) => [l.id, l.createdAt, tg.LEAD_TYPES[l.type] || l.type, l.name, l.phone, l.company, l.size, l.courseTitle, l.goal, l.message, l.status, l.note]));
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="leads.csv"');
  res.send('﻿' + rows.map((r) => r.map(q).join(';')).join('\n'));
});

// пользователи
A.get('/users', (req, res) => res.json({ users: db().users.map((u) => ({ ...publicUser(u), lastSeen: u.lastSeen, done: Object.keys(u.state?.done || {}).length, xp: u.state?.xp || 0, orders: db().orders.filter((o) => o.userId === u.id && o.status === 'paid').length })) }));
A.patch('/users/:id', (req, res) => {
  const u = db().users.find((x) => x.id === Number(req.params.id)); if (!u) return bad(res, 404, 'Нет пользователя');
  const b = req.body || {};
  if (b.name) u.name = clean(b.name, 60);
  if (b.grantCourse && !u.owned.includes(b.grantCourse)) u.owned.push(clean(b.grantCourse, 60));
  if (b.revokeCourse) u.owned = u.owned.filter((x) => x !== b.revokeCourse);
  if (b.subMonths) { const until = new Date(); until.setMonth(until.getMonth() + Number(b.subMonths)); u.sub = { status: 'active', months: Number(b.subMonths), until: until.toISOString(), auto: false, method: 'Выдано админом' }; }
  if (b.revokeSub) u.sub = null;
  store.save(); res.json({ user: publicUser(u) });
});

// заказы
A.get('/orders', (req, res) => res.json({ orders: db().orders.map((o) => ({ ...o, user: db().users.find((u) => u.id === o.userId)?.phone || '—' })) }));
A.post('/orders/:id/refund', (req, res) => {
  const o = db().orders.find((x) => x.id === req.params.id); if (!o) return bad(res, 404, 'Нет заказа');
  if (o.status !== 'paid') return bad(res, 400, 'Вернуть можно только оплаченный заказ');
  o.status = 'refunded'; o.log.push('Возврат оформлен администратором');
  const u = db().users.find((x) => x.id === o.userId);
  if (u && o.type === 'course') u.owned = u.owned.filter((x) => x !== o.ref);
  if (u && o.type === 'sub' && u.sub) u.sub.status = 'refunded';
  store.save(); res.json({ order: o });
});

// курсы
const COURSE_FIELDS = ['title', 'topic', 'level', 'audience', 'hours', 'price', 'cover', 'rating', 'students', 'isNew', 'seq', 'published', 'order', 'desc', 'outcomes', 'modules'];
function applyCourse(c, b) {
  for (const k of COURSE_FIELDS) if (b[k] !== undefined) c[k] = b[k];
  for (const k of ['hours', 'price', 'rating', 'students', 'order']) c[k] = Math.max(0, Number(c[k]) || 0);
  c.isNew = !!c.isNew; c.seq = !!c.seq; c.published = !!c.published;
  if (!Array.isArray(c.outcomes)) c.outcomes = [];
  if (!Array.isArray(c.modules)) c.modules = [];
  c.modules = c.modules.map((m) => ({ t: clean(m.t, 120), l: (m.l || []).map((l) => ({ id: clean(l.id, 40) || 'l' + crypto.randomBytes(3).toString('hex'), t: clean(l.t, 160), free: !!l.free, final: !!l.final })) }));
}
A.get('/courses', (req, res) => res.json({ courses: db().courses, lessonIds: Object.keys(db().lessons) }));
A.post('/courses', (req, res) => {
  const id = clean(req.body?.id, 40).toLowerCase().replace(/[^a-z0-9-]/g, '-');
  if (!id || db().courses.some((c) => c.id === id)) return bad(res, 400, 'Укажите уникальный ID курса (латиница)');
  const c = { id, title: 'Новый курс', topic: 'Основы', level: 'Начальный', audience: 'beginner', hours: 1, price: 0, cover: 'a', rating: 5, students: 0, isNew: true, published: false, order: db().courses.length + 1, desc: '', outcomes: [], modules: [{ t: 'Модуль 1', l: [{ id: id + '-1', t: 'Первый урок', free: true }] }] };
  applyCourse(c, req.body || {});
  db().courses.push(c); store.save(); res.json({ course: c });
});
A.put('/courses/:id', (req, res) => {
  const c = db().courses.find((x) => x.id === req.params.id); if (!c) return bad(res, 404, 'Нет курса');
  applyCourse(c, req.body || {}); store.save(); res.json({ course: c });
});
A.delete('/courses/:id', (req, res) => { db().courses = db().courses.filter((x) => x.id !== req.params.id); store.save(); res.json({ ok: true }); });

A.get('/lessons/:id', (req, res) => res.json({ lesson: db().lessons[req.params.id] || { min: 10, blocks: [] } }));
A.put('/lessons/:id', (req, res) => {
  const l = req.body?.lesson;
  if (!l || !Array.isArray(l.blocks)) return bad(res, 400, 'Неверный формат урока');
  db().lessons[clean(req.params.id, 40)] = { min: Math.max(1, Number(l.min) || 10), blocks: l.blocks };
  store.save(); res.json({ ok: true });
});

// тарифы
A.get('/plans', (req, res) => res.json({ plans: db().plans }));
A.put('/plans', (req, res) => {
  const p = req.body?.plans; if (!Array.isArray(p)) return bad(res, 400, 'Неверный формат');
  db().plans = p.map((x) => ({ id: clean(x.id, 20), months: Math.max(1, Number(x.months) || 1), price: Math.max(0, Number(x.price) || 0), best: !!x.best }));
  store.save(); res.json({ plans: db().plans });
});

// промокоды
A.get('/promos', (req, res) => res.json({ promos: db().promos }));
A.post('/promos', (req, res) => {
  const b = req.body || {}; const code = clean(b.code, 40).toUpperCase().replace(/\s/g, '');
  if (!code || !Number(b.val)) return bad(res, 400, 'Укажите код и размер скидки');
  if (db().promos.some((p) => p.code === code)) return bad(res, 400, 'Такой код уже есть');
  const p = { code, type: b.type === 'sum' ? 'sum' : 'pct', val: Number(b.val), limit: Number(b.limit) || 100, used: 0, active: true };
  db().promos.push(p); store.save(); res.json({ promo: p });
});
A.patch('/promos/:code', (req, res) => {
  const p = db().promos.find((x) => x.code === req.params.code); if (!p) return bad(res, 404, 'Нет промокода');
  if (req.body?.active !== undefined) p.active = !!req.body.active;
  store.save(); res.json({ promo: p });
});
A.delete('/promos/:code', (req, res) => { db().promos = db().promos.filter((x) => x.code !== req.params.code); store.save(); res.json({ ok: true }); });

// настройки
function maskedSettings() {
  const s = { ...db().settings }; const c = tg.cfg();
  s.telegramTokenMasked = c.token ? c.token.slice(0, 6) + '…' + c.token.slice(-4) : '';
  s.telegramChatIdEffective = c.chatId;
  s.telegramFromEnv = !db().settings.telegramToken && !!process.env.TELEGRAM_BOT_TOKEN;
  delete s.telegramToken;
  return s;
}
A.get('/settings', (req, res) => res.json({ settings: maskedSettings() }));
A.put('/settings', (req, res) => {
  const b = req.body || {}; const s = db().settings;
  for (const k of ['notifyLeads', 'notifyOrders', 'notifySignups', 'smsDemo', 'paymentsDemo']) if (b[k] !== undefined) s[k] = !!b[k];
  for (const k of ['demoCode', 'siteName', 'contactPhone', 'contactTelegram', 'telegramChatId']) if (b[k] !== undefined) s[k] = clean(b[k], 120);
  if (b.telegramToken) s.telegramToken = clean(b.telegramToken, 120);
  store.save(); res.json({ settings: maskedSettings() });
});
A.post('/settings/test-telegram', async (req, res) => {
  const r = await tg.send('✅ <b>AI Master</b>: тестовое сообщение. Уведомления о заявках настроены.');
  res.json(r);
});

app.use('/api/admin', A);
app.use('/api', (req, res) => bad(res, 404, 'Метод не найден'));

// ---------- static ----------
const PUB = path.join(__dirname, '..', 'public');
app.get('/admin', (req, res) => res.sendFile(path.join(PUB, 'admin.html')));
app.use(express.static(PUB, { extensions: ['html'] }));

app.use((err, req, res, next) => {
  console.error(err);
  if (err.type === 'entity.too.large') return bad(res, 413, 'Слишком большой запрос');
  if (err.type === 'entity.parse.failed') return bad(res, 400, 'Неверный JSON');
  bad(res, 500, 'Ошибка сервера');
});

process.on('SIGINT', () => { store.saveNow(); process.exit(0); });
process.on('SIGTERM', () => { store.saveNow(); process.exit(0); });

app.listen(PORT, () => {
  const c = tg.cfg();
  console.log(`AI Master запущен: http://localhost:${PORT}`);
  console.log(`Админ-панель:      http://localhost:${PORT}/admin  (логин: ${ADMIN_LOGIN})`);
  console.log(`Telegram:          ${c.token && c.chatId ? 'настроен, chat_id ' + c.chatId : 'НЕ настроен'}`);
});
