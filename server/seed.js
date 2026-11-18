// Начальные данные: курсы и тарифы на трёх языках (uz — по умолчанию, ru, en).
// У каждого урока есть практическое задание (task). Загружаются при первом запуске,
// дальше всё редактируется в админ-панели.

const T = (uz, ru, en) => ({ uz, ru, en });
// L(id, [название uz, ru, en], [задание uz, ru, en], бесплатный?)
const L = (id, t, task, free = false) => ({ id, t: T(...t), task: T(...task), free });

const courses = [
  {
    id: 'agents-everyone', icon: 'bot', cover: 'g', audience: 'work', level: 'beginner', hours: 8, price: 299000,
    rating: 4.9, students: 1290, isNew: true, published: true, order: 1,
    topic: T('SI-agentlar', 'ИИ-агенты', 'AI agents'),
    title: T('Shaxsiy SI-agent: ishni kodsiz avtomatlashtiring', 'Свой ИИ-агент: автоматизация работы без кода', 'Your own AI agent: automate work without code'),
    desc: T('10 darsda istalgan kasb uchun ishlaydigan agent yigʻasiz: pochta, arizalar, uchrashuvlar va hisobotlar. Kod kerak emas — har darsda real vazifa.',
      'За 10 уроков соберёте агента, который работает в любой профессии: почта, заявки, встречи и отчёты. Без кода — в каждом уроке реальная задача.',
      'In 10 lessons you’ll build an agent that works in any job: email, leads, meetings and reports. No code — a real task in every lesson.'),
    outcomes: [
      T('Oʻz ishingiz uchun SI-agent yigʻish', 'Собрать ИИ-агента под свою работу', 'Build an AI agent for your own work'),
      T('Agentni pochta, jadval va Telegram bilan bogʻlash', 'Подключить агента к почте, таблицам и Telegram', 'Connect the agent to email, spreadsheets and Telegram'),
      T('Agentga qoidalar va chegaralar berish', 'Задать агенту правила и границы', 'Give the agent rules and boundaries'),
      T('Kuniga 1–2 soat rutinani tejash', 'Экономить 1–2 часа рутины в день', 'Save 1–2 hours of routine a day')
    ],
    modules: [
      { t: T('Agent asoslari', 'Основы агентов', 'Agent basics'), l: [
        L('a1', ['10 daqiqada agent: kiruvchi xatlarni saralash', 'Агент за 10 минут: разбор входящих писем', 'An agent in 10 minutes: sorting your inbox'], ['Qumdonda pochta agentini yigʻing va 3 ta xatda sinang', 'Соберите в песочнице почтового агента и проверьте на 3 письмах', 'Build an email agent in the sandbox and test it on 3 emails'], true),
        L('a2', ['Agent yoʻriqnomasi: rol, qoidalar, chegaralar', 'Инструкция агента: роль, правила, границы', 'Agent instructions: role, rules, limits'], ['Oʻz vazifangiz uchun agentga 7 ta qoida yozing', 'Напишите 7 правил для агента под свою задачу', 'Write 7 rules for an agent for your task']),
        L('a3', ['Vositalar: pochta, jadval, kalendar', 'Инструменты: почта, таблицы, календарь', 'Tools: email, spreadsheets, calendar'], ['Agentga 3 ta vosita ulang va ruxsatlarni sozlang', 'Подключите агенту 3 инструмента и настройте права', 'Connect 3 tools to the agent and set permissions'])] },
      { t: T('Har qanday ish uchun agentlar', 'Агенты для любой работы', 'Agents for any job'), l: [
        L('a4', ['Kotib-agent: uchrashuvlar va eslatmalar', 'Агент-секретарь: встречи и напоминания', 'Secretary agent: meetings and reminders'], ['Ertangi uchrashuvlar boʻyicha eslatmalarni avtomatlashtiring', 'Автоматизируйте напоминания о встречах на завтра', 'Automate reminders for tomorrow’s meetings']),
        L('a5', ['Telegram’da mijoz arizalari uchun agent', 'Агент для заявок клиентов в Telegram', 'An agent for customer leads in Telegram'], ['Arizalarni jadvalga yozadigan bot yigʻing', 'Соберите бота, который записывает заявки в таблицу', 'Build a bot that logs leads into a spreadsheet']),
        L('a6', ['Tahlilchi-agent: har tongda jadvaldan hisobot', 'Агент-аналитик: отчёт из таблицы каждое утро', 'Analyst agent: a morning report from a spreadsheet'], ['Savdo jadvalidan kunlik xulosa tayyorlang', 'Получите ежедневную сводку из таблицы продаж', 'Get a daily summary from a sales spreadsheet']),
        L('a7', ['HR uchun agent: rezyumelarni dastlabki saralash', 'Агент для HR: первичный отбор резюме', 'An HR agent: first-pass CV screening'], ['10 ta rezyumeni mezonlar boʻyicha baholang', 'Оцените 10 резюме по критериям вакансии', 'Score 10 CVs against the job criteria'])] },
      { t: T('Ishga tushirish', 'Запуск', 'Launch'), l: [
        L('a8', ['Kodsiz: agentni n8n yoki Make’da yigʻamiz', 'Без кода: собираем агента в n8n или Make', 'No code: building the agent in n8n or Make'], ['Agentni real servisda ishga tushiring', 'Запустите агента в реальном сервисе', 'Launch the agent on a real service']),
        L('a9', ['Xavfsizlik: agentga nimani ishonmaslik kerak', 'Безопасность: что нельзя доверять агенту', 'Safety: what not to trust an agent with'], ['Agentingizni 5 ta “hiyla” xatda sinang', 'Проверьте агента на 5 «провокационных» письмах', 'Test your agent on 5 “tricky” messages']),
        L('a10', ['Yakuniy loyiha: ishingiz uchun agent', 'Итоговый проект: агент для вашей работы', 'Final project: an agent for your job'], ['Haqiqiy vazifa uchun agent yigʻing va natijani oʻlchang', 'Соберите агента для реальной задачи и измерьте эффект', 'Build an agent for a real task and measure the effect'])] }
    ]
  },
  {
    id: 'ai-basics', icon: 'cpu', cover: 'c', audience: 'beginner', level: 'beginner', hours: 4, price: 149000,
    rating: 4.8, students: 3120, isNew: false, published: true, order: 2,
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
        L('b1', ['Sunʼiy intellekt nima', 'Что такое искусственный интеллект', 'What artificial intelligence is'], ['Har kuni foydalanadigan 5 ta SI-xizmatni toping', 'Найдите 5 ИИ-сервисов, которыми пользуетесь каждый день', 'Find 5 AI services you use every day'], true),
        L('b4', ['SI qayerda xato qiladi: gallyutsinatsiyalarni toping', 'Где ИИ ошибается: найдите галлюцинации', 'Where AI fails: spot the hallucinations'], ['Qumdonda SI javobidagi notoʻgʻri faktlarni toping', 'Найдите в песочнице ложные факты в ответе ИИ', 'Find the false facts in an AI answer in the sandbox'], true),
        L('b2', ['Neyrotarmoq qanday ishlaydi', 'Как работает нейросеть', 'How a neural network works'], ['Doʻstingizga 3 jumlada tushuntiring', 'Объясните другу в 3 предложениях', 'Explain it to a friend in 3 sentences'], true),
        L('b3', ['Til modellari: ChatGPT, Claude, Gemini', 'Языковые модели: ChatGPT, Claude, Gemini', 'Language models: ChatGPT, Claude, Gemini'], ['Bitta savolni 3 ta modelga bering va solishtiring', 'Задайте один вопрос трём моделям и сравните', 'Ask three models the same question and compare'])] },
      { t: T('Hayotda SI', 'ИИ в жизни', 'AI in everyday life'), l: [
        L('b5', ['Qidiruv va oʻqish uchun SI', 'ИИ для поиска и обучения', 'AI for search and learning'], ['SI bilan yangi mavzu boʻyicha konspekt tuzing', 'Составьте с ИИ конспект по новой теме', 'Make study notes on a new topic with AI']),
        L('b6', ['Rasm yaratish', 'Генерация изображений', 'Image generation'], ['Ijtimoiy tarmoq uchun 3 ta rasm yarating', 'Создайте 3 картинки для соцсетей', 'Create 3 images for social media']),
        L('b7', ['Ovoz va tarjima', 'Голос и перевод', 'Voice and translation'], ['Audio xabarni matnga va boshqa tilga oʻgiring', 'Переведите голосовое сообщение в текст и на другой язык', 'Turn a voice message into text and another language']),
        L('b8', ['Telefondagi SI', 'ИИ в телефоне', 'AI on your phone'], ['Telefoningizda 3 ta foydali SI-funksiyani sozlang', 'Настройте 3 полезные ИИ-функции на телефоне', 'Set up 3 useful AI features on your phone'])] },
      { t: T('Xavfsizlik', 'Безопасность', 'Safety'), l: [
        L('b9', ['Shaxsiy maʼlumotlar va SI', 'Личные данные и ИИ', 'Personal data and AI'], ['Xavfli soʻrovlarni xavfsiz shaklga keltiring', 'Перепишите опасные запросы в безопасном виде', 'Rewrite risky requests in a safe form']),
        L('b10', ['SI javoblarini qanday tekshirish', 'Как проверять ответы ИИ', 'How to fact-check AI'], ['3 ta faktni ishonchli manbalar orqali tekshiring', 'Проверьте 3 факта по надёжным источникам', 'Verify 3 facts against reliable sources']),
        L('b11', ['Yakuniy test', 'Итоговый тест', 'Final test'], ['10 ta savolga javob bering va sertifikat oling', 'Ответьте на 10 вопросов и получите сертификат', 'Answer 10 questions and get a certificate'])] }
    ]
  },
  {
    id: 'prompt-eng', icon: 'pen', cover: 'a', audience: 'work', level: 'beginner', hours: 6, price: 249000,
    rating: 4.9, students: 1840, isNew: false, published: true, order: 3,
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
        L('p1', ['Til modellari qanday tuzilgan', 'Как устроены языковые модели', 'How language models work'], ['Matnning taxminiy token sonini hisoblang', 'Оцените, сколько токенов в вашем тексте', 'Estimate how many tokens your text has'], true),
        L('p2', ['Yaxshi prompt anatomiyasi', 'Анатомия хорошего промпта', 'Anatomy of a good prompt'], ['Yomon promptni 4 qismli promptga aylantiring', 'Превратите слабый промпт в промпт из 4 частей', 'Turn a weak prompt into a four-part prompt'], true),
        L('p3', ['Topshiriq: shartnomadan maʼlumot', 'Задание: данные из договора', 'Task: data from a contract'], ['Shartnomadan JSON ajratib oladigan prompt yozing', 'Напишите промпт, который достаёт JSON из договора', 'Write a prompt that extracts JSON from a contract'], true)] },
      { t: T('Usullar', 'Техники', 'Techniques'), l: [
        L('p5', ['Rol va kontekst', 'Роль и контекст', 'Role and context'], ['Bitta vazifani 3 xil rol bilan sinang', 'Решите одну задачу с тремя разными ролями', 'Solve one task with three different roles']),
        L('p6', ['Promptdagi misollar (few-shot)', 'Примеры в промпте (few-shot)', 'Examples in a prompt (few-shot)'], ['Mijoz xatlarini 2 ta misol bilan tasniflang', 'Классифицируйте письма клиентов с 2 примерами', 'Classify customer emails with 2 examples']),
        L('p7', ['Bosqichma-bosqich fikrlash', 'Пошаговое рассуждение', 'Step-by-step reasoning'], ['Murakkab hisob-kitobni bosqichlarga boʻling', 'Разбейте сложный расчёт на шаги', 'Break a complex calculation into steps']),
        L('p8', ['Javob formati: jadval va JSON', 'Формат ответа: таблицы и JSON', 'Answer format: tables and JSON'], ['Narxlar roʻyxatidan solishtirma jadval oling', 'Получите сравнительную таблицу из прайс-листа', 'Get a comparison table from a price list'])] },
      { t: T('Amaliyot', 'Практика', 'Practice'), l: [
        L('p9', ['Xat va hisobotlar uchun promptlar', 'Промпты для писем и отчётов', 'Prompts for emails and reports'], ['Haftalik hisobot uchun shablon yarating', 'Сделайте шаблон еженедельного отчёта', 'Create a weekly report template']),
        L('p10', ['Hujjatlarni tahlil qilish', 'Анализ документов', 'Document analysis'], ['20 betlik hujjatdan 5 ta xatarni toping', 'Найдите 5 рисков в документе на 20 страниц', 'Find 5 risks in a 20-page document']),
        L('p11', ['Model javobini yaxshilash', 'Улучшение ответов модели', 'Improving model answers'], ['Model javobini 3 iteratsiyada yaxshilang', 'Улучшите ответ модели за 3 итерации', 'Improve a model answer in 3 iterations'])] },
      { t: T('Yakun', 'Финал', 'Final'), l: [
        L('p4', ['Yakuniy test', 'Итоговый тест', 'Final test'], ['Promptingizni yashirin maʼlumotlarda sinang', 'Проверьте промпт на скрытых данных', 'Test your prompt on hidden data'])] }
    ]
  },
  {
    id: 'chatgpt-work', icon: 'msg', cover: 'b', audience: 'work', level: 'beginner', hours: 7, price: 299000,
    rating: 4.8, students: 2410, isNew: false, published: true, order: 4,
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
        L('w1', ['Vazifaga mos assistentni tanlaymiz', 'Выбираем ассистента под задачу', 'Choosing the right assistant'], ['Bitta ish vazifasini 3 assistentda sinang', 'Проверьте одну рабочую задачу в 3 ассистентах', 'Try one work task in 3 assistants'], true),
        L('w2', ['Gʻazablangan mijozga javob', 'Ответ рассерженному клиенту', 'Replying to an angry customer'], ['Qumdonda mijoz shikoyatiga ideal javob oling', 'Получите в песочнице идеальный ответ на жалобу', 'Get the perfect reply to a complaint in the sandbox'], true),
        L('w4', ['Assistentni oʻzingizga moslash', 'Настройка ассистента под себя', 'Customising your assistant'], ['Lavozimingiz uchun doimiy yoʻriqnoma yozing', 'Напишите постоянную инструкцию под свою должность', 'Write standing instructions for your role'])] },
      { t: T('Hujjatlar va maʼlumotlar', 'Документы и данные', 'Documents and data'), l: [
        L('w3', ['Jadvallar va maʼlumotlar tahlili', 'Таблицы и анализ данных', 'Spreadsheets and data analysis'], ['Savdo jadvalidan 3 ta xulosa chiqaring', 'Сделайте 3 вывода из таблицы продаж', 'Draw 3 insights from a sales sheet']),
        L('w5', ['Uchrashuv qaydlari va bayonnomalar', 'Конспекты встреч и протоколы', 'Meeting notes and minutes'], ['Uchrashuv yozuvidan vazifalar roʻyxatini oling', 'Получите список задач из записи встречи', 'Get an action list from a meeting transcript']),
        L('w6', ['PDF va shartnomalar bilan ishlash', 'Работа с PDF и договорами', 'Working with PDFs and contracts'], ['Shartnomadagi xavfli bandlarni toping', 'Найдите опасные пункты в договоре', 'Find risky clauses in a contract'])] },
      { t: T('Kontent', 'Контент', 'Content'), l: [
        L('w7', ['SI bilan taqdimotlar', 'Презентации с ИИ', 'Presentations with AI'], ['10 slaydli taqdimot tuzilmasini yarating', 'Соберите структуру презентации на 10 слайдов', 'Build a 10-slide presentation outline']),
        L('w8', ['Tarjima va moslashtirish', 'Переводы и локализация', 'Translation and localisation'], ['Matnni 3 tilga ohangni saqlab tarjima qiling', 'Переведите текст на 3 языка с сохранением тона', 'Translate a text into 3 languages keeping the tone']),
        L('w9', ['Ish uchun rasmlar', 'Изображения для работы', 'Images for work'], ['Taqdimot uchun 3 ta illyustratsiya yarating', 'Создайте 3 иллюстрации для презентации', 'Create 3 illustrations for a presentation'])] },
      { t: T('Tizim', 'Система', 'System'), l: [
        L('w10', ['Rutina uchun agent', 'Агент для рутины', 'An agent for your routine'], ['Takrorlanadigan vazifani agentga topshiring', 'Передайте агенту повторяющуюся задачу', 'Hand a repetitive task to an agent']),
        L('w11', ['Yakuniy loyiha', 'Итоговый проект', 'Final project'], ['Haftangizdan 3 soatni tejaydigan tizim yigʻing', 'Соберите систему, которая экономит 3 часа в неделю', 'Build a system that saves 3 hours a week'])] }
    ]
  },
  {
    id: 'ai-business', icon: 'trend', cover: 'f', audience: 'business', level: 'intermediate', hours: 8, price: 349000,
    rating: 4.7, students: 960, isNew: false, published: true, order: 5,
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
        L('m1', ['Bir soatda kontent-reja', 'Контент-план за час', 'A content plan in one hour'], ['Biznesingiz uchun 4 haftalik reja tuzing', 'Составьте план на 4 недели для своего бизнеса', 'Make a 4-week plan for your business'], true),
        L('m2', ['Sotadigan reklama matnlari', 'Рекламные тексты, которые продают', 'Ad copy that sells'], ['Qumdonda targetga 3 ta tayyor variant oling', 'Получите в песочнице 3 готовых варианта для таргета', 'Get 3 ready-to-run ad variants in the sandbox'], true),
        L('m4', ['Raqobatchilar tahlili', 'Анализ конкурентов', 'Competitor analysis'], ['3 ta raqobatchining kuchli va zaif tomonlari jadvali', 'Таблица сильных и слабых сторон 3 конкурентов', 'A strengths/weaknesses table for 3 competitors']),
        L('m5', ['Ijtimoiy tarmoqlar uchun vizuallar', 'Визуалы для соцсетей', 'Social media visuals'], ['Bir postga 3 xil vizual yarating', 'Сделайте 3 визуала для одного поста', 'Make 3 visuals for one post'])] },
      { t: T('Savdo', 'Продажи', 'Sales'), l: [
        L('m3', ['Savdo boʻlimida SI', 'ИИ в отделе продаж', 'AI in the sales team'], ['Qoʻngʻiroq yozuvidan xatolarni toping', 'Найдите ошибки менеджера в записи звонка', 'Find a rep’s mistakes in a call transcript']),
        L('m6', ['Skriptlar va eʼtirozlarga javob', 'Скрипты и ответы на возражения', 'Scripts and objection handling'], ['“Qimmat” eʼtiroziga 5 ta javob tayyorlang', 'Подготовьте 5 ответов на «дорого»', 'Prepare 5 answers to “too expensive”']),
        L('m7', ['Mijozlar uchun chat-bot', 'Чат-бот для клиентов', 'A chatbot for customers'], ['Telegram uchun javoblar bazasini yigʻing', 'Соберите базу ответов для Telegram-бота', 'Build an answer base for a Telegram bot'])] },
      { t: T('Boshqaruv', 'Управление', 'Management'), l: [
        L('m8', ['Tahlil va hisobotlar', 'Аналитика и отчёты', 'Analytics and reports'], ['Oylik hisobotdan rahbar uchun xulosa oling', 'Получите выжимку месячного отчёта для руководителя', 'Get a manager’s summary of a monthly report']),
        L('m9', ['SI joriy etish iqtisodi', 'Экономика внедрения ИИ', 'The economics of AI adoption'], ['Bir jarayon uchun tejamni hisoblang', 'Посчитайте экономию для одного процесса', 'Calculate savings for one process']),
        L('m10', ['Xatarlar va foydalanish siyosati', 'Риски и политика использования', 'Risks and usage policy'], ['Kompaniya uchun SI qoidalarini yozing', 'Напишите правила работы с ИИ для компании', 'Write AI usage rules for the company']),
        L('m11', ['Kompaniyada joriy etish rejasi', 'План внедрения в компании', 'A company rollout plan'], ['90 kunlik joriy etish rejasini tuzing', 'Составьте план внедрения на 90 дней', 'Draft a 90-day rollout plan'])] }
    ]
  },
  {
    id: 'ml-zero', icon: 'chart', cover: 'd', audience: 'dev', level: 'intermediate', hours: 14, price: 449000,
    rating: 4.8, students: 720, isNew: false, published: true, order: 6,
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
        L('l1', ['Chiziqli regressiya: modelni qoʻlda oʻqiting', 'Линейная регрессия: обучите модель руками', 'Linear regression: train a model by hand'], ['Qumdonda chiziqni nuqtalarga moslang', 'Подберите в песочнице прямую под точки', 'Fit a line to the points in the sandbox'], true),
        L('l2', ['Maʼlumotlar va belgilar', 'Данные и признаки', 'Data and features'], ['Kvartiralar jadvalida belgi va nishonni ajrating', 'Разметьте признаки и цель в таблице квартир', 'Label features and target in a flats table'], true),
        L('l4', ['Gradient tushish', 'Градиентный спуск', 'Gradient descent'], ['3 qadam gradient tushishni qoʻlda hisoblang', 'Посчитайте вручную 3 шага градиентного спуска', 'Compute 3 gradient descent steps by hand'])] },
      { t: T('Modellar', 'Модели', 'Models'), l: [
        L('l3', ['Klassifikatsiya', 'Классификация', 'Classification'], ['Spam xatlar klassifikatorini oʻqiting', 'Обучите классификатор спам-писем', 'Train a spam email classifier']),
        L('l5', ['Qaror daraxtlari', 'Деревья решений', 'Decision trees'], ['Kredit qaroriga daraxt quring', 'Постройте дерево для решения по кредиту', 'Build a tree for a loan decision']),
        L('l6', ['Model sifatini baholash', 'Оценка качества модели', 'Evaluating a model'], ['Ikki modelni aniqlik va toʻliqlik boʻyicha solishtiring', 'Сравните две модели по точности и полноте', 'Compare two models by precision and recall']),
        L('l7', ['Qayta oʻqitish va undan qochish', 'Переобучение и как его избежать', 'Overfitting and how to avoid it'], ['Qayta oʻqitilgan modelni toping va tuzating', 'Найдите и исправьте переобученную модель', 'Find and fix an overfitted model'])] },
      { t: T('Amaliyot', 'Практика', 'Practice'), l: [
        L('l8', ['ML uchun Python va pandas', 'Python и pandas для ML', 'Python and pandas for ML'], ['Haqiqiy maʼlumotlar toʻplamini tozalang', 'Очистите реальный набор данных', 'Clean a real dataset']),
        L('l9', ['Birinchi loyiha: narx prognozi', 'Первый проект: прогноз цен', 'First project: price prediction'], ['Toshkent kvartiralari narxini bashorat qiling', 'Предскажите цены квартир в Ташкенте', 'Predict Tashkent flat prices']),
        L('l10', ['Neyrotarmoqlar: birinchi qadam', 'Нейросети: первый шаг', 'Neural networks: first step'], ['Raqamlarni taniydigan kichik tarmoqni oʻqiting', 'Обучите маленькую сеть распознавать цифры', 'Train a small network to recognise digits']),
        L('l11', ['Yakuniy loyiha', 'Итоговый проект', 'Final project'], ['Oʻz maʼlumotlaringizda model yarating', 'Сделайте модель на своих данных', 'Build a model on your own data'])] }
    ]
  },
  {
    id: 'agents', icon: 'code', cover: 'e', audience: 'dev', level: 'advanced', hours: 10, price: 449000,
    rating: 4.9, students: 530, isNew: false, published: true, order: 7,
    topic: T('Dasturlash', 'Разработка', 'Development'),
    title: T('SI-agentlar va avtomatlashtirish: dasturchilar uchun', 'ИИ-агенты и автоматизация для разработчиков', 'AI agents and automation for developers'),
    desc: T('Agentlarni kod bilan yigʻamiz: vositalar, RAG, n8n, Telegram-botlar va himoya.',
      'Собираем агентов с кодом: инструменты, RAG, n8n, Telegram-боты и защита.',
      'Build agents with code: tools, RAG, n8n, Telegram bots and security.'),
    outcomes: [
      T('Bilimlar bazasiga ega bot yigʻish', 'Собрать бота с базой знаний', 'Build a bot with a knowledge base'),
      T('SI’ni jadval va messenjerlar bilan bogʻlash', 'Связать ИИ с таблицами и мессенджерами', 'Connect AI to spreadsheets and messengers'),
      T('Botlarni prompt-inyeksiyalardan himoyalash', 'Защищать ботов от промпт-инъекций', 'Protect bots from prompt injection')
    ],
    modules: [
      { t: T('Agentlar', 'Агенты', 'Agents'), l: [
        L('g1', ['SI-agent nima', 'Что такое ИИ-агент', 'What an AI agent is'], ['Oddiy botni agentdan farqlang', 'Отличите обычного бота от агента', 'Tell a plain bot from an agent'], true),
        L('g2', ['Arizalar agenti: vositalar va himoya', 'Агент для заявок: инструменты и защита', 'A lead agent: tools and protection'], ['Qumdonda arizalar agentini yigʻing va hujumdan himoyalang', 'Соберите в песочнице агента заявок и защитите от атаки', 'Build a lead agent in the sandbox and protect it from attack'], true),
        L('g4', ['Agent qanday reja tuzadi', 'Как агент планирует', 'How an agent plans'], ['Agent uchun ReAct siklini yozing', 'Опишите цикл ReAct для агента', 'Write out a ReAct loop for an agent'])] },
      { t: T('Bilimlar bazasi', 'Базы знаний', 'Knowledge bases'), l: [
        L('g3', ['RAG: hujjatlar boʻyicha bot', 'RAG: бот по документам', 'RAG: a bot over your documents'], ['Kompaniya FAQ’i boʻyicha bot yigʻing', 'Соберите бота по FAQ компании', 'Build a bot over a company FAQ']),
        L('g5', ['Vektorli qidiruv oddiy tilda', 'Векторный поиск простыми словами', 'Vector search in plain words'], ['5 ta savol uchun eng yaqin hujjatlarni toping', 'Найдите ближайшие документы для 5 вопросов', 'Find the nearest documents for 5 questions']),
        L('g6', ['Hujjatlarni tayyorlash', 'Подготовка документов', 'Preparing documents'], ['Hujjatni boʻlaklarga toʻgʻri boʻling', 'Правильно разбейте документ на фрагменты', 'Split a document into chunks correctly'])] },
      { t: T('Avtomatlashtirish', 'Автоматизация', 'Automation'), l: [
        L('g7', ['n8n’da avtomatlashtirish', 'Автоматизация в n8n', 'Automation in n8n'], ['Forma → SI → jadval zanjirini yigʻing', 'Соберите цепочку форма → ИИ → таблица', 'Build a form → AI → spreadsheet chain']),
        L('g8', ['SI bilan Telegram-bot', 'Telegram-бот с ИИ', 'A Telegram bot with AI'], ['Savollarga javob beradigan botni ishga tushiring', 'Запустите бота, который отвечает на вопросы', 'Launch a bot that answers questions']),
        L('g9', ['Jadval va CRM bilan integratsiya', 'Интеграция с таблицами и CRM', 'Spreadsheet and CRM integration'], ['Arizalarni avtomatik CRM’ga yuboring', 'Отправляйте заявки в CRM автоматически', 'Send leads to a CRM automatically'])] },
      { t: T('Xavfsizlik', 'Безопасность', 'Security'), l: [
        L('g10', ['Prompt-inyeksiyalar va himoya', 'Промпт-инъекции и защита', 'Prompt injection and defence'], ['Botingizni 10 ta hujumda sinang', 'Проверьте бота на 10 атаках', 'Test your bot against 10 attacks']),
        L('g11', ['Yakuniy loyiha', 'Итоговый проект', 'Final project'], ['Ishlab chiqarishga tayyor agentni topshiring', 'Сдайте агента, готового к работе', 'Ship a production-ready agent'])] }
    ]
  }
];

const plans = [
  { id: 'sub1', months: 1, price: 149000, best: false },
  { id: 'sub3', months: 3, price: 399000, best: true },
  { id: 'sub12', months: 12, price: 1290000, best: false }
];

const lessons = require('./seed-sandbox')(require('./seed-lessons'));

module.exports = { courses, lessons, plans };
