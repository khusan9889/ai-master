// Отправка уведомлений в Telegram-группу через Bot API.

const store = require('./db');

function cfg() {
  const s = store.db.settings;
  return {
    token: s.telegramToken || process.env.TELEGRAM_BOT_TOKEN || '',
    chatId: s.telegramChatId || process.env.TELEGRAM_CHAT_ID || ''
  };
}

const h = (v) => String(v ?? '').replace(/[&<>]/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[m]));

async function send(text, { retry = true } = {}) {
  const { token, chatId } = cfg();
  if (!token || !chatId) return { ok: false, error: 'Telegram не настроен: укажите токен бота и ID группы' };
  try {
    const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML', disable_web_page_preview: true }),
      signal: AbortSignal.timeout(10000)
    });
    const j = await r.json().catch(() => ({}));
    if (j.ok) return { ok: true, messageId: j.result?.message_id };
    // Группа превратилась в супергруппу — у неё новый ID. Сохраняем и повторяем.
    const newId = j.parameters?.migrate_to_chat_id;
    if (newId && retry) {
      store.db.settings.telegramChatId = String(newId);
      store.save();
      console.log(`[telegram] группа стала супергруппой, новый chat_id: ${newId}`);
      return send(text, { retry: false });
    }
    return { ok: false, error: j.description || `HTTP ${r.status}` };
  } catch (e) {
    return { ok: false, error: e.name === 'TimeoutError' ? 'Telegram не ответил за 10 секунд' : e.message };
  }
}

const LEAD_TYPES = {
  consult: '🎯 Подбор курса / консультация',
  business: '🏢 Корпоративное обучение',
  course: '📚 Интерес к курсу',
  'level-test': '🧭 Тест уровня'
};

function fmtDate(iso) {
  return new Date(iso).toLocaleString('ru-RU', { timeZone: 'Asia/Tashkent', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function leadText(l) {
  const rows = [
    `<b>🔥 Новая заявка #${l.id}</b>`,
    `<b>${h(LEAD_TYPES[l.type] || l.type)}</b>`,
    '',
    `👤 <b>Имя:</b> ${h(l.name)}`,
    `📞 <b>Телефон:</b> ${h(l.phone)}`
  ];
  if (l.company) rows.push(`🏢 <b>Компания:</b> ${h(l.company)}`);
  if (l.size) rows.push(`👥 <b>Сотрудников:</b> ${h(l.size)}`);
  if (l.courseTitle) rows.push(`📚 <b>Курс:</b> ${h(l.courseTitle)}`);
  if (l.goal) rows.push(`🎯 <b>Цель:</b> ${h(l.goal)}`);
  if (l.contactWay) rows.push(`💬 <b>Как связаться:</b> ${h(l.contactWay)}`);
  if (l.message) rows.push(`📝 <b>Комментарий:</b> ${h(l.message)}`);
  rows.push('', `🌐 Страница: ${h(l.page || '—')}`, `🕒 ${fmtDate(l.createdAt)} (Ташкент)`);
  return rows.join('\n');
}

function orderText(o, user) {
  return [
    `<b>💳 Оплачен заказ ${h(o.id)}</b>${o.demo ? ' <i>(демо-оплата)</i>' : ''}`,
    '',
    `📦 ${h(o.title)}`,
    `💰 ${Number(o.amount).toLocaleString('ru-RU')} сум · ${h(o.method)}`,
    `👤 ${h(user?.name || '—')} · ${h(user?.phone || '—')}`,
    `🕒 ${fmtDate(o.paidAt || o.createdAt)}`
  ].join('\n');
}

function signupText(u) {
  return [`<b>🆕 Новая регистрация</b>`, '', `👤 ${h(u.name)}`, `📞 ${h(u.phone)}`, `🕒 ${fmtDate(u.createdAt)}`].join('\n');
}

module.exports = { send, leadText, orderText, signupText, cfg, LEAD_TYPES };
