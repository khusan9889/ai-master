// Отправка заявок в Telegram-группу через Bot API.

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
    // Группа стала супергруппой — у неё новый ID. Сохраняем и повторяем.
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
  plan: '💳 Заявка на подписку',
  buy: '🛒 Заявка на покупку курса',
  consult: '📞 Консультация',
  business: '🏢 Обучение для компании'
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
  if (l.courseTitle) rows.push(`📚 <b>Курс:</b> ${h(l.courseTitle)}${l.coursePrice ? ` · ${h(l.coursePrice)}` : ''}`);
  if (l.plan) rows.push(`💳 <b>Тариф:</b> ${h(l.plan)}`);
  if (l.company) rows.push(`🏢 <b>Компания:</b> ${h(l.company)}`);
  if (l.size) rows.push(`👥 <b>Сотрудников:</b> ${h(l.size)}`);
  if (l.message) rows.push(`📝 <b>Комментарий:</b> ${h(l.message)}`);
  if (l.viewed && l.viewed.length) rows.push(`👀 <b>Смотрел курсы:</b> ${h(l.viewed.join(', '))}`);
  const src = [l.src, l.med, l.cmp].filter(Boolean).join(' / ');
  rows.push('', `📊 Источник: ${h(src || 'прямой заход')}${l.cnt ? ` · ${h(l.cnt)}` : ''}`);
  if (l.lang) rows.push(`🌐 Язык сайта: ${h(l.lang.toUpperCase())}`);
  rows.push(`🕒 ${fmtDate(l.createdAt)} (Ташкент)`);
  return rows.join('\n');
}

module.exports = { send, leadText, cfg, LEAD_TYPES };
