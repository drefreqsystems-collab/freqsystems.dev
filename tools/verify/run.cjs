// Local verification of step 03 — the live 3D transfer as the Home page's primary experience.
// CDN scripts are served from the npm tarballs of the same pinned versions; images are test fixtures.
// Headless Chromium renders WebGL through SwiftShader, so frame rates here are far below a real GPU;
// the checks read the model's own state instead of timing anything.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const HERE = __dirname;
const V = path.join(HERE, 'vendor');
const OUT = path.join(HERE, 'out');
const LUC = fs.readFileSync(path.join(V, 'lucide.version'), 'utf8').trim();
const CDN = {
  'https://unpkg.com/react@18.3.1/umd/react.production.min.js': 'react-18.3.1/package/umd/react.production.min.js',
  'https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js': 'react-dom-18.3.1/package/umd/react-dom.production.min.js',
  'https://unpkg.com/lucide@latest/dist/umd/lucide.min.js': `lucide-${LUC}/package/dist/umd/lucide.min.js`,
};
const AFTER = 'http://127.0.0.1:8123/';
const BEFORE = 'http://127.0.0.1:8124/';
const GL = ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'];
const H1 = 'Cargo decisions, grounded in vessel state.';

async function newPage(browser, opts = {}) {
  const context = await browser.newContext({ viewport: opts.viewport || { width: 1440, height: 900 }, reducedMotion: opts.reducedMotion || 'no-preference', deviceScaleFactor: 1 });
  await context.route('https://unpkg.com/**', route => {
    const url = route.request().url();
    let f = CDN[url];
    const m = url.match(/^https:\/\/unpkg\.com\/three@0\.169\.0\/(.*)$/);
    if (m) f = 'three-0.169.0/package/' + m[1];
    if (!f || !fs.existsSync(path.join(V, f))) return route.fulfill({ status: 404, body: '' });
    return route.fulfill({ status: 200, contentType: 'application/javascript; charset=utf-8', headers: { 'access-control-allow-origin': '*' }, body: fs.readFileSync(path.join(V, f)) });
  });
  await context.route(/fonts\.(googleapis|gstatic)\.com/, route => route.fulfill({ status: 200, contentType: 'text/css', headers: { 'access-control-allow-origin': '*' }, body: '' }));
  const page = await context.newPage();
  const log = [];
  page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') log.push(`[console.${m.type()}] ${m.text()}`); });
  page.on('pageerror', e => log.push(`[pageerror] ${e.message}`));
  page.on('response', r => { if (r.status() >= 400) log.push(`[http ${r.status()}] ${r.url().replace(/^http:\/\/127\.0\.0\.1:\d+\//, '/')}`); });
  return { context, page, log };
}

const hud = page => page.evaluate(() => {
  const el = document.querySelector('harbor-motion');
  const s = el && el.snapshot ? el.snapshot() : null;
  const box = document.querySelector('.freq-mh-hud');
  return { snap: s, hudText: box ? box.innerText.replace(/\s+/g, ' ') : null, width: document.documentElement.scrollWidth };
});

async function waitModel(page, ms = 90000) {
  await page.waitForFunction(() => {
    const t = document.querySelector('.freq-mh-label');
    return (t && !/Loading the model/.test(t.textContent)) || document.querySelector('.freq-mh-fallback');
  }, null, { timeout: ms });
}

(async () => {
  const R = { steps: [], logs: {} };
  const ok = (name, pass, detail) => { R.steps.push({ name, pass: !!pass, detail }); console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? '  — ' + detail : ''}`); };
  const browser = await chromium.launch({ args: GL });

  // 1. Home, desktop: the live model is the hero and it is actually moving cargo.
  {
    const { context, page, log } = await newPage(browser, { viewport: { width: 1440, height: 900 } });
    await page.goto(AFTER + '?hmq=high', { waitUntil: 'load' });
    await page.getByText(H1).waitFor({ timeout: 30000 });
    await waitModel(page);
    const heroBox = await page.locator('section.freq-mh').boundingBox();
    const stageBox = await page.locator('harbor-motion canvas').boundingBox();
    ok('Home hero is the live 3D stage (canvas fills the hero)', stageBox && heroBox && stageBox.width >= heroBox.width - 1 && stageBox.height >= heroBox.height - 1,
      `hero ${Math.round(heroBox.width)}×${Math.round(heroBox.height)}, canvas ${stageBox && Math.round(stageBox.width)}×${stageBox && Math.round(stageBox.height)}`);
    const noRing = await page.locator('svg[aria-label^="Six-phase cargo transfer workflow"]').count();
    ok('Six-phase ring no longer in the hero', noRing === 0, `${noRing} rings`);
    const a = await hud(page);
    await page.screenshot({ path: path.join(OUT, '03_home_1440.png') });
    // let it run, then read the ledger again
    await page.waitForTimeout(25000);
    const b = await hud(page);
    await page.screenshot({ path: path.join(OUT, '03_home_1440_later.png') });
    // software rendering runs the model far slower than real time, so read its clock, not the label
    const moved = a.snap && b.snap && b.snap.t > a.snap.t && a.snap.running;
    ok('Model runs on its own (model clock advances, no input)', moved, `model t ${a.snap && a.snap.t}s → ${b.snap && b.snap.t}s; ${a.snap && a.snap.label} → ${b.snap && b.snap.label}`);
    const sum = s => s.stockpile + s.inGrab + s.falling + s.aboard;
    ok('Ledger balanced in both readings (remaining + in grab + falling + aboard = 900 t)', a.snap.conserved && b.snap.conserved,
      `${sum(a.snap)} t, ${sum(b.snap)} t (rounded)`);
    ok('HUD shows the model’s numbers', /LIVE MODEL/.test(b.hudText) && /Aboard/.test(b.hudText) && /Mean draft/.test(b.hudText), b.hudText.slice(0, 160));
    ok('No horizontal overflow at 1440', b.width <= 1440, `scrollWidth ${b.width}`);

    // explore mode
    await page.getByRole('button', { name: 'Explore the 3D stage' }).click();
    await page.waitForFunction(() => getComputedStyle(document.querySelector('.freq-mh-copy')).opacity === '0', null, { timeout: 15000 }).catch(() => { });
    const ex = await page.evaluate(() => ({ attr: document.querySelector('harbor-motion').getAttribute('explore'), cls: document.querySelector('section.freq-mh').className, copy: getComputedStyle(document.querySelector('.freq-mh-copy')).opacity, hint: !!document.querySelector('.freq-mh-hint') }));
    const cv = await page.locator('harbor-motion canvas').boundingBox();
    await page.mouse.move(cv.x + cv.width * 0.6, cv.y + cv.height * 0.5); await page.mouse.down();
    await page.mouse.move(cv.x + cv.width * 0.45, cv.y + cv.height * 0.45, { steps: 6 }); await page.mouse.up();
    await page.waitForTimeout(2500);
    await page.screenshot({ path: path.join(OUT, '03_home_1440_explore.png') });
    ok('Explore: copy steps aside, drag-to-orbit enabled', ex.attr === '1' && ex.copy === '0' && ex.hint, JSON.stringify(ex));
    await page.keyboard.press('Escape');
    await page.getByRole('button', { name: 'Exit 3D view' }).click().catch(() => { });
    await page.waitForTimeout(800);

    // walkthrough is still reachable, demoted to a link — and loads clean
    await page.getByRole('button', { name: /Step through the transfer/ }).click();
    await page.getByRole('heading', { name: 'A controlled walkthrough of one cargo transfer.' }).waitFor({ timeout: 30000 });
    const survey = await page.locator('[aria-label="Simulation views"]').count();
    ok('Simulation page: walkthrough only, no Arena survey switch', survey === 0, `${survey} view switches`);
    await page.waitForTimeout(6000);
    await page.screenshot({ path: path.join(OUT, '03_simulation_1440.png') });
    R.logs.home_1440 = log.slice();
    await context.close();
  }

  // 1b. Only the current app ever paints. _ds_bundle.js carries a stale copy of an older app whose own boot
  // used to paint the retired Home for a moment on every load; index.html now gives that boot an inert root.
  {
    const { context, page, log } = await newPage(browser);
    // hold one later script back so a stale first paint, if any, stays on screen for several frames
    await context.route(/\/home-hero\.js$/, async route => { await new Promise(r => setTimeout(r, 600)); return route.continue(); });
    await page.addInitScript(() => {
      window.__retiredFrames = 0;
      const t0 = performance.now();
      const probe = () => {
        if (document.querySelector('.freq-hero-amb')) window.__retiredFrames++;
        if (performance.now() - t0 < 6000) requestAnimationFrame(probe);
      };
      requestAnimationFrame(probe);
    });
    const dead = [];
    page.on('request', r => { if (/hero-core\.jpg/.test(r.url())) dead.push(r.url()); });
    await page.goto(AFTER, { waitUntil: 'load' });
    await page.getByText(H1).waitFor({ timeout: 30000 });
    await page.waitForTimeout(6000);
    const frames = await page.evaluate(() => window.__retiredFrames);
    ok('Only the current app paints (retired Home in _ds_bundle.js never shown)', frames === 0 && dead.length === 0,
      `${frames} frames showed the retired hero, ${dead.length} hero-core.jpg requests`);
    R.logs.home_firstpaint = log.slice();
    await context.close();
  }

  // 2. Tablet and phone layouts.
  for (const vp of [{ width: 1024, height: 768 }, { width: 390, height: 844 }]) {
    const { context, page, log } = await newPage(browser, { viewport: vp });
    await page.goto(AFTER + '?hmq=high', { waitUntil: 'load' });
    await page.getByText(H1).waitFor({ timeout: 30000 });
    await waitModel(page);
    await page.waitForTimeout(4000);
    const s = await hud(page);
    await page.screenshot({ path: path.join(OUT, `03_home_${vp.width}.png`) });
    await page.screenshot({ path: path.join(OUT, `03_home_${vp.width}_full.png`), fullPage: true });
    ok(`No horizontal overflow at ${vp.width}`, s.width <= vp.width, `scrollWidth ${s.width}`);
    ok(`Model live at ${vp.width}`, s.snap && s.snap.conserved && /LIVE MODEL/.test(s.hudText), s.snap && s.snap.label);
    R.logs[`home_${vp.width}`] = log.slice();
    await context.close();
  }

  // 3. Reduced motion: a still, representative frame; motion only when the visitor asks for it.
  {
    const { context, page, log } = await newPage(browser, { reducedMotion: 'reduce' });
    await page.goto(AFTER + '?hmq=high', { waitUntil: 'load' });
    await page.getByText(H1).waitFor({ timeout: 30000 });
    await waitModel(page);
    const a = await hud(page);
    await page.waitForTimeout(6000);
    const b = await hud(page);
    await page.screenshot({ path: path.join(OUT, '03_home_reduced.png') });
    const anim = await page.evaluate(() => document.getAnimations().filter(x => x.playState === 'running').length);
    ok('Reduced motion: model holds a still frame (no autoplay)', a.snap && !a.snap.running && a.snap.label === b.snap.label && a.snap.aboard === b.snap.aboard, a.snap && a.snap.label);
    ok('Reduced motion: no running CSS animations', anim === 0, `${anim} running`);
    await page.getByRole('button', { name: 'Play', exact: true }).click();
    await page.waitForTimeout(6000);
    const c = await hud(page);
    ok('Reduced motion: Play starts the model on request', c.snap && c.snap.running, c.snap && c.snap.label);
    R.logs.home_reduced = log.slice();
    await context.close();
  }

  // 4. WebGL unavailable: still plate, readable scenario note, no errors.
  {
    const b2 = await chromium.launch({ args: ['--disable-webgl', '--disable-3d-apis'] });
    const { context, page, log } = await newPage(b2);
    await page.goto(AFTER, { waitUntil: 'load' });
    await page.getByText(H1).waitFor({ timeout: 30000 });
    await page.locator('.freq-mh-fallback').waitFor({ timeout: 20000 });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(OUT, '03_home_nowebgl.png') });
    const note = await page.locator('.freq-mh-hud-note').innerText();
    ok('WebGL off: plate fallback + scenario note, headline intact', /WebGL/.test(note), note.slice(0, 80));
    R.logs.home_nowebgl = log.slice();
    await context.close(); await b2.close();
  }

  // 5. Other pages unchanged from step 01 (reduced motion, desktop).
  for (const pg of ['Architecture', 'Investor', 'Contact']) {
    for (const [tag, base] of [['before', BEFORE], ['after', AFTER]]) {
      const { context, page, log } = await newPage(browser, { reducedMotion: 'reduce' });
      await page.goto(base, { waitUntil: 'load' });
      await page.getByText(H1).waitFor({ timeout: 30000 });
      await page.locator('header nav button', { hasText: pg }).click();
      await page.waitForTimeout(3000);
      await page.addStyleTag({ content: '*,*::before,*::after{animation-delay:0s!important;animation-play-state:paused!important}' });
      await page.waitForTimeout(300);
      await page.screenshot({ path: path.join(OUT, `03_parity_${pg.toLowerCase()}_${tag}.png`), fullPage: true });
      R.logs[`${pg}_${tag}`] = log.slice();
      await context.close();
    }
  }

  // the step-01 baseline is served only for pixel parity; its own console (the stale boot's intermittent
  // hero-core.jpg 404) is not this step's
  const errs = Object.entries(R.logs).filter(([k]) => !k.endsWith('_before')).flatMap(([k, v]) => v.map(x => `${k}: ${x}`));
  ok('Console and network clean across all step-03 runs', errs.length === 0, errs.slice(0, 8).join(' | ') || 'none');
  fs.writeFileSync(path.join(OUT, 'results.json'), JSON.stringify(R, null, 2));
  await browser.close();
})().catch(e => { console.error('HARNESS ERROR', e); process.exit(1); });
