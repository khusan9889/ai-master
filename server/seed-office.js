// Курс «ИИ в Excel, Word и PowerPoint»: программа (12 уроков) и бесплатный вводный урок на трёх языках.
// В вводном уроке две песочницы: мини-Excel (формулы считаются по-настоящему) и промпт для презентации.

const T = (uz, ru, en) => ({ uz, ru, en });
const L = (id, t, task, free = false) => ({ id, t: T(...t), task: T(...task), free });
const txt = (html) => ({ t: 'text', html });
const call = (kind, h, html) => ({ t: 'callout', kind, h, html });
const quiz = (id, q, opts) => ({ t: 'quiz', id, req: true, q, opts: opts.map(([t, ok, why]) => ({ t, ok, why })) });
const sb = (id, kind, cfg) => ({ t: 'sandbox', id, kind, req: true, cfg });

const course = {
  id: 'office-ai', icon: 'table', cover: 'h', audience: 'work', level: 'beginner', hours: 9, price: 249000,
  rating: 4.9, students: 1650, isNew: true, published: true, order: 8,
  topic: T('Office', 'Office', 'Office'),
  title: T('SI bilan Excel, Word va PowerPoint', 'ИИ в Excel, Word и PowerPoint', 'AI in Excel, Word and PowerPoint'),
  desc: T('Formulalar, hisobotlar, xatlar va taqdimotlarni SI bilan bir necha barobar tezroq tayyorlaysiz. Har darsda — ishdagi real vazifa.',
    'Формулы, отчёты, письма и презентации — в несколько раз быстрее с помощью ИИ. В каждом уроке — реальная рабочая задача.',
    'Formulas, reports, letters and presentations — several times faster with AI. A real work task in every lesson.'),
  outcomes: [
    T('Excel formulalarini SI yordamida yozish va tekshirish', 'Писать и проверять формулы Excel с помощью ИИ', 'Write and check Excel formulas with AI'),
    T('Jadvaldan bir necha daqiqada hisobot va diagramma olish', 'Получать отчёт и диаграммы из таблицы за минуты', 'Turn a spreadsheet into a report and charts in minutes'),
    T('Word’da xat, shartnoma va hisobotlarni tez tayyorlash', 'Быстро готовить письма, договоры и отчёты в Word', 'Draft letters, contracts and reports in Word fast'),
    T('PowerPoint taqdimotini 15 daqiqada yigʻish', 'Собирать презентацию PowerPoint за 15 минут', 'Build a PowerPoint deck in 15 minutes')
  ],
  modules: [
    { t: T('Kirish', 'Введение', 'Introduction'), l: [
      L('o1', ['SI + Office: formula va taqdimot 5 daqiqada', 'ИИ + Office: формула и презентация за 5 минут', 'AI + Office: a formula and a deck in 5 minutes'],
        ['Qumdonda 3 ta Excel formulasini yozing va taqdimot uchun prompt tuzing', 'Напишите в песочнице 3 формулы Excel и составьте промпт для презентации', 'Write 3 Excel formulas in the sandbox and a prompt for a presentation'], true)] },
    { t: T('Excel', 'Excel', 'Excel'), l: [
      L('o2', ['Formulalarni SI bilan: SUMIF, XLOOKUP, IF', 'Формулы с ИИ: СУММЕСЛИ, ПРОСМОТРX, ЕСЛИ', 'Formulas with AI: SUMIF, XLOOKUP, IF'],
        ['Oʻz jadvalingiz uchun 5 ta formulani SI bilan yozing va tekshiring', 'Напишите с ИИ 5 формул для своей таблицы и проверьте их', 'Write 5 formulas for your own sheet with AI and check them']),
      L('o3', ['Maʼlumotlarni tozalash: dublikatlar, sanalar, ismlar', 'Чистка данных: дубли, даты, имена', 'Cleaning data: duplicates, dates, names'],
        ['200 qatorli “iflos” roʻyxatni 10 daqiqada tartibga keltiring', 'Приведите в порядок «грязный» список на 200 строк за 10 минут', 'Clean up a messy 200-row list in 10 minutes']),
      L('o4', ['Svodnaya jadval va diagrammalar', 'Сводные таблицы и диаграммы', 'Pivot tables and charts'],
        ['Savdo jadvalidan svodnaya va 2 ta diagramma yasang', 'Постройте сводную и 2 диаграммы по таблице продаж', 'Build a pivot table and 2 charts from a sales sheet']),
      L('o5', ['Jadval tahlili: SI xulosa va xavflarni topadi', 'Анализ таблицы: ИИ находит выводы и риски', 'Spreadsheet analysis: AI finds insights and risks'],
        ['Oylik hisobotdan 5 ta asosiy xulosa oling', 'Получите 5 ключевых выводов из месячного отчёта', 'Get 5 key insights from a monthly report'])] },
    { t: T('Word', 'Word', 'Word'), l: [
      L('o6', ['Hujjat tuzilmasi va shablonlar', 'Структура документа и шаблоны', 'Document structure and templates'],
        ['Tez-tez yoziladigan hujjat uchun shablon yarating', 'Создайте шаблон для документа, который пишете чаще всего', 'Create a template for the document you write most often']),
      L('o7', ['Xat, buyruq va hisobotni 10 daqiqada', 'Письмо, приказ и отчёт за 10 минут', 'A letter, an order and a report in 10 minutes'],
        ['Rasmiy xat va ichki hisobotni SI bilan tayyorlang', 'Подготовьте с ИИ официальное письмо и внутренний отчёт', 'Draft an official letter and an internal report with AI']),
      L('o8', ['Tahrirlash, qisqartirish va tarjima', 'Редактура, сокращение и перевод', 'Editing, shortening and translation'],
        ['Uzun hujjatni 1 sahifaga qisqartiring va 2 tilga tarjima qiling', 'Сократите длинный документ до 1 страницы и переведите на 2 языка', 'Cut a long document to one page and translate it into 2 languages'])] },
    { t: T('PowerPoint', 'PowerPoint', 'PowerPoint'), l: [
      L('o9', ['Taqdimot tuzilmasi: SI bilan reja', 'Структура презентации: план с ИИ', 'Deck structure: planning with AI'],
        ['10 slaydlik taqdimot rejasini tuzing', 'Составьте план презентации на 10 слайдов', 'Outline a 10-slide presentation']),
      L('o10', ['Slayd dizayni: Designer, Copilot, Gamma', 'Дизайн слайдов: Designer, Copilot, Gamma', 'Slide design: Designer, Copilot, Gamma'],
        ['Rejadan tayyor dizaynli slaydlar yarating', 'Сделайте из плана слайды с готовым дизайном', 'Turn the outline into designed slides']),
      L('o11', ['Speaker notes va chiqishga tayyorgarlik', 'Заметки докладчика и подготовка к выступлению', 'Speaker notes and rehearsal'],
        ['Har bir slayd uchun 30 soniyalik matn yozing', 'Напишите текст на 30 секунд к каждому слайду', 'Write a 30-second script for each slide'])] },
    { t: T('Yakun', 'Итог', 'Wrap-up'), l: [
      L('o12', ['Yakuniy loyiha: Excel → Word → PowerPoint', 'Итоговый проект: Excel → Word → PowerPoint', 'Final project: Excel → Word → PowerPoint'],
        ['Bitta jadvaldan hisobot va taqdimot tayyorlang', 'Из одной таблицы подготовьте отчёт и презентацию', 'Produce a report and a deck from one spreadsheet'])] }
  ]
};

/* ---------- мини-Excel: продажи по менеджерам ---------- */
const ROWS = [['Aziz', 0, 120], ['Malika', 1, 95], ['Bekzod', 0, 140], ['Dilnoza', 2, 80], ['Javohir', 0, 105], ['Nodira', 1, 110], ['Sardor', 0, 120], ['Kamola', 2, 45]];
const CITY = { uz: ['Toshkent', 'Samarqand', 'Buxoro'], ru: ['Ташкент', 'Самарканд', 'Бухара'], en: ['Tashkent', 'Samarkand', 'Bukhara'] };
const HEAD = { uz: ['Menejer', 'Shahar', 'Savdo, mln'], ru: ['Менеджер', 'Город', 'Продажи, млн'], en: ['Manager', 'City', 'Sales, mln'] };
const grid = (l) => [HEAD[l], ...ROWS.map(([n, c, v]) => [n, CITY[l][c], v])];

const XL = {
  uz: {
    intro: 'Bu — oyning savdo jadvali (summalar million soʻmda). Har bir savolga natijani hisoblaydigan formula yozing. Tayyor sonni yozsangiz — hisoblanmaydi: Excel’da maʼlumot oʻzgarsa, formula oʻzi qayta hisoblaydi.',
    tasks: [
      { q: 'Oy boʻyicha jami savdo qancha?', expect: 815, pts: 3, prompt: 'Excel: C2:C9 diapazonidagi savdolar yigʻindisini hisoblaydigan formula yoz. Faqat formulani qaytar.', ai: '=SUM(C2:C9)' },
      { q: 'Toshkent boʻyicha savdo qancha?', expect: 485, pts: 4, prompt: 'Excel: B ustunida shahar, C ustunida savdo (2–9 qatorlar). Faqat “Toshkent” uchun savdo yigʻindisini hisoblaydigan formula yoz.', ai: '=SUMIF(B2:B9,"Toshkent",C2:C9)' },
      { q: 'Toshkent’da nechta bitim boʻlgan?', expect: 4, pts: 3, prompt: 'Excel: B2:B9 da shaharlar. “Toshkent” necha marta uchrashini sanaydigan formula yoz.', ai: '=COUNTIF(B2:B9,"Toshkent")' }
    ]
  },
  ru: {
    intro: 'Это таблица продаж за месяц (суммы в млн сумов). На каждый вопрос напишите формулу, которая посчитает результат. Готовое число не засчитывается: в Excel при изменении данных формула пересчитается сама.',
    tasks: [
      { q: 'Сколько всего продаж за месяц?', expect: 815, pts: 3, prompt: 'Excel: напиши формулу, которая считает сумму продаж в диапазоне C2:C9. Верни только формулу.', ai: '=СУММ(C2:C9)' },
      { q: 'Сколько продаж по Ташкенту?', expect: 485, pts: 4, prompt: 'Excel: в столбце B — город, в C — продажи (строки 2–9). Напиши формулу суммы продаж только для «Ташкент».', ai: '=СУММЕСЛИ(B2:B9;"Ташкент";C2:C9)' },
      { q: 'Сколько сделок было в Ташкенте?', expect: 4, pts: 3, prompt: 'Excel: в B2:B9 — города. Напиши формулу, которая считает, сколько раз встречается «Ташкент».', ai: '=СЧЁТЕСЛИ(B2:B9;"Ташкент")' }
    ]
  },
  en: {
    intro: 'This is a monthly sales sheet (amounts in million soʻm). For each question, write a formula that calculates the result. A typed-in number doesn’t count: in Excel a formula recalculates itself when the data changes.',
    tasks: [
      { q: 'What are the total sales for the month?', expect: 815, pts: 3, prompt: 'Excel: write a formula that sums the sales in C2:C9. Return only the formula.', ai: '=SUM(C2:C9)' },
      { q: 'What are the sales in Tashkent?', expect: 485, pts: 4, prompt: 'Excel: column B holds the city, column C the sales (rows 2–9). Write a formula that sums sales for “Tashkent” only.', ai: '=SUMIF(B2:B9,"Tashkent",C2:C9)' },
      { q: 'How many deals were there in Tashkent?', expect: 4, pts: 3, prompt: 'Excel: B2:B9 holds cities. Write a formula that counts how many times “Tashkent” appears.', ai: '=COUNTIF(B2:B9,"Tashkent")' }
    ]
  }
};
const excel = (l) => sb('sb-o1x', 'excel', { intro: XL[l].intro, grid: grid(l), tasks: XL[l].tasks });

/* ---------- промпт для презентации ---------- */
const RX = {
  slides: '\\d+\\s*(ta\\s*)?(slayd|слайд|slide)',
  audience: '(rahbar|direktor|jamoa|mijoz|investor|hamkasb|auditoriya|руковод|директор|команд|клиент|инвестор|коллег|аудитор|manager|director|team|client|investor|colleague|audience|board)',
  goal: '(maqsad|qaror|tasdiq|byudjet|цель|решени|утверд|бюджет|goal|decision|approve|approval|budget|aim)',
  data: '(raqam|son|foiz|maʼlumot|ma\'lumot|jadval|цифр|числ|процент|данн|таблиц|number|figure|percent|data|metric|kpi|%)',
  structure: '(reja|tuzilma|sarlavha|xulosa|kirish|план|структур|заголов|вывод|итог|outline|structure|headline|title|summary|conclusion)',
  notes: '(speaker|notes|nutq|matn|izoh|заметк|текст для|речь|докладчик|script|talking points)'
};
const RB = {
  uz: {
    input: 'Vaziyat: ertaga rahbariyatga 3-chorak savdo natijalarini koʻrsatishingiz kerak. Savdo 18% oʻsdi, eng yaxshi filial — Toshkent, Buxoroda pasayish bor. Keyingi chorak uchun marketing byudjetini tasdiqlatish kerak.',
    ph: 'Masalan: Sen tajribali biznes-tahlilchisan. Rahbariyat uchun taqdimot rejasini tuz…',
    labels: ['Slaydlar soni koʻrsatilgan', 'Auditoriya kimligi aytilgan', 'Taqdimot maqsadi (qaror, byudjet)', 'Aniq raqamlar va maʼlumotlar', 'Tuzilma: sarlavhalar va xulosa', 'Har slayd uchun nutq matni'],
    pieces: [
      { need: 'slides', ok: 'Taqdimot: “3-chorak natijalari” — 6 slayd', bad: 'Taqdimot: “Savdo haqida” — 14 slayd' },
      { need: 'audience', ok: 'Auditoriya: rahbariyat — tafsilotlarsiz, faqat asosiysi.', bad: '' },
      { need: 'structure', ok: '1. Asosiy xulosa: savdo +18%\n2. Filiallar boʻyicha natijalar\n3. Toshkent — oʻsish drayveri\n4. Buxoro: pasayish sabablari va reja', bad: '1. Kompaniya haqida\n2. Bizning qadriyatlarimiz\n3. Savdo\n4. Boshqa maʼlumotlar' },
      { need: 'data', ok: 'Raqamlar: Q3 = 815 mln (+18%), Toshkent 485 mln (60%), Buxoro −12%.', bad: 'Raqamlar: savdo yaxshi oʻsdi, baʼzi filiallarda muammolar bor.' },
      { need: 'goal', ok: '5. Taklif: Q4 marketing byudjeti 120 mln — tasdiqlash soʻraladi\n6. Keyingi qadamlar va muddatlar', bad: '5. Rahmat e’tiboringiz uchun' },
      { need: 'notes', ok: 'Nutq (1-slayd): “Bir jumla bilan: chorakni rejadan 18% yuqori yopdik. Endi — nima sababdan va keyingi chorakda nima qilamiz.”', bad: '' }
    ]
  },
  ru: {
    input: 'Ситуация: завтра вы показываете руководству итоги продаж за 3-й квартал. Продажи выросли на 18%, лучший филиал — Ташкент, в Бухаре спад. Нужно утвердить маркетинговый бюджет на следующий квартал.',
    ph: 'Например: Ты опытный бизнес-аналитик. Составь план презентации для руководства…',
    labels: ['Указано число слайдов', 'Сказано, кто аудитория', 'Цель презентации (решение, бюджет)', 'Конкретные цифры и данные', 'Структура: заголовки и вывод', 'Текст выступления к слайдам'],
    pieces: [
      { need: 'slides', ok: 'Презентация «Итоги 3-го квартала» — 6 слайдов', bad: 'Презентация «О продажах» — 14 слайдов' },
      { need: 'audience', ok: 'Аудитория: руководство — без деталей, только главное.', bad: '' },
      { need: 'structure', ok: '1. Главный вывод: продажи +18%\n2. Результаты по филиалам\n3. Ташкент — драйвер роста\n4. Бухара: причины спада и план', bad: '1. О компании\n2. Наши ценности\n3. Продажи\n4. Прочие данные' },
      { need: 'data', ok: 'Цифры: Q3 = 815 млн (+18%), Ташкент 485 млн (60%), Бухара −12%.', bad: 'Цифры: продажи хорошо выросли, в некоторых филиалах есть проблемы.' },
      { need: 'goal', ok: '5. Предложение: бюджет маркетинга на Q4 — 120 млн, просим утвердить\n6. Следующие шаги и сроки', bad: '5. Спасибо за внимание' },
      { need: 'notes', ok: 'Текст (слайд 1): «Если одной фразой: квартал закрыли на 18% выше плана. Дальше — за счёт чего и что делаем в следующем квартале».', bad: '' }
    ]
  },
  en: {
    input: 'Situation: tomorrow you present Q3 sales results to management. Sales grew 18%, the best branch is Tashkent, Bukhara is down. You need the marketing budget for next quarter approved.',
    ph: 'For example: You are an experienced business analyst. Outline a presentation for management…',
    labels: ['Number of slides is given', 'Audience is named', 'Goal of the deck (decision, budget)', 'Concrete numbers and data', 'Structure: headlines and conclusion', 'Speaker script for the slides'],
    pieces: [
      { need: 'slides', ok: 'Deck: “Q3 results” — 6 slides', bad: 'Deck: “About sales” — 14 slides' },
      { need: 'audience', ok: 'Audience: management — no detail, only what matters.', bad: '' },
      { need: 'structure', ok: '1. Key takeaway: sales +18%\n2. Results by branch\n3. Tashkent — the growth driver\n4. Bukhara: why it fell and the plan', bad: '1. About the company\n2. Our values\n3. Sales\n4. Other data' },
      { need: 'data', ok: 'Numbers: Q3 = 815 mln (+18%), Tashkent 485 mln (60%), Bukhara −12%.', bad: 'Numbers: sales grew nicely, some branches have issues.' },
      { need: 'goal', ok: '5. Proposal: Q4 marketing budget of 120 mln — approval requested\n6. Next steps and deadlines', bad: '5. Thank you for your attention' },
      { need: 'notes', ok: 'Script (slide 1): “In one sentence: we closed the quarter 18% above plan. Next — why, and what we do next quarter.”', bad: '' }
    ]
  }
};
const PTS = { slides: 2, audience: 1, goal: 2, data: 2, structure: 2, notes: 1 };
const deck = (l) => sb('sb-o1p', 'rubric', {
  input: RB[l].input, ph: RB[l].ph,
  criteria: Object.keys(PTS).map((id, i) => ({ id, rx: RX[id], pts: PTS[id], label: RB[l].labels[i] })),
  pieces: RB[l].pieces
});

/* ---------- текст урока ---------- */
const TX = {
  uz: {
    a: '<h2>SI + Office: formula va taqdimot 5 daqiqada</h2><p>Ofis ishining katta qismi — Excel, Word va PowerPoint. Formulani qidirish, hisobotni formatlash, slaydlarni yigʻish kuniga 1–2 soat oladi. SI bu vaqtni bir necha barobar qisqartiradi — agar unga <b>toʻgʻri vazifa</b> bersangiz.</p><h3>SI Office’da nima qila oladi</h3><ul><li><b>Excel</b> — soʻzlar bilan tasvirlangan formulani yozadi, xatoni tushuntiradi, jadvaldan xulosa chiqaradi.</li><li><b>Word</b> — xat, buyruq va hisobot qoralamasini tayyorlaydi, matnni qisqartiradi va tarjima qiladi.</li><li><b>PowerPoint</b> — taqdimot rejasini, slayd matnini va nutqni tayyorlaydi.</li></ul>',
    tip: ['Asosiy qoida', 'SI’ga jadval tuzilmasini aniq ayting: qaysi ustunda nima va qaysi qatorlar. “Savdoni hisobla” emas, “C2:C9 dagi savdoni B ustunida Toshkent boʻlsa qoʻsh” deb yozing.'],
    b: '<h3>1-mashq: formulalar</h3><p>Pastda — haqiqiy formulalarni hisoblaydigan mini-Excel. Formulani oʻzingiz yozing yoki “SI’dan formula soʻrash” tugmasini bosing va SI’ga qanday soʻrov berilganini koʻring. Inglizcha (SUM) va ruscha (СУММ) nomlar ishlaydi.</p>',
    c: '<h3>2-mashq: taqdimot</h3><p>Yaxshi taqdimot slaydlardan emas, <b>maqsaddan</b> boshlanadi: kim tinglaydi, undan qanday qaror kerak, qaysi raqamlar buni isbotlaydi. Shuni promptda aytsangiz, SI tayyor reja va nutq beradi — qolgani PowerPoint Designer yoki Copilot’da 5 daqiqalik ish.</p>',
    note: ['Maxfiylik', 'Mijozlar roʻyxati, maoshlar va shartnomalarni ochiq SI-chatlarga yuklamang. Ismlarni almashtiring yoki kompaniyangiz ruxsat bergan vositadan foydalaning.'],
    q1: ['Nima uchun Excel’da tayyor son emas, formula yozish kerak?', [
      ['Maʼlumot oʻzgarsa, natija oʻzi qayta hisoblanadi', true, 'Toʻgʻri! Formula jadval bilan birga “yashaydi”.'],
      ['Formula fayl hajmini kamaytiradi', false, 'Hajmga deyarli taʼsir qilmaydi — gap hisoblashda.'],
      ['Sonlarni Excel saqlamaydi', false, 'Saqlaydi, lekin ular oʻzgarishsiz qoladi va eskiradi.']]],
    q2: ['Taqdimot uchun promptda eng birinchi nimani aytish kerak?', [
      ['Slaydlar rangini', false, 'Dizayn — oxirgi qadam.'],
      ['Shrift va animatsiyalarni', false, 'Bu mazmunga taʼsir qilmaydi.'],
      ['Kim tinglaydi va qanday qaror kerak', true, 'Toʻgʻri! Auditoriya va maqsad butun tuzilmani belgilaydi.']]]
  },
  ru: {
    a: '<h2>ИИ + Office: формула и презентация за 5 минут</h2><p>Большая часть офисной работы — это Excel, Word и PowerPoint. Поиск нужной формулы, оформление отчёта, сборка слайдов съедают 1–2 часа в день. ИИ сокращает это время в разы — если поставить ему <b>правильную задачу</b>.</p><h3>Что ИИ умеет в Office</h3><ul><li><b>Excel</b> — пишет формулу по описанию словами, объясняет ошибку, делает выводы по таблице.</li><li><b>Word</b> — готовит черновик письма, приказа и отчёта, сокращает и переводит текст.</li><li><b>PowerPoint</b> — составляет план презентации, текст слайдов и речь.</li></ul>',
    tip: ['Главное правило', 'Опишите ИИ структуру таблицы: что в каком столбце и какие строки. Не «посчитай продажи», а «сложи продажи из C2:C9, если в столбце B — Ташкент».'],
    b: '<h3>Упражнение 1: формулы</h3><p>Ниже — мини-Excel, который по-настоящему считает формулы. Напишите формулу сами или нажмите «Спросить формулу у ИИ» и посмотрите, какой запрос ему дали. Работают английские (SUM) и русские (СУММ) названия.</p>',
    c: '<h3>Упражнение 2: презентация</h3><p>Хорошая презентация начинается не со слайдов, а с <b>цели</b>: кто слушает, какое решение от него нужно и какие цифры это доказывают. Скажите это в промпте — и ИИ выдаст готовый план и речь, а дальше 5 минут работы в PowerPoint Designer или Copilot.</p>',
    note: ['Конфиденциальность', 'Не загружайте в открытые ИИ-чаты списки клиентов, зарплаты и договоры. Заменяйте имена или пользуйтесь инструментом, который разрешён в вашей компании.'],
    q1: ['Зачем в Excel писать формулу, а не готовое число?', [
      ['При изменении данных результат пересчитается сам', true, 'Верно! Формула «живёт» вместе с таблицей.'],
      ['Формула уменьшает размер файла', false, 'На размер это почти не влияет — дело в пересчёте.'],
      ['Excel не хранит числа', false, 'Хранит, но они не меняются и устаревают.']]],
    q2: ['Что первым делом указать в промпте для презентации?', [
      ['Цвет слайдов', false, 'Дизайн — последний шаг.'],
      ['Шрифты и анимации', false, 'На содержание это не влияет.'],
      ['Кто слушает и какое решение нужно', true, 'Верно! Аудитория и цель определяют всю структуру.']]]
  },
  en: {
    a: '<h2>AI + Office: a formula and a deck in 5 minutes</h2><p>Most office work happens in Excel, Word and PowerPoint. Hunting for a formula, formatting a report and assembling slides eat 1–2 hours a day. AI cuts that time several times over — if you give it <b>the right task</b>.</p><h3>What AI can do in Office</h3><ul><li><b>Excel</b> — writes a formula from a plain-language description, explains errors, draws conclusions from a sheet.</li><li><b>Word</b> — drafts letters, orders and reports, shortens and translates text.</li><li><b>PowerPoint</b> — outlines the deck, writes slide text and your talk.</li></ul>',
    tip: ['The main rule', 'Describe the sheet to the AI: what is in which column and which rows. Not “calculate sales” but “sum sales in C2:C9 where column B is Tashkent”.'],
    b: '<h3>Exercise 1: formulas</h3><p>Below is a mini-Excel that really calculates formulas. Write the formula yourself or press “Ask AI for the formula” to see what request the AI was given. English (SUM) and Russian (СУММ) names both work.</p>',
    c: '<h3>Exercise 2: a presentation</h3><p>A good deck starts not with slides but with a <b>goal</b>: who is listening, what decision you need from them and which numbers prove it. Put that in the prompt and AI returns a ready outline and talk — the rest is 5 minutes in PowerPoint Designer or Copilot.</p>',
    note: ['Privacy', 'Don’t paste client lists, salaries or contracts into public AI chats. Replace names or use a tool your company has approved.'],
    q1: ['Why write a formula in Excel instead of a typed-in number?', [
      ['The result recalculates itself when the data changes', true, 'Correct! A formula lives with the sheet.'],
      ['A formula makes the file smaller', false, 'It barely affects size — the point is recalculation.'],
      ['Excel can’t store numbers', false, 'It can, but they never update and go stale.']]],
    q2: ['What should a presentation prompt state first?', [
      ['The slide colours', false, 'Design is the last step.'],
      ['Fonts and animations', false, 'That doesn’t change the content.'],
      ['Who is listening and what decision is needed', true, 'Correct! Audience and goal shape the whole structure.']]]
  }
};

const lessonFor = (l) => {
  const x = TX[l];
  return { min: 20, blocks: [
    txt(x.a), call('tip', x.tip[0], x.tip[1]), txt(x.b), excel(l), quiz('q-o1', ...x.q1),
    txt(x.c), call('important', x.note[0], x.note[1]), deck(l), quiz('q-o2', ...x.q2)
  ] };
};
const lessons = { o1: { uz: lessonFor('uz'), ru: lessonFor('ru'), en: lessonFor('en') } };

module.exports = { course, lessons };
