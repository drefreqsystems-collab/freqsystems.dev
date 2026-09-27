/* FREQUENCY — harbor-stage.js
 * Illustrative 3D operational model of a six-phase cargo transfer.
 * Lit to match the BARGE-402 plates: night river terminal, near-black steel,
 * warm sodium dock lighting, electric-blue survey lattice.
 *
 * <harbor-stage phase playing speed station reduced exagg>
 * events: ready · phaseprogress · phasecomplete · stationselect · stationauto
 * methods: resetView() · replayPhase() · setPhase(i)
 */
import * as THREE from 'https://unpkg.com/three@0.169.0/build/three.module.js';

const FT = 0.3048;
const LOA = 45, BEAM = 10, DEPTH = 4.6;
const EXAGG_DEFAULT = 5;
const DUR = [22, 20, 22, 30, 20, 24];

/* crane + pickup geometry (metres) */
const CX = 0, CZ = -19, QUAY_Y = 2.2, SLEW_Y = 5.4, PIV_X = 1.6, PIV_Y = 2.4, BOOM = 34;
const PIVOT_WY = QUAY_Y + SLEW_Y + PIV_Y;
const PILE = { x: 18, z: -32, r: 9, h: 6.6 };
const Y_TRAVEL = 18.5, Y_DIG = 8.4, Y_DIG_IN = 7.3, Y_RELEASE = 4.6;
const HOLD_X = [-13.5, 0, 13.5];

const STATIONS = [
  { code: 'FP', x: 16.5, z: -4.55 }, { code: 'FS', x: 16.5, z: 4.55 },
  { code: 'MP', x: 0.0, z: -4.55 }, { code: 'MS', x: 0.0, z: 4.55 },
  { code: 'AP', x: -16.5, z: -4.55 }, { code: 'AS', x: -16.5, z: 4.55 },
];

const PH = [
  { draft: 11.800, trimFt: 0.02, listFt: 0.000, fill: 0 },
  { draft: 12.053, trimFt: -0.07, listFt: 0.227, fill: 0 },
  { draft: 12.100, trimFt: -0.06, listFt: 0.340, fill: 0 },
  { draft: 12.303, trimFt: 0.34, listFt: 0.627, fill: 64 },
  { draft: 12.420, trimFt: 0.10, listFt: 0.180, fill: 92 },
  { draft: 12.450, trimFt: 0.04, listFt: 0.000, fill: 100 },
];

const CAM = [
  { t: [0, -1.0, 0], az: 0.92, po: 1.16, d: 68 },
  { t: [14, -1.6, 0], az: 1.28, po: 1.36, d: 44 },
  { t: [8, 4, -12], az: 1.70, po: 1.08, d: 76 },
  { t: [7, 0, -7], az: 1.72, po: 1.14, d: 74 },
  { t: [0, -1.4, 0], az: 1.50, po: 1.40, d: 58 },
  { t: [0, -1.0, 0], az: 0.92, po: 1.16, d: 68 },
];

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const seg = (t, a, b) => clamp((t - a) / (b - a), 0, 1);
const ease = x => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);
const lerp = (a, b, t) => a + (b - a) * t;

/* ---------------- procedural maps ---------------- */
function cvs(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; }
function tex(c, srgb) {
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

function steelMap(base, streak) {
  const c = cvs(512, 512), g = c.getContext('2d');
  g.fillStyle = base; g.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 3000; i++) {
    g.fillStyle = `rgba(255,255,255,${Math.random() * 0.035})`;
    g.fillRect(Math.random() * 512, Math.random() * 512, Math.random() * 44 + 4, 1);
  }
  for (let i = 0; i < 1100; i++) {
    g.fillStyle = `rgba(0,0,0,${Math.random() * 0.3})`;
    g.beginPath(); g.arc(Math.random() * 512, Math.random() * 512, Math.random() * 5 + 0.5, 0, 6.283); g.fill();
  }
  for (let i = 0; i < 64; i++) {
    const y = Math.random() * 512;
    g.fillStyle = 'rgba(0,0,0,0.3)'; g.fillRect(0, y, 512, 1);
    g.fillStyle = 'rgba(255,255,255,0.035)'; g.fillRect(0, y + 1, 512, 1);
  }
  for (let i = 0; i < 40; i++) {
    const x = Math.random() * 512, y = Math.random() * 400;
    const grd = g.createLinearGradient(x, y, x, y + 130);
    grd.addColorStop(0, streak); grd.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = grd; g.fillRect(x, y, 1 + Math.random() * 7, 130);
  }
  return tex(c, true);
}

function grainMap(base, dark, n) {
  const c = cvs(256, 256), g = c.getContext('2d');
  g.fillStyle = base; g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < n; i++) {
    g.fillStyle = Math.random() > 0.55 ? dark : 'rgba(255,255,255,0.06)';
    g.beginPath(); g.arc(Math.random() * 256, Math.random() * 256, Math.random() * 3 + 0.5, 0, 6.283); g.fill();
  }
  return tex(c, true);
}

function roughMap() {
  const c = cvs(256, 256), g = c.getContext('2d');
  g.fillStyle = '#a8a8a8'; g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 2600; i++) {
    const v = 96 + Math.random() * 120 | 0;
    g.fillStyle = `rgb(${v},${v},${v})`;
    g.beginPath(); g.arc(Math.random() * 256, Math.random() * 256, Math.random() * 9 + 1, 0, 6.283); g.fill();
  }
  return tex(c, false);
}

function waterNormal() {
  const c = cvs(512, 512), g = c.getContext('2d');
  g.fillStyle = '#8080ff'; g.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 1100; i++) {
    const x = Math.random() * 512, y = Math.random() * 512, r = 5 + Math.random() * 30;
    const grd = g.createRadialGradient(x, y, 0, x, y, r);
    const a = 0.05 + Math.random() * 0.12;
    grd.addColorStop(0, `rgba(${140 + Math.random() * 70},${140 + Math.random() * 70},255,${a})`);
    grd.addColorStop(1, 'rgba(128,128,255,0)');
    g.fillStyle = grd; g.beginPath(); g.arc(x, y, r, 0, 6.283); g.fill();
  }
  return tex(c, false);
}

/* night river terminal: deep blue-black sky, low sodium horizon, distant lamps */
function skyTexture() {
  const c = cvs(1024, 512), g = c.getContext('2d');
  const grd = g.createLinearGradient(0, 0, 0, 512);
  grd.addColorStop(0.00, '#04070f');
  grd.addColorStop(0.28, '#080d1c');
  grd.addColorStop(0.44, '#131d33');
  grd.addColorStop(0.495, '#2a2f3c');
  grd.addColorStop(0.505, '#241f1c');
  grd.addColorStop(0.60, '#0a0d15');
  grd.addColorStop(1.00, '#03050a');
  g.fillStyle = grd; g.fillRect(0, 0, 1024, 512);
  // sodium haze along the horizon
  for (let i = 0; i < 40; i++) {
    const x = Math.random() * 1024, r = 40 + Math.random() * 150;
    const h = g.createRadialGradient(x, 254, 0, x, 254, r);
    h.addColorStop(0, 'rgba(255,178,96,0.30)');
    h.addColorStop(1, 'rgba(255,150,70,0)');
    g.fillStyle = h; g.beginPath(); g.ellipse(x, 254, r, r * 0.30, 0, 0, 6.283); g.fill();
  }
  // cool moon wash
  const m = g.createRadialGradient(760, 120, 0, 760, 120, 260);
  m.addColorStop(0, 'rgba(180,205,255,0.34)');
  m.addColorStop(1, 'rgba(150,180,255,0)');
  g.fillStyle = m; g.fillRect(0, 0, 1024, 512);
  // far bank lamps
  for (let i = 0; i < 130; i++) {
    g.fillStyle = Math.random() > 0.3 ? 'rgba(255,196,120,0.85)' : 'rgba(190,220,255,0.7)';
    g.beginPath(); g.arc(Math.random() * 1024, 248 + Math.random() * 8, 0.7 + Math.random() * 1.1, 0, 6.283); g.fill();
  }
  const t = new THREE.CanvasTexture(c);
  t.mapping = THREE.EquirectangularReflectionMapping;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function labelSprite(text) {
  const c = cvs(256, 96), g = c.getContext('2d');
  g.fillStyle = 'rgba(6,10,18,0.9)';
  g.strokeStyle = 'rgba(56,189,248,0.9)'; g.lineWidth = 3;
  g.beginPath(); g.roundRect(8, 24, 240, 50, 4); g.fill(); g.stroke();
  g.fillStyle = '#DCEBF7';
  g.font = '700 34px "JetBrains Mono", ui-monospace, monospace';
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText(text, 128, 50);
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex(c, true), depthTest: false, transparent: true }));
  s.scale.set(2.9, 1.09, 1); s.renderOrder = 30;
  return s;
}

function draftStrip() {
  const c = cvs(128, 512), g = c.getContext('2d');
  g.fillStyle = '#12161d'; g.fillRect(0, 0, 128, 512);
  g.fillStyle = '#d7dee8';
  g.font = '700 32px "JetBrains Mono", ui-monospace, monospace';
  g.textAlign = 'left'; g.textBaseline = 'middle';
  for (let i = 0; i < 8; i++) {
    const y = 480 - i * 62;
    g.fillRect(10, y - 3, i % 2 ? 24 : 40, 5);
    if (i % 2 === 0) g.fillText(String(8 + i), 58, y);
  }
  return tex(c, true);
}

const UP = new THREE.Vector3(0, 1, 0);
function strut(a, b, r, mat, parent) {
  const dir = new THREE.Vector3().subVectors(b, a);
  const len = dir.length();
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, 6), mat);
  m.position.copy(a).addScaledVector(dir, 0.5);
  m.quaternion.setFromUnitVectors(UP, dir.normalize());
  m.castShadow = true;
  parent.add(m);
  return m;
}

class HarborStage extends HTMLElement {
  static get observedAttributes() { return ['phase', 'playing', 'speed', 'station', 'reduced', 'exagg']; }

  constructor() {
    super();
    this.phase = 0; this.playing = false; this.speed = 1; this.reduced = false;
    this.selected = ''; this.autoStation = null; this.exagg = EXAGG_DEFAULT;
    this.tPhase = 0; this.visible = true; this.age = 0;
    this.draftM = PH[0].draft * FT; this._raf = 0; this._built = false;
  }

  connectedCallback() {
    if (this._built) return;
    this._built = true;
    this.style.display = 'block'; this.style.position = 'relative'; this.style.background = '#05070d';
    try { this.build(); } catch (e) { this.fallback(String(e)); }
  }

  disconnectedCallback() {
    cancelAnimationFrame(this._raf); clearTimeout(this._timer);
    if (this.renderer) { this.renderer.dispose(); this.renderer.forceContextLoss?.(); }
    window.removeEventListener('resize', this._onResize);
    document.removeEventListener('visibilitychange', this._onVis);
    this._io?.disconnect();
  }

  attributeChangedCallback(n, o, v) {
    if (n === 'phase') { const i = clamp(parseInt(v || '0', 10) || 0, 0, 5); if (i !== this.phase) this.setPhase(i); }
    if (n === 'playing') this.playing = v === '1' || v === 'true';
    if (n === 'speed') this.speed = parseFloat(v) || 1;
    if (n === 'reduced') { this.reduced = v === '1' || v === 'true'; if (this.reduced) this.tPhase = 1; }
    if (n === 'station') { this.selected = v || ''; this.syncMarkers?.(); }
    if (n === 'exagg') this.exagg = clamp(parseFloat(v) || EXAGG_DEFAULT, 1, 10);
  }

  fallback(msg) {
    this.innerHTML = '';
    const d = document.createElement('div');
    d.style.cssText = 'position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:32px;text-align:center;background:#05070d';
    d.innerHTML = '<div style="font:600 13px/1.5 \'JetBrains Mono\',monospace;letter-spacing:0.18em;color:#8A97AD">3D VIEW UNAVAILABLE</div>' +
      '<div style="font:400 14px/1.6 Inter,sans-serif;color:#CBD5E1;max-width:44ch">This browser did not provide a WebGL context. The readings, decisions and outcome record below remain complete.</div>' +
      '<div style="font:400 11px/1.5 \'JetBrains Mono\',monospace;color:#5A667E">' + msg.slice(0, 120) + '</div>';
    this.appendChild(d);
  }

  /* ===================== build ===================== */
  build() {
    const w = this.clientWidth || 960, h = this.clientHeight || 560;

    const renderer = this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance', preserveDrawingBuffer: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
    renderer.setSize(w, h);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.42;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.cssText = 'display:block;width:100%;height:100%;touch-action:none;cursor:grab';
    this.appendChild(renderer.domElement);

    const scene = this.scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070b14, 0.0052);

    const sky = skyTexture();
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromEquirectangular(sky).texture;
    scene.background = sky;
    scene.environmentIntensity = 0.95;
    pmrem.dispose();

    const cam = this.cam = new THREE.PerspectiveCamera(38, w / h, 0.5, 2400);
    this.orb = { az: CAM[0].az, po: CAM[0].po, d: CAM[0].d, t: new THREE.Vector3(...CAM[0].t) };
    this.orbTo = { az: this.orb.az, po: this.orb.po, d: this.orb.d, t: this.orb.t.clone() };

    /* key: high cool moonlight — carries the contact shadows */
    const key = this.key = new THREE.DirectionalLight(0xc4d8f7, 4.2);
    key.position.set(64, 78, 46);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    const sc = key.shadow.camera;
    sc.left = -72; sc.right = 72; sc.top = 62; sc.bottom = -52; sc.near = 20; sc.far = 280;
    key.shadow.bias = -0.0006; key.shadow.normalBias = 0.05;
    scene.add(key, key.target);
    scene.add(new THREE.HemisphereLight(0x3d5178, 0x080b12, 0.8));
    const rim = new THREE.DirectionalLight(0x6d9ddb, 1.25); rim.position.set(-80, 26, -34); scene.add(rim);

    this.buildWater();
    this.buildQuay();
    this.buildBarge();
    this.buildCrane();
    this.buildMarkers();
    this.buildSurveyLattice();

    this._onResize = () => {
      const W = this.clientWidth || 960, H = this.clientHeight || 560;
      renderer.setSize(W, H); cam.aspect = W / H; cam.updateProjectionMatrix();
    };
    window.addEventListener('resize', this._onResize);
    this._onVis = () => { if (!document.hidden) this.clock.getDelta(); };
    document.addEventListener('visibilitychange', this._onVis);
    this._io = new IntersectionObserver(e => { this.onScreen = e[0].isIntersecting; }, { threshold: 0.02 });
    this._io.observe(this); this.onScreen = true;

    this.bindPointer();
    this.applyPhase(this.phase, this.reduced ? 1 : this.tPhase, true);
    this.clock = new THREE.Clock();
    this.loop();
    this.dispatchEvent(new CustomEvent('ready'));
  }

  buildWater() {
    const n1 = waterNormal(); n1.repeat.set(30, 30);
    const n2 = waterNormal(); n2.repeat.set(11, 11);
    const mk = (n, op, col) => {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(1800, 1800),
        new THREE.MeshStandardMaterial({
          color: col, roughness: 0.075, metalness: 0.62,
          normalMap: n, normalScale: new THREE.Vector2(0.5, 0.5),
          transparent: op < 1, opacity: op,
        }));
      m.rotation.x = -Math.PI / 2; m.receiveShadow = true;
      return m;
    };
    this.water = mk(n1, 1, 0x080d16);
    this.water2 = mk(n2, 0.4, 0x0d1524);
    this.water2.position.y = 0.03;
    this.scene.add(this.water, this.water2);
    this.wn = [n1, n2];
  }

  lamp(parent, x, z, warm) {
    const dark = new THREE.MeshStandardMaterial({ color: 0x191d24, roughness: 0.85, metalness: 0.4 });
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.22, 13, 8), dark);
    post.position.set(x, QUAY_Y + 6.5, z); post.castShadow = true; parent.add(post);
    const arm = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.16, 0.16), dark);
    arm.position.set(x + 0.9, QUAY_Y + 12.9, z); parent.add(arm);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.42, 10, 8),
      new THREE.MeshStandardMaterial({ color: 0xffd9a0, emissive: 0xffb257, emissiveIntensity: 8, roughness: 1 }));
    head.position.set(x + 1.8, QUAY_Y + 12.8, z); parent.add(head);
    if (warm) {
      const pl = new THREE.PointLight(0xffb266, 520, 120, 2);
      pl.position.set(x + 1.8, QUAY_Y + 12.4, z); parent.add(pl);
    }
  }

  buildQuay() {
    const q = new THREE.Group(); this.scene.add(q);
    const conc = grainMap('#23262a', 'rgba(0,0,0,0.4)', 2600); conc.repeat.set(12, 12);
    const rgh = roughMap(); rgh.repeat.set(8, 8);
    const concMat = new THREE.MeshStandardMaterial({ color: 0x3a3e44, roughness: 0.55, metalness: 0.12, map: conc, roughnessMap: rgh });

    const deck = new THREE.Mesh(new THREE.BoxGeometry(200, 9, 96), concMat);
    deck.position.set(0, -2.3, -61); deck.receiveShadow = true; deck.castShadow = true; q.add(deck);

    const edgeMat = new THREE.MeshStandardMaterial({ color: 0x4c5158, roughness: 0.7, metalness: 0.3 });
    const bull = new THREE.Mesh(new THREE.BoxGeometry(200, 0.85, 1.5), edgeMat);
    bull.position.set(0, 1.78, -13.4); bull.castShadow = true; q.add(bull);

    const rub = new THREE.MeshStandardMaterial({ color: 0x0d0f12, roughness: 1 });
    for (let i = -7; i <= 7; i++) {
      const f = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 4.6, 12), rub);
      f.position.set(i * 12, -0.2, -13.0); f.castShadow = true; q.add(f);
    }
    const bollMat = new THREE.MeshStandardMaterial({ color: 0x272b31, roughness: 0.6, metalness: 0.6 });
    for (let i = -4; i <= 4; i++) {
      const b = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.56, 1.5, 14), bollMat);
      b.position.set(i * 15, 2.9, -15.6); b.castShadow = true; q.add(b);
    }

    [-72, -36, 36, 72].forEach((x, i) => this.lamp(q, x, -16.5, i === 1));
    this.lamp(q, 34, -44, true);

    // shore stockpile — the pickup zone
    const agg = grainMap('#2a2620', 'rgba(0,0,0,0.5)', 3200); agg.repeat.set(4, 4);
    const pileMat = new THREE.MeshStandardMaterial({ color: 0x3b352b, roughness: 1, map: agg });
    const pile = new THREE.Mesh(new THREE.ConeGeometry(PILE.r, PILE.h, 30, 1), pileMat);
    pile.position.set(PILE.x, QUAY_Y + PILE.h / 2, PILE.z);
    pile.castShadow = true; pile.receiveShadow = true; q.add(pile);
    const pile2 = new THREE.Mesh(new THREE.ConeGeometry(PILE.r * 0.62, PILE.h * 0.7, 24, 1), pileMat);
    pile2.position.set(PILE.x - 12, QUAY_Y + PILE.h * 0.35, PILE.z - 9);
    pile2.castShadow = true; pile2.receiveShadow = true; q.add(pile2);

    // terminal massing, kept dark and pushed into fog
    const bMat = new THREE.MeshStandardMaterial({ color: 0x1b1f27, roughness: 0.92, metalness: 0.15, map: conc });
    [[-86, 15, -92, 38, 30, 28], [-30, 10, -102, 44, 20, 26], [52, 19, -98, 34, 38, 30], [108, 8, -86, 46, 16, 24]]
      .forEach(([x, y, z, sx, sy, sz]) => {
        const m = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), bMat);
        m.position.set(x, y, z); m.castShadow = true; m.receiveShadow = true; q.add(m);
      });
    const siloMat = new THREE.MeshStandardMaterial({ color: 0x222731, roughness: 0.78, metalness: 0.3 });
    for (let i = 0; i < 5; i++) {
      const s = new THREE.Mesh(new THREE.CylinderGeometry(6, 6, 32, 22), siloMat);
      s.position.set(-140 + i * 13, 18, -74); s.castShadow = true; q.add(s);
    }
    const bank = new THREE.Mesh(new THREE.BoxGeometry(1600, 8, 140),
      new THREE.MeshStandardMaterial({ color: 0x0a0e16, roughness: 1 }));
    bank.position.set(0, 0.4, 330); this.scene.add(bank);
  }

  buildBarge() {
    const hull = this.hull = new THREE.Group();
    this.scene.add(hull);

    const side = steelMap('#2b3138', 'rgba(96,52,28,0.42)'); side.repeat.set(7, 1);
    const rgh = roughMap(); rgh.repeat.set(5, 2);
    const hullMat = new THREE.MeshStandardMaterial({ color: 0x545f6c, roughness: 0.66, metalness: 0.6, map: side, roughnessMap: rgh });
    const deckTex = steelMap('#2a3138', 'rgba(96,52,28,0.3)'); deckTex.repeat.set(10, 2);
    const deckMat = new THREE.MeshStandardMaterial({ color: 0x5a6573, roughness: 0.8, metalness: 0.48, map: deckTex, roughnessMap: rgh });

    const s = new THREE.Shape();
    s.moveTo(-LOA / 2, DEPTH); s.lineTo(-LOA / 2, 1.5); s.lineTo(-LOA / 2 + 3.4, 0);
    s.lineTo(LOA / 2 - 4.2, 0); s.lineTo(LOA / 2, 1.7); s.lineTo(LOA / 2, DEPTH); s.closePath();
    const hg = new THREE.ExtrudeGeometry(s, { depth: BEAM, bevelEnabled: true, bevelSize: 0.1, bevelThickness: 0.1, bevelSegments: 1 });
    hg.translate(0, 0, -BEAM / 2);
    const hm = new THREE.Mesh(hg, hullMat);
    hm.castShadow = true; hm.receiveShadow = true; hull.add(hm);
    this.hullShape = s;

    // side stiffeners — reads as a real barge shell rather than a slab
    const ribMat = new THREE.MeshStandardMaterial({ color: 0x333b46, roughness: 0.72, metalness: 0.6 });
    for (const sgn of [-1, 1]) {
      for (let i = 0; i < 17; i++) {
        const rb = new THREE.Mesh(new THREE.BoxGeometry(0.26, 3.6, 0.22), ribMat);
        rb.position.set(-19 + i * 2.4, 2.3, sgn * (BEAM / 2 + 0.06));
        rb.castShadow = true; rb.receiveShadow = true; hull.add(rb);
      }
      const rail = new THREE.Mesh(new THREE.BoxGeometry(LOA - 4, 0.34, 0.4), ribMat);
      rail.position.set(0, DEPTH - 0.2, sgn * (BEAM / 2 + 0.1)); rail.castShadow = true; hull.add(rail);
    }

    const dk = new THREE.Shape();
    dk.moveTo(-LOA / 2, -BEAM / 2); dk.lineTo(LOA / 2, -BEAM / 2);
    dk.lineTo(LOA / 2, BEAM / 2); dk.lineTo(-LOA / 2, BEAM / 2); dk.closePath();
    HOLD_X.forEach(cx => {
      const hl = new THREE.Path();
      hl.moveTo(cx - 5.5, -3.4); hl.lineTo(cx + 5.5, -3.4);
      hl.lineTo(cx + 5.5, 3.4); hl.lineTo(cx - 5.5, 3.4); hl.closePath();
      dk.holes.push(hl);
    });
    const dg = new THREE.ExtrudeGeometry(dk, { depth: 0.3, bevelEnabled: false });
    dg.rotateX(-Math.PI / 2); dg.translate(0, DEPTH + 0.3, 0);
    const dm = new THREE.Mesh(dg, deckMat); dm.castShadow = true; dm.receiveShadow = true; hull.add(dm);

    const inner = new THREE.MeshStandardMaterial({ color: 0x1b212a, roughness: 0.95, metalness: 0.3, side: THREE.DoubleSide });
    const coamMat = new THREE.MeshStandardMaterial({ color: 0x49525f, roughness: 0.7, metalness: 0.55, map: deckTex });
    const cargoTex = grainMap('#241f18', 'rgba(0,0,0,0.55)', 3600); cargoTex.repeat.set(3, 3);
    const cargoMat = new THREE.MeshStandardMaterial({ color: 0x463f33, roughness: 1, map: cargoTex });
    this.cargo = [];
    HOLD_X.forEach(cx => {
      const floor = new THREE.Mesh(new THREE.BoxGeometry(11, 0.3, 6.8), inner);
      floor.position.set(cx, 0.75, 0); floor.receiveShadow = true; hull.add(floor);
      [[0, -3.55, 11.4, 0.4], [0, 3.55, 11.4, 0.4], [-5.7, 0, 0.4, 7.5], [5.7, 0, 0.4, 7.5]].forEach(([ox, oz, sx, sz]) => {
        const wl = new THREE.Mesh(new THREE.BoxGeometry(sx, 3.4, sz), inner);
        wl.position.set(cx + ox, 2.6, oz); wl.receiveShadow = true; hull.add(wl);
        const co = new THREE.Mesh(new THREE.BoxGeometry(sx + 0.3, 0.8, sz + 0.3), coamMat);
        co.position.set(cx + ox, DEPTH + 0.75, oz); co.castShadow = true; co.receiveShadow = true; hull.add(co);
      });
      const cg = new THREE.Mesh(new THREE.BoxGeometry(10.6, 1, 6.5), cargoMat);
      cg.position.set(cx, 0.9, 0); cg.scale.y = 0.001;
      cg.castShadow = true; cg.receiveShadow = true; hull.add(cg); this.cargo.push(cg);
    });

    const dtex = draftStrip();
    STATIONS.forEach(st => {
      const p = new THREE.Mesh(new THREE.PlaneGeometry(1.05, 4.3),
        new THREE.MeshStandardMaterial({ map: dtex, roughness: 0.9 }));
      p.position.set(st.x, 2.2, st.z + (st.z > 0 ? 0.62 : -0.62));
      p.rotation.y = st.z > 0 ? 0 : Math.PI;
      hull.add(p);
    });

    const idc = cvs(512, 128), ig = idc.getContext('2d');
    ig.fillStyle = '#c3cddb'; ig.font = '700 72px "Space Grotesk", sans-serif';
    ig.textAlign = 'center'; ig.textBaseline = 'middle'; ig.fillText('BARGE-402', 256, 68);
    const itex = tex(idc, true);
    for (const sgn of [-1, 1]) {
      const nm = new THREE.Mesh(new THREE.PlaneGeometry(8.6, 2.15),
        new THREE.MeshStandardMaterial({ map: itex, transparent: true, roughness: 0.9 }));
      nm.position.set(sgn * 16, 3.5, sgn * (BEAM / 2 + 0.32)); nm.rotation.y = sgn > 0 ? 0 : Math.PI;
      hull.add(nm);
    }

    // deck work floods — night loading light, and what makes the vessel readable
    for (const dx of [-15, 15]) {
      const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.13, 5.4, 8),
        new THREE.MeshStandardMaterial({ color: 0x3a424e, roughness: 0.8, metalness: 0.5 }));
      mast.position.set(dx, DEPTH + 2.9, -4.4); mast.castShadow = true; hull.add(mast);
      const hd = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 6),
        new THREE.MeshStandardMaterial({ color: 0xfff0d4, emissive: 0xffc884, emissiveIntensity: 11, roughness: 1 }));
      hd.position.set(dx, DEPTH + 5.5, -4.4); hull.add(hd);
      const fl = new THREE.PointLight(0xffcb92, 340, 46, 2);
      fl.position.set(dx, DEPTH + 5.2, -4.0); hull.add(fl);
    }

    const ghost = this.ghost = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.ExtrudeGeometry(s, { depth: BEAM, bevelEnabled: false }), 28),
      new THREE.LineBasicMaterial({ color: 0x6366F1, transparent: true, opacity: 0.5 }));
    ghost.geometry.translate(0, 0, -BEAM / 2);
    ghost.visible = false; this.scene.add(ghost);
  }

  /* survey lattice: the electric-blue scan mesh from the BARGE-402 plates */
  buildSurveyLattice() {
    const pts = [];
    const push = (a, b) => pts.push(a.x, a.y, a.z, b.x, b.y, b.z);
    const V = (x, y, z) => new THREE.Vector3(x, y, z);
    const x0 = -LOA / 2, x1 = LOA / 2, zb = BEAM / 2 + 0.14;
    for (const sgn of [-1, 1]) {
      for (let i = 0; i <= 15; i++) {                    // frames
        const x = lerp(x0 + 1, x1 - 1, i / 15);
        push(V(x, 0.4, sgn * zb), V(x, DEPTH + 0.1, sgn * zb));
      }
      for (let j = 0; j <= 4; j++) {                     // waterlines
        const y = lerp(0.4, DEPTH + 0.1, j / 4);
        push(V(x0 + 1, y, sgn * zb), V(x1 - 1, y, sgn * zb));
      }
    }
    for (let i = 0; i <= 15; i++) {                      // deck grid
      const x = lerp(x0 + 1, x1 - 1, i / 15);
      push(V(x, DEPTH + 0.65, -zb), V(x, DEPTH + 0.65, zb));
    }
    for (let j = 0; j <= 4; j++) {
      const z = lerp(-zb, zb, j / 4);
      push(V(x0 + 1, DEPTH + 0.65, z), V(x1 - 1, DEPTH + 0.65, z));
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    const lat = this.lattice = new THREE.LineSegments(g,
      new THREE.LineBasicMaterial({ color: 0x38BDF8, transparent: true, opacity: 0.5, depthWrite: false }));
    lat.renderOrder = 12;
    this.hull.add(lat);

    // sweeping scan plane, used in the two survey phases
    const sp = this.scanPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(BEAM + 5, DEPTH + 7),
      new THREE.MeshBasicMaterial({ color: 0x38BDF8, transparent: true, opacity: 0.11, side: THREE.DoubleSide, depthWrite: false }));
    sp.rotation.y = Math.PI / 2; sp.position.y = DEPTH / 2;
    sp.renderOrder = 11;
    this.hull.add(sp);
  }

  buildCrane() {
    const g = new THREE.Group(); g.position.set(CX, QUAY_Y, CZ); this.scene.add(g);

    const grime = steelMap('#2d2b26', 'rgba(88,48,24,0.5)'); grime.repeat.set(3, 3);
    const rgh = roughMap(); rgh.repeat.set(3, 3);
    const paint = new THREE.MeshStandardMaterial({ color: 0x968f83, roughness: 0.8, metalness: 0.22, map: grime, roughnessMap: rgh });
    const dark = new THREE.MeshStandardMaterial({ color: 0x3e444c, roughness: 0.74, metalness: 0.5, map: grime });
    const steel = new THREE.MeshStandardMaterial({ color: 0x7c848e, roughness: 0.48, metalness: 0.78 });
    const caution = new THREE.MeshStandardMaterial({ color: 0xb18f42, roughness: 0.82, metalness: 0.2, map: grime });

    const base = new THREE.Mesh(new THREE.CylinderGeometry(3.6, 4.4, 1.3, 22), dark);
    base.position.y = 0.65; base.castShadow = true; base.receiveShadow = true; g.add(base);
    const ped = new THREE.Mesh(new THREE.CylinderGeometry(2.3, 2.9, 4.3, 22), caution);
    ped.position.y = 3.4; ped.castShadow = true; ped.receiveShadow = true; g.add(ped);

    const slew = this.slew = new THREE.Group(); slew.position.y = SLEW_Y; g.add(slew);
    const ring = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 2.6, 0.5, 26), steel);
    ring.castShadow = true; slew.add(ring);
    const house = new THREE.Mesh(new THREE.BoxGeometry(7.6, 3.3, 4.8), paint);
    house.position.set(-1.5, 1.95, 0); house.castShadow = true; house.receiveShadow = true; slew.add(house);
    const cab = new THREE.Mesh(new THREE.BoxGeometry(2.5, 2.5, 2.5),
      new THREE.MeshStandardMaterial({ color: 0x0a1018, roughness: 0.12, metalness: 0.2, emissive: 0x1a2a3c, emissiveIntensity: 1.2 }));
    cab.position.set(2.8, 2.6, 2.3); cab.castShadow = true; slew.add(cab);
    const cw = new THREE.Mesh(new THREE.BoxGeometry(3.4, 3.6, 5.2), dark);
    cw.position.set(-5.8, 2.1, 0); cw.castShadow = true; slew.add(cw);
    const work = new THREE.PointLight(0xffc98a, 620, 90, 2);
    work.position.set(3.2, 4.4, 0); slew.add(work);
    const boomLight = new THREE.PointLight(0xffd0a0, 480, 80, 2);
    boomLight.position.set(9, 3.5, 0); slew.add(boomLight);
    const wl = new THREE.Mesh(new THREE.SphereGeometry(0.24, 8, 6),
      new THREE.MeshStandardMaterial({ color: 0xffe0b0, emissive: 0xffb45e, emissiveIntensity: 9, roughness: 1 }));
    wl.position.set(3.2, 4.4, 0); slew.add(wl);

    const pivot = this.boomPivot = new THREE.Group();
    pivot.position.set(PIV_X, PIV_Y, 0); slew.add(pivot);

    const r0 = 1.25, r1 = 0.45, N = 10;
    const corner = (t, sy, sz) => {
      const rr = lerp(r0, r1, t);
      return new THREE.Vector3(t * BOOM, sy * rr, sz * rr);
    };
    [[1, 1], [1, -1], [-1, 1], [-1, -1]].forEach(([sy, sz]) =>
      strut(corner(0, sy, sz), corner(1, sy, sz), 0.115, paint, pivot));
    for (let i = 0; i < N; i++) {
      const a = i / N, b = (i + 1) / N;
      for (const sz of [1, -1]) {
        strut(corner(a, 1, sz), corner(b, -1, sz), 0.055, steel, pivot);
        strut(corner(b, 1, sz), corner(b, -1, sz), 0.05, steel, pivot);
      }
      for (const sy of [1, -1]) strut(corner(a, sy, 1), corner(b, sy, -1), 0.045, steel, pivot);
    }
    const tipSheave = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 1.5, 14), steel);
    tipSheave.rotation.x = Math.PI / 2; tipSheave.position.set(BOOM, 0, 0);
    tipSheave.castShadow = true; pivot.add(tipSheave);
    const tipLamp = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 6),
      new THREE.MeshStandardMaterial({ color: 0xffe6c0, emissive: 0xffc271, emissiveIntensity: 10, roughness: 1 }));
    tipLamp.position.set(BOOM - 0.4, 0.9, 0); pivot.add(tipLamp);

    const aframe = new THREE.Group(); slew.add(aframe);
    this.aTop = new THREE.Vector3(-0.6, 10.2, 0);
    strut(new THREE.Vector3(-1.6, 3.6, 1.8), this.aTop, 0.15, paint, aframe);
    strut(new THREE.Vector3(-1.6, 3.6, -1.8), this.aTop, 0.15, paint, aframe);
    strut(new THREE.Vector3(-5.6, 3.6, 0), this.aTop, 0.09, steel, aframe);
    this.stay = strut(this.aTop, new THREE.Vector3(22, 9, 0), 0.05, steel, slew);

    /* hoist hangs from the SLEW frame, not the boom — ropes stay vertical */
    const hoist = this.hoist = new THREE.Group(); slew.add(hoist);
    this.ropes = [];
    const ropeMat = new THREE.MeshStandardMaterial({ color: 0x14181e, roughness: 0.65, metalness: 0.55 });
    for (const oz of [-0.44, 0.44]) {
      const rp = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1, 6), ropeMat);
      rp.position.z = oz; hoist.add(rp); this.ropes.push(rp);
    }
    const grab = this.grab = new THREE.Group(); hoist.add(grab);
    const head = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.75, 1.6), dark);
    head.position.y = 1.6; head.castShadow = true; grab.add(head);
    const body = new THREE.Mesh(new THREE.BoxGeometry(1.6, 2.0, 1.3), paint);
    body.position.y = 0.6; body.castShadow = true; grab.add(body);
    for (const sx of [-1, 1]) strut(new THREE.Vector3(sx * 1.1, 1.6, 0), new THREE.Vector3(sx * 1.6, 0.15, 0), 0.06, steel, grab);

    const jp = new THREE.Shape();
    jp.moveTo(0, 0); jp.quadraticCurveTo(0.4, -1.9, 2.1, -2.3);
    jp.lineTo(2.22, -1.98); jp.quadraticCurveTo(0.78, -1.62, 0.44, 0.06); jp.closePath();
    const jg = new THREE.ExtrudeGeometry(jp, { depth: 3.0, bevelEnabled: false });
    jg.translate(0, 0, -1.5);
    this.jaws = [];
    for (const sx of [1, -1]) {
      const j = new THREE.Group(); j.position.set(sx * 0.58, 0.95, 0); j.scale.x = sx;
      const m = new THREE.Mesh(jg, paint); m.castShadow = true; m.receiveShadow = true; j.add(m);
      for (let k = 0; k < 5; k++) {
        const tth = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.55, 5), steel);
        tth.position.set(2.2, -2.16, -1.25 + k * 0.62); tth.rotation.z = -Math.PI / 2 - 0.24;
        tth.castShadow = true; j.add(tth);
      }
      grab.add(j); this.jaws.push(j);
    }
    const load = this.grabLoad = new THREE.Mesh(new THREE.SphereGeometry(1.55, 16, 10),
      new THREE.MeshStandardMaterial({ color: 0x413a2e, roughness: 1 }));
    load.scale.set(1, 0.5, 0.78); load.position.y = -1.0; load.castShadow = true;
    load.visible = false; grab.add(load);
  }

  buildMarkers() {
    this.markers = STATIONS.map(st => {
      const g = new THREE.Group();
      g.position.set(st.x, DEPTH + 1.15, st.z);
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.05, 8, 24),
        new THREE.MeshStandardMaterial({ color: 0x38BDF8, emissive: 0x0d5f92, emissiveIntensity: 2, roughness: 0.4 }));
      ring.rotation.x = -Math.PI / 2; g.add(ring);
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 1.1, 6),
        new THREE.MeshStandardMaterial({ color: 0x38BDF8, emissive: 0x0b4d78, emissiveIntensity: 1.6 }));
      stem.position.y = 0.55; g.add(stem);
      const lab = labelSprite(st.code); lab.position.y = 1.75; g.add(lab);
      const hit = new THREE.Mesh(new THREE.SphereGeometry(1.4, 8, 6), new THREE.MeshBasicMaterial({ visible: false }));
      hit.position.y = 0.9; hit.userData.code = st.code; g.add(hit);
      this.hull.add(g);
      return { code: st.code, g, ring, stem, lab };
    });
    this.hits = this.markers.map(m => m.g.children.find(c => c.userData.code));
    this.syncMarkers();
  }

  syncMarkers() {
    if (!this.markers) return;
    this.markers.forEach(m => {
      const on = this.selected === m.code || this.autoStation === m.code;
      m.ring.material.emissiveIntensity = on ? 6 : 1.4;
      m.stem.material.emissiveIntensity = on ? 4 : 1.1;
      m.ring.scale.setScalar(on ? 1.55 : 1);
      m.lab.scale.set(on ? 3.7 : 2.9, on ? 1.39 : 1.09, 1);
      m.lab.position.y = on ? 2.15 : 1.75;
    });
  }

  /* ===================== interaction ===================== */
  bindPointer() {
    const el = this.renderer.domElement;
    let down = false, moved = 0, lx = 0, ly = 0, pid = null;
    const ray = new THREE.Raycaster(), pt = new THREE.Vector2();

    el.addEventListener('pointerdown', e => {
      down = true; moved = 0; lx = e.clientX; ly = e.clientY; pid = e.pointerId;
      el.setPointerCapture(pid); el.style.cursor = 'grabbing';
    });
    el.addEventListener('pointermove', e => {
      if (!down) return;
      const dx = e.clientX - lx, dy = e.clientY - ly;
      lx = e.clientX; ly = e.clientY; moved += Math.abs(dx) + Math.abs(dy);
      this.orbTo.az -= dx * 0.0055;
      this.orbTo.po = clamp(this.orbTo.po - dy * 0.0045, 0.30, 1.47);
      this.userMoved = true;
    });
    const up = e => {
      if (!down) return;
      down = false; el.style.cursor = 'grab';
      try { el.releasePointerCapture(pid); } catch (_) { }
      if (moved < 5) {
        const r = el.getBoundingClientRect();
        pt.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
        ray.setFromCamera(pt, this.cam);
        const hits = ray.intersectObjects(this.hits, false);
        const code = hits.length ? hits[0].object.userData.code : '';
        if (code) {
          this.selected = this.selected === code ? '' : code;
          this.syncMarkers();
          this.dispatchEvent(new CustomEvent('stationselect', { detail: { code: this.selected } }));
        }
      }
    };
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
    el.addEventListener('wheel', e => {
      e.preventDefault();
      this.orbTo.d = clamp(this.orbTo.d * (1 + Math.sign(e.deltaY) * 0.09), 18, 200);
      this.userMoved = true;
    }, { passive: false });
  }

  resetView() {
    if (!this.orbTo) return;
    const c = CAM[this.phase];
    this.orbTo.az = c.az; this.orbTo.po = c.po; this.orbTo.d = c.d;
    this.orbTo.t.set(...c.t); this.userMoved = false;
  }

  setPhase(i) {
    this.phase = i; this.tPhase = this.reduced ? 1 : 0;
    this.autoStation = null; this.syncMarkers();
    this.resetView();
    this.dispatchEvent(new CustomEvent('stationauto', { detail: { code: null } }));
    this.emitProgress();
  }

  replayPhase() { this.tPhase = 0; this.resetView(); this.emitProgress(); }

  emitProgress() {
    this.dispatchEvent(new CustomEvent('phaseprogress', {
      detail: { phase: this.phase, t: this.tPhase, duration: DUR[this.phase] },
    }));
  }

  /* ===================== rig kinematics ===================== */
  slewFor(x, z) { return Math.atan2(-(z - CZ), x - CX); }
  luffFor(x, z) {
    const r = Math.hypot(x - CX, z - CZ) - PIV_X;
    return Math.acos(clamp(r / BOOM, 0.08, 0.985));
  }
  tipY(luff) { return PIVOT_WY + BOOM * Math.sin(luff); }

  /* one grab cycle. u 0..1. Returns absolute world height for the grab body. */
  grabCycle(u, holdIdx) {
    const sP = this.slewFor(PILE.x, PILE.z), lP = this.luffFor(PILE.x, PILE.z);
    const hx = HOLD_X[holdIdx];
    const sH = this.slewFor(hx, 0), lH = this.luffFor(hx, 0);
    const yRel = Y_RELEASE - this.draftM + PH[0].draft * FT;   // follow the deck as it sinks

    let slew, luff, y, jaw, carry;
    if (u < 0.18) { const k = ease(seg(u, 0, 0.18)); slew = sP; luff = lP; y = lerp(Y_TRAVEL, Y_DIG, k); jaw = 1; carry = 0; }
    else if (u < 0.27) { const k = seg(u, 0.18, 0.27); slew = sP; luff = lP; y = lerp(Y_DIG, Y_DIG_IN, k); jaw = 1 - k; carry = k > 0.72 ? 1 : 0; }
    else if (u < 0.41) { const k = ease(seg(u, 0.27, 0.41)); slew = sP; luff = lP; y = lerp(Y_DIG_IN, Y_TRAVEL, k); jaw = 0; carry = 1; }
    else if (u < 0.60) { const k = ease(seg(u, 0.41, 0.60)); slew = lerp(sP, sH, k); luff = lerp(lP, lH, k); y = Y_TRAVEL; jaw = 0; carry = 1; }
    else if (u < 0.70) { const k = ease(seg(u, 0.60, 0.70)); slew = sH; luff = lH; y = lerp(Y_TRAVEL, yRel, k); jaw = 0; carry = 1; }
    else if (u < 0.79) { const k = seg(u, 0.70, 0.79); slew = sH; luff = lH; y = yRel; jaw = k; carry = k < 0.34 ? 1 : 0; }
    else if (u < 0.89) { const k = ease(seg(u, 0.79, 0.89)); slew = sH; luff = lH; y = lerp(yRel, Y_TRAVEL, k); jaw = 1; carry = 0; }
    else { const k = ease(seg(u, 0.89, 1)); slew = lerp(sH, sP, k); luff = lerp(lH, lP, k); y = Y_TRAVEL; jaw = 1; carry = 0; }
    return { slew, luff, y, jaw, carry };
  }

  applyPhase(p, t, snap) {
    const prev = PH[Math.max(0, p - 1)], cur = PH[p];
    let k;
    if (p === 0) k = 1;
    else if (p === 1) k = ease(seg(t, 0.16, 0.62));
    else if (p === 4) k = ease(seg(t, 0.30, 0.82));
    else k = ease(seg(t, 0.05, 0.9));

    const draftFt = lerp(prev.draft, cur.draft, k);
    const trimFt = lerp(prev.trimFt, cur.trimFt, k);
    const listFt = lerp(prev.listFt, cur.listFt, k);
    this.draftM = draftFt * FT;

    const bob = this.reduced ? 0 : Math.sin(this.age * 0.7) * 0.02 + Math.sin(this.age * 1.9) * 0.007;
    const roll = this.reduced ? 0 : Math.sin(this.age * 0.55 + 1.1) * 0.0011;

    this.hull.position.y = -this.draftM + bob;
    this.hull.rotation.z = Math.atan2(trimFt * FT, LOA) * this.exagg;
    this.hull.rotation.x = -Math.atan2(listFt * FT, BEAM) * this.exagg + roll;

    const showGhost = p >= 3;
    this.ghost.visible = showGhost;
    if (showGhost) {
      this.ghost.position.y = -PH[0].draft * FT;
      this.ghost.rotation.z = Math.atan2(PH[0].trimFt * FT, LOA) * this.exagg;
      this.ghost.rotation.x = 0;
    }

    // survey lattice — the digital-twin overlay stays on, and lifts during the two surveys
    const surveying = (p === 0 || p === 5);
    this.scanPlane.visible = surveying && !this.reduced;
    const pulse = this.reduced ? 1 : 0.5 + 0.5 * Math.sin(this.age * 2.0);
    this.lattice.material.opacity = surveying ? 0.32 + 0.32 * pulse : 0.26;
    if (surveying) {
      const w = this.reduced ? 1 : seg(t, 0.06, 0.80);
      this.scanPlane.position.x = lerp(-LOA / 2 - 1, LOA / 2 + 1, w);
    }

    // ---- crane ----
    const stowS = 2.95, stowL = 1.22;
    let cr = { slew: stowS, luff: stowL, y: 16, jaw: 0.12, carry: 0 };
    let fillPct = lerp(prev.fill, cur.fill, k);

    if (p === 2) {
      const kk = ease(seg(t, 0.10, 0.74));
      const sP = this.slewFor(PILE.x, PILE.z), lP = this.luffFor(PILE.x, PILE.z);
      cr = {
        slew: lerp(stowS, sP, kk), luff: lerp(stowL, lP, kk),
        y: lerp(16, Y_TRAVEL, kk), jaw: seg(t, 0.58, 0.92), carry: 0,
      };
      fillPct = 0;
    } else if (p >= 3) {
      const plan = p === 3 ? { n: 4, a: 0.05, b: 0.97 } : p === 4 ? { n: 2, a: 0.0, b: 0.55 } : { n: 1, a: 0.0, b: 0.28 };
      const w = seg(t, plan.a, plan.b);
      if (w < 1) {
        const gcyc = w * plan.n;
        const idx = Math.min(plan.n - 1, Math.floor(gcyc));
        const u = clamp(gcyc - idx, 0, 1);
        const holdIdx = p === 3 ? [2, 0, 1, 2][idx] : p === 4 ? [0, 1][idx] : 1;
        cr = this.grabCycle(u, holdIdx);
      } else {
        const kk = ease(seg(t, plan.b, Math.min(1, plan.b + 0.2)));
        const last = this.grabCycle(1, 1);
        cr = { slew: lerp(last.slew, stowS, kk), luff: lerp(last.luff, stowL, kk), y: lerp(Y_TRAVEL, 16, kk), jaw: 0.12, carry: 0 };
      }
      fillPct = lerp(prev.fill, cur.fill, clamp(seg(t, plan.a + 0.04, plan.b), 0, 1));
    }

    this.slew.rotation.y = cr.slew;
    this.boomPivot.rotation.z = cr.luff;

    // hoist rides the boom tip in slew space, so the fall is always vertical
    const tipX = PIV_X + BOOM * Math.cos(cr.luff);
    const tipYlocal = PIV_Y + BOOM * Math.sin(cr.luff);
    this.hoist.position.set(tipX, tipYlocal - 0.55, 0);
    const rope = clamp(this.tipY(cr.luff) - 0.55 - cr.y, 1.5, 60);
    this.ropes.forEach(r => { r.scale.y = rope; r.position.y = -rope / 2; });
    this.grab.position.y = -rope;
    this.jaws[0].rotation.z = -cr.jaw * 0.92;
    this.jaws[1].rotation.z = -cr.jaw * 0.92;
    this.grabLoad.visible = cr.carry > 0.5;

    const tipLocal = new THREE.Vector3(tipX, tipYlocal, 0);
    const dir = tipLocal.clone().sub(this.aTop);
    this.stay.position.copy(this.aTop).addScaledVector(dir, 0.5);
    this.stay.scale.y = dir.length();
    this.stay.quaternion.setFromUnitVectors(UP, dir.clone().normalize());

    this.fillPct = fillPct;
    const per = fillPct / 100 * 3;
    this.cargo.forEach((cg, i) => {
      const f = clamp(per - i, 0, 1);
      cg.scale.y = Math.max(0.001, f * 3.1);
      cg.position.y = 0.9 + (f * 3.1) / 2 - 0.5;
    });

    if (p === 0 && !this.reduced) {
      const w = seg(t, 0.10, 0.76);
      const code = w > 0 && w < 1 ? STATIONS[Math.min(5, Math.floor(w * 6))].code : null;
      if (code !== this.autoStation) {
        this.autoStation = code; this.syncMarkers();
        this.dispatchEvent(new CustomEvent('stationauto', { detail: { code } }));
      }
    } else if (this.autoStation) {
      this.autoStation = null; this.syncMarkers();
      this.dispatchEvent(new CustomEvent('stationauto', { detail: { code: null } }));
    }

    if (p === 3 && !this.userMoved && !this.reduced) {
      const c = CAM[3];
      this.orbTo.az = c.az + Math.sin(t * Math.PI) * 0.38;
      this.orbTo.d = c.d + Math.sin(t * Math.PI) * 7;
    }
    if (snap) {
      this.orb.az = this.orbTo.az; this.orb.po = this.orbTo.po;
      this.orb.d = this.orbTo.d; this.orb.t.copy(this.orbTo.t);
    }
  }

  updateCamera(b) {
    this.orb.az = lerp(this.orb.az, this.orbTo.az, b);
    this.orb.po = lerp(this.orb.po, this.orbTo.po, b);
    this.orb.d = lerp(this.orb.d, this.orbTo.d, b);
    this.orb.t.lerp(this.orbTo.t, b);
    const { az, po, d, t } = this.orb;
    this.cam.position.set(
      t.x + d * Math.sin(po) * Math.cos(az),
      Math.max(2.0, t.y + d * Math.cos(po)),
      t.z + d * Math.sin(po) * Math.sin(az));
    this.cam.lookAt(t);
  }

  renderNow(p, t) {
    if (typeof p === 'number') { this.phase = p; this.tPhase = t ?? this.tPhase; }
    this.applyPhase(this.phase, this.tPhase, true);
    this.updateCamera(1);
    this.renderer.render(this.scene, this.cam);
  }

  loop() {
    this._raf = requestAnimationFrame(() => this.loop());
    const dt = Math.min(0.05, this.clock.getDelta());
    if (this.onScreen === false) return;
    // Idle motion (hull bob and roll, lattice pulse, water flow) runs on this clock, so it only
    // advances while the scene is playing: a paused scene is a still frame.
    if (this.playing && !this.reduced) this.age += dt;

    if (this.playing && !this.reduced && this.tPhase < 1) {
      this.tPhase = clamp(this.tPhase + (dt * this.speed) / DUR[this.phase], 0, 1);
      this.emitProgress();
      if (this.tPhase >= 1) this.dispatchEvent(new CustomEvent('phasecomplete', { detail: { phase: this.phase } }));
    }

    this.applyPhase(this.phase, this.tPhase, false);

    if (!this.reduced) {
      const s = this.age;
      this.wn[0].offset.set(s * 0.010, s * 0.006);
      this.wn[1].offset.set(-s * 0.005, s * 0.012);
    }

    const b = this.reduced ? 1 : 1 - Math.pow(0.001, dt);
    this.updateCamera(b);

    this.renderer.render(this.scene, this.cam);
  }
}

if (!customElements.get('harbor-stage')) customElements.define('harbor-stage', HarborStage);
window.HarborStageDurations = DUR;
