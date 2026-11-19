// Meta Conversions API: дублируем ключевые события с сервера (не теряются из-за блокировщиков и iOS).
// Браузерный пиксель и сервер отправляют одно и то же event_id — Meta убирает дубли сама.
const crypto = require('crypto');
const store = require('./db');

const sha = (v) => crypto.createHash('sha256').update(String(v).trim().toLowerCase()).digest('hex');

async function sendEvent({ name, eventId, url, req, phone, externalId, fbp, fbc, custom }) {
  const s = store.db.settings;
  const pixel = s.metaPixelId, token = s.metaCapiToken;
  if (!pixel || !token) return { ok: false, skipped: true };
  const user_data = {
    client_ip_address: req.ip,
    client_user_agent: req.get('user-agent') || '',
    ...(phone ? { ph: [sha(String(phone).replace(/\D/g, ''))] } : {}),
    ...(externalId ? { external_id: [sha(externalId)] } : {}),
    ...(fbp ? { fbp } : {}),
    ...(fbc ? { fbc } : {}),
    country: [sha('uz')]
  };
  const body = {
    data: [{ event_name: name, event_time: Math.floor(Date.now() / 1000), event_id: eventId, event_source_url: url, action_source: 'website', user_data, custom_data: custom || {} }],
    ...(s.metaTestCode ? { test_event_code: s.metaTestCode } : {})
  };
  try {
    const r = await fetch(`https://graph.facebook.com/v21.0/${pixel}/events?access_token=${encodeURIComponent(token)}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), signal: AbortSignal.timeout(10000)
    });
    const j = await r.json().catch(() => ({}));
    if (r.ok && j.events_received) return { ok: true };
    return { ok: false, error: j.error?.message || `HTTP ${r.status}` };
  } catch (e) {
    return { ok: false, error: e.name === 'TimeoutError' ? 'Meta не ответила за 10 секунд' : e.message };
  }
}

module.exports = { sendEvent };
