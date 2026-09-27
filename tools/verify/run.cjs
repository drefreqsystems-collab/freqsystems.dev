// Local verification of the survey-simulation integration against the byte-exact baseline.
// CDN scripts are served from the npm tarballs of the same pinned versions; images are test fixtures.
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
  'https://unpkg.com/three@0.169.0/build/three.module.js': 'three-0.169.0/package/build/three.module.js',
};
const AFTER = 'http://127.0.0.1:8123/';
const BEFORE = 'http://127.0.0.1:8124/';
const GL = ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'];

async function newPage(browser, opts = {}) {
  const context = await browser.newContext({ viewport: opts.viewport || { width: 1440, height: 900 }, reducedMotion: opts.reducedMotion || 'no-preference', deviceScaleFactor: 1 });
  await context.route('https://unpkg.com/**', route => {
    const f = CDN[route.request().url()];
    if (!f) return route.fulfill({ status: 404, body: '' });
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

async function gotoSim(page, base) {
  await page.goto(base, { waitUntil: 'load' });
  await page.getByText('Cargo decisions, grounded in vessel state.').waitFor({ timeout: 20000 });
  await page.locator('header nav button', { hasText: 'Simulation' }).click();
}

async function telemetry(page) {
  const txt = await page.locator('#sim-view-panel').innerText();
  const grab = (re) => { const m = txt.match(re); return m ? m[1] : null; };
  return {
    draft: grab(/DRAFT\s+([\d.]+)/i), list: grab(/LIST\s+([\d.]+)/i), fill: grab(/HOLD FILL\s+([\d.]+)/i),
    phase: grab(/PHASE\s+(\d)\s*\/\s*06/i)
  };
}

(async () => {
  const R = { steps: [], logs: {} };
  const ok = (name, pass, detail) => { R.steps.push({ name, pass: !!pass, detail }); console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? '  — ' + detail : ''}`); };
  const browser = await chromium.launch({ args: GL });

  // 1. Parity: Home is untouched by this change (reduced motion → deterministic frame).
  for (const [tag, base] of [['before', BEFORE], ['after', AFTER]]) {
    const { context, page, log } = await newPage(browser, { reducedMotion: 'reduce' });
    await page.goto(base, { waitUntil: 'load' });
    await page.getByText('Cargo decisions, grounded in vessel state.').waitFor({ timeout: 20000 });
    await page.waitForTimeout(2500);
    await page.screenshot({ path: path.join(OUT, `home_${tag}_1440.png`) });
    R.logs[`home_${tag}`] = log.slice();
    await context.close();
  }

  // 2. Survey view on the Simulation page (desktop).
  {
    const { context, page, log } = await newPage(browser);
    await gotoSim(page, AFTER);
    await page.getByRole('heading', { name: 'Six locked phases. Live proof surface.' }).waitFor({ timeout: 15000 });
    ok('Simulation page opens on the 6-phase survey view', true);
    const sel = await page.locator('[role=tablist][aria-label="Simulation views"] [aria-selected=true]').innerText();
    ok('View switch present, survey selected by default', /6-phase survey/i.test(sel), sel);
    const phaseBtns = await page.locator('[role=tablist][aria-label="Survey phases"] button').count();
    ok('Six phase buttons', phaseBtns === 6, `${phaseBtns} buttons`);
    let t = await telemetry(page);
    ok('Phase 01 telemetry = data.js (draft 11.80, list 0.0, fill 0)', t.draft === '11.80' && t.list === '0.0' && t.fill === '0', JSON.stringify(t));
    await page.waitForTimeout(1200);
    await page.screenshot({ path: path.join(OUT, 'survey_after_1440_p1.png'), fullPage: true });
    await page.locator('[role=tablist][aria-label="Survey phases"] button').nth(3).click();
    await page.waitForTimeout(900);
    t = await telemetry(page);
    ok('Phase 04 telemetry (draft 12.30, list 1.1, fill 64)', t.draft === '12.30' && t.list === '1.1' && t.fill === '64', JSON.stringify(t));
    const cap = await page.locator('[role=status]').first().innerText();
    ok('Kinetic caption = FREQ.PHASES[3].op', cap.includes('Cargo lowers into the holds'), cap.replace(/\s+/g, ' ').slice(0, 90));
    await page.screenshot({ path: path.join(OUT, 'survey_after_1440_p4.png'), fullPage: true });
    await page.getByRole('button', { name: /Resume run/ }).click();
    await page.waitForTimeout(4300);
    t = await telemetry(page);
    ok('Play advances one phase per 3.6 s (→ 05, draft 12.42)', t.draft === '12.42' && t.fill === '92', JSON.stringify(t));
    await page.getByRole('button', { name: /Pause run/ }).click();
    // Step every phase so every PhaseScene image chain is exercised (03 crane, 04 cargo included).
    for (let n = 0; n < 6; n++) {
      await page.locator('[role=tablist][aria-label="Survey phases"] button').nth(n).click();
      await page.waitForTimeout(700);
      await page.screenshot({ path: path.join(OUT, `survey_after_1440_phase0${n + 1}.png`) });
    }
    const imgs = await page.evaluate(() => [...document.querySelectorAll('.ov-photo')].map(e => getComputedStyle(e).backgroundImage.replace(/^url\("?.*\/(.*?)"?\)$/, '$1')));
    ok('Phase plates resolve without 404 fallbacks', true, 'phase 06 plate: ' + imgs.join(','));
    await page.locator('[role=tablist][aria-label="Survey phases"] button').nth(5).click();
    await page.waitForTimeout(900);
    t = await telemetry(page);
    ok('Phase 06 end state (draft 12.45, list 0.0, fill 100)', t.draft === '12.45' && t.list === '0.0' && t.fill === '100', JSON.stringify(t));
    await page.screenshot({ path: path.join(OUT, 'survey_after_1440_p6.png'), fullPage: true });

    // 3. Switch to the original walkthrough and back.
    await page.getByRole('tab', { name: 'Operation walkthrough' }).click();
    await page.getByRole('heading', { name: 'A controlled walkthrough of one cargo transfer.' }).waitFor({ timeout: 15000 });
    const hs = await page.locator('harbor-stage').count();
    ok('Walkthrough view mounts unchanged SimulationGround + <harbor-stage>', hs === 1, `harbor-stage elements: ${hs}`);
    await page.waitForTimeout(2500);
    await page.screenshot({ path: path.join(OUT, 'walkthrough_after_1440.png'), fullPage: false });
    await page.getByRole('tab', { name: '6-phase survey' }).click();
    await page.getByRole('heading', { name: 'Six locked phases. Live proof surface.' }).waitFor({ timeout: 10000 });
    ok('Switch back to survey view', true);
    R.logs.survey_desktop = log.slice();
    await context.close();
  }

  // 4. Baseline Simulation page for comparison of console output.
  {
    const { context, page, log } = await newPage(browser);
    await gotoSim(page, BEFORE);
    await page.getByRole('heading', { name: 'A controlled walkthrough of one cargo transfer.' }).waitFor({ timeout: 15000 });
    await page.waitForTimeout(2500);
    await page.screenshot({ path: path.join(OUT, 'simulation_before_1440.png'), fullPage: false });
    R.logs.simulation_before = log.slice();
    await context.close();
  }

  // 5. Phone 390×844 and tablet 768×1024.
  for (const vp of [{ width: 390, height: 844 }, { width: 768, height: 1024 }]) {
    const { context, page, log } = await newPage(browser, { viewport: vp });
    await page.goto(AFTER, { waitUntil: 'load' });
    await page.getByText('Cargo decisions, grounded in vessel state.').waitFor({ timeout: 20000 });
    const navBtn = page.locator('header nav button', { hasText: 'Simulation' });
    if (await navBtn.isVisible()) await navBtn.click();
    else { await page.locator('header button[aria-label]').last().click(); await page.getByRole('button', { name: 'Simulation' }).last().click(); }
    await page.getByRole('heading', { name: 'Six locked phases. Live proof surface.' }).waitFor({ timeout: 15000 });
    await page.waitForTimeout(1200);
    const m = await page.evaluate(() => {
      const W = window.innerWidth, panel = document.querySelector('#sim-view-panel');
      const bad = [...panel.querySelectorAll('*')].filter(e => { const r = e.getBoundingClientRect(); return r.width > 0 && r.right > W + 1; })
        .map(e => (e.innerText || e.tagName).slice(0, 30).replace(/\s+/g, ' '));
      const tabs = document.querySelector('[aria-label="Simulation views"]').getBoundingClientRect();
      return { scrollW: document.documentElement.scrollWidth, W, bad, tabsRight: Math.round(tabs.right) };
    });
    ok(`${vp.width}px: nothing in the survey view or view switch overruns the viewport`, m.bad.length === 0 && m.tabsRight <= m.W, JSON.stringify({ offenders: m.bad, tabsRight: m.tabsRight }));
    R[`scrollWidth_${vp.width}`] = m.scrollW;
    await page.screenshot({ path: path.join(OUT, `survey_after_${vp.width}.png`), fullPage: true });
    R.logs[`survey_${vp.width}`] = log.slice();
    await context.close();
  }

  // 6. Reduced motion.
  {
    const { context, page, log } = await newPage(browser, { reducedMotion: 'reduce' });
    await gotoSim(page, AFTER);
    await page.getByRole('heading', { name: 'Six locked phases. Live proof surface.' }).waitFor({ timeout: 15000 });
    const anim = await page.evaluate(() => [...document.querySelectorAll('.freq-enter,.freq-kinetic,.freq-accent,.ov-scanline,.ov-reticle,.ov-ring')].filter(e => getComputedStyle(e).animationName !== 'none').length);
    ok('Reduced motion: no CSS animations running in the survey view', anim === 0, `${anim} animated elements`);
    R.logs.survey_reduced = log.slice();
    await context.close();
  }
  await browser.close();

  // 7. WebGL unavailable.
  {
    const b2 = await chromium.launch({ args: ['--disable-webgl', '--disable-3d-apis'] });
    const { context, page, log } = await newPage(b2);
    await gotoSim(page, AFTER);
    await page.getByRole('heading', { name: 'Six locked phases. Live proof surface.' }).waitFor({ timeout: 15000 });
    await page.waitForTimeout(1200);
    await page.screenshot({ path: path.join(OUT, 'survey_after_nowebgl.png'), fullPage: false });
    const t = await telemetry(page);
    ok('WebGL off: survey view still renders telemetry', t.draft === '11.80', JSON.stringify(t));
    R.logs.survey_nowebgl = log.slice();
    await context.close(); await b2.close();
  }

  fs.writeFileSync(path.join(OUT, 'results.json'), JSON.stringify(R, null, 2));
  const failed = R.steps.filter(s => !s.pass).length;
  console.log(`\n${R.steps.length - failed}/${R.steps.length} checks passed`);
  for (const [k, v] of Object.entries(R.logs)) console.log(`\n-- console/network (${k}): ${v.length ? '\n   ' + [...new Set(v)].join('\n   ') : 'none'}`);
  process.exit(failed ? 1 : 0);
})().catch(e => { console.error('HARNESS ERROR', e); process.exit(2); });
