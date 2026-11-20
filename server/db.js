// Простое файловое хранилище (JSON) с атомарной записью.
// Без нативных зависимостей — запускается на любом хостинге с Node.js.

const fs = require('fs');
const path = require('path');
const seed = require('./seed');

const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, '..', 'data');
const FILE = path.join(DATA_DIR, 'db.json');

function fresh() {
  return {
    version: 7,
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
      gaId: '',
      clarityId: '',
      metaCapiToken: '',
      metaTestCode: ''
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
    // v3: курсы стали трёхъязычными; v4: задания и демо-уроки; v5: один большой вводный урок и 12–15 уроков в курсе.
    // Заменяем контент курсов, заявки и настройки сохраняем.
    if ((data.version || 1) < 5) {
      fs.copyFileSync(FILE, FILE.replace(/\.json$/, `.backup-v${data.version || 1}.json`));
      data.courses = def.courses; data.lessons = def.lessons;
      for (const k of ['users', 'sessions', 'otp', 'orders', 'promos', 'certs']) delete data[k];
      data.version = 5;
      flush();
      console.log('[db] курсы и уроки обновлены (версия 5), резервная копия сохранена');
    }
    // v6: простое ценообразование — у курса своя цена, плюс одна месячная подписка на все курсы.
    // Меняем только тарифы; курсы, их цены, заявки и настройки не трогаем.
    if (data.version < 6) {
      fs.copyFileSync(FILE, FILE.replace(/\.json$/, `.backup-v${data.version}.json`));
      data.plans = def.plans;
      data.version = 6;
      flush();
      console.log('[db] тарифы упрощены: одна месячная подписка (версия 6), резервная копия сохранена');
    }
    // v7: правильные ответы в тестах на разных позициях + новый курс «ИИ в Excel, Word и PowerPoint».
    // Остальные курсы, их цены, тарифы, заявки и настройки не трогаем.
    if (data.version < 7) {
      fs.copyFileSync(FILE, FILE.replace(/.json$/, `.backup-v${data.version}.json`));
      const { rebalanceLesson } = require('./quiz-order');
      for (const id of Object.keys(data.lessons || {})) rebalanceLesson(data.lessons[id]);
      const office = require('./seed-office');
      if (!data.courses.some((c) => c.id === office.course.id)) {
        const c = JSON.parse(JSON.stringify(office.course));
        c.order = Math.max(0, ...data.courses.map((x) => x.order || 0)) + 1;
        data.courses.push(c);
      }
      for (const [id, les] of Object.entries(office.lessons)) if (!data.lessons[id]) data.lessons[id] = rebalanceLesson(JSON.parse(JSON.stringify(les)));
      data.version = 7;
      flush();
      console.log('[db] тесты перемешаны, добавлен курс по Office (версия 7), резервная копия сохранена');
    }
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
