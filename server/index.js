// AI Master — сервер: сайт, заявки в Telegram, аналитика, админ-панель.

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
store.load();
const tg = require('./telegram');
const an = require('./analytics');
const meta = require('./meta');
const db = () => store.db;

const PORT = Number(process.env.PORT) || 3000;
// На сервере за nginx слушаем только локально: HOST=127.0.0.1
const HOST = process.env.HOST || '0.0.0.0';
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
app.use(express.text({ type: 'text/plain', limit: '64kb' })); // sendBeacon
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

const LANGS = ['uz', 'ru', 'en'];
// Локализованное поле: {uz, ru, en} или строка (старый формат). Для менеджеров — русский.
const loc = (v, lang = 'ru') => (v && typeof v === 'object' ? v[lang] || v.ru || v.uz || v.en || '' : v || '');
const locObj = (v, max) => { const o = {}; for (const l of LANGS) o[l] = clean(v && typeof v === 'object' ? v[l] : v, max); return o; };
const allLessons = (c) => c.modules.flatMap((m) => m.l);
function findLesson(lid) { for (const c of db().courses) for (const l of allLessons(c)) if (l.id === lid) return { c, l }; return null; }

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
    settings: { contactPhone: s.contactPhone, contactTelegram: s.contactTelegram, metaPixelId: s.metaPixelId, yandexMetrikaId: s.yandexMetrikaId, gaId: s.gaId, clarityId: s.clarityId }
  });
});

// Открыты только бесплатные уроки — остальные по заявке.
app.get('/api/lessons/:id', (req, res) => {
  const f = findLesson(req.params.id);
  if (!f || !f.c.published) return bad(res, 404, 'Урок не найден');
  if (!(f.l.free || f.c.price === 0)) return res.status(402).json({ error: 'locked', courseId: f.c.id });
  const raw = db().lessons[f.l.id];
  const lang = LANGS.includes(req.query.lang) ? req.query.lang : 'uz';
  const lesson = !raw ? null : raw.blocks ? raw : raw[lang] || raw.ru || raw.uz || raw.en || null;
  res.json({ lesson });
});

// --- аналитика: приём событий ---
app.post('/api/t', limit('t', 600, 10 * 60e3), (req, res) => {
  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { return res.status(204).end(); } }
  an.ingest(body || {}, req);
  res.status(204).end();
});

// --- заявки ---
app.post('/api/leads', limit('lead', 6, 10 * 60e3), async (req, res) => {
  const b = req.body || {};
  if (b.website) return res.json({ ok: true }); // ловушка для ботов
  const name = clean(b.name, 80), phoneDigits = normPhone(b.phone);
  if (name.length < 2) return bad(res, 400, 'Укажите имя');
  if (phoneDigits.length < 11 || phoneDigits.length > 13) return bad(res, 400, 'Укажите номер телефона полностью');
  const type = tg.LEAD_TYPES[b.type] ? b.type : 'consult';
  const itemId = clean(b.item, 60);
  const sum = (n) => Number(n).toLocaleString('ru-RU').replace(/ /g, ' ') + ' сум';
  const plan = db().plans.find((p) => p.id === itemId);
  // курс: явно выбранный, либо страница курса/урока, с которой отправлена заявка
  const course = db().courses.find((c) => c.id === itemId) || db().courses.find((c) => c.id === clean(b.course, 60));
  const viewed = (Array.isArray(b.viewed) ? b.viewed : []).slice(0, 10).map((id) => db().courses.find((c) => c.id === id)).filter((c) => c && c !== course).map((c) => loc(c.title));
  const planText = plan ? `Подписка на все курсы, ${plan.months} мес · ${sum(plan.price)}` : '';
  const item = [course ? `Курс «${loc(course.title)}»` : '', planText].filter(Boolean).join(' · ');
  const src = an.source(b.c || {}, req.hostname);
  const lead = {
    id: ++db().seq.lead, type, name, phone: prettyPhone(phoneDigits),
    item, itemId: course || plan ? (plan ? plan.id : course.id) : '',
    courseId: course?.id || '', courseTitle: course ? loc(course.title) : '', coursePrice: course && course.price ? sum(course.price) : '',
    plan: planText, viewed, lang: LANGS.includes(b.lang) ? b.lang : '',
    company: clean(b.company, 120), size: clean(b.size, 40), message: clean(b.message, 1000),
    page: clean(b.page, 80), ...src, device: an.parseUA(req.get('user-agent') || '').dev,
    vid: clean(b.v, 40), sid: clean(b.s, 40),
    status: 'new', note: '', createdAt: now(), tg: { ok: false, error: 'ещё не отправлено' }
  };
  db().leads.unshift(lead);
  store.save();
  an.logLead(lead, req);
  // Conversions API: то же событие Lead, что отправил браузерный пиксель (event_id совпадает)
  const eid = clean(b.eid, 64);
  if (db().settings.metaPixelId && db().settings.metaCapiToken) {
    meta.sendEvent({ name: 'Lead', eventId: eid || 'lead-' + lead.id, url: clean(b.url, 300) || ('https://' + req.hostname + '/'), req, phone: phoneDigits,
      externalId: lead.vid, fbp: clean(b.fbp, 120), fbc: clean(b.fbc, 200),
      custom: { content_name: lead.courseTitle || lead.plan || type, content_category: type, lead_type: type } })
      .then((r) => { lead.capi = r; store.save(); if (!r.ok && !r.skipped) console.error('[meta capi]', r.error); });
  }
  if (db().settings.notifyLeads) {
    lead.tg = await tg.send(tg.leadText(lead));
    if (!lead.tg.ok) console.error(`[telegram] заявка #${lead.id} не отправлена: ${lead.tg.error}`);
    store.save();
  }
  res.json({ ok: true, id: lead.id });
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

A.get('/analytics', (req, res) => {
  const re = /^\d{4}-\d{2}-\d{2}$/;
  const today = an.dayKey(Date.now());
  let to = re.test(req.query.to) ? req.query.to : today;
  let from = re.test(req.query.from) ? req.query.from : an.dayKey(Date.now() - 6 * 864e5);
  if (from > to) [from, to] = [to, from];
  if ((new Date(to) - new Date(from)) / 864e5 > 366) from = an.dayKey(new Date(to).getTime() - 366 * 864e5);
  res.json(an.report(from, to));
});

A.get('/summary', (req, res) => res.json({ leadsNew: db().leads.filter((l) => l.status === 'new').length }));

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
  const rows = [['ID', 'Дата', 'Тип', 'Имя', 'Телефон', 'Курс', 'Тариф', 'Смотрел курсы', 'Компания', 'Сотрудников', 'Комментарий', 'Источник', 'Канал', 'Кампания', 'Объявление', 'Устройство', 'Язык', 'Статус', 'Заметка']]
    .concat(db().leads.map((l) => [l.id, l.createdAt, tg.LEAD_TYPES[l.type] || l.type, l.name, l.phone, l.courseTitle || '', l.plan || '', (l.viewed || []).join(', '), l.company, l.size, l.message, l.src, l.med, l.cmp, l.cnt, l.device, l.lang || '', l.status, l.note]));
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="leads.csv"');
  res.send('﻿' + rows.map((r) => r.map(q).join(';')).join('\n'));
});

// курсы
const COURSE_FIELDS = ['title', 'topic', 'level', 'audience', 'icon', 'hours', 'price', 'cover', 'rating', 'students', 'isNew', 'seq', 'published', 'order', 'desc', 'outcomes', 'modules'];
function applyCourse(c, b) {
  for (const k of COURSE_FIELDS) if (b[k] !== undefined) c[k] = b[k];
  for (const k of ['hours', 'price', 'rating', 'students', 'order']) c[k] = Math.max(0, Number(c[k]) || 0);
  c.isNew = !!c.isNew; c.seq = !!c.seq; c.published = !!c.published;
  c.title = locObj(c.title, 160); c.desc = locObj(c.desc, 600); c.topic = locObj(c.topic, 60);
  if (!['beginner', 'intermediate', 'advanced'].includes(c.level)) c.level = 'beginner';
  c.outcomes = (Array.isArray(c.outcomes) ? c.outcomes : []).map((o) => locObj(o, 200)).filter((o) => o.uz || o.ru || o.en);
  if (!Array.isArray(c.modules)) c.modules = [];
  c.modules = c.modules.map((m) => ({ t: locObj(m.t, 120), l: (m.l || []).map((l) => ({ id: clean(l.id, 40) || 'l' + crypto.randomBytes(3).toString('hex'), t: locObj(l.t, 160), task: locObj(l.task, 200), free: !!l.free, final: !!l.final })) }));
}
A.get('/courses', (req, res) => res.json({ courses: db().courses, lessonIds: Object.keys(db().lessons) }));
A.post('/courses', (req, res) => {
  const id = clean(req.body?.id, 40).toLowerCase().replace(/[^a-z0-9-]/g, '-');
  if (!id || db().courses.some((c) => c.id === id)) return bad(res, 400, 'Укажите уникальный ID курса (латиница)');
  const T = (uz, ru, en) => ({ uz, ru, en });
  const c = { id, title: T('Yangi kurs', 'Новый курс', 'New course'), topic: T('Asoslar', 'Основы', 'Basics'), level: 'beginner', audience: 'beginner', icon: 'cpu', hours: 1, price: 0, cover: 'a', rating: 5, students: 0, isNew: true, published: false, order: db().courses.length + 1, desc: T('', '', ''), outcomes: [], modules: [{ t: T('1-modul', 'Модуль 1', 'Module 1'), l: [{ id: id + '-1', t: T('Birinchi dars', 'Первый урок', 'First lesson'), free: true }] }] };
  applyCourse(c, req.body || {});
  db().courses.push(c); store.save(); res.json({ course: c });
});
A.put('/courses/:id', (req, res) => {
  const c = db().courses.find((x) => x.id === req.params.id); if (!c) return bad(res, 404, 'Нет курса');
  applyCourse(c, req.body || {}); store.save(); res.json({ course: c });
});
A.delete('/courses/:id', (req, res) => { db().courses = db().courses.filter((x) => x.id !== req.params.id); store.save(); res.json({ ok: true }); });
// Урок хранится по языкам: { uz: {min, blocks}, ru: {...}, en: {...} }
A.get('/lessons/:id', (req, res) => {
  const raw = db().lessons[req.params.id];
  const out = {};
  for (const l of LANGS) out[l] = raw ? (raw.blocks ? (l === 'ru' ? raw : null) : raw[l] || null) : null;
  res.json({ lesson: out });
});
A.put('/lessons/:id', (req, res) => {
  const l = req.body?.lesson, lang = req.body?.lang;
  if (!LANGS.includes(lang)) return bad(res, 400, 'Укажите язык урока');
  if (!l || !Array.isArray(l.blocks)) return bad(res, 400, 'Неверный формат урока');
  const id = clean(req.params.id, 40);
  let raw = db().lessons[id];
  if (!raw || raw.blocks) raw = raw && raw.blocks ? { ru: raw } : {};
  raw[lang] = { min: Math.max(1, Number(l.min) || 10), blocks: l.blocks };
  db().lessons[id] = raw;
  store.save(); res.json({ ok: true });
});

// тарифы
A.get('/plans', (req, res) => res.json({ plans: db().plans }));
A.put('/plans', (req, res) => {
  const p = req.body?.plans; if (!Array.isArray(p)) return bad(res, 400, 'Неверный формат');
  db().plans = p.map((x) => ({ id: clean(x.id, 20), months: Math.max(1, Number(x.months) || 1), price: Math.max(0, Number(x.price) || 0), best: !!x.best }));
  store.save(); res.json({ plans: db().plans });
});

// настройки
function maskedSettings() {
  const s = { ...db().settings }; const c = tg.cfg();
  s.telegramTokenMasked = c.token ? c.token.slice(0, 6) + '…' + c.token.slice(-4) : '';
  s.telegramChatIdEffective = c.chatId;
  s.telegramFromEnv = !db().settings.telegramToken && !!process.env.TELEGRAM_BOT_TOKEN;
  s.metaCapiSet = !!s.metaCapiToken;
  s.metaCapiMasked = s.metaCapiToken ? s.metaCapiToken.slice(0, 6) + '…' + s.metaCapiToken.slice(-4) : '';
  delete s.metaCapiToken;
  delete s.telegramToken;
  return s;
}
A.get('/settings', (req, res) => res.json({ settings: maskedSettings() }));
A.put('/settings', (req, res) => {
  const b = req.body || {}; const s = db().settings;
  if (b.notifyLeads !== undefined) s.notifyLeads = !!b.notifyLeads;
  for (const k of ['contactPhone', 'contactTelegram', 'telegramChatId']) if (b[k] !== undefined) s[k] = clean(b[k], 120);
  if (b.metaPixelId !== undefined) s.metaPixelId = clean(b.metaPixelId, 30).replace(/\D/g, '');
  if (b.yandexMetrikaId !== undefined) s.yandexMetrikaId = clean(b.yandexMetrikaId, 30).replace(/\D/g, '');
  if (b.clarityId !== undefined) s.clarityId = clean(b.clarityId, 20).replace(/[^a-z0-9]/gi, '');
  if (b.metaTestCode !== undefined) s.metaTestCode = clean(b.metaTestCode, 30).replace(/[^A-Z0-9]/gi, '');
  if (b.metaCapiToken) s.metaCapiToken = clean(b.metaCapiToken, 400);
  if (b.metaCapiClear) s.metaCapiToken = '';
  if (b.gaId !== undefined) { const g = clean(b.gaId, 30).toUpperCase(); s.gaId = /^G-[A-Z0-9]{4,20}$/.test(g) ? g : ''; }
  if (b.telegramToken) s.telegramToken = clean(b.telegramToken, 120);
  store.save(); res.json({ settings: maskedSettings() });
});
A.post('/settings/test-telegram', async (req, res) => {
  res.json(await tg.send('✅ <b>AI Master</b>: тестовое сообщение. Уведомления о заявках настроены.'));
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

app.listen(PORT, HOST, (err) => {
  if (err) {
    console.error(err.code === 'EADDRINUSE'
      ? `Порт ${PORT} уже занят — возможно, сайт уже запущен в другом окне. Закройте его (Ctrl+C) или укажите другой PORT в .env.`
      : `Не удалось запустить сервер: ${err.message}`);
    process.exit(1);
  }
  const c = tg.cfg();
  console.log(`AI Master запущен: http://localhost:${PORT}`);
  console.log(`Админ-панель:      http://localhost:${PORT}/admin  (логин: ${ADMIN_LOGIN})`);
  console.log(`Telegram:          ${c.token && c.chatId ? 'настроен, chat_id ' + c.chatId : 'НЕ настроен'}`);
});
