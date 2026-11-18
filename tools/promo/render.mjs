// Рендер рекламного ролика из promo.html: кадр за кадром через Edge/Chrome, затем ffmpeg.
//   node tools/promo/render.mjs                       — все языки и форматы
//   node tools/promo/render.mjs --lang=uz --fmt=v     — один вариант (v = 9:16, h = 16:9)
//   node tools/promo/render.mjs --preview=3,9.8,17.6  — только кадры в PNG для проверки
// Переменные: BROWSER (путь к Edge/Chrome), FFMPEG (путь к ffmpeg), OUT (папка результата), WORK (временная папка).
import puppeteer from 'puppeteer-core';
import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..');
const arg = (k, d) => (process.argv.find((a) => a.startsWith(`--${k}=`)) || '').split('=')[1] || d;
const LANGS = arg('lang', 'uz,ru,en').split(',');
const FMTS = arg('fmt', 'v,h').split(',');
const FPS = Number(arg('fps', 30));
const PREVIEW = arg('preview', '');
const BROWSER = process.env.BROWSER || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const FFMPEG = process.env.FFMPEG || 'ffmpeg';
const OUT = process.env.OUT || path.join(ROOT, 'public', 'media');
const WORK = process.env.WORK || path.join(os.tmpdir(), 'aimaster-promo');
const SIZE = { v: [1080, 1920], h: [1920, 1080] };

fs.mkdirSync(WORK, { recursive: true });
const port = 9300 + Math.floor(Math.random() * 400);
const edge = spawn(BROWSER, ['--headless=new', '--disable-gpu', '--no-first-run', '--mute-audio', '--hide-scrollbars', `--remote-debugging-port=${port}`, `--user-data-dir=${path.join(WORK, 'profile')}`, 'about:blank'], { stdio: 'ignore' });
let browser;
for (let i = 0; i < 60 && !browser; i++) { try { browser = await puppeteer.connect({ browserURL: `http://127.0.0.1:${port}` }); } catch { await new Promise((r) => setTimeout(r, 250)); } }
if (!browser) { console.error('Не удалось запустить браузер'); process.exit(1); }

try {
  for (const lang of LANGS) for (const fmt of FMTS) {
    const [w, h] = SIZE[fmt];
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
    await page.goto(pathToFileURL(path.join(HERE, 'promo.html')).href + `?lang=${lang}&fmt=${fmt}`, { waitUntil: 'networkidle0' });
    // прогрев: рисуем все сцены, чтобы браузер подгрузил все шрифты и начертания
    for (const x of [0.5, 4.5, 9.9, 17.6, 24.6, 27]) await page.evaluate((y) => window.setT(y), x);
    await page.evaluate(() => document.fonts.ready);
    await new Promise((res) => setTimeout(res, 300));
    const dur = await page.evaluate(() => window.DUR);
    if (PREVIEW) {
      for (const t of PREVIEW.split(',').map(Number)) {
        await page.evaluate((x) => window.setT(x), t);
        const f = path.join(WORK, `preview-${lang}-${fmt}-${t}.png`);
        await page.screenshot({ path: f, type: 'png' });
        console.log('preview', f);
      }
      await page.close(); continue;
    }
    const dir = path.join(WORK, `frames-${lang}-${fmt}`);
    fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir, { recursive: true });
    const total = Math.round(dur * FPS); const t0 = Date.now();
    for (let i = 0; i < total; i++) {
      await page.evaluate((x) => window.setT(x), i / FPS);
      await page.screenshot({ path: path.join(dir, String(i).padStart(5, '0') + '.jpg'), type: 'jpeg', quality: 92 });
      if (i % 150 === 0) console.log(`${lang}/${fmt}: ${i}/${total}`);
    }
    await page.close();
    const music = path.join(HERE, 'music.wav');
    const out = path.join(OUT, `promo-${lang}-${fmt === 'v' ? '9x16' : '16x9'}.mp4`);
    const r = spawnSync(FFMPEG, ['-hide_banner', '-loglevel', 'error', '-y', '-framerate', String(FPS), '-i', path.join(dir, '%05d.jpg'), '-i', music,
      '-c:v', 'libx264', '-preset', 'medium', '-crf', fmt === 'v' ? '20' : '21', '-vf', 'scale=in_range=pc:out_range=tv,format=yuv420p', '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-r', String(FPS),
      '-c:a', 'aac', '-b:a', '160k', '-ar', '48000', '-ac', '2', '-af', `afade=t=in:d=0.4,afade=t=out:st=${dur - 2}:d=2`, '-shortest', '-movflags', '+faststart', out], { stdio: 'inherit' });
    if (r.status !== 0) throw new Error('ffmpeg завершился с ошибкой');
    fs.rmSync(dir, { recursive: true, force: true });
    console.log(`готово: ${out} (${((Date.now() - t0) / 1000).toFixed(0)} с)`);
  }
} finally {
  await browser.close().catch(() => {});
  edge.kill();
}
