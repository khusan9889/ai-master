// Простое файловое хранилище (JSON) с атомарной записью.
// Без нативных зависимостей — запускается на любом хостинге с Node.js.

const fs = require('fs');
const path = require('path');
const seed = require('./seed');

const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, '..', 'data');
const FILE = path.join(DATA_DIR, 'db.json');

function fresh() {
  return {
    version: 2,
    seq: { lead: 0 },
    adminSessions: {},
    courses: JSON.parse(JSON.stringify(seed.courses)),
    lessons: JSON.parse(JSON.stringify(seed.lessons)),
    plans: JSON.parse(JSON.stringify(seed.plans)),
    leads: [],
    settings: {
      telegramToken: '',
      telegramChatId: '',
      notifyLeads: true,
      contactPhone: '+998 71 200 00 00',
      contactTelegram: '@aimaster_uz',
      metaPixelId: '',
      yandexMetrikaId: '',
      gaId: ''
    }
  };
}

let data;
function load() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  if (fs.existsSync(FILE)) {
    data = JSON.parse(fs.readFileSync(FILE, 'utf8'));
    const def = fresh();
    for (const k of Object.keys(def)) if (data[k] === undefined) data[k] = def[k];
    data.settings = Object.assign(def.settings, data.settings);
  } else {
    data = fresh();
    flush();
  }
  return data;
}

let timer = null;
function flush() {
  const tmp = FILE + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(data, null, 1));
  fs.renameSync(tmp, FILE);
}
function save() {
  clearTimeout(timer);
  timer = setTimeout(() => { try { flush(); } catch (e) { console.error('DB write error', e); } }, 150);
}
function saveNow() { clearTimeout(timer); flush(); }

module.exports = { load, save, saveNow, get db() { return data; }, DATA_DIR };
