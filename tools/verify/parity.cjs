const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const V = path.join(__dirname, 'vendor'); const LUC = fs.readFileSync(path.join(V, 'lucide.version'), 'utf8').trim();
const CDN = { 'https://unpkg.com/react@18.3.1/umd/react.production.min.js': 'react-18.3.1/package/umd/react.production.min.js', 'https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js': 'react-dom-18.3.1/package/umd/react-dom.production.min.js', 'https://unpkg.com/lucide@latest/dist/umd/lucide.min.js': `lucide-${LUC}/package/dist/umd/lucide.min.js`, 'https://unpkg.com/three@0.169.0/build/three.module.js': 'three-0.169.0/package/build/three.module.js' };
(async () => {
  const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  for (const [tag, base] of [['beforeA', 'http://127.0.0.1:8124/'], ['beforeB', 'http://127.0.0.1:8124/'], ['after', 'http://127.0.0.1:8123/']]) for (const vp of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
    const c = await b.newContext({ viewport: vp, reducedMotion: 'reduce' });
    await c.route('https://unpkg.com/**', r => { const f = CDN[r.request().url()]; return f ? r.fulfill({ status: 200, contentType: 'application/javascript', headers: { 'access-control-allow-origin': '*' }, body: fs.readFileSync(path.join(V, f)) }) : r.fulfill({ status: 404, body: '' }); });
    await c.route(/fonts\.(googleapis|gstatic)\.com/, r => r.fulfill({ status: 200, contentType: 'text/css', body: '' }));
    const p = await c.newPage(); await p.goto(base); await p.getByText('Cargo decisions, grounded in vessel state.').waitFor(); await p.waitForTimeout(2500);
    // freeze every CSS animation at t=0 so the pulsing live dot cannot differ between captures
    await p.addStyleTag({ content: '*,*::before,*::after{animation-delay:0s!important;animation-play-state:paused!important}' }); await p.waitForTimeout(300);
    await p.screenshot({ path: path.join(__dirname, 'out', `parity_home_${tag}_${vp.width}.png`), fullPage: true }); await c.close();
  }
  await b.close();
})();
