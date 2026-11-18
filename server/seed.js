// Начальные данные: курсы и тарифы на трёх языках (uz — по умолчанию, ru, en).
// Загружаются в базу при первом запуске; дальше всё редактируется в админ-панели.

const T = (uz, ru, en) => ({ uz, ru, en });
const L = (id, uz, ru, en, free = false) => ({ id, t: T(uz, ru, en), free });

const courses = [
  {
    id: 'ai-basics', icon: 'cpu', cover: 'c', audience: 'beginner', level: 'beginner', hours: 4, price: 149000,
    rating: 4.8, students: 3120, isNew: false, published: true, order: 1,
    topic: T('Asoslar', 'Основы', 'Basics'),
    title: T('Sunʼiy intellekt noldan', 'ИИ с нуля: основы за вечер', 'AI from scratch'),
    desc: T('Neyrotarmoqlar va til modellari qanday ishlaydi, nimani uddalaydi va qayerda xato qiladi. Kod va formulalarsiz.',
      'Как работают нейросети и языковые модели, что они умеют и где ошибаются. Без кода и формул.',
      'How neural networks and language models work, what they can do and where they fail. No code, no formulas.'),
    outcomes: [
      T('Neyrotarmoq qanday ishlashini tushunish', 'Понимать, как работает нейросеть', 'Understand how a neural network works'),
      T('ChatGPT, Claude va Gemini’dan toʻgʻri foydalanish', 'Правильно пользоваться ChatGPT, Claude и Gemini', 'Use ChatGPT, Claude and Gemini properly'),
      T('SI javoblarini tekshirish va xatolarni sezish', 'Проверять ответы ИИ и замечать ошибки', 'Check AI answers and spot mistakes'),
      T('Shaxsiy maʼlumotlarni xavfsiz saqlash', 'Безопасно обращаться с личными данными', 'Keep personal data safe')
    ],
    modules: [
      { t: T('SI bilan tanishuv', 'Знакомство с ИИ', 'Meet AI'), l: [
        L('b1', 'Sunʼiy intellekt nima', 'Что такое искусственный интеллект', 'What artificial intelligence is', true),
        L('b2', 'Neyrotarmoq qanday ishlaydi', 'Как работает нейросеть', 'How a neural network works', true),
        L('b3', 'Til modellari: ChatGPT, Claude, Gemini', 'Языковые модели: ChatGPT, Claude, Gemini', 'Language models: ChatGPT, Claude, Gemini'),
        L('b4', 'SI qayerda xato qiladi: gallyutsinatsiyalar', 'Где ИИ ошибается: галлюцинации', 'Where AI fails: hallucinations')] },
      { t: T('Hayotda SI', 'ИИ в жизни', 'AI in everyday life'), l: [
        L('b5', 'Qidiruv va oʻqish uchun SI', 'ИИ для поиска и обучения', 'AI for search and learning'),
        L('b6', 'Rasm yaratish', 'Генерация изображений', 'Image generation'),
        L('b7', 'Ovoz va tarjima', 'Голос и перевод', 'Voice and translation'),
        L('b8', 'Telefondagi SI', 'ИИ в телефоне', 'AI on your phone')] },
      { t: T('Xavfsizlik', 'Безопасность', 'Safety'), l: [
        L('b9', 'Shaxsiy maʼlumotlar va SI', 'Личные данные и ИИ', 'Personal data and AI'),
        L('b10', 'SI javoblarini qanday tekshirish', 'Как проверять ответы ИИ', 'How to fact-check AI'),
        L('b11', 'Yakuniy test', 'Итоговый тест', 'Final test')] }
    ]
  },
  {
    id: 'prompt-eng', icon: 'pen', cover: 'a', audience: 'work', level: 'beginner', hours: 6, price: 249000,
    rating: 4.9, students: 1840, isNew: true, seq: false, published: true, order: 2,
    topic: T('Ishda SI', 'ИИ в работе', 'AI at work'),
    title: T('Amaliy prompt-injiniring', 'Промпт-инжиниринг на практике', 'Prompt engineering in practice'),
    desc: T('Barqaror natija beradigan promptlar yozishni oʻrganamiz: rol, format, misollar, tekshiruv. Har bir dars — qumdondagi jonli topshiriq.',
      'Учимся писать промпты, которые стабильно дают нужный результат: роль, формат, примеры, проверка. Каждый урок — живое задание в песочнице.',
      'Learn to write prompts that reliably deliver: role, format, examples, verification. Every lesson is a live sandbox task.'),
    outcomes: [
      T('Rol, format va misollar bilan prompt yozish', 'Писать промпты с ролью, форматом и примерами', 'Write prompts with role, format and examples'),
      T('Hujjatlardan maʼlumotni JSON’ga ajratib olish', 'Извлекать данные из документов в JSON', 'Extract data from documents into JSON'),
      T('Model javoblarini tekshirish va yaxshilash', 'Проверять и улучшать ответы модели', 'Check and improve model answers'),
      T('Jamoa uchun prompt shablonlari yaratish', 'Собирать шаблоны промптов для команды', 'Build prompt templates for your team')
    ],
    modules: [
      { t: T('Model qanday fikrlaydi', 'Как думает модель', 'How the model thinks'), l: [
        L('p1', 'Til modellari qanday tuzilgan', 'Как устроены языковые модели', 'How language models work', true),
        L('p2', 'Yaxshi prompt anatomiyasi', 'Анатомия хорошего промпта', 'Anatomy of a good prompt', true),
        L('p3', 'Topshiriq: shartnomadan maʼlumot', 'Задание: данные из договора', 'Task: data from a contract', true)] },
      { t: T('Usullar', 'Техники', 'Techniques'), l: [
        L('p5', 'Rol va kontekst', 'Роль и контекст', 'Role and context'),
        L('p6', 'Promptdagi misollar (few-shot)', 'Примеры в промпте (few-shot)', 'Examples in a prompt (few-shot)'),
        L('p7', 'Bosqichma-bosqich fikrlash', 'Пошаговое рассуждение', 'Step-by-step reasoning'),
        L('p8', 'Javob formati: jadval va JSON', 'Формат ответа: таблицы и JSON', 'Answer format: tables and JSON')] },
      { t: T('Amaliyot', 'Практика', 'Practice'), l: [
        L('p9', 'Xat va hisobotlar uchun promptlar', 'Промпты для писем и отчётов', 'Prompts for emails and reports'),
        L('p10', 'Hujjatlarni tahlil qilish', 'Анализ документов', 'Document analysis'),
        L('p11', 'Model javobini yaxshilash', 'Улучшение ответов модели', 'Improving model answers')] },
      { t: T('Yakun', 'Финал', 'Final'), l: [
        L('p4', 'Yakuniy test', 'Итоговый тест', 'Final test')] }
    ]
  },
  {
    id: 'chatgpt-work', icon: 'msg', cover: 'b', audience: 'work', level: 'beginner', hours: 7, price: 299000,
    rating: 4.8, students: 2410, isNew: false, published: true, order: 3,
    topic: T('Ishda SI', 'ИИ в работе', 'AI at work'),
    title: T('Ish uchun ChatGPT, Claude va Gemini', 'ChatGPT, Claude и Gemini для работы', 'ChatGPT, Claude and Gemini for work'),
    desc: T('SI-assistentlar yordamida xatlar, hisobotlar, jadvallar va taqdimotlar. Kod bilmaydigan ofis mutaxassislari uchun.',
      'Письма, отчёты, таблицы и презентации с помощью ИИ-ассистентов. Для офисных специалистов без кода.',
      'Emails, reports, spreadsheets and slides with AI assistants. For office professionals, no code.'),
    outcomes: [
      T('Xat va hisobotlarni bir necha daqiqada tayyorlash', 'Готовить письма и отчёты за минуты', 'Draft emails and reports in minutes'),
      T('Jadval va hujjatlar bilan SI orqali ishlash', 'Работать с таблицами и документами через ИИ', 'Work with spreadsheets and documents via AI'),
      T('Vazifaga mos assistentni tanlash', 'Выбирать ассистента под задачу', 'Pick the right assistant for the job')
    ],
    modules: [
      { t: T('Assistentlar', 'Ассистенты', 'Assistants'), l: [
        L('w1', 'Vazifaga mos assistentni tanlaymiz', 'Выбираем ассистента под задачу', 'Choosing the right assistant', true),
        L('w2', 'Xat va hisobotlar bir necha daqiqada', 'Письма и отчёты за минуты', 'Emails and reports in minutes', true),
        L('w4', 'Assistentni oʻzingizga moslash', 'Настройка ассистента под себя', 'Customising your assistant')] },
      { t: T('Hujjatlar va maʼlumotlar', 'Документы и данные', 'Documents and data'), l: [
        L('w3', 'Jadvallar va maʼlumotlar tahlili', 'Таблицы и анализ данных', 'Spreadsheets and data analysis'),
        L('w5', 'Uchrashuv qaydlari va bayonnomalar', 'Конспекты встреч и протоколы', 'Meeting notes and minutes'),
        L('w6', 'PDF va shartnomalar bilan ishlash', 'Работа с PDF и договорами', 'Working with PDFs and contracts')] },
      { t: T('Kontent', 'Контент', 'Content'), l: [
        L('w7', 'SI bilan taqdimotlar', 'Презентации с ИИ', 'Presentations with AI'),
        L('w8', 'Tarjima va moslashtirish', 'Переводы и локализация', 'Translation and localisation'),
        L('w9', 'Ish uchun rasmlar', 'Изображения для работы', 'Images for work')] },
      { t: T('Tizim', 'Система', 'System'), l: [
        L('w10', 'Jamoa uchun prompt shablonlari', 'Шаблоны промптов для команды', 'Prompt templates for the team'),
        L('w11', 'Yakuniy loyiha', 'Итоговый проект', 'Final project')] }
    ]
  },
  {
    id: 'ai-business', icon: 'trend', cover: 'f', audience: 'business', level: 'intermediate', hours: 8, price: 349000,
    rating: 4.7, students: 960, isNew: false, published: true, order: 4,
    topic: T('Biznes', 'Бизнес', 'Business'),
    title: T('Biznes va marketing uchun SI', 'ИИ для бизнеса и маркетинга', 'AI for business and marketing'),
    desc: T('SI bilan kontent, savdo va mijozlarni qoʻllab-quvvatlash: kontent-rejadan Telegram chat-botigacha.',
      'Контент, продажи и поддержка клиентов с ИИ: от контент-плана до чат-бота для Telegram.',
      'Content, sales and customer support with AI: from a content plan to a Telegram chatbot.'),
    outcomes: [
      T('SI bilan kontent-reja va matnlar tayyorlash', 'Собирать контент-план и тексты с ИИ', 'Build a content plan and copy with AI'),
      T('Mijozlarga javoblarni avtomatlashtirish', 'Автоматизировать ответы клиентам', 'Automate customer replies'),
      T('SI joriy etish iqtisodini hisoblash', 'Считать экономику внедрения ИИ', 'Calculate the ROI of AI adoption')
    ],
    modules: [
      { t: T('Marketing', 'Маркетинг', 'Marketing'), l: [
        L('m1', 'Bir soatda kontent-reja', 'Контент-план за час', 'A content plan in one hour', true),
        L('m2', 'Reklama matnlari', 'Тексты для рекламы', 'Ad copy', true),
        L('m4', 'Raqobatchilar tahlili', 'Анализ конкурентов', 'Competitor analysis'),
        L('m5', 'Ijtimoiy tarmoqlar uchun vizuallar', 'Визуалы для соцсетей', 'Social media visuals')] },
      { t: T('Savdo', 'Продажи', 'Sales'), l: [
        L('m3', 'Savdo boʻlimida SI', 'ИИ в отделе продаж', 'AI in the sales team'),
        L('m6', 'Skriptlar va eʼtirozlarga javob', 'Скрипты и ответы на возражения', 'Scripts and objection handling'),
        L('m7', 'Mijozlar uchun chat-bot', 'Чат-бот для клиентов', 'A chatbot for customers')] },
      { t: T('Boshqaruv', 'Управление', 'Management'), l: [
        L('m8', 'Tahlil va hisobotlar', 'Аналитика и отчёты', 'Analytics and reports'),
        L('m9', 'SI joriy etish iqtisodi', 'Экономика внедрения ИИ', 'The economics of AI adoption'),
        L('m10', 'Xatarlar va foydalanish siyosati', 'Риски и политика использования', 'Risks and usage policy'),
        L('m11', 'Kompaniyada joriy etish rejasi', 'План внедрения в компании', 'A company rollout plan')] }
    ]
  },
  {
    id: 'ml-zero', icon: 'chart', cover: 'd', audience: 'dev', level: 'intermediate', hours: 14, price: 449000,
    rating: 4.8, students: 720, isNew: true, published: true, order: 5,
    topic: T('Dasturlash', 'Разработка', 'Development'),
    title: T('Mashinali oʻqitish noldan', 'Машинное обучение с нуля', 'Machine learning from zero'),
    desc: T('Python’da ML asoslari: regressiya, klassifikatsiya, modellarni baholash. Formulalarni oddiy tilda tushuntiramiz.',
      'Основы ML на Python: регрессия, классификация, оценка моделей. Формулы объясняем на пальцах.',
      'ML basics in Python: regression, classification, model evaluation. Formulas explained in plain words.'),
    outcomes: [
      T('Model maʼlumotdan qanday oʻrganishini tushunish', 'Понимать, как модель учится на данных', 'Understand how a model learns from data'),
      T('Python’da birinchi modelni oʻqitish', 'Обучить первую модель на Python', 'Train your first model in Python'),
      T('Model sifatini baholash', 'Оценивать качество модели', 'Evaluate model quality')
    ],
    modules: [
      { t: T('Asoslar', 'Основы', 'Foundations'), l: [
        L('l1', 'Chiziqli regressiya oddiy tilda', 'Линейная регрессия на пальцах', 'Linear regression in plain words', true),
        L('l2', 'Maʼlumotlar va belgilar', 'Данные и признаки', 'Data and features', true),
        L('l4', 'Gradient tushish', 'Градиентный спуск', 'Gradient descent')] },
      { t: T('Modellar', 'Модели', 'Models'), l: [
        L('l3', 'Klassifikatsiya', 'Классификация', 'Classification'),
        L('l5', 'Qaror daraxtlari', 'Деревья решений', 'Decision trees'),
        L('l6', 'Model sifatini baholash', 'Оценка качества модели', 'Evaluating a model'),
        L('l7', 'Qayta oʻqitish va undan qochish', 'Переобучение и как его избежать', 'Overfitting and how to avoid it')] },
      { t: T('Amaliyot', 'Практика', 'Practice'), l: [
        L('l8', 'ML uchun Python va pandas', 'Python и pandas для ML', 'Python and pandas for ML'),
        L('l9', 'Birinchi loyiha: narx prognozi', 'Первый проект: прогноз цен', 'First project: price prediction'),
        L('l10', 'Neyrotarmoqlar: birinchi qadam', 'Нейросети: первый шаг', 'Neural networks: first step'),
        L('l11', 'Yakuniy loyiha', 'Итоговый проект', 'Final project')] }
    ]
  },
  {
    id: 'agents', icon: 'bot', cover: 'e', audience: 'dev', level: 'advanced', hours: 10, price: 449000,
    rating: 4.9, students: 530, isNew: true, published: true, order: 6,
    topic: T('Dasturlash', 'Разработка', 'Development'),
    title: T('SI-agentlar va avtomatlashtirish', 'ИИ-агенты и автоматизация', 'AI agents and automation'),
    desc: T('Agentlar va avtomatlashtirishlarni yigʻamiz: n8n, Telegram-botlar, bilimlar bazasi bilan ishlash (RAG).',
      'Собираем агентов и автоматизации: n8n, Telegram-боты, работа с базой знаний (RAG).',
      'Build agents and automations: n8n, Telegram bots, knowledge-base retrieval (RAG).'),
    outcomes: [
      T('Bilimlar bazasiga ega bot yigʻish', 'Собрать бота с базой знаний', 'Build a bot with a knowledge base'),
      T('SI’ni jadval va messenjerlar bilan bogʻlash', 'Связать ИИ с таблицами и мессенджерами', 'Connect AI to spreadsheets and messengers'),
      T('Botlarni prompt-inyeksiyalardan himoyalash', 'Защищать ботов от промпт-инъекций', 'Protect bots from prompt injection')
    ],
    modules: [
      { t: T('Agentlar', 'Агенты', 'Agents'), l: [
        L('g1', 'SI-agent nima', 'Что такое ИИ-агент', 'What an AI agent is', true),
        L('g2', 'Agent vositalari va harakatlari', 'Инструменты и действия агента', 'Agent tools and actions', true),
        L('g4', 'Agent qanday reja tuzadi', 'Как агент планирует', 'How an agent plans')] },
      { t: T('Bilimlar bazasi', 'Базы знаний', 'Knowledge bases'), l: [
        L('g3', 'RAG: hujjatlar boʻyicha bot', 'RAG: бот по документам', 'RAG: a bot over your documents'),
        L('g5', 'Vektorli qidiruv oddiy tilda', 'Векторный поиск простыми словами', 'Vector search in plain words'),
        L('g6', 'Hujjatlarni tayyorlash', 'Подготовка документов', 'Preparing documents')] },
      { t: T('Avtomatlashtirish', 'Автоматизация', 'Automation'), l: [
        L('g7', 'n8n’da avtomatlashtirish', 'Автоматизация в n8n', 'Automation in n8n'),
        L('g8', 'SI bilan Telegram-bot', 'Telegram-бот с ИИ', 'A Telegram bot with AI'),
        L('g9', 'Jadval va CRM bilan integratsiya', 'Интеграция с таблицами и CRM', 'Spreadsheet and CRM integration')] },
      { t: T('Xavfsizlik', 'Безопасность', 'Security'), l: [
        L('g10', 'Prompt-inyeksiyalar va himoya', 'Промпт-инъекции и защита', 'Prompt injection and defence'),
        L('g11', 'Yakuniy loyiha', 'Итоговый проект', 'Final project')] }
    ]
  }
];

const plans = [
  { id: 'sub1', months: 1, price: 149000, best: false },
  { id: 'sub3', months: 3, price: 399000, best: true },
  { id: 'sub12', months: 12, price: 1290000, best: false }
];

const lessons = require('./seed-lessons');

module.exports = { courses, lessons, plans };
