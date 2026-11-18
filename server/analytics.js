// Собственная аналитика: события пишутся в файлы по дням (NDJSON),
// отчёты считаются по запросу из админ-панели.

const fs = require('fs');
const path = require('path');
const store = require('./db');

const DIR = path.join(store.DATA_DIR, 'events');
fs.mkdirSync(DIR, { recursive: true });

const TZ = 5 * 3600e3; // Ташкент, UTC+5, без перехода на летнее время
const dayKey = (t) => new Date(t + TZ).toISOString().slice(0, 10);

const BOT_RE = /bot|crawl|spider|slurp|facebookexternalhit|preview|headless|lighthouse|pingdom|monitor|curl|wget|python|axios/i;

function parseUA(ua = '') {
  const dev = /iPad|Tablet/i.test(ua) ? 'Планшет' : /Mobi|Android|iPhone/i.test(ua) ? 'Телефон' : 'Компьютер';
  const os = /Windows/i.test(ua) ? 'Windows' : /Android/i.test(ua) ? 'Android' : /iPhone|iPad|iOS/i.test(ua) ? 'iOS' : /Mac OS/i.test(ua) ? 'macOS' : /Linux/i.test(ua) ? 'Linux' : 'Другая';
  const br = /Instagram/i.test(ua) ? 'Instagram (встроенный)' : /FBAN|FBAV|FB_IAB/i.test(ua) ? 'Facebook (встроенный)' : /Telegram/i.test(ua) ? 'Telegram (встроенный)'
    : /YaBrowser/i.test(ua) ? 'Яндекс Браузер' : /Edg\//i.test(ua) ? 'Edge' : /OPR\//i.test(ua) ? 'Opera' : /Firefox/i.test(ua) ? 'Firefox'
    : /Chrome|CriOS/i.test(ua) ? 'Chrome' : /Safari/i.test(ua) ? 'Safari' : 'Другой';
  return { dev, os, br };
}

const loc = (v) => (v && typeof v === 'object' ? v.ru || v.uz || v.en || '' : v || '');
const clip = (v, n = 120) => (v == null ? '' : String(v).replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, n));

// Определяем источник визита по UTM, кликовым меткам и рефереру.
function source(ctx, host) {
  const s = { src: clip(ctx.us, 60).toLowerCase(), med: clip(ctx.um, 60).toLowerCase(), cmp: clip(ctx.uc, 120), cnt: clip(ctx.ux, 120), trm: clip(ctx.ut, 120), ref: '' };
  let refHost = '';
  try { refHost = ctx.ref ? new URL(ctx.ref).hostname.replace(/^www\./, '') : ''; } catch (e) {}
  if (refHost && host && refHost === host.replace(/^www\./, '')) refHost = '';
  s.ref = refHost;
  if (!s.src) {
    if (ctx.fb) { s.src = 'facebook'; s.med = s.med || 'cpc'; }
    else if (ctx.gc) { s.src = 'google'; s.med = s.med || 'cpc'; }
    else if (ctx.yc) { s.src = 'yandex'; s.med = s.med || 'cpc'; }
    else if (refHost) {
      s.src = /google\./.test(refHost) ? 'google' : /yandex\.|ya\.ru/.test(refHost) ? 'yandex' : /instagram/.test(refHost) ? 'instagram'
        : /facebook|fb\.com|fb\.me/.test(refHost) ? 'facebook' : /t\.me|telegram/.test(refHost) ? 'telegram' : refHost;
      s.med = s.med || (/(google|yandex)/.test(s.src) ? 'organic' : 'referral');
    }
  }
  return s;
}

function append(ev) {
  try { fs.appendFileSync(path.join(DIR, dayKey(ev.t) + '.ndjson'), JSON.stringify(ev) + '\n'); } catch (e) { console.error('analytics write', e.message); }
}

const ALLOWED = new Set(['pv', 'click', 'lead_open', 'view', 'lesson', 'ping']);

// Приём пачки событий от браузера.
function ingest(body, req) {
  const ua = req.get('user-agent') || '';
  if (BOT_RE.test(ua)) return 0;
  const vid = clip(body.v, 40), sid = clip(body.s, 40);
  if (!vid || !sid || !Array.isArray(body.e)) return 0;
  const meta = { ...parseUA(ua), ...source(body.c || {}, req.hostname), lang: ['uz', 'ru', 'en'].includes(body.l) ? body.l : '' };
  const now = Date.now();
  let n = 0;
  for (const e of body.e.slice(0, 50)) {
    if (!e || !ALLOWED.has(e.t)) continue;
    const t = Math.min(now, Math.max(now - 3600e3, Number(e.ts) || now));
    const d = {};
    if (e.d && typeof e.d === 'object') for (const [k, v] of Object.entries(e.d).slice(0, 6)) d[clip(k, 20)] = clip(v, 80);
    append({ t, v: vid, s: sid, e: e.t, n: clip(e.n, 60), p: clip(e.p, 80), d, ...meta });
    n++;
  }
  return n;
}

// Событие «заявка» пишет сервер — оно не теряется даже при блокировщиках рекламы.
function logLead(lead, req) {
  if (!lead.vid || !lead.sid) return;
  append({ t: Date.now(), v: lead.vid, s: lead.sid, e: 'lead', n: lead.type, p: lead.page, d: { item: lead.itemId || '' }, ...parseUA(req.get('user-agent') || ''),
    lang: lead.lang || '', src: lead.src, med: lead.med, cmp: lead.cmp, cnt: lead.cnt, trm: lead.trm, ref: lead.ref });
}

function readRange(from, to) {
  const out = [];
  for (let d = new Date(from + 'T00:00:00Z'); d <= new Date(to + 'T00:00:00Z'); d.setUTCDate(d.getUTCDate() + 1)) {
    const f = path.join(DIR, d.toISOString().slice(0, 10) + '.ndjson');
    if (!fs.existsSync(f)) continue;
    for (const line of fs.readFileSync(f, 'utf8').split('\n')) { if (line) { try { out.push(JSON.parse(line)); } catch (e) {} } }
  }
  return out;
}

const CTA_LABELS = { subscribe: 'Оформить подписку', buy_course: 'Купить курс', try_free: 'Попробовать бесплатно', consult: 'Заказать звонок', business: 'Заявка от компании', choose_course: 'Выбрать курс', demo_open: 'Смотреть демо (первый экран)', demo_play: 'Запустили демо-видео', demo_done: 'Досмотрели демо-видео' };
const PLACE_LABELS = { pricing: 'Блок цен', course: 'Страница курса', lesson: 'Закрытый урок', hero: 'Первый экран', demo: 'Блок демо', header: 'Шапка сайта', footer: 'Подвал', catalog: 'Каталог', faq: 'Блок вопросов' };

function pageLabel(p) {
  const c = store.db.courses;
  if (!p || p === 'home') return 'Главная';
  if (p.startsWith('course-')) return 'Курс: ' + (loc(c.find((x) => x.id === p.slice(7))?.title) || p.slice(7));
  if (p.startsWith('lesson-')) { for (const x of c) for (const m of x.modules) for (const l of m.l) if (l.id === p.slice(7)) return 'Урок: ' + loc(l.t); return p; }
  return { catalog: 'Каталог', pricing: 'Цены', business: 'Компаниям', privacy: 'Политика конфиденциальности' }[p] || p;
}
function itemLabel(id) {
  if (!id) return '—';
  const c = store.db.courses.find((x) => x.id === id); if (c) return loc(c.title);
  const p = store.db.plans.find((x) => x.id === id); if (p) return `Подписка ${p.months} мес`;
  return id;
}

function count(map, key, inc = 1) { map.set(key, (map.get(key) || 0) + inc); }
const sorted = (map, lim = 20) => [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, lim).map(([k, n]) => ({ k, n }));
const pct = (a, b) => (b ? Math.round((a / b) * 1000) / 10 : 0);

function report(from, to) {
  const ev = readRange(from, to).sort((a, b) => a.t - b.t);
  const fromT = new Date(from + 'T00:00:00Z').getTime() - TZ, toT = new Date(to + 'T00:00:00Z').getTime() - TZ + 864e5;
  const leads = store.db.leads.filter((l) => { const t = new Date(l.createdAt).getTime(); return t >= fromT && t < toT; });

  // сессии
  const S = new Map();
  for (const e of ev) {
    let s = S.get(e.s);
    if (!s) { s = { lang: e.lang || '', v: e.v, first: e.t, last: e.t, pv: 0, inter: 0, src: e.src || '', med: e.med || '', cmp: e.cmp || '', cnt: e.cnt || '', dev: e.dev, os: e.os, br: e.br, viewedOffer: false, cta: false, open: false, lead: false, day: dayKey(e.t) }; S.set(e.s, s); }
    s.last = Math.max(s.last, e.t);
    if (e.e === 'pv') { s.pv++; if (e.p.startsWith('course-') || e.p === 'pricing') s.viewedOffer = true; }
    else if (e.e !== 'ping') s.inter++;
    if (e.e === 'view' && e.n === 'pricing') s.viewedOffer = true;
    if (e.e === 'click' && (e.n === 'subscribe' || e.n === 'buy_course')) s.cta = true;
    if (e.e === 'lead_open') s.open = true;
    if (e.e === 'lead') s.lead = true;
  }
  const sessions = [...S.values()];
  const visitors = new Set(sessions.map((s) => s.v)).size;
  const pageviews = ev.filter((e) => e.e === 'pv').length;
  const durs = sessions.map((s) => (s.last - s.first) / 1000);
  const avgDuration = durs.length ? Math.round(durs.reduce((a, b) => a + b, 0) / durs.length) : 0;
  const bounces = sessions.filter((s) => s.pv <= 1 && s.inter === 0 && s.last - s.first < 10e3).length;
  const leadSessions = sessions.filter((s) => s.lead).length;

  // клики по кнопкам
  const cta = {};
  for (const id of Object.keys(CTA_LABELS)) cta[id] = { label: CTA_LABELS[id], clicks: 0, uniq: new Set(), byItem: new Map(), byPlace: new Map() };
  for (const e of ev.filter((x) => x.e === 'click')) {
    const c = cta[e.n] || (cta[e.n] = { label: e.n, clicks: 0, uniq: new Set(), byItem: new Map(), byPlace: new Map() });
    c.clicks++; c.uniq.add(e.v);
    if (e.d?.item) count(c.byItem, itemLabel(e.d.item));
    if (e.d?.place) count(c.byPlace, PLACE_LABELS[e.d.place] || e.d.place);
  }
  const ctaOut = Object.entries(cta).map(([id, c]) => ({ id, label: c.label, clicks: c.clicks, uniq: c.uniq.size, byItem: sorted(c.byItem), byPlace: sorted(c.byPlace) }));

  // по дням
  const days = [];
  for (let d = new Date(from + 'T00:00:00Z'); d <= new Date(to + 'T00:00:00Z'); d.setUTCDate(d.getUTCDate() + 1)) days.push(d.toISOString().slice(0, 10));
  const series = days.map((day) => {
    const de = ev.filter((e) => dayKey(e.t) === day);
    return {
      day,
      visitors: new Set(de.map((e) => e.v)).size,
      sessions: new Set(de.map((e) => e.s)).size,
      pageviews: de.filter((e) => e.e === 'pv').length,
      subscribe: de.filter((e) => e.e === 'click' && e.n === 'subscribe').length,
      buy: de.filter((e) => e.e === 'click' && e.n === 'buy_course').length,
      leads: leads.filter((l) => dayKey(new Date(l.createdAt).getTime()) === day).length
    };
  });

  // источники и кампании
  const srcName = (s) => s.src || 'Прямые заходы';
  const bySrc = new Map();
  for (const s of sessions) {
    const k = srcName(s);
    const r = bySrc.get(k) || { src: k, sessions: 0, visitors: new Set(), cta: 0, leads: 0 };
    r.sessions++; r.visitors.add(s.v); if (s.cta) r.cta++; bySrc.set(k, r);
  }
  for (const l of leads) { const k = l.src || 'Прямые заходы'; const r = bySrc.get(k) || { src: k, sessions: 0, visitors: new Set(), cta: 0, leads: 0 }; r.leads++; bySrc.set(k, r); }
  const sources = [...bySrc.values()].map((r) => ({ src: r.src, sessions: r.sessions, visitors: r.visitors.size, cta: r.cta, leads: r.leads, conv: pct(r.leads, r.sessions) })).sort((a, b) => b.sessions - a.sessions);

  const byCmp = new Map();
  const cmpKey = (o) => [o.src || '—', o.med || '—', o.cmp || '—', o.cnt || ''].join('|');
  for (const s of sessions.filter((x) => x.cmp || x.med === 'cpc')) {
    const k = cmpKey(s); const r = byCmp.get(k) || { sessions: 0, cta: 0, leads: 0 }; r.sessions++; if (s.cta) r.cta++; byCmp.set(k, r);
  }
  for (const l of leads.filter((x) => x.cmp || x.med === 'cpc')) { const k = cmpKey(l); const r = byCmp.get(k) || { sessions: 0, cta: 0, leads: 0 }; r.leads++; byCmp.set(k, r); }
  const campaigns = [...byCmp.entries()].map(([k, r]) => { const [src, med, cmp, cnt] = k.split('|'); return { src, med, cmp, cnt, ...r, conv: pct(r.leads, r.sessions) }; }).sort((a, b) => b.sessions - a.sessions);

  // страницы
  const pv = new Map(), pvU = new Map();
  for (const e of ev.filter((x) => x.e === 'pv')) { count(pv, e.p || 'home'); (pvU.get(e.p || 'home') || pvU.set(e.p || 'home', new Set()).get(e.p || 'home')).add(e.v); }
  const pages = [...pv.entries()].sort((a, b) => b[1] - a[1]).slice(0, 20).map(([p, n]) => ({ path: p, label: pageLabel(p), views: n, visitors: pvU.get(p).size }));

  const dev = new Map(), os = new Map(), br = new Map(), lg = new Map();
  const LN = { uz: 'Oʻzbekcha', ru: 'Русский', en: 'English' };
  for (const s of sessions) { count(dev, s.dev); count(os, s.os); count(br, s.br); count(lg, LN[s.lang] || 'Не указан'); }

  const lessons = new Map();
  for (const e of ev.filter((x) => x.e === 'lesson' && x.d?.a === 'start')) count(lessons, pageLabel('lesson-' + e.n).replace('Урок: ', ''));

  const leadsByType = new Map(); for (const l of leads) count(leadsByType, l.type);

  const recent = Date.now() - 5 * 60e3;
  const online = new Set(readRange(dayKey(Date.now() - 864e5), dayKey(Date.now())).filter((e) => e.t > recent).map((e) => e.v)).size;

  return {
    from, to, online,
    kpi: { visitors, sessions: sessions.length, pageviews, avgDuration, bounce: pct(bounces, sessions.length), leads: leads.length, conv: pct(leadSessions, sessions.length) },
    cta: ctaOut,
    series,
    funnel: [
      { label: 'Зашли на сайт', n: sessions.length },
      { label: 'Смотрели курсы или цены', n: sessions.filter((s) => s.viewedOffer).length },
      { label: 'Нажали «Купить курс» или «Оформить подписку»', n: sessions.filter((s) => s.cta).length },
      { label: 'Открыли форму заявки', n: sessions.filter((s) => s.open).length },
      { label: 'Оставили заявку', n: leadSessions }
    ],
    sources, campaigns, pages,
    devices: sorted(dev), os: sorted(os), browsers: sorted(br), langs: sorted(lg),
    courseInterest: (() => { const m = new Map(); for (const e of ev.filter((x) => x.e === 'pv' && x.p.startsWith('course-'))) count(m, pageLabel(e.p).replace('Курс: ', '')); return sorted(m, 10); })(),
    lessons: sorted(lessons, 10),
    leadsByType: sorted(leadsByType)
  };
}

module.exports = { ingest, logLead, report, source, parseUA, dayKey, CTA_LABELS };
