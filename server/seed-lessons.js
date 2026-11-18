// Контент бесплатных (пробных) уроков на трёх языках.
// Структура: lessons[id] = { uz: {min, blocks}, ru: {...}, en: {...} }

const txt = (html) => ({ t: 'text', html });
const call = (kind, h, html) => ({ t: 'callout', kind, h, html });
const code = (lang, c) => ({ t: 'code', lang, code: c });
const formula = (html, cap) => ({ t: 'formula', html, cap });
const quiz = (id, q, opts) => ({ t: 'quiz', id, req: true, q, opts: opts.map(([t, ok, why]) => ({ t, ok, why })) });

const llmSvg = (a) => `<svg viewBox="0 0 680 170" width="100%" role="img" aria-label="${a.aria}" style="font-family:Inter,sans-serif">
<defs><marker id="ar" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#FF6B1A"/></marker></defs>
<rect x="6" y="40" width="140" height="90" rx="14" fill="#EDF0FF"/><text x="76" y="78" text-anchor="middle" font-size="14" font-weight="700" fill="#3347C9">${a.text}</text><text x="76" y="100" text-anchor="middle" font-size="11.5" fill="#3347C9">${a.sample}</text>
<line x1="150" y1="85" x2="190" y2="85" stroke="#FF6B1A" stroke-width="3" marker-end="url(#ar)"/>
<rect x="196" y="40" width="130" height="90" rx="14" fill="#FFF1E8"/><text x="261" y="78" text-anchor="middle" font-size="14" font-weight="700" fill="#B8490A">${a.tokens}</text><text x="261" y="100" text-anchor="middle" font-size="11.5" fill="#B8490A">${a.tsample}</text>
<line x1="330" y1="85" x2="370" y2="85" stroke="#FF6B1A" stroke-width="3" marker-end="url(#ar)"/>
<rect x="376" y="40" width="130" height="90" rx="14" fill="#111318"/><text x="441" y="80" text-anchor="middle" font-size="14" font-weight="700" fill="#F2F1EE">${a.model}</text><text x="441" y="102" text-anchor="middle" font-size="11.5" fill="#B9B6AE">${a.probs}</text>
<line x1="510" y1="85" x2="550" y2="85" stroke="#FF6B1A" stroke-width="3" marker-end="url(#ar)"/>
<rect x="556" y="22" width="118" height="126" rx="14" fill="#E7F6EC"/><text x="615" y="48" text-anchor="middle" font-size="13" font-weight="700" fill="#15803D">${a.next}</text>
<text x="570" y="76" font-size="12" fill="#15803D">${a.w1}</text><text x="570" y="98" font-size="12" fill="#15803D">${a.w2}</text><text x="570" y="120" font-size="12" fill="#15803D">… 3%</text></svg>`;
const diagram = (a) => ({ t: 'diagram', svg: llmSvg(a), cap: a.cap });

module.exports = {
  /* ---------------- ИИ с нуля ---------------- */
  b1: {
    uz: { min: 8, blocks: [
      txt(`<h2>Sunʼiy intellekt nima</h2><p>Sunʼiy intellekt (SI) — bu odatda inson aqli talab qiladigan vazifalarni bajaradigan dasturlar: matnni tushunish, rasmni tanish, tarjima qilish, maslahat berish.</p><p>SI “oʻylamaydi” va “his qilmaydi”. U juda koʻp misollardan qonuniyatlarni topadi va shu asosda javob beradi. Telefoningizdagi yuzni tanish, xaritadagi tirbandlik prognozi, ChatGPT — bularning barchasi SI.</p>`),
      txt(`<h3>SI turlari</h3><ul><li><b>Tor SI</b> — bitta vazifani yaxshi bajaradi: spam filtri, ovozli yordamchi.</li><li><b>Generativ SI</b> — yangi kontent yaratadi: matn, rasm, musiqa.</li><li><b>Umumiy SI</b> — inson kabi istalgan vazifani bajara oladigan tizim. Hozircha bunday tizim yoʻq.</li></ul>`),
      call('tip', 'Esda tuting', 'Bugungi SI — kuchli vosita, lekin u xato qilishi mumkin. Muhim qarorlarni doim oʻzingiz tekshiring.'),
      quiz('q-b1', 'Quyidagilardan qaysi biri generativ SI misoli?', [
        ['Pochtadagi spam filtri', false, 'Spam filtri xatlarni faqat saralaydi — u yangi narsa yaratmaydi.'],
        ['Soʻrov boʻyicha rasm chizadigan dastur', true, 'Toʻgʻri! Generativ SI yangi kontent yaratadi.'],
        ['Kalkulyator', false, 'Kalkulyator qatʼiy qoidalar boʻyicha ishlaydi, u SI emas.']])
    ] },
    ru: { min: 8, blocks: [
      txt(`<h2>Что такое искусственный интеллект</h2><p>Искусственный интеллект (ИИ) — это программы, которые решают задачи, обычно требующие человеческого ума: понимают текст, узнают изображения, переводят, советуют.</p><p>ИИ не «думает» и не «чувствует». Он находит закономерности в огромном количестве примеров и на их основе отвечает. Распознавание лица в телефоне, прогноз пробок на карте, ChatGPT — всё это ИИ.</p>`),
      txt(`<h3>Виды ИИ</h3><ul><li><b>Узкий ИИ</b> — хорошо решает одну задачу: спам-фильтр, голосовой помощник.</li><li><b>Генеративный ИИ</b> — создаёт новый контент: тексты, изображения, музыку.</li><li><b>Общий ИИ</b> — система, способная решать любые задачи как человек. Такой пока не существует.</li></ul>`),
      call('tip', 'Запомните', 'Современный ИИ — мощный инструмент, но он может ошибаться. Важные решения всегда проверяйте сами.'),
      quiz('q-b1', 'Что из этого — пример генеративного ИИ?', [
        ['Спам-фильтр в почте', false, 'Спам-фильтр только сортирует письма — он ничего не создаёт.'],
        ['Программа, которая рисует картинку по запросу', true, 'Верно! Генеративный ИИ создаёт новый контент.'],
        ['Калькулятор', false, 'Калькулятор работает по жёстким правилам, это не ИИ.']])
    ] },
    en: { min: 8, blocks: [
      txt(`<h2>What artificial intelligence is</h2><p>Artificial intelligence (AI) is software that handles tasks that usually need a human mind: understanding text, recognising images, translating, giving advice.</p><p>AI doesn’t “think” or “feel”. It finds patterns in huge numbers of examples and answers based on them. Face unlock on your phone, traffic forecasts on a map, ChatGPT — all of that is AI.</p>`),
      txt(`<h3>Types of AI</h3><ul><li><b>Narrow AI</b> — good at one task: a spam filter, a voice assistant.</li><li><b>Generative AI</b> — creates new content: text, images, music.</li><li><b>General AI</b> — a system that could do any task like a human. It doesn’t exist yet.</li></ul>`),
      call('tip', 'Remember', 'Today’s AI is a powerful tool, but it can be wrong. Always double-check important decisions yourself.'),
      quiz('q-b1', 'Which of these is an example of generative AI?', [
        ['An email spam filter', false, 'A spam filter only sorts emails — it doesn’t create anything.'],
        ['An app that draws a picture from a request', true, 'Correct! Generative AI creates new content.'],
        ['A calculator', false, 'A calculator follows fixed rules; it isn’t AI.']])
    ] }
  },
  b2: {
    uz: { min: 10, blocks: [
      txt(`<h2>Neyrotarmoq qanday ishlaydi</h2><p>Neyrotarmoq — bir-biri bilan bogʻlangan oddiy “neyronlar” qatlamlari. Har bir neyron raqamlarni qabul qiladi, ularni oʻz “ogʻirligi”ga koʻpaytiradi va natijani keyingi qatlamga uzatadi.</p><p>Oʻqitish paytida tarmoqqa minglab misollar koʻrsatiladi: “bu mushuk”, “bu it”. Tarmoq har safar xato qilsa, ogʻirliklar biroz oʻzgaradi. Millionlab shunday qadamlardan keyin tarmoq yangi rasmlarni ham toʻgʻri tanishni oʻrganadi.</p>`),
      call('example', 'Misol', 'Bola mushukni farqlashni qanday oʻrganadi? Unga koʻp marta mushuk koʻrsatiladi va “bu mushuk” deyiladi. Neyrotarmoq ham xuddi shunday — faqat millionlab misollarda.'),
      txt(`<h3>Uch asosiy qism</h3><ul><li><b>Maʼlumotlar</b> — oʻqitish uchun misollar.</li><li><b>Model</b> — ogʻirliklarga ega neyronlar qatlamlari.</li><li><b>Oʻqitish</b> — xatolarni kamaytirish uchun ogʻirliklarni sozlash.</li></ul>`),
      quiz('q-b2', 'Oʻqitish paytida neyrotarmoqda nima oʻzgaradi?', [
        ['Neyronlar soni', false, 'Odatda arxitektura oʻzgarmaydi — faqat ogʻirliklar sozlanadi.'],
        ['Neyronlar oʻrtasidagi ogʻirliklar', true, 'Toʻgʻri! Oʻqitish — bu ogʻirliklarni sozlash.'],
        ['Kompyuter xotirasi', false, 'Yoʻq, xotira hajmi bilan bogʻliq emas.']])
    ] },
    ru: { min: 10, blocks: [
      txt(`<h2>Как работает нейросеть</h2><p>Нейросеть — это слои простых «нейронов», связанных друг с другом. Каждый нейрон получает числа, умножает их на свои «веса» и передаёт результат на следующий слой.</p><p>При обучении сети показывают тысячи примеров: «это кошка», «это собака». Каждый раз, когда сеть ошибается, веса немного меняются. После миллионов таких шагов сеть учится правильно узнавать и новые картинки.</p>`),
      call('example', 'Пример', 'Как ребёнок учится узнавать кошку? Ему много раз показывают кошку и говорят: «это кошка». Нейросеть учится так же — только на миллионах примеров.'),
      txt(`<h3>Три главные части</h3><ul><li><b>Данные</b> — примеры для обучения.</li><li><b>Модель</b> — слои нейронов с весами.</li><li><b>Обучение</b> — подстройка весов, чтобы ошибок было меньше.</li></ul>`),
      quiz('q-b2', 'Что меняется в нейросети во время обучения?', [
        ['Количество нейронов', false, 'Обычно архитектура не меняется — подстраиваются только веса.'],
        ['Веса связей между нейронами', true, 'Верно! Обучение — это подстройка весов.'],
        ['Память компьютера', false, 'Нет, объём памяти здесь ни при чём.']])
    ] },
    en: { min: 10, blocks: [
      txt(`<h2>How a neural network works</h2><p>A neural network is layers of simple “neurons” connected to each other. Each neuron takes numbers, multiplies them by its “weights” and passes the result to the next layer.</p><p>During training the network sees thousands of examples: “this is a cat”, “this is a dog”. Every time it’s wrong, the weights change slightly. After millions of such steps the network learns to recognise new pictures too.</p>`),
      call('example', 'Example', 'How does a child learn to recognise a cat? They see many cats and hear “that’s a cat”. A neural network learns the same way — just with millions of examples.'),
      txt(`<h3>Three main parts</h3><ul><li><b>Data</b> — examples to learn from.</li><li><b>Model</b> — layers of neurons with weights.</li><li><b>Training</b> — tuning the weights to reduce mistakes.</li></ul>`),
      quiz('q-b2', 'What changes inside a neural network during training?', [
        ['The number of neurons', false, 'The architecture usually stays the same — only the weights are tuned.'],
        ['The weights of the connections', true, 'Correct! Training means tuning the weights.'],
        ['The computer’s memory', false, 'No, memory size has nothing to do with it.']])
    ] }
  },

  /* ---------------- Промпт-инжиниринг ---------------- */
  p1: {
    uz: { min: 12, blocks: [
      txt(`<h2>Til modellari qanday tuzilgan</h2><p>Til modeli (LLM) — matnni davom ettiradigan dastur. U juda koʻp matnni “oʻqigan” va qaysi soʻz keyin kelishi ehtimoli yuqoriligini taxmin qilishni oʻrgangan.</p><p>Prompt yozganingizda siz matnning boshini berasiz. Model esa uni qadam-baqadam, token ortidan token davom ettiradi.</p>`),
      diagram({ aria: 'Matn tokenlarga boʻlinadi, model ehtimollarni hisoblaydi va keyingi tokenni tanlaydi', text: 'Matn', sample: '«Oʻzbekiston poytaxti —»', tokens: 'Tokenlar', tsample: '[Oʻzbek][iston][ poyt]…', model: 'Model', probs: 'ehtimollarni hisoblaydi', next: 'Keyingi', w1: 'Toshkent 92%', w2: 'shahar 5%', cap: 'Model keyingi tokenni ehtimollar boʻyicha tanlaydi' }),
      call('important', 'Muhim', 'Model faktlarni maʼlumotlar bazasi kabi “bilmaydi”. U matnlardagi qonuniyatlarni takrorlaydi, shuning uchun ishonch bilan xato qilishi mumkin. Bunday xatolar gallyutsinatsiya deyiladi.'),
      txt(`<h3>Token nima</h3><p>Token — matn boʻlagi: soʻz, soʻzning bir qismi yoki belgi. Oʻzbek va rus tillarida bitta soʻz koʻpincha 2–3 tokenga boʻlinadi. Javob tezligi va soʻrov narxi tokenlar soniga bogʻliq.</p><table><tr><th>Matn</th><th>Taxminan token</th></tr><tr><td>Salom!</td><td>2–3</td></tr><tr><td>Shartnomaning bir sahifasi</td><td>500–800</td></tr><tr><td>300 betlik kitob</td><td>150–250 ming</td></tr></table>`),
      quiz('q-p1', 'Nega model notoʻgʻri faktni ishonch bilan yozishi mumkin?', [
        ['Chunki uning maʼlumotlar bazasi eskirgan', false, 'Modelda “yangilash” mumkin boʻlgan faktlar bazasi yoʻq. U matnni qonuniyatlar boʻyicha bashorat qiladi.'],
        ['Chunki u faktni qidirmaydi, matnning ehtimoliy davomini bashorat qiladi', true, 'Toʻgʻri. Ishonarli matn har doim ham haqiqat emas — muhim faktlarni tekshiring.'],
        ['Chunki uni ataylab shunday sozlashgan', false, 'Yoʻq, bu ishlash tamoyilining oqibati, sozlama emas.']])
    ] },
    ru: { min: 12, blocks: [
      txt(`<h2>Как устроены языковые модели</h2><p>Языковая модель (LLM) — это программа, которая продолжает текст. Она прочитала огромный объём текстов и научилась угадывать, какое слово с наибольшей вероятностью идёт следующим.</p><p>Когда вы пишете промпт, вы задаёте начало текста. Модель шаг за шагом дописывает продолжение — токен за токеном.</p>`),
      diagram({ aria: 'Текст разбивается на токены, модель считает вероятности и выбирает следующий токен', text: 'Текст', sample: '«Столица Узбекистана —»', tokens: 'Токены', tsample: '[Стол][ица][ Узб]…', model: 'Модель', probs: 'считает вероятности', next: 'Следующий', w1: 'Ташкент 92%', w2: 'город 5%', cap: 'Модель выбирает следующий токен по вероятностям' }),
      call('important', 'Важно', 'Модель не «знает» факты как база данных. Она воспроизводит закономерности из текстов, поэтому может уверенно ошибаться. Такие ошибки называют галлюцинациями.'),
      txt(`<h3>Что такое токен</h3><p>Токен — кусочек текста: слово, часть слова или знак. На русском и узбекском одно слово часто делится на 2–3 токена. От числа токенов зависят скорость ответа и стоимость запроса.</p><table><tr><th>Текст</th><th>Примерно токенов</th></tr><tr><td>Привет!</td><td>2–3</td></tr><tr><td>Страница договора</td><td>500–800</td></tr><tr><td>Книга на 300 страниц</td><td>150–250 тыс.</td></tr></table>`),
      quiz('q-p1', 'Почему модель может уверенно написать неверный факт?', [
        ['Потому что у неё устаревшая база данных', false, 'У модели нет базы фактов, которую можно «обновить». Она предсказывает текст по закономерностям.'],
        ['Потому что она предсказывает вероятное продолжение текста, а не ищет факт', true, 'Верно. Правдоподобный текст не всегда правдив — поэтому важные факты нужно проверять.'],
        ['Потому что её специально так настроили', false, 'Нет, это следствие самого принципа работы, а не настройка.']])
    ] },
    en: { min: 12, blocks: [
      txt(`<h2>How language models work</h2><p>A language model (LLM) is a program that continues text. It has read a huge amount of text and learned to guess which word is most likely to come next.</p><p>When you write a prompt, you provide the beginning of a text. The model continues it step by step — token by token.</p>`),
      diagram({ aria: 'Text is split into tokens, the model computes probabilities and picks the next token', text: 'Text', sample: '“The capital of Uzbekistan is”', tokens: 'Tokens', tsample: '[The][ capital][ of]…', model: 'Model', probs: 'computes probabilities', next: 'Next token', w1: 'Tashkent 92%', w2: 'a city 5%', cap: 'The model picks the next token by probability' }),
      call('important', 'Important', 'A model doesn’t “know” facts the way a database does. It reproduces patterns from text, so it can be confidently wrong. These errors are called hallucinations.'),
      txt(`<h3>What a token is</h3><p>A token is a piece of text: a word, part of a word or a symbol. In Uzbek and Russian one word often splits into 2–3 tokens. Response speed and request cost depend on the number of tokens.</p><table><tr><th>Text</th><th>Approx. tokens</th></tr><tr><td>Hello!</td><td>2</td></tr><tr><td>One contract page</td><td>500–800</td></tr><tr><td>A 300-page book</td><td>100–200k</td></tr></table>`),
      quiz('q-p1', 'Why can a model confidently state a wrong fact?', [
        ['Because its database is out of date', false, 'A model has no fact database to “update”. It predicts text from patterns.'],
        ['Because it predicts a likely continuation of text instead of looking up a fact', true, 'Correct. Plausible text isn’t always true — so verify important facts.'],
        ['Because it was deliberately configured that way', false, 'No, it’s a consequence of how it works, not a setting.']])
    ] }
  },
  p2: {
    uz: { min: 15, blocks: [
      txt(`<h2>Yaxshi prompt anatomiyasi</h2><p>Yaxshi prompt toʻrtta savolga javob beradi: <b>kim</b> javob beradi, <b>nima</b> qilish kerak, natija <b>qanday koʻrinishda</b> qaytarilishi va <b>nimaga tayanish</b> kerak.</p><ul><li><b>Rol:</b> “Sen yurist-tahlilchisan”.</li><li><b>Vazifa:</b> “Summa, muddat va jarimani top”.</li><li><b>Format:</b> “Faqat quyidagi maydonlarga ega JSON qaytar…”.</li><li><b>Misol:</b> toʻgʻri javob namunasini koʻrsating.</li></ul>`),
      code('Prompt', `Sen yurist-tahlilchisan.\nShartnoma matnidan summa, muddat va penya miqdorini top.\nFAQAT izohsiz JSON qaytar:\n{"amount": soʻmdagi son, "deadline": "YYYY-MM-DD", "penalty": foizdagi son}\n\nShartnoma matni:\n<<<shartnoma shu yerga qoʻyiladi>>>`),
      call('tip', 'Maslahat', 'Formatni dastur tekshira oladigan qilib yozing. “Son” — “hajmini koʻrsat”dan yaxshiroq, “YYYY-MM-DD” — “sanani koʻrsat”dan yaxshiroq.'),
      call('error', 'Keng tarqalgan xato', '“Chiroyli qil” — model siz uchun “chiroyli” nima ekanini bilmaydi. Natijani aniq tasvirlang: hajm, tuzilma, ohang, nimani qoʻshmaslik kerak.'),
      quiz('q-p2', 'Promptning qaysi qismi javob formatini eng yaxshi belgilaydi?', [
        ['“Tushunarli javob ber”', false, 'Juda noaniq: har kim “tushunarli”ni oʻzicha tushunadi.'],
        ['“Faqat amount, deadline, penalty maydonlariga ega JSON qaytar”', true, 'Ha: format bir maʼnoli, uni kod bilan tekshirish oson.'],
        ['“Professional kabi yoz”', false, 'Bu ohang haqida, natija formati haqida emas.']])
    ] },
    ru: { min: 15, blocks: [
      txt(`<h2>Анатомия хорошего промпта</h2><p>Хороший промпт отвечает на четыре вопроса: <b>кто</b> отвечает, <b>что</b> сделать, <b>в каком виде</b> вернуть результат и <b>на что опираться</b>.</p><ul><li><b>Роль:</b> «Ты юрист-аналитик».</li><li><b>Задача:</b> «Найди сумму, срок и штраф».</li><li><b>Формат:</b> «Верни только JSON с полями…».</li><li><b>Пример:</b> покажите образец правильного ответа.</li></ul>`),
      code('Промпт', `Ты юрист-аналитик.\nНайди в тексте договора сумму, срок и размер пени.\nВерни ТОЛЬКО JSON без пояснений:\n{"amount": число в сумах, "deadline": "ГГГГ-ММ-ДД", "penalty": число в процентах}\n\nТекст договора:\n<<<сюда вставляется договор>>>`),
      call('tip', 'Совет', 'Пишите формат так, чтобы его можно было проверить программой. «Число» лучше, чем «укажи размер», а «ГГГГ-ММ-ДД» лучше, чем «укажи дату».'),
      call('error', 'Частая ошибка', '«Сделай красиво» — модель не знает, что для вас «красиво». Опишите результат конкретно: длина, структура, тон, что нельзя добавлять.'),
      quiz('q-p2', 'Какой фрагмент промпта лучше всего задаёт формат ответа?', [
        ['«Ответь понятно»', false, 'Слишком размыто: каждый поймёт «понятно» по-своему.'],
        ['«Верни только JSON с полями amount, deadline, penalty»', true, 'Да: формат однозначный, его легко проверить кодом.'],
        ['«Пиши как профессионал»', false, 'Это про тон, а не про формат результата.']])
    ] },
    en: { min: 15, blocks: [
      txt(`<h2>Anatomy of a good prompt</h2><p>A good prompt answers four questions: <b>who</b> is answering, <b>what</b> to do, <b>in what form</b> to return the result and <b>what to rely on</b>.</p><ul><li><b>Role:</b> “You are a legal analyst.”</li><li><b>Task:</b> “Find the amount, deadline and penalty.”</li><li><b>Format:</b> “Return only JSON with the fields…”.</li><li><b>Example:</b> show a sample of a correct answer.</li></ul>`),
      code('Prompt', `You are a legal analyst.\nFind the amount, the deadline and the penalty rate in the contract.\nReturn ONLY JSON with no explanation:\n{"amount": number in UZS, "deadline": "YYYY-MM-DD", "penalty": number in percent}\n\nContract text:\n<<<the contract goes here>>>`),
      call('tip', 'Tip', 'Describe the format so a program can check it. “A number” beats “state the size”, and “YYYY-MM-DD” beats “give the date”.'),
      call('error', 'Common mistake', '“Make it nice” — the model doesn’t know what “nice” means to you. Describe the result concretely: length, structure, tone, what not to add.'),
      quiz('q-p2', 'Which prompt fragment best defines the answer format?', [
        ['“Answer clearly”', false, 'Too vague: everyone reads “clearly” differently.'],
        ['“Return only JSON with the fields amount, deadline, penalty”', true, 'Yes: the format is unambiguous and easy to check with code.'],
        ['“Write like a professional”', false, 'That’s about tone, not the result format.']])
    ] }
  },
  p3: {
    uz: { min: 20, blocks: [
      txt(`<h2>Topshiriq: shartnomadan maʼlumot</h2><p>Shartnomadan summa, muddat va penya miqdorini topib, ularni JSON koʻrinishida qaytaradigan prompt yozing.</p><p>Muhim: tekshiruvda promptingiz boshqa raqamlarga ega <b>yashirin shartnomada</b> ham ishga tushiriladi. Shuning uchun prompt faqat shu misolga emas, istalgan shartnomaga mos boʻlishi kerak.</p>`),
      call('example', 'Tekshiruv mezonlari', 'Toʻgʻri JSON · <code>amount</code> — soʻmdagi son · <code>deadline</code> — YYYY-MM-DD formatidagi sana · <code>penalty</code> — foizdagi son (masalan, 0.1). Tekshiruvni SI emas, kod bajaradi: baho doim bir xil va tushunarli.'),
      { t: 'sandbox', id: 'sb-p3', req: true }
    ] },
    ru: { min: 20, blocks: [
      txt(`<h2>Задание: данные из договора</h2><p>Напишите промпт, который достаёт из договора сумму, срок и размер пени и возвращает их в JSON.</p><p>Важно: при проверке ваш промпт запустится ещё и на <b>скрытом договоре</b> с другими цифрами. Поэтому промпт должен работать на любом договоре, а не подгоняться под этот.</p>`),
      call('example', 'Критерии проверки', 'Валидный JSON · <code>amount</code> — число в сумах · <code>deadline</code> — дата в формате ГГГГ-ММ-ДД · <code>penalty</code> — число в процентах (например, 0.1). Проверяет код, а не ИИ: оценка всегда одинаковая и объяснимая.'),
      { t: 'sandbox', id: 'sb-p3', req: true }
    ] },
    en: { min: 20, blocks: [
      txt(`<h2>Task: data from a contract</h2><p>Write a prompt that extracts the amount, the deadline and the penalty rate from a contract and returns them as JSON.</p><p>Important: during checking your prompt also runs on a <b>hidden contract</b> with different numbers. So it must work on any contract, not just this one.</p>`),
      call('example', 'Checking criteria', 'Valid JSON · <code>amount</code> — a number in UZS · <code>deadline</code> — a date in YYYY-MM-DD · <code>penalty</code> — a number in percent (e.g. 0.1). Code checks the answer, not AI, so the score is always consistent and explainable.'),
      { t: 'sandbox', id: 'sb-p3', req: true }
    ] }
  },

  /* ---------------- ChatGPT для работы ---------------- */
  w1: {
    uz: { min: 10, blocks: [
      txt(`<h2>Vazifaga mos assistentni tanlaymiz</h2><p>Mashhur SI-assistentlar oʻxshash, lekin har birining kuchli tomoni bor. Toʻgʻri tanlov vaqtni tejaydi.</p><table><tr><th>Assistent</th><th>Kuchli tomoni</th></tr><tr><td>ChatGPT</td><td>Universal: matnlar, jadvallar, rasmlar, ovoz</td></tr><tr><td>Claude</td><td>Uzun hujjatlar, aniq va puxta matnlar</td></tr><tr><td>Gemini</td><td>Google xizmatlari bilan ishlash, qidiruv</td></tr></table>`),
      call('tip', 'Qanday tanlash kerak', 'Bitta real vazifani uchala assistentga bering va natijani solishtiring. 10 daqiqada qaysi biri sizga mosligini koʻrasiz.'),
      call('important', 'Maxfiylik', 'Ishdagi maxfiy maʼlumotlarni (mijozlar bazasi, parollar) shaxsiy akkauntdagi assistentga yuklamang. Kompaniya siyosatini oldindan bilib oling.'),
      quiz('q-w1', '120 betlik shartnomani tahlil qilish kerak. Nima muhimroq?', [
        ['Assistent rasm chiza olishi', false, 'Bu vazifa uchun rasm chizish kerak emas.'],
        ['Assistent uzun hujjatlar bilan yaxshi ishlashi', true, 'Toʻgʻri! Uzun hujjat uchun katta kontekst va puxtalik muhim.'],
        ['Interfeys rangi', false, 'Bu natijaga taʼsir qilmaydi.']])
    ] },
    ru: { min: 10, blocks: [
      txt(`<h2>Выбираем ассистента под задачу</h2><p>Популярные ИИ-ассистенты похожи, но у каждого есть сильные стороны. Правильный выбор экономит время.</p><table><tr><th>Ассистент</th><th>Сильная сторона</th></tr><tr><td>ChatGPT</td><td>Универсальный: тексты, таблицы, картинки, голос</td></tr><tr><td>Claude</td><td>Длинные документы, точные и аккуратные тексты</td></tr><tr><td>Gemini</td><td>Работа с сервисами Google, поиск</td></tr></table>`),
      call('tip', 'Как выбрать', 'Дайте одну реальную задачу всем трём ассистентам и сравните результат. За 10 минут станет понятно, кто подходит именно вам.'),
      call('important', 'Конфиденциальность', 'Не загружайте рабочие секреты (базу клиентов, пароли) в ассистента на личном аккаунте. Заранее узнайте политику компании.'),
      quiz('q-w1', 'Нужно проанализировать договор на 120 страниц. Что важнее?', [
        ['Чтобы ассистент умел рисовать картинки', false, 'Для этой задачи рисование не нужно.'],
        ['Чтобы ассистент хорошо работал с длинными документами', true, 'Верно! Для длинного документа важны большой контекст и аккуратность.'],
        ['Цвет интерфейса', false, 'Это никак не влияет на результат.']])
    ] },
    en: { min: 10, blocks: [
      txt(`<h2>Choosing the right assistant</h2><p>Popular AI assistants are similar, but each has strengths. The right choice saves time.</p><table><tr><th>Assistant</th><th>Strength</th></tr><tr><td>ChatGPT</td><td>All-rounder: text, spreadsheets, images, voice</td></tr><tr><td>Claude</td><td>Long documents, precise and careful writing</td></tr><tr><td>Gemini</td><td>Google services, search</td></tr></table>`),
      call('tip', 'How to choose', 'Give the same real task to all three assistants and compare the results. In 10 minutes you’ll see which one suits you.'),
      call('important', 'Privacy', 'Don’t upload work secrets (customer lists, passwords) to an assistant on a personal account. Check your company policy first.'),
      quiz('q-w1', 'You need to analyse a 120-page contract. What matters most?', [
        ['The assistant can draw pictures', false, 'Drawing isn’t needed for this task.'],
        ['The assistant handles long documents well', true, 'Correct! Long documents need a large context and care.'],
        ['The interface colour', false, 'That doesn’t affect the result.']])
    ] }
  },
  w2: {
    uz: { min: 12, blocks: [
      txt(`<h2>Xat va hisobotlar bir necha daqiqada</h2><p>Ish xati uchun assistentga uchta narsani ayting: <b>kimga</b> yozilyapti, <b>maqsad</b> nima va <b>ohang</b> qanday boʻlishi kerak. Qolganini u oʻzi tuzadi.</p>`),
      code('Prompt', `Yetkazib beruvchiga xat yoz.\nMaqsad: yetkazib berish 3 kunga kechikkani uchun chegirma soʻrash.\nOhang: xushmuomala, lekin qatʼiy.\nHajmi: 5–6 jumla. Oxirida — javob muddati.`),
      call('tip', 'Hisobot uchun', 'Xom maʼlumotlarni (raqamlar, qaydlar) joylashtiring va soʻrang: “Rahbar uchun 5 banddan iborat qisqa xulosa tuz, eng muhimini birinchi yoz”.'),
      call('error', 'Xato', 'Tayyor matnni tekshirmasdan yubormang: raqamlar, ismlar va sanalarni doim solishtiring.'),
      quiz('q-w2', 'Qaysi prompt yaxshiroq xat beradi?', [
        ['“Xat yoz”', false, 'Kimga, nima uchun va qanday ohangda — nomaʼlum.'],
        ['“Mijozga toʻlov kechikkani haqida xushmuomala eslatma yoz, 4 jumla”', true, 'Ha: adresat, maqsad, ohang va hajm koʻrsatilgan.'],
        ['“Yaxshi xat yoz, iltimos”', false, 'Xushmuomalalik yaxshi, lekin aniqlik yetishmaydi.']])
    ] },
    ru: { min: 12, blocks: [
      txt(`<h2>Письма и отчёты за минуты</h2><p>Для делового письма скажите ассистенту три вещи: <b>кому</b> пишем, какая <b>цель</b> и какой нужен <b>тон</b>. Остальное он сформулирует сам.</p>`),
      code('Промпт', `Напиши письмо поставщику.\nЦель: попросить скидку из-за задержки поставки на 3 дня.\nТон: вежливый, но твёрдый.\nОбъём: 5–6 предложений. В конце — срок ответа.`),
      call('tip', 'Для отчёта', 'Вставьте сырые данные (цифры, заметки) и попросите: «Составь краткое резюме для руководителя из 5 пунктов, самое важное — первым».'),
      call('error', 'Ошибка', 'Не отправляйте готовый текст без проверки: всегда сверяйте цифры, имена и даты.'),
      quiz('q-w2', 'Какой промпт даст лучшее письмо?', [
        ['«Напиши письмо»', false, 'Непонятно, кому, зачем и каким тоном.'],
        ['«Напиши клиенту вежливое напоминание о просроченной оплате, 4 предложения»', true, 'Да: указаны адресат, цель, тон и объём.'],
        ['«Напиши хорошее письмо, пожалуйста»', false, 'Вежливость не мешает, но конкретики нет.']])
    ] },
    en: { min: 12, blocks: [
      txt(`<h2>Emails and reports in minutes</h2><p>For a business email, tell the assistant three things: <b>who</b> it’s for, the <b>goal</b> and the <b>tone</b>. It will handle the wording.</p>`),
      code('Prompt', `Write an email to a supplier.\nGoal: ask for a discount because delivery was 3 days late.\nTone: polite but firm.\nLength: 5–6 sentences. End with a reply deadline.`),
      call('tip', 'For a report', 'Paste raw data (numbers, notes) and ask: “Write a 5-point summary for a manager, most important first.”'),
      call('error', 'Mistake', 'Never send generated text unchecked: always verify numbers, names and dates.'),
      quiz('q-w2', 'Which prompt produces the better email?', [
        ['“Write an email”', false, 'It’s unclear who it’s for, why, and in what tone.'],
        ['“Write a polite reminder to a client about an overdue payment, 4 sentences”', true, 'Yes: recipient, goal, tone and length are all set.'],
        ['“Write a good email, please”', false, 'Politeness is fine, but there’s nothing concrete.']])
    ] }
  },

  /* ---------------- ИИ для бизнеса ---------------- */
  m1: {
    uz: { min: 12, blocks: [
      txt(`<h2>Bir soatda kontent-reja</h2><p>SI bir oylik kontent-rejani tez tuzadi, agar unga biznesingiz haqida yetarli kontekst bersangiz: mahsulot, auditoriya, maqsad va platforma.</p>`),
      code('Prompt', `Sen SMM-mutaxassisisan.\nBiznes: Toshkentdagi bolalar ingliz tili maktabi.\nAuditoriya: 5–12 yoshli bolalarning ota-onalari.\nMaqsad: bepul sinov darsiga yozilish.\nInstagram uchun 4 haftalik kontent-reja tuz: jadval — sana, mavzu, format (post/reels/stories), qisqa gʻoya.`),
      call('tip', 'Natijani yaxshilash', 'Rejani olgach, soʻrang: “Qaysi 5 ta post eng koʻp yozilish olib keladi va nega?” — model oʻz rejasini tanqidiy koʻrib chiqadi.'),
      quiz('q-m1', 'Kontent-reja uchun promptda nima eng muhim?', [
        ['Biznes, auditoriya va maqsad haqida kontekst', true, 'Toʻgʻri! Kontekstsiz model umumiy, foydasiz reja beradi.'],
        ['Iloji boricha qisqa prompt', false, 'Qisqa prompt — kam kontekst va umumiy natija.'],
        ['Emoji soni', false, 'Bu reja sifatiga taʼsir qilmaydi.']])
    ] },
    ru: { min: 12, blocks: [
      txt(`<h2>Контент-план за час</h2><p>ИИ быстро составит контент-план на месяц, если дать ему достаточно контекста о бизнесе: продукт, аудитория, цель и площадка.</p>`),
      code('Промпт', `Ты SMM-специалист.\nБизнес: детская школа английского в Ташкенте.\nАудитория: родители детей 5–12 лет.\nЦель: запись на бесплатный пробный урок.\nСоставь контент-план для Instagram на 4 недели: таблица — дата, тема, формат (пост/reels/stories), короткая идея.`),
      call('tip', 'Улучшаем результат', 'Получив план, спросите: «Какие 5 постов принесут больше всего записей и почему?» — модель критически пересмотрит свой план.'),
      quiz('q-m1', 'Что важнее всего в промпте для контент-плана?', [
        ['Контекст о бизнесе, аудитории и цели', true, 'Верно! Без контекста модель выдаст общий и бесполезный план.'],
        ['Как можно более короткий промпт', false, 'Короткий промпт — мало контекста и общий результат.'],
        ['Количество эмодзи', false, 'На качество плана это не влияет.']])
    ] },
    en: { min: 12, blocks: [
      txt(`<h2>A content plan in one hour</h2><p>AI can quickly build a month-long content plan if you give it enough business context: product, audience, goal and platform.</p>`),
      code('Prompt', `You are a social media marketer.\nBusiness: a kids’ English school in Tashkent.\nAudience: parents of children aged 5–12.\nGoal: sign-ups for a free trial lesson.\nCreate a 4-week Instagram content plan: a table with date, topic, format (post/reel/story), short idea.`),
      call('tip', 'Improve the result', 'Once you have the plan, ask: “Which 5 posts will bring the most sign-ups, and why?” — the model will critically review its own plan.'),
      quiz('q-m1', 'What matters most in a content-plan prompt?', [
        ['Context about the business, audience and goal', true, 'Correct! Without context the model gives a generic, useless plan.'],
        ['Keeping the prompt as short as possible', false, 'A short prompt means little context and a generic result.'],
        ['The number of emojis', false, 'That doesn’t affect the plan’s quality.']])
    ] }
  },
  m2: {
    uz: { min: 10, blocks: [
      txt(`<h2>Reklama matnlari</h2><p>Yaxshi reklama matni mijozning muammosidan boshlanadi, keyin yechim va aniq harakatga chaqiruv keladi. SI bir necha variantni tez yozadi — siz eng yaxshisini sinab koʻrasiz.</p>`),
      code('Prompt', `Mahsulot: ofis xodimlari uchun SI kursi.\nMuammo: xodimlar hisobotga haftasiga 5+ soat sarflaydi.\nTargetli reklama uchun 3 ta variant yoz:\n— sarlavha (40 belgigacha)\n— matn (125 belgigacha)\n— tugma uchun chaqiruv\nHar bir variant boshqa ilmoq bilan: vaqt, pul, raqobat.`),
      call('tip', 'A/B test', 'Bir vaqtning oʻzida 2–3 variantni ishga tushiring va kliklar boʻyicha solishtiring. SI gʻoya beradi, qaror — maʼlumotlarda.'),
      quiz('q-m2', 'Reklama matni nimadan boshlangani yaxshi?', [
        ['Kompaniya tarixidan', false, 'Mijoz uchun uning muammosi muhimroq.'],
        ['Mijozning muammosi yoki ogʻriqli nuqtasidan', true, 'Toʻgʻri! Muammo eʼtiborni tortadi, yechim — qiziqtiradi.'],
        ['Narxlar roʻyxatidan', false, 'Narx muhim, lekin avval qiymatni koʻrsatish kerak.']])
    ] },
    ru: { min: 10, blocks: [
      txt(`<h2>Тексты для рекламы</h2><p>Хороший рекламный текст начинается с проблемы клиента, затем — решение и чёткий призыв к действию. ИИ быстро напишет несколько вариантов — вы протестируете лучший.</p>`),
      code('Промпт', `Продукт: курс по ИИ для офисных сотрудников.\nПроблема: сотрудники тратят 5+ часов в неделю на отчёты.\nНапиши 3 варианта для таргетированной рекламы:\n— заголовок (до 40 символов)\n— текст (до 125 символов)\n— призыв для кнопки\nКаждый вариант с другим крючком: время, деньги, конкуренция.`),
      call('tip', 'A/B-тест', 'Запустите 2–3 варианта одновременно и сравните по кликам. ИИ даёт идеи, решение — по данным.'),
      quiz('q-m2', 'С чего лучше начинать рекламный текст?', [
        ['С истории компании', false, 'Клиенту важнее его собственная проблема.'],
        ['С проблемы или боли клиента', true, 'Верно! Проблема цепляет внимание, решение — вызывает интерес.'],
        ['С прайс-листа', false, 'Цена важна, но сначала нужно показать ценность.']])
    ] },
    en: { min: 10, blocks: [
      txt(`<h2>Ad copy</h2><p>Good ad copy starts with the customer’s problem, then offers a solution and a clear call to action. AI writes several variants quickly — you test the best one.</p>`),
      code('Prompt', `Product: an AI course for office staff.\nProblem: staff spend 5+ hours a week on reports.\nWrite 3 variants for a targeted ad:\n— headline (up to 40 characters)\n— body (up to 125 characters)\n— button call to action\nEach variant with a different hook: time, money, competition.`),
      call('tip', 'A/B test', 'Run 2–3 variants at once and compare clicks. AI gives ideas; data makes the decision.'),
      quiz('q-m2', 'How should ad copy ideally start?', [
        ['With the company history', false, 'Customers care more about their own problem.'],
        ['With the customer’s problem or pain point', true, 'Correct! The problem grabs attention; the solution builds interest.'],
        ['With the price list', false, 'Price matters, but show the value first.']])
    ] }
  },

  /* ---------------- Машинное обучение ---------------- */
  l1: {
    uz: { min: 15, blocks: [
      txt(`<h2>Chiziqli regressiya oddiy tilda</h2><p>Tasavvur qiling, siz Toshkentda kvartira sotasiz va narxni maydonga qarab taxmin qilmoqchisiz. Chiziqli regressiya grafikdagi nuqtalar orqali eng kam xato qiladigan toʻgʻri chiziq oʻtkazadi.</p>`),
      formula('ŷ = w · x + b', 'x — maydon, w — kvadrat metr narxi, b — boshlangʻich qoʻshimcha, ŷ — taxminiy narx'),
      call('tip', 'Intuitsiya', 'Oʻqitish — bu taxminlarning oʻrtacha xatosi eng kichik boʻlishi uchun w va b ni tanlash.'),
      formula('MSE = <span style="font-size:18px">1/n</span> · Σ (yᵢ − ŷᵢ)²', 'Oʻrtacha kvadratik xato: model oʻrtacha qanchalik adashadi'),
      code('Python', `from sklearn.linear_model import LinearRegression\n\narea  = [[45], [60], [72], [90]]        # maydon, m²\nprice = [520, 690, 820, 1010]           # narx, ming $\n\nmodel = LinearRegression().fit(area, price)\nprint(model.predict([[80]]))            # 80 m² uchun prognoz`),
      quiz('q-l1', 'Oʻqitish paytida model nimani tanlaydi?', [
        ['Kvartiralar maydonini', false, 'Maydon — kiruvchi maʼlumot, u maʼlum.'],
        ['w va b koeffitsiyentlarini', true, 'Toʻgʻri: model aynan shularni maʼlumotlar boʻyicha tanlaydi.'],
        ['Kvartiralar sonini', false, 'Bu tanlanma hajmi, model parametri emas.']])
    ] },
    ru: { min: 15, blocks: [
      txt(`<h2>Линейная регрессия на пальцах</h2><p>Представьте, что вы продаёте квартиры в Ташкенте и хотите предсказывать цену по площади. Линейная регрессия проводит через точки на графике прямую, которая ошибается меньше всего.</p>`),
      formula('ŷ = w · x + b', 'x — площадь, w — цена квадратного метра, b — базовая надбавка, ŷ — предсказанная цена'),
      call('tip', 'Интуиция', 'Обучение — это подбор w и b так, чтобы средняя ошибка предсказаний была минимальной.'),
      formula('MSE = <span style="font-size:18px">1/n</span> · Σ (yᵢ − ŷᵢ)²', 'Средняя квадратичная ошибка: насколько в среднем промахивается модель'),
      code('Python', `from sklearn.linear_model import LinearRegression\n\narea  = [[45], [60], [72], [90]]        # площадь, м²\nprice = [520, 690, 820, 1010]           # цена, тыс. $\n\nmodel = LinearRegression().fit(area, price)\nprint(model.predict([[80]]))            # прогноз для 80 м²`),
      quiz('q-l1', 'Что подбирает модель во время обучения?', [
        ['Площадь квартир', false, 'Площадь — это входные данные, они известны.'],
        ['Коэффициенты w и b', true, 'Верно: именно их модель подбирает по данным.'],
        ['Количество квартир', false, 'Это размер выборки, а не параметр модели.']])
    ] },
    en: { min: 15, blocks: [
      txt(`<h2>Linear regression in plain words</h2><p>Imagine you sell flats in Tashkent and want to predict price from floor area. Linear regression draws the straight line through the points on a chart that makes the smallest error.</p>`),
      formula('ŷ = w · x + b', 'x — area, w — price per square metre, b — base premium, ŷ — predicted price'),
      call('tip', 'Intuition', 'Training means choosing w and b so that the average prediction error is as small as possible.'),
      formula('MSE = <span style="font-size:18px">1/n</span> · Σ (yᵢ − ŷᵢ)²', 'Mean squared error: how far off the model is on average'),
      code('Python', `from sklearn.linear_model import LinearRegression\n\narea  = [[45], [60], [72], [90]]        # area, m²\nprice = [520, 690, 820, 1010]           # price, $ thousand\n\nmodel = LinearRegression().fit(area, price)\nprint(model.predict([[80]]))            # forecast for 80 m²`),
      quiz('q-l1', 'What does the model choose during training?', [
        ['The flats’ floor area', false, 'Area is the input; it’s already known.'],
        ['The coefficients w and b', true, 'Correct: those are what the model fits to the data.'],
        ['The number of flats', false, 'That’s the sample size, not a model parameter.']])
    ] }
  },
  l2: {
    uz: { min: 12, blocks: [
      txt(`<h2>Maʼlumotlar va belgilar</h2><p>Model faqat raqamlarni tushunadi. <b>Belgi</b> (feature) — obyektni tasvirlovchi xususiyat: kvartira uchun — maydon, qavat, tuman, xonalar soni. <b>Nishon</b> (target) — biz bashorat qilmoqchi boʻlgan narsa: narx.</p><table><tr><th>Maydon</th><th>Xonalar</th><th>Tuman</th><th>Narx (nishon)</th></tr><tr><td>45</td><td>2</td><td>Chilonzor</td><td>520</td></tr><tr><td>72</td><td>3</td><td>Yunusobod</td><td>820</td></tr></table>`),
      call('important', 'Muhim', 'Matnli belgilar (masalan, tuman) raqamga aylantiriladi — masalan, har bir tuman uchun alohida 0/1 ustun (one-hot).'),
      call('tip', 'Qoida', 'Model sifati koʻpincha algoritmdan emas, balki maʼlumotlar sifatidan bogʻliq: boʻsh qiymatlar, xatolar va dublikatlarni tozalang.'),
      quiz('q-l2', 'Kvartira narxini bashorat qilishda “narx” nima hisoblanadi?', [
        ['Belgi (feature)', false, 'Belgilar — kiruvchi maʼlumotlar: maydon, qavat va h.k.'],
        ['Nishon (target)', true, 'Toʻgʻri! Biz aynan narxni bashorat qilamiz.'],
        ['Model parametri', false, 'Parametrlar — modelning oʻz koeffitsiyentlari.']])
    ] },
    ru: { min: 12, blocks: [
      txt(`<h2>Данные и признаки</h2><p>Модель понимает только числа. <b>Признак</b> (feature) — свойство, которое описывает объект: для квартиры — площадь, этаж, район, количество комнат. <b>Целевая переменная</b> (target) — то, что мы хотим предсказать: цена.</p><table><tr><th>Площадь</th><th>Комнат</th><th>Район</th><th>Цена (цель)</th></tr><tr><td>45</td><td>2</td><td>Чиланзар</td><td>520</td></tr><tr><td>72</td><td>3</td><td>Юнусабад</td><td>820</td></tr></table>`),
      call('important', 'Важно', 'Текстовые признаки (например, район) переводят в числа — например, отдельный столбец 0/1 для каждого района (one-hot).'),
      call('tip', 'Правило', 'Качество модели чаще зависит не от алгоритма, а от качества данных: чистите пропуски, ошибки и дубликаты.'),
      quiz('q-l2', 'Что такое «цена» в задаче прогноза стоимости квартиры?', [
        ['Признак (feature)', false, 'Признаки — это входные данные: площадь, этаж и т. д.'],
        ['Целевая переменная (target)', true, 'Верно! Именно цену мы и предсказываем.'],
        ['Параметр модели', false, 'Параметры — это собственные коэффициенты модели.']])
    ] },
    en: { min: 12, blocks: [
      txt(`<h2>Data and features</h2><p>A model only understands numbers. A <b>feature</b> is a property that describes an object: for a flat — area, floor, district, number of rooms. The <b>target</b> is what we want to predict: the price.</p><table><tr><th>Area</th><th>Rooms</th><th>District</th><th>Price (target)</th></tr><tr><td>45</td><td>2</td><td>Chilanzar</td><td>520</td></tr><tr><td>72</td><td>3</td><td>Yunusabad</td><td>820</td></tr></table>`),
      call('important', 'Important', 'Text features (like district) are turned into numbers — for example, a separate 0/1 column for each district (one-hot).'),
      call('tip', 'Rule of thumb', 'Model quality often depends less on the algorithm than on data quality: clean up gaps, errors and duplicates.'),
      quiz('q-l2', 'In a flat-price prediction task, what is “price”?', [
        ['A feature', false, 'Features are the inputs: area, floor and so on.'],
        ['The target', true, 'Correct! Price is exactly what we predict.'],
        ['A model parameter', false, 'Parameters are the model’s own coefficients.']])
    ] }
  },

  /* ---------------- Агенты ---------------- */
  g1: {
    uz: { min: 10, blocks: [
      txt(`<h2>SI-agent nima</h2><p>Oddiy chat-bot faqat javob beradi. <b>Agent</b> esa maqsadga erishish uchun oʻzi harakat qiladi: reja tuzadi, vositalardan foydalanadi (qidiruv, jadval, pochta), natijani tekshiradi va kerak boʻlsa qadamni takrorlaydi.</p>`),
      call('example', 'Misol', '“Ertangi uchrashuvlarimni tekshirib, har bir mijozga eslatma yubor” — agent kalendarni ochadi, roʻyxatni oladi, xatlar yozadi va yuboradi.'),
      txt(`<h3>Agent sikli</h3><ul><li><b>Kuzatish</b> — vaziyatni va maqsadni tushunish.</li><li><b>Reja</b> — keyingi qadamni tanlash.</li><li><b>Harakat</b> — vositani chaqirish.</li><li><b>Tekshiruv</b> — natija maqsadga yaqinlashtirdimi?</li></ul>`),
      quiz('q-g1', 'Agentni oddiy chat-botdan nima ajratib turadi?', [
        ['Chiroyliroq javob berishi', false, 'Gap javob uslubida emas.'],
        ['Maqsad sari mustaqil harakat qilishi va vositalardan foydalanishi', true, 'Toʻgʻri! Agent reja tuzadi va harakat qiladi.'],
        ['Faqat ingliz tilida ishlashi', false, 'Til bunga aloqador emas.']])
    ] },
    ru: { min: 10, blocks: [
      txt(`<h2>Что такое ИИ-агент</h2><p>Обычный чат-бот только отвечает. <b>Агент</b> сам действует, чтобы достичь цели: составляет план, пользуется инструментами (поиск, таблицы, почта), проверяет результат и при необходимости повторяет шаг.</p>`),
      call('example', 'Пример', '«Проверь мои встречи на завтра и отправь каждому клиенту напоминание» — агент открывает календарь, берёт список, пишет и отправляет письма.'),
      txt(`<h3>Цикл агента</h3><ul><li><b>Наблюдение</b> — понять ситуацию и цель.</li><li><b>План</b> — выбрать следующий шаг.</li><li><b>Действие</b> — вызвать инструмент.</li><li><b>Проверка</b> — приблизил ли результат к цели?</li></ul>`),
      quiz('q-g1', 'Чем агент отличается от обычного чат-бота?', [
        ['Отвечает красивее', false, 'Дело не в стиле ответа.'],
        ['Самостоятельно действует ради цели и использует инструменты', true, 'Верно! Агент планирует и действует.'],
        ['Работает только на английском', false, 'Язык здесь ни при чём.']])
    ] },
    en: { min: 10, blocks: [
      txt(`<h2>What an AI agent is</h2><p>A plain chatbot only answers. An <b>agent</b> acts on its own to reach a goal: it plans, uses tools (search, spreadsheets, email), checks the result and repeats a step if needed.</p>`),
      call('example', 'Example', '“Check my meetings for tomorrow and send each client a reminder” — the agent opens the calendar, gets the list, writes the emails and sends them.'),
      txt(`<h3>The agent loop</h3><ul><li><b>Observe</b> — understand the situation and the goal.</li><li><b>Plan</b> — choose the next step.</li><li><b>Act</b> — call a tool.</li><li><b>Check</b> — did the result move us closer to the goal?</li></ul>`),
      quiz('q-g1', 'What sets an agent apart from a plain chatbot?', [
        ['It answers more nicely', false, 'It’s not about answer style.'],
        ['It acts independently towards a goal and uses tools', true, 'Correct! An agent plans and acts.'],
        ['It only works in English', false, 'Language has nothing to do with it.']])
    ] }
  },
  g2: {
    uz: { min: 12, blocks: [
      txt(`<h2>Agent vositalari va harakatlari</h2><p>Vosita (tool) — agent chaqira oladigan funksiya: “ob-havoni bilish”, “jadvalga qator qoʻshish”, “xat yuborish”. Model har bir vositaning tavsifini oʻqiydi va qachon qaysi birini chaqirishni oʻzi hal qiladi.</p>`),
      code('JSON', `{\n  "name": "add_lead",\n  "description": "Yangi arizani CRM jadvaliga qoʻshadi",\n  "parameters": {\n    "name":  { "type": "string" },\n    "phone": { "type": "string" },\n    "course": { "type": "string" }\n  }\n}`),
      call('tip', 'Yaxshi tavsif', 'Vosita tavsifi — model uchun yoʻriqnoma. Uni aniq yozing: nima qiladi, qachon ishlatiladi, qanday parametrlar kerak.'),
      call('error', 'Xavf', 'Agentga faqat kerakli huquqlarni bering. Masalan, arizalar botiga maʼlumotlarni oʻchirish huquqi kerak emas.'),
      quiz('q-g2', 'Model qaysi vositani chaqirishni qanday biladi?', [
        ['Tasodifiy tanlaydi', false, 'Yoʻq, tanlov tasodifiy emas.'],
        ['Vositalar tavsifini oʻqiydi va vazifaga moslashtiradi', true, 'Toʻgʻri! Shuning uchun aniq tavsif juda muhim.'],
        ['Har doim barcha vositalarni chaqiradi', false, 'Bu sekin va xavfli boʻlardi.']])
    ] },
    ru: { min: 12, blocks: [
      txt(`<h2>Инструменты и действия агента</h2><p>Инструмент (tool) — функция, которую агент может вызвать: «узнать погоду», «добавить строку в таблицу», «отправить письмо». Модель читает описание каждого инструмента и сама решает, когда какой вызвать.</p>`),
      code('JSON', `{\n  "name": "add_lead",\n  "description": "Добавляет новую заявку в таблицу CRM",\n  "parameters": {\n    "name":  { "type": "string" },\n    "phone": { "type": "string" },\n    "course": { "type": "string" }\n  }\n}`),
      call('tip', 'Хорошее описание', 'Описание инструмента — это инструкция для модели. Пишите чётко: что делает, когда использовать, какие нужны параметры.'),
      call('error', 'Риск', 'Давайте агенту только необходимые права. Например, боту для заявок не нужно право удалять данные.'),
      quiz('q-g2', 'Как модель понимает, какой инструмент вызвать?', [
        ['Выбирает случайно', false, 'Нет, выбор не случайный.'],
        ['Читает описания инструментов и сопоставляет с задачей', true, 'Верно! Поэтому чёткое описание так важно.'],
        ['Всегда вызывает все инструменты', false, 'Это было бы медленно и опасно.']])
    ] },
    en: { min: 12, blocks: [
      txt(`<h2>Agent tools and actions</h2><p>A tool is a function the agent can call: “get the weather”, “add a row to a spreadsheet”, “send an email”. The model reads each tool’s description and decides on its own when to call which.</p>`),
      code('JSON', `{\n  "name": "add_lead",\n  "description": "Adds a new lead to the CRM spreadsheet",\n  "parameters": {\n    "name":  { "type": "string" },\n    "phone": { "type": "string" },\n    "course": { "type": "string" }\n  }\n}`),
      call('tip', 'A good description', 'A tool description is an instruction for the model. Be precise: what it does, when to use it, which parameters it needs.'),
      call('error', 'Risk', 'Give an agent only the permissions it needs. A lead-collecting bot, for example, doesn’t need permission to delete data.'),
      quiz('q-g2', 'How does the model know which tool to call?', [
        ['It picks at random', false, 'No, the choice isn’t random.'],
        ['It reads the tool descriptions and matches them to the task', true, 'Correct! That’s why a clear description matters so much.'],
        ['It always calls every tool', false, 'That would be slow and risky.']])
    ] }
  }
};
