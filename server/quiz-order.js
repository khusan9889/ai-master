// Позиция правильного ответа в тесте: детерминированно зависит от id вопроса,
// одинакова во всех языках и распределяется по A/B/C, а не стоит всегда на одном месте.

function hash(s) { let h = 5381; for (const ch of String(s)) h = ((h * 33) ^ ch.charCodeAt(0)) >>> 0; return h; }

function placeCorrect(id, opts) {
  if (!Array.isArray(opts) || opts.length < 2) return opts;
  const ci = opts.findIndex((o) => o && o.ok);
  if (ci < 0) return opts;
  const target = hash('aim2:' + id) % opts.length;
  if (ci === target) return opts;
  const rest = opts.filter((_, i) => i !== ci);
  rest.splice(target, 0, opts[ci]);
  return rest;
}

// Переставляет ответы во всех тестах урока (по всем языкам). Повторный вызов ничего не меняет.
function rebalanceLesson(lesson) {
  if (!lesson) return lesson;
  const fix = (L) => { if (L && Array.isArray(L.blocks)) for (const b of L.blocks) if (b.t === 'quiz') b.opts = placeCorrect(b.id, b.opts); };
  if (lesson.blocks) fix(lesson); else for (const k of Object.keys(lesson)) fix(lesson[k]);
  return lesson;
}

module.exports = { placeCorrect, rebalanceLesson };
