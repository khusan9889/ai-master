// 1) В каждом курсе пробные уроки объединяются в один большой вводный урок.
// 2) Программы расширяются до 12–15 уроков, у каждого урока — практическое задание.

const T = (uz, ru, en) => ({ uz, ru, en });
const L = (id, t, task) => ({ id, t: T(...t), task: T(...task), free: false });

// Какие уроки объединяем: [итоговый id, порядок частей, новое название, новое задание]
const MERGE = [
  ['b1', ['b1', 'b2', 'b4'], ['Kirish: SI qanday ishlaydi va qayerda xato qiladi', 'Вводный урок: как работает ИИ и где он ошибается', 'Intro: how AI works and where it fails'],
    ['SI javobidagi gallyutsinatsiyalarni toping', 'Найдите галлюцинации в ответе ИИ', 'Spot the hallucinations in an AI answer']],
  ['p1', ['p1', 'p2', 'p3'], ['Kirish: model qanday fikrlaydi va birinchi topshiriq', 'Вводный урок: как думает модель и первое задание', 'Intro: how the model thinks and your first task'],
    ['Shartnomadan JSON ajratib oladigan prompt yozing', 'Напишите промпт, который достаёт JSON из договора', 'Write a prompt that extracts JSON from a contract']],
  ['w1', ['w1', 'w2'], ['Kirish: assistent tanlash va mijozga javob', 'Вводный урок: выбор ассистента и ответ клиенту', 'Intro: choosing an assistant and replying to a customer'],
    ['Gʻazablangan mijozga ideal javob oling', 'Получите идеальный ответ на жалобу клиента', 'Get the perfect reply to a customer complaint']],
  ['m1', ['m1', 'm2'], ['Kirish: kontent-reja va sotadigan reklama', 'Вводный урок: контент-план и продающая реклама', 'Intro: a content plan and ads that sell'],
    ['Targetga 3 ta tayyor reklama varianti oling', 'Получите 3 готовых варианта рекламы для таргета', 'Get 3 ready-to-run ad variants']],
  ['l1', ['l2', 'l1'], ['Kirish: maʼlumotlar va birinchi model', 'Вводный урок: данные и первая модель', 'Intro: data and your first model'],
    ['Chiziqli modelni qoʻlda oʻqiting', 'Обучите линейную модель руками', 'Train a linear model by hand']],
  ['g1', ['g1', 'g2'], ['Kirish: agent nima va arizalar agenti', 'Вводный урок: что такое агент и агент для заявок', 'Intro: what an agent is and a lead agent'],
    ['Arizalar agentini yigʻing va hujumdan himoyalang', 'Соберите агента заявок и защитите его от атаки', 'Build a lead agent and protect it from attack']]
];

// Новые уроки: курс → [индекс модуля, урок]
const ADD = {
  'agents-everyone': [
    [1, L('a12', ['Sotuvchi uchun agent: tijoriy takliflar', 'Агент для продаж: коммерческие предложения', 'A sales agent: commercial proposals'], ['Mijoz soʻrovidan avtomatik taklif tayyorlang', 'Автоматически готовьте КП по запросу клиента', 'Auto-draft a proposal from a client request'])],
    [1, L('a13', ['Oʻqituvchi uchun agent: uy vazifalarini tekshirish', 'Агент для учителя: проверка домашних заданий', 'A teacher’s agent: checking homework'], ['10 ta ishni mezon boʻyicha tekshiring va izoh yozing', 'Проверьте 10 работ по критериям и напишите отзывы', 'Grade 10 assignments against criteria with feedback'])],
    [2, L('a11', ['Agentlar jamoasi: vazifalarni taqsimlash', 'Команда агентов: распределяем задачи', 'A team of agents: splitting the work'], ['Ikki agentni bitta jarayonda ishlating', 'Запустите двух агентов в одном процессе', 'Run two agents in one workflow'])],
    [2, L('a14', ['Agent samarasini oʻlchash', 'Как измерить пользу агента', 'Measuring an agent’s impact'], ['Bir hafta davomida tejalgan vaqtni hisoblang', 'Посчитайте сэкономленное за неделю время', 'Calculate the time saved over a week'])]
  ],
  'ai-basics': [
    [1, L('b14', ['Oʻz SI-yordamchingizni sozlash', 'Настройка своего ИИ-помощника', 'Setting up your own AI assistant'], ['Shaxsiy yordamchiga doimiy yoʻriqnoma yozing', 'Напишите постоянную инструкцию своему помощнику', 'Write standing instructions for your assistant'])],
    [2, L('b12', ['SI bilan ishlash etikasi', 'Этика работы с ИИ', 'The ethics of working with AI'], ['3 ta munozarali holatni tahlil qiling', 'Разберите 3 спорные ситуации', 'Analyse 3 tricky situations'])],
    [2, L('b13', ['SI va mualliflik huquqi', 'ИИ и авторское право', 'AI and copyright'], ['Qaysi kontentdan erkin foydalanish mumkinligini aniqlang', 'Определите, каким контентом можно пользоваться свободно', 'Work out which content you can use freely'])]
  ],
  'prompt-eng': [
    [1, L('p13', ['Rasmlar uchun promptlar', 'Промпты для изображений', 'Prompts for images'], ['Bitta gʻoyadan 3 xil uslubdagi rasm oling', 'Получите 3 изображения в разных стилях из одной идеи', 'Get 3 images in different styles from one idea'])],
    [1, L('p14', ['Kod uchun promptlar', 'Промпты для кода', 'Prompts for code'], ['Jadvalni qayta ishlaydigan skript yozdiring', 'Попросите модель написать скрипт обработки таблицы', 'Have the model write a spreadsheet-processing script'])],
    [2, L('p12', ['Prompt shablonlari kutubxonasi', 'Библиотека шаблонов промптов', 'A prompt template library'], ['Jamoa uchun 10 ta shablon yigʻing', 'Соберите 10 шаблонов для команды', 'Build 10 templates for your team'])],
    [2, L('p15', ['Promptlarni A/B sinash', 'A/B-тест промптов', 'A/B testing prompts'], ['Ikki promptni 20 ta misolda solishtiring', 'Сравните два промпта на 20 примерах', 'Compare two prompts on 20 examples'])],
    [2, L('p16', ['Xavfsiz promptlar: maxfiy maʼlumotlar', 'Безопасные промпты: конфиденциальные данные', 'Safe prompts: confidential data'], ['Shaxsiy maʼlumotlarni yashiradigan prompt yozing', 'Напишите промпт, который скрывает персональные данные', 'Write a prompt that masks personal data'])]
  ],
  'chatgpt-work': [
    [0, L('w12', ['Pochtani SI bilan boshqarish', 'Управление почтой с ИИ', 'Managing email with AI'], ['50 ta xatni 10 daqiqada saralang', 'Разберите 50 писем за 10 минут', 'Sort 50 emails in 10 minutes'])],
    [1, L('w14', ['SI bilan Excel formulalari', 'Формулы Excel с ИИ', 'Excel formulas with AI'], ['Murakkab hisobot uchun formulalarni yozdiring', 'Получите формулы для сложного отчёта', 'Get formulas for a complex report'])],
    [3, L('w13', ['SI bilan reja va ustuvorliklar', 'Планирование и приоритеты с ИИ', 'Planning and priorities with AI'], ['Haftalik rejangizni Eisenhower matritsasiga joylang', 'Разложите план недели по матрице Эйзенхауэра', 'Sort your week into an Eisenhower matrix'])]
  ],
  'ai-business': [
    [0, L('m12', ['Mijozlar fikrlarini tahlil qilish', 'Анализ отзывов клиентов', 'Analysing customer reviews'], ['100 ta sharhdan 5 ta asosiy muammoni toping', 'Найдите 5 главных проблем в 100 отзывах', 'Find the top 5 issues in 100 reviews'])],
    [1, L('m13', ['SI bilan narx siyosati', 'Ценообразование с ИИ', 'Pricing with AI'], ['Raqobatchilar narxlaridan tavsiya oling', 'Получите рекомендацию по цене на основе конкурентов', 'Get a pricing recommendation from competitors’ prices'])],
    [2, L('m14', ['HR va yollashda SI', 'ИИ в HR и найме', 'AI in HR and hiring'], ['Vakansiya matni va intervyu savollarini tayyorlang', 'Подготовьте текст вакансии и вопросы для интервью', 'Prepare a job ad and interview questions'])]
  ],
  'ml-zero': [
    [1, L('l12', ['Klasterlash: mijozlarni segmentlash', 'Кластеризация: сегментация клиентов', 'Clustering: customer segmentation'], ['Mijozlarni 4 ta segmentga ajrating', 'Разделите клиентов на 4 сегмента', 'Split customers into 4 segments'])],
    [1, L('l16', ['Matn bilan ishlash: sharhlar ohangi', 'Работа с текстом: тональность отзывов', 'Working with text: review sentiment'], ['Sharhlarni ijobiy va salbiyga ajrating', 'Разделите отзывы на позитивные и негативные', 'Classify reviews as positive or negative'])],
    [2, L('l13', ['Vaqt qatorlari: savdo prognozi', 'Временные ряды: прогноз продаж', 'Time series: sales forecasting'], ['Keyingi oy savdosini bashorat qiling', 'Спрогнозируйте продажи на следующий месяц', 'Forecast next month’s sales'])],
    [2, L('l14', ['Tavsiya tizimlari', 'Рекомендательные системы', 'Recommendation systems'], ['Mahsulot tavsiyalarining oddiy tizimini yigʻing', 'Соберите простую систему рекомендаций товаров', 'Build a simple product recommender'])],
    [2, L('l15', ['Modelni API sifatida ishga tushirish', 'Запуск модели как API', 'Serving a model as an API'], ['Modelingizni veb-servisga aylantiring', 'Превратите модель в веб-сервис', 'Turn your model into a web service'])]
  ],
  agents: [
    [0, L('g12', ['Agent xotirasi', 'Память агента', 'Agent memory'], ['Suhbat tarixini eslab qoladigan agent yigʻing', 'Соберите агента, который помнит историю диалога', 'Build an agent that remembers the conversation'])],
    [0, L('g13', ['Koʻp agentli tizimlar', 'Мультиагентные системы', 'Multi-agent systems'], ['Tadqiqotchi va muharrir agentlarni bogʻlang', 'Свяжите агента-исследователя и агента-редактора', 'Connect a researcher agent and an editor agent'])],
    [3, L('g14', ['Monitoring va loglar', 'Мониторинг и логи', 'Monitoring and logs'], ['Agent xatolari uchun ogohlantirish sozlang', 'Настройте оповещения об ошибках агента', 'Set up alerts for agent errors'])],
    [3, L('g15', ['Agent narxini optimallashtirish', 'Оптимизация стоимости агента', 'Optimising agent cost'], ['Soʻrovlar narxini 2 baravar kamaytiring', 'Снизьте стоимость запросов в 2 раза', 'Cut request costs in half'])]
  ]
};

module.exports = function extend(courses, lessons) {
  for (const [target, parts, title, task] of MERGE) {
    const c = courses.find((x) => x.modules.some((m) => m.l.some((l) => l.id === target)));
    // объединяем контент по языкам
    const merged = {};
    for (const lang of ['uz', 'ru', 'en']) {
      merged[lang] = { min: parts.reduce((a, p) => a + (lessons[p]?.[lang]?.min || 0), 0), blocks: parts.flatMap((p) => lessons[p]?.[lang]?.blocks || []) };
    }
    lessons[target] = merged;
    for (const p of parts) if (p !== target) delete lessons[p];
    // в программе курса оставляем один урок
    for (const m of c.modules) m.l = m.l.filter((l) => l.id === target || !parts.includes(l.id));
    const les = c.modules.flatMap((m) => m.l).find((l) => l.id === target);
    les.t = T(...title); les.task = T(...task); les.free = true;
  }
  for (const [cid, list] of Object.entries(ADD)) {
    const c = courses.find((x) => x.id === cid);
    for (const [mi, les] of list) c.modules[mi].l.push(les);
    c.hours = Math.round(c.hours * 1.3);
  }
  // в курсе «Свой ИИ-агент» вводный урок дополняем циклом агента
  const loop = {
    uz: '<h3>Agent sikli</h3><p>Har qanday agent 4 qadamda ishlaydi: <b>kuzatadi</b> (vaziyatni tushunadi), <b>reja tuzadi</b> (keyingi qadamni tanlaydi), <b>harakat qiladi</b> (vositani chaqiradi) va <b>tekshiradi</b> (natija maqsadga yaqinlashtirdimi). Qumdonda aynan shu siklni koʻrasiz.</p>',
    ru: '<h3>Цикл агента</h3><p>Любой агент работает в 4 шага: <b>наблюдает</b> (понимает ситуацию), <b>планирует</b> (выбирает следующий шаг), <b>действует</b> (вызывает инструмент) и <b>проверяет</b> (приблизился ли к цели). В песочнице вы увидите именно этот цикл.</p>',
    en: '<h3>The agent loop</h3><p>Every agent works in 4 steps: it <b>observes</b> (understands the situation), <b>plans</b> (chooses the next step), <b>acts</b> (calls a tool) and <b>checks</b> (did that move it closer to the goal?). You’ll see exactly this loop in the sandbox.</p>'
  };
  for (const lang of ['uz', 'ru', 'en']) {
    const bl = lessons.a1[lang].blocks; const si = bl.findIndex((b) => b.t === 'sandbox');
    bl.splice(si, 0, { t: 'text', html: loop[lang] });
  }
  return { courses, lessons };
};
