/* FREQUENCY — harbor-motion.js
 * The Home page's primary experience: a live 3D model of one river-terminal cargo transfer.
 *
 * A pedestal crane works a clamshell grab between the stockpile and BARGE-402. Each cycle the grab
 * bites a visible load out of the pile, lifts it clear, slews to the receiving hold and pours it in;
 * the hold pile grows and the barge settles as the tonnage lands. Six cycles fill the aft, midship
 * and forward holds (aft, aft, mid, mid, fwd, fwd); a closing survey sweep runs, then it repeats.
 *
 * Ledger contract, every frame:  stockpile + in grab + falling + in holds === 900 t
 * Every value is an illustrative configured scenario, not a field measurement.
 *
 * <harbor-motion paused reduced explore>
 *   Methods : play() pause() toggle() restart()
 *   Events  : hmstate (throttled ledger snapshot) · hmready · hmfail
 */
import * as THREE from 'https://unpkg.com/three@0.169.0/build/three.module.js';
import {
  FT, LOA, BEAM, DEPTH, TOTAL, CYCLE_T, HOLD_CAP, HOLD_X,
  HOLD_NAME, PLAN, DRAFT0, DRAFT_PER_T, TRIM0, TRIM_PER_T, LIST0, EXAG,
  QUAY_Y, QUAY_FACE, CR, PED_H, SLEW_Y, PIV_X, PIV_Y, BOOM,
  PIV_WY, PILE, TRAVEL_Y, DECK_TOP, COAM_H, COAM_TOP, HOLD_W, HOLD_B,
  HOLD_FLOOR, HINGE_X, SHELL_W, SKIN, ARM_X, ARM_Z, ARM_L, JAW_OPEN,
  clamp, lerp, smooth, smoother, seg, angDiff, mulberry, makeNoise,
  fbm, hash2, vnoise, canvas, toTex, normalFrom, concreteMaps, steelMaps,
  paintMaps, aggregateMaps, waterNormalMap, stripeTex, textTex, draftMarkTex, envTexture, UP,
  strutGeo, place, merge, Batch, GLSL_NOISE, GLSL_SKY, skyMaterial, MAX_LAMPS,
  waterMaterial, glowMaterial, beamMaterial, dustMaterial,
} from './harbor-kit.js';
import { SCENE } from './harbor-scene.js';

/* ───────── the element ───────── */
class HarborMotion extends HTMLElement {
  static get observedAttributes() { return ['paused', 'reduced', 'explore']; }

  constructor() {
    super();
    this.paused = false; this.reduced = false; this.explore = false;
    this._built = false; this._raf = 0; this._visible = true; this._lastEmit = 0; this._lastKey = '';
    this.t = 0;
  }

  connectedCallback() {
    if (this._built) return;
    this._built = true;
    this.style.display = 'block';
    this.reduced = this.hasAttribute('reduced') && this.getAttribute('reduced') !== '0';
    this.paused = this.reduced || (this.hasAttribute('paused') && this.getAttribute('paused') !== '0');
    this.explore = this.getAttribute('explore') === '1';
    try {
      this.build();
    } catch (e) {
      this.fail(e);
    }
  }

  disconnectedCallback() {
    cancelAnimationFrame(this._raf); this._raf = 0;
    this._io?.disconnect(); this._ro?.disconnect();
    document.removeEventListener('visibilitychange', this._onVis);
    window.removeEventListener('pointermove', this._onPointer);
    if (this.renderer) { this.renderer.dispose(); this.renderer.forceContextLoss?.(); }
    this.reflRT?.dispose();
  }

  attributeChangedCallback(name, oldV, v) {
    if (!this._built || !this.renderer) return;
    const on = v !== null && v !== '0';
    if (name === 'paused') on ? this.pause() : this.play();
    if (name === 'explore') { this.explore = v === '1'; this.setExplore(this.explore); }
  }

  fail(e) {
    this._failed = true;
    try { this.renderer?.dispose(); } catch (_) { }
    this.innerHTML = '';
    this.dispatchEvent(new CustomEvent('hmfail', { detail: String(e && e.message || e) }));
  }

  /* ---- commands ---- */
  play() { if (this._failed) return; this.paused = false; this.clock.getDelta(); this.loop(); this.emit(true); }
  pause() { this.paused = true; this.emit(true); this.requestFrame(); }
  toggle() { this.paused ? this.play() : this.pause(); }
  restart() { this.resetOperation(0); this.startCycle(0); this.emit(true); this.requestFrame(); }

  /* ───────── build ───────── */
  build() {
    const w = this.clientWidth || 1200, h = this.clientHeight || 700;
    const probe = document.createElement('canvas');
    const gl = probe.getContext('webgl2');
    if (!gl) throw new Error('WebGL2 unavailable');
    gl.getExtension('WEBGL_lose_context')?.loseContext();

    this.small = w < 760;
    this.q = { dpr: Math.min(window.devicePixelRatio || 1, this.small ? 1.5 : 1.75), shadow: this.small ? 1024 : 2048, refl: !this.small, pour: this.small ? 260 : 520 };

    const renderer = this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance', alpha: false });
    renderer.setPixelRatio(this.q.dpr);
    renderer.setSize(w, h, false);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    const cv = renderer.domElement;
    cv.style.cssText = 'display:block;width:100%;height:100%;transition:opacity 900ms ease';
    cv.setAttribute('aria-hidden', 'true');
    this.appendChild(cv);
    cv.addEventListener('webglcontextlost', e => { e.preventDefault(); this.fail('context lost'); });

    const scene = this.scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070a12, 0.0058);

    const pm = new THREE.PMREMGenerator(renderer);
    const env = envTexture();
    scene.environment = pm.fromEquirectangular(env).texture;
    scene.environmentIntensity = 0.38;
    env.dispose(); pm.dispose();

    this.cam = new THREE.PerspectiveCamera(36, w / h, 0.3, 3000);
    this.camTarget = new THREE.Vector3();

    this.buildMaterials();
    this.buildSky();
    this.buildWater();
    this.buildLights();
    this.buildQuay();
    this.buildPools();
    this.buildBackground();
    this.buildBarge();
    this.buildCrane();
    this.buildCargo();
    this.buildGlows();
    this.buildPlan();

    // planar reflection for the river surface (desktop tier)
    if (this.q.refl) this.setupReflection(w, h);

    this.pointer = { x: 0, y: 0, sx: 0, sy: 0 };
    this.orbit = { az: 0, po: 0, d: 0, active: false };
    this._onPointer = e => {
      const r = this.getBoundingClientRect();
      if (e.clientY < r.top - 40 || e.clientY > r.bottom + 40) return;
      this.pointer.x = clamp((e.clientX - r.left) / r.width * 2 - 1, -1, 1);
      this.pointer.y = clamp((e.clientY - r.top) / r.height * 2 - 1, -1, 1);
    };
    window.addEventListener('pointermove', this._onPointer, { passive: true });
    this.bindOrbit(cv);

    this._ro = new ResizeObserver(() => this.resize());
    this._ro.observe(this);
    this._io = new IntersectionObserver(es => { this._visible = es[0].isIntersecting; if (this._visible) this.loop(); }, { threshold: 0.01 });
    this._io.observe(this);
    this._onVis = () => { if (!document.hidden) { this.clock.getDelta(); this.loop(); } };
    document.addEventListener('visibilitychange', this._onVis);

    this.clock = new THREE.Clock();
    this.resize(true);

    // Start mid-transfer so the first seconds show a loaded grab on its way to the hold.
    if (this.reduced) this.seekTo(2, 'release', 0.62);
    else this.seekTo(2, 'carry', 0.5);

    this.poseHull(0);
    this.renderFrame(0);
    this.dispatchEvent(new CustomEvent('hmready'));
    this.emit(true);
    if (!this.paused) this.loop();
  }

  holdHeight(i, x, z, f) {
    // heap in the hold, height above the hold floor: a cone of repose under the drop point on top
    // of a level that rises toward the deck as the hold fills. Full (300 t) crowns ~1 m over the coaming.
    const P = 0.25 + 5.7 * Math.pow(f, 0.85);
    const L = 4.3 * smooth(seg(f, 0.15, 1.0));
    const d = Math.sqrt((x / 1.25) * (x / 1.25) + z * z);
    const cone = P - 0.72 * d;
    const k = 0.6, hh = clamp(0.5 + 0.5 * (cone - L) / k, 0, 1);
    let h = lerp(L, cone, hh) + k * hh * (1 - hh);  // smooth max(level, cone)
    h = Math.min(h, P);
    const n = (vnoise(x * 1.3 + this.holdPiles[i].seed, z * 1.3) - 0.5) * 0.3 * Math.min(1, f * 3) + (vnoise(x * 4.1, z * 4.1 + 9) - 0.5) * 0.08;
    return Math.max(0.02, h + n);
  }

  updateHoldPile(i, f) {
    const hp = this.holdPiles[i];
    if (Math.abs(hp.f - f) < 0.003) return;
    hp.f = f;
    hp.mesh.visible = f > 0.004;
    if (!hp.mesh.visible) return;
    const pos = hp.mesh.geometry.attributes.position;
    for (let k = 0; k < pos.count; k++) {
      const x = hp.base[k * 3], z = hp.base[k * 3 + 2];
      pos.setY(k, this.holdHeight(i, x, z, f));
    }
    pos.needsUpdate = true;
    hp.mesh.geometry.computeVertexNormals();
    hp.mesh.geometry.computeBoundingSphere();
  }

  pileHeightLocal(x, z) {
    const r = Math.hypot(x, z) / PILE.r, a = Math.atan2(z, x);
    const lobes = Math.sin(a * 3 + 1.3) * 0.05 + Math.sin(a * 5 + 0.4) * 0.035 + Math.sin(a * 9 + 2.1) * 0.02;
    let h = PILE.h * Math.max(0, 1 - Math.pow(r, 1.05)) * (1 + lobes);
    h -= 0.22 * PILE.h * Math.exp(-Math.pow(r / 0.16, 2));  // rounded crest
    h += ((vnoise(x * 0.9 + 3, z * 0.9) - 0.5) * 0.45 + (vnoise(x * 3.1, z * 3.1 + 5) - 0.5) * 0.12) * Math.min(1, h);
    for (const c of this.craters) {
      const d2 = ((x - c.x) * (x - c.x) + (z - c.z) * (z - c.z)) / (c.w * c.w);
      h -= c.d * Math.exp(-d2) - c.d * 0.22 * Math.exp(-Math.pow(Math.sqrt(d2) - 1.25, 2) * 6);
    }
    return Math.max(0, h);
  }
  pileHeightWorld(x, z) { return QUAY_Y + this.pileHeightLocal(x - PILE.x, z - PILE.z); }

  rebuildPile() {
    const p = this.pile.geometry.attributes.position, b = this.pileBase;
    for (let k = 0; k < p.count; k++) p.setY(k, this.pileHeightLocal(b[k * 3], b[k * 3 + 2]));
    p.needsUpdate = true;
    this.pile.geometry.computeVertexNormals();
    this.pile.geometry.computeBoundingSphere();
  }

  updatePlan() {
    const op = this.op, sgm = op.segs[op.si], k = sgm.k, u = op.u;
    const active = op.mode === 'cycle' || op.mode === 'fadein';
    // the planned carry: along the slew arc at load height, then straight down into the hatch
    const hp = this.holdPoint(op.hold);
    const rP = Math.hypot(op.pick.x - CR.x, op.pick.z - CR.z), rH = Math.hypot(hp.x - CR.x, hp.z - CR.z);
    const P = this.path.geometry.attributes.position, N = P.count, split = 0.82;
    for (let i = 0; i < N; i++) {
      const t = i / (N - 1);
      if (t <= split) {
        const e = t / split, a = op.sP + angDiff(op.sP, op.sH) * e, r = lerp(rP, rH, e);
        P.setXYZ(i, CR.x + Math.cos(a) * r, TRAVEL_Y - 1.1 + Math.sin(Math.PI * e) * 1.2, CR.z - Math.sin(a) * r);
      } else {
        const e = (t - split) / (1 - split);
        const a = op.sH;
        P.setXYZ(i, CR.x + Math.cos(a) * rH, lerp(TRAVEL_Y - 1.1, hp.y + 0.2, e), CR.z - Math.sin(a) * rH);
      }
    }
    P.needsUpdate = true;
    const order = ['lower', 'close', 'lift', 'carry', 'spot', 'release', 'settle', 'return'], si = order.indexOf(k);
    let pa = 0;
    if (active) {
      if (k === 'close') pa = smooth(u) * 0.6; else if (k === 'lift' || k === 'carry') pa = 0.6; else if (k === 'spot') pa = 0.6 * (1 - smooth(u) * 0.5);
      else if (k === 'release') pa = 0.3 * (1 - u); else if (k === 'lower') pa = 0.18 * smooth(u);
    }
    this.pathMat.uniforms.uA.value = pa * (this.reduced && this.paused ? 0.7 : 1);
    this.pathMat.uniforms.uTime.value = this.t;
    this.hatchLines.forEach((l, i) => {
      const target = active && i === op.hold && si >= 1 && si <= 6;
      const pulse = 0.55 + 0.25 * Math.sin(this.t * 3.2);
      l.material.opacity = target ? (k === 'release' || k === 'settle' ? 0.9 : pulse) : 0;
    });
    const br = this.biteRing;
    const ra = active && (k === 'lower' || k === 'close') ? (k === 'lower' ? smooth(u) : 1 - smooth(u)) * 0.8 : 0;
    br.material.opacity = ra;
    if (ra > 0) br.position.set(op.pick.x, this.pileHeightWorld(op.pick.x, op.pick.z) + 0.15, op.pick.z);
  }

  /* ───────── camera ───────── */
  /* Framing follows the layout: over the headline (desktop, landscape tablet) the operation sits right
   * of the copy; stacked under nothing (phones, portrait tablets) it is centred. The layout says which
   * through the CSS custom property --hm-frame, read on resize. */
  frame() {
    if (this.camOverride) return this.camOverride(this._w / this._h);
    return this._frame || this.pickFrame();
  }

  pickFrame() {
    const asp = (this._w || 16) / (this._h || 9), V = (x, y, z) => new THREE.Vector3(x, y, z);
    const mode = (getComputedStyle(this).getPropertyValue('--hm-frame') || '').trim();
    let f;
    if (asp < 1) f = { pos: V(-26, 14, 62.2), tgt: V(4, 9, -12), fov: 50 };
    else if (mode === 'center') f = { pos: V(-30, 16, 58), tgt: V(0, 9.5, -12), fov: 38 };
    else if (asp < 1.45) f = { pos: V(-50, 14, 62), tgt: V(-12, 8.5, -12), fov: 36 };
    else f = { pos: V(-52, 14, 62), tgt: V(-14, 8.5, -12), fov: 32 };
    this._frame = f;
    return f;
  }

  bindOrbit(cv) {
    let down = false, lx = 0, ly = 0, pid = null;
    cv.addEventListener('pointerdown', e => {
      if (!this.explore) return;
      down = true; lx = e.clientX; ly = e.clientY; pid = e.pointerId; cv.setPointerCapture(pid); cv.style.cursor = 'grabbing';
    });
    cv.addEventListener('pointermove', e => {
      if (!down) return;
      this.orbit.az -= (e.clientX - lx) * 0.005; this.orbit.po = clamp(this.orbit.po + (e.clientY - ly) * 0.004, -0.5, 0.55);
      lx = e.clientX; ly = e.clientY; this.requestFrame();
    });
    const up = () => { if (!down) return; down = false; try { cv.releasePointerCapture(pid); } catch (_) { } cv.style.cursor = this.explore ? 'grab' : ''; };
    cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
    cv.addEventListener('wheel', e => {
      if (!this.explore) return;
      e.preventDefault();
      this.orbit.d = clamp(this.orbit.d + Math.sign(e.deltaY) * 0.08, -0.55, 0.6); this.requestFrame();
    }, { passive: false });
  }

  nudge(daz, dpo, dd) {
    this.orbit.az += daz || 0;
    this.orbit.po = clamp(this.orbit.po + (dpo || 0), -0.5, 0.55);
    this.orbit.d = clamp(this.orbit.d + (dd || 0), -0.55, 0.6);
    this.requestFrame();
  }

  setExplore(on) {
    this.explore = on;
    const cv = this.renderer.domElement;
    cv.style.cursor = on ? 'grab' : '';
    cv.style.touchAction = on ? 'none' : '';
    if (!on) { this.orbit.az = 0; this.orbit.po = 0; this.orbit.d = 0; }
    else { this.orbit.d = -0.18; }
    this.requestFrame();
  }

  placeCamera(dt) {
    const f = this.frame();
    const p = this.pointer, k = this.reduced ? 1 : 1 - Math.pow(0.04, dt || 0.016);
    p.sx += ((this.explore ? 0 : p.x) - p.sx) * k; p.sy += ((this.explore ? 0 : p.y) - p.sy) * k;
    const o = this.orbit; o.saz = lerp(o.saz || 0, o.az, k); o.spo = lerp(o.spo || 0, o.po, k); o.sd = lerp(o.sd || 0, o.d, k);
    const drift = this.reduced ? 0 : 1, t = this.t;
    const az = o.saz + drift * 0.045 * Math.sin(t * 2 * Math.PI / 52) - p.sx * 0.05;
    const off = new THREE.Vector3().subVectors(f.pos, f.tgt);
    const r = off.length() * (1 + o.sd);
    const sph = new THREE.Spherical().setFromVector3(off);
    sph.theta += az; sph.phi = clamp(sph.phi - o.spo + p.sy * 0.025 + drift * 0.012 * Math.sin(t * 2 * Math.PI / 37), 0.25, 1.62); sph.radius = r;
    this.cam.position.copy(f.tgt).add(new THREE.Vector3().setFromSpherical(sph));
    this.cam.position.y = Math.max(this.cam.position.y, 1.2);
    if (this.cam.fov !== f.fov) { this.cam.fov = f.fov; this.cam.updateProjectionMatrix(); }
    this.camTarget.copy(f.tgt);
    this.cam.lookAt(this.camTarget);
  }

  resize(force) {
    const W = Math.max(2, this.clientWidth | 0), H = Math.max(2, this.clientHeight | 0);
    if (!force && W === this._w && H === this._h) return;
    this._w = W; this._h = H;
    this.renderer.setSize(W, H, false);
    this.cam.aspect = W / H; this.cam.updateProjectionMatrix();
    const f = this.pickFrame(); this.cam.fov = f.fov; this.cam.updateProjectionMatrix();
    const scale = H * this.renderer.getPixelRatio() / (2 * Math.tan(THREE.MathUtils.degToRad(this.cam.fov) / 2));
    this.glowMat.uniforms.uScale.value = scale; this.dustMat.uniforms.uScale.value = scale; this.pathMat.uniforms.uScale.value = scale;
    if (this.reflRT) this.reflRT.setSize(Math.max(2, W * this.renderer.getPixelRatio() * 0.5 | 0), Math.max(2, H * this.renderer.getPixelRatio() * 0.5 | 0));
    this.requestFrame();
  }

  /* ───────── the operation ───────── */
  resetOperation(k) {
    // deterministic checkpoint at the start of grab cycle k
    this.op = { k, segs: null, si: 0, u: 0, mode: 'cycle', modeT: 0,
      source: TOTAL - CYCLE_T * k, carried: 0, falling: 0, deposited: [0, 0, 0], releases: [] };
    for (let c = 0; c < k; c++) this.op.deposited[PLAN[c]] += CYCLE_T;
    this.craters = [];
    for (let c = 0; c < k; c++) { const pk = this.pickPoint(c); this.craters.push({ x: pk.x - PILE.x, z: pk.z - PILE.z, w: 2.3, d: 1.25 }); }
    this.rebuildPile();
    for (let i = 0; i < 3; i++) { this.holdPiles[i].f = -1; this.updateHoldPile(i, this.op.deposited[i] / HOLD_CAP); }
    const P = this.P; P.state.fill(0); this.rocks.count = 0;
    this.D.life.fill(0); this.D.alpha.fill(0);
    this.heave.y = 0; this.heave.v = 0;
    this.swing = { x: 0, z: 0, vx: 0, vz: 0 };
    this.prevTip = null; this.prevTipV = null;
  }

  pickPoint(k) {
    // bites walk around the crane-facing flank of the pile
    const base = Math.atan2(CR.z - PILE.z, CR.x - PILE.x);
    const a = base + [-0.34, 0.12, -0.08, 0.36, -0.22, 0.24][k % 6];
    const r = [5.4, 4.6, 6.1, 5.0, 4.2, 5.8][k % 6];
    const x = PILE.x + Math.cos(a) * r, z = PILE.z + Math.sin(a) * r;
    return { x, z };
  }

  holdPoint(h) {
    this.hull.updateMatrixWorld(true);
    return this.hull.localToWorld(new THREE.Vector3(HOLD_X[h], COAM_TOP, 0));
  }

  startCycle(k) {
    const op = this.op;
    op.k = k; op.si = 0; op.u = 0; op.mode = 'cycle';
    const pk = this.pickPoint(k), hp = this.holdPoint(PLAN[k]);
    const sP = Math.atan2(-(pk.z - CR.z), pk.x - CR.x), sH = Math.atan2(-(hp.z - CR.z), hp.x - CR.x);
    const d = Math.abs(angDiff(sP, sH));
    const nk = (k + 1) % 6, npk = this.pickPoint(nk);
    op.pick = pk; op.hold = PLAN[k]; op.sP = sP; op.sH = sH; op.nextPick = npk;
    op.segs = [
      { k: 'lower', d: 2.0 }, { k: 'close', d: 1.6 }, { k: 'lift', d: 2.1 },
      { k: 'carry', d: 2.4 + d * 1.1 }, { k: 'spot', d: 1.6 }, { k: 'release', d: 1.9 },
      { k: 'settle', d: 0.9 }, { k: 'return', d: 2.0 + d * 0.95 },
    ];
    // bite geometry for this cycle
    const surf = this.pileHeightWorld(pk.x, pk.z);
    op.digY = surf + 1.05;  // hinge height when the open jaws meet the surface
    op.crater = { x: pk.x - PILE.x, z: pk.z - PILE.z, w: 2.3, d: 0 };
    this.craters.push(op.crater);
    op.biteDone = false; op.rel = null;
  }

  seekTo(k, segName, u) {
    this.resetOperation(k);
    this.startCycle(k);
    // run the model forward at a fixed step, without rendering, to the requested moment
    const dt = 1 / 60;
    let guard = 0;
    const target = () => this.op.segs[this.op.si].k === segName && this.op.u >= u;
    this.poseHull(0);
    this.pose(0, true);
    while (!target() && guard++ < 4000) this.step(dt);
  }

  step(dt) {
    this.advance(dt);
    this.poseHull(dt);
    this.pose(dt);
    this.stepParticles(dt);
  }

  /* one segment timeline per cycle, then the closing survey, then a fade back to the start */
  advance(dt) {
    const op = this.op;
    this.t += dt;
    if (op.mode === 'survey') {
      op.modeT += dt;
      if (op.modeT >= 5.2) { op.mode = 'fade'; op.modeT = 0; this.renderer.domElement.style.opacity = '0'; }
      return;
    }
    if (op.mode === 'fade') {
      op.modeT += dt;
      if (op.modeT >= 1.0 && !op.didReset) { op.didReset = true; this.resetOperation(0); this.startCycle(0); this.op.mode = 'fadein'; this.op.modeT = 0; this.renderer.domElement.style.opacity = '1'; }
      return;
    }
    if (op.mode === 'fadein') { op.modeT += dt; if (op.modeT > 0.9) op.mode = 'cycle'; }
    const sgm = op.segs[op.si];
    op.u += dt / sgm.d;
    this.ledger(sgm.k, Math.min(1, op.u));
    if (op.u >= 1) {
      op.si += 1; op.u = 0;
      if (op.si >= op.segs.length) {
        if (op.k >= 5) { op.mode = 'survey'; op.modeT = 0; op.si = op.segs.length - 1; op.u = 1; }
        else this.startCycle(op.k + 1);
      }
    }
  }

  ledger(k, u) {
    const op = this.op;
    if (k === 'close') {
      // acquire: stockpile → grab, progressively as the jaws bite
      const want = CYCLE_T * smooth(u);
      const take = Math.min(want - op.carried, op.source);
      if (take > 0) { op.source -= take; op.carried += take; }
      op.crater.d = 1.25 * smooth(u);
      if (!op.biteDone) { this.rebuildPile(); if (u >= 1) op.biteDone = true; }
      if (Math.random() < 0.5) this.spawnDust(op.pick.x + (Math.random() - 0.5) * 3, this.pileHeightWorld(op.pick.x, op.pick.z) + 0.4, op.pick.z + (Math.random() - 0.5) * 3, 1.6, 0.35);
    } else if (k === 'release' && !op.rel) {
      op.rel = { hold: op.hold, N: this.q.pour, spawned: 0, landed: 0, base: op.deposited[op.hold], carried0: op.carried };
      op.releases.push(op.rel);
    }
  }

  /* crane + grab pose from the timeline; pendulum swing integrated in world space */
  pose(dt, snap) {
    const op = this.op, sgm = op.segs[op.si], u = clamp(op.u, 0, 1), k = sgm.k;
    const pk = op.pick, hp = this.holdPoint(op.hold);
    const rP = Math.hypot(pk.x - CR.x, pk.z - CR.z), rH = Math.hypot(hp.x - CR.x, hp.z - CR.z);
    const nP = op.nextPick, sN = Math.atan2(-(nP.z - CR.z), nP.x - CR.x), rN = Math.hypot(nP.x - CR.x, nP.z - CR.z);
    const relY = hp.y + 3.55;  // closed jaw tips clear the coaming by ~1 m
    let slew = op.sP, rad = rP, y = TRAVEL_Y, jaw = 1, damp = 0.22;
    if (k === 'lower') { y = lerp(TRAVEL_Y, op.digY, smoother(u)); jaw = 1; damp = 1.2; }
    else if (k === 'close') { y = lerp(op.digY, op.digY - 0.55, smooth(u)); jaw = 1 - smoother(u); damp = 3; }
    else if (k === 'lift') { const e = u < 0.18 ? 0 : smoother((u - 0.18) / 0.82); y = lerp(op.digY - 0.55, TRAVEL_Y, e); jaw = 0; damp = 1.0; }
    else if (k === 'carry') { const e = smoother(u); slew = op.sP + angDiff(op.sP, op.sH) * e; rad = lerp(rP, rH, e); y = TRAVEL_Y + Math.sin(Math.PI * u) * 1.2; jaw = 0; }
    else if (k === 'spot') { slew = op.sH; rad = rH; y = lerp(TRAVEL_Y, relY, smoother(u)); jaw = 0; damp = 0.5; }
    else if (k === 'release') { slew = op.sH; rad = rH; y = relY; jaw = smoother(seg(u, 0.05, 0.62)); damp = 0.6; }
    else if (k === 'settle') { slew = op.sH; rad = rH; y = relY + 0.4 * smooth(u); jaw = 1; damp = 0.6; }
    else if (k === 'return') {
      const e = smoother(seg(u, 0.1, 1));
      const survey = op.k >= 5;
      slew = op.sH + angDiff(op.sH, survey ? op.sP + 0.25 : sN) * e; rad = lerp(rH, survey ? rP - 3 : rN, e);
      y = lerp(relY + 0.4, TRAVEL_Y + (survey ? 1.5 : 0), smoother(seg(u, 0, 0.55))); jaw = survey ? lerp(1, 0.25, e) : 1;
    }
    if (op.mode !== 'cycle' && op.mode !== 'fadein') { jaw = 0.25; }
    this.jawOpen = jaw;

    // boom
    const luff = Math.acos(clamp((rad - PIV_X) / BOOM, 0.06, 0.985));
    this.slew.rotation.y = slew;
    this.boom.rotation.z = luff;
    this.slew.updateMatrixWorld(true);
    const tip = this.tipNode.getWorldPosition(this._tip || (this._tip = new THREE.Vector3()));

    // pendulum: the grab lags the boom head, then settles
    const sw = this.swing;
    if (snap || !this.prevTip || dt <= 0) {
      this.prevTip = tip.clone(); this.prevTipV = new THREE.Vector3(); sw.x = sw.z = sw.vx = sw.vz = 0;
    } else {
      const h = dt;
      const v = new THREE.Vector3().subVectors(tip, this.prevTip).divideScalar(h);
      const a = new THREE.Vector3().subVectors(v, this.prevTipV).divideScalar(h);
      this.prevTip.copy(tip); this.prevTipV.lerp(v, 0.6);
      const L = Math.max(3, tip.y - (y + 3.2));
      const w2 = 9.81 / L, w = Math.sqrt(w2);
      const ax = clamp(a.x, -6, 6), az = clamp(a.z, -6, 6);
      const n = Math.max(1, Math.ceil(h / (1 / 120))), sh = h / n;
      for (let i = 0; i < n; i++) {
        sw.vx += (-w2 * sw.x - ax - 2 * damp * w * sw.vx) * sh; sw.vz += (-w2 * sw.z - az - 2 * damp * w * sw.vz) * sh;
        sw.x += sw.vx * sh; sw.z += sw.vz * sh;
      }
      const m = Math.hypot(sw.x, sw.z); if (m > 1.6) { sw.x *= 1.6 / m; sw.z *= 1.6 / m; }
    }

    // grab: hinge line at y, directly under the boom head plus swing; yaw follows the slew
    const hinge = this._hinge || (this._hinge = new THREE.Vector3());
    hinge.set(tip.x + sw.x, y, tip.z + sw.z);
    const ang = jaw * JAW_OPEN;
    const cx = HINGE_X + SKIN[0][0] * Math.cos(ang) - SKIN[0][1] * Math.sin(ang);
    const cy = SKIN[0][0] * Math.sin(ang) + SKIN[0][1] * Math.cos(ang);
    const headY = cy + Math.sqrt(Math.max(0.01, ARM_L * ARM_L - (ARM_X - cx) * (ARM_X - cx)));
    this.grab.position.copy(hinge);
    const ropeDir = new THREE.Vector3(tip.x - hinge.x, tip.y - (hinge.y + headY), tip.z - hinge.z).normalize();
    const yaw = new THREE.Quaternion().setFromAxisAngle(UP, slew);
    const tilt = new THREE.Quaternion().setFromUnitVectors(UP, ropeDir);
    this.grab.quaternion.copy(tilt).multiply(yaw);
    this.grabHead.position.set(0, headY, 0);
    this.jaws.forEach(j => { j.rotation.z = ang; });
    for (const A of this.arms) {
      const a0 = new THREE.Vector3(A.sx * ARM_X, headY - 0.3, A.sz * ARM_Z);
      const a1 = new THREE.Vector3(A.sx * cx, cy, A.sz * ARM_Z);
      const d = new THREE.Vector3().subVectors(a1, a0), l = d.length();
      A.m.position.copy(a0).addScaledVector(d, 0.5); A.m.scale.set(1, l, 1); A.m.quaternion.setFromUnitVectors(UP, d.normalize());
    }
    // load in the grab follows the ledger
    const carried = op.carried / CYCLE_T;
    this.load.visible = carried > 0.01;
    if (this.load.visible) {
      const s = Math.pow(carried, 0.5);
      this.load.scale.set(1.62 * s, 1.35 * Math.max(0.3, carried), 1.34 * s);
      this.load.position.set(0, -1.15 - (1 - carried) * 0.9, 0);
    }
    this.grab.updateMatrixWorld(true);

    // hoist ropes: boom head sheaves → head block
    const headW = this.grabHead.getWorldPosition(this._headW || (this._headW = new THREE.Vector3()));
    const side = new THREE.Vector3(-Math.sin(slew), 0, -Math.cos(slew));
    this.hoistRopes.forEach((m, i) => {
      const o = (i === 0 ? -0.42 : 0.42);
      const a = tip.clone().addScaledVector(side, o), b = headW.clone().addScaledVector(side, o * 0.8); b.y += 0.5;
      const d = new THREE.Vector3().subVectors(a, b), l = d.length();
      m.position.copy(b).addScaledVector(d, 0.5); m.scale.set(1, l, 1); m.quaternion.setFromUnitVectors(UP, d.normalize());
    });
    // luffing ropes: A-frame apex → boom head, in slew space
    const tipLocal = new THREE.Vector3(PIV_X + (BOOM + 0.2) * Math.cos(luff), PIV_Y + (BOOM + 0.2) * Math.sin(luff), 0);
    this.luffRopes.forEach(m => {
      const a = this.aTop.clone().setZ(m.userData.z), b = tipLocal.clone().setZ(m.userData.z);
      const d = new THREE.Vector3().subVectors(b, a), l = d.length();
      m.position.copy(a).addScaledVector(d, 0.5); m.scale.set(1, l, 1); m.quaternion.setFromUnitVectors(UP, d.normalize());
    });
    // boom-head work light aims at the grab
    const lamp = this.lampNode.getWorldPosition(this._lamp || (this._lamp = new THREE.Vector3()));
    this.work.position.copy(lamp); this.work.target.position.set(hinge.x, Math.min(hinge.y - 2, 3), hinge.z); this.work.target.updateMatrixWorld();
    const beamLen = Math.max(4, lamp.y - Math.max(QUAY_Y, 1.2));
    this.workBeam.position.set(lamp.x, lamp.y - beamLen / 2, lamp.z); this.workBeam.scale.set(4.5, beamLen, 4.5); this.workBeam.quaternion.identity();
    this.cabLight.position.copy(this.slew.localToWorld(new THREE.Vector3(3.2, 3.9, 2.6)));

    // particles pour from the open jaws while the release is running
    const rel = op.rel;
    if (rel && k === 'release' && jaw > 0.18 && rel.spawned < rel.N) {
      const want = Math.min(rel.N, Math.floor(rel.N * smooth(seg(u, 0.12, 0.8))));
      const gv = new THREE.Vector3(sw.vx, 0, sw.vz);
      for (let s = rel.spawned; s < want; s++) this.spawnRock(hinge, rel, gv);
      rel.spawned = Math.max(rel.spawned, want);
    }
    if (rel && rel.spawned > 0) op.carried = rel.carried0 * (1 - rel.spawned / rel.N);
    if (rel && rel.spawned >= rel.N) op.carried = 0;
    // bite spill: a few fragments roll back off the rising grab onto the pile
    if (k === 'lift' && u > 0.2 && u < 0.7 && Math.random() < 0.35) this.spawnSpill(hinge);
  }

  spawnRock(hinge, rel, gv) {
    const P = this.P, r = P.rnd;
    let i = -1;
    for (let t = 0; t < P.n; t++) if (P.state[t] === 0) { i = t; break; }
    if (i < 0) { rel.landed++; return; }
    P.state[i] = 1; P.rel[i] = this.op.releases.indexOf(rel);
    const q = this.grab.quaternion;
    const off = new THREE.Vector3((r() - 0.5) * 1.9 * (0.4 + 0.6 * this.jawOpen), -1.4 - r() * 1.0, (r() - 0.5) * 2.5).applyQuaternion(q);
    P.pos[i * 3] = hinge.x + off.x; P.pos[i * 3 + 1] = hinge.y + off.y; P.pos[i * 3 + 2] = hinge.z + off.z;
    P.vel[i * 3] = gv.x + (r() - 0.5) * 0.9; P.vel[i * 3 + 1] = -0.8 - r() * 1.8; P.vel[i * 3 + 2] = gv.z + (r() - 0.5) * 0.9;
    P.rot[i * 3] = r() * 6; P.rot[i * 3 + 1] = r() * 6; P.rot[i * 3 + 2] = r() * 6;
    P.spin[i * 3] = (r() - 0.5) * 6; P.spin[i * 3 + 1] = (r() - 0.5) * 6; P.spin[i * 3 + 2] = (r() - 0.5) * 6;
    P.size[i] = 0.09 + Math.pow(r(), 2.2) * 0.3;
  }

  spawnSpill(hinge) {
    const P = this.P, r = P.rnd;
    let i = -1;
    for (let t = P.n - 1; t >= 0; t--) if (P.state[t] === 0) { i = t; break; }
    if (i < 0) return;
    P.state[i] = 2; P.rel[i] = -1;
    P.pos[i * 3] = hinge.x + (r() - 0.5) * 3.2; P.pos[i * 3 + 1] = hinge.y - 1.8 - r() * 0.6; P.pos[i * 3 + 2] = hinge.z + (r() - 0.5) * 2.6;
    P.vel[i * 3] = (r() - 0.5) * 0.6; P.vel[i * 3 + 1] = -0.2; P.vel[i * 3 + 2] = (r() - 0.5) * 0.6;
    P.spin[i * 3] = (r() - 0.5) * 5; P.spin[i * 3 + 1] = (r() - 0.5) * 5; P.spin[i * 3 + 2] = (r() - 0.5) * 5;
    P.size[i] = 0.12 + r() * 0.2;
  }

  spawnDust(x, y, z, size, alpha) {
    const D = this.D, i = D.next; D.next = (D.next + 1) % D.n;
    D.pos[i * 3] = x; D.pos[i * 3 + 1] = y; D.pos[i * 3 + 2] = z;
    D.vel[i * 3] = 0.25 + (Math.random() - 0.5) * 0.8; D.vel[i * 3 + 1] = 0.35 + Math.random() * 0.6; D.vel[i * 3 + 2] = (Math.random() - 0.5) * 0.8;
    D.max[i] = 2.2 + Math.random() * 2.2; D.life[i] = D.max[i];
    D.size[i] = size * (0.7 + Math.random() * 0.6); D.alpha[i] = 0;
    D.alpha0 = D.alpha0 || new Float32Array(D.n); D.alpha0[i] = alpha;
  }

  stepParticles(dt) {
    const P = this.P, op = this.op;
    const inv = this._hullInv || (this._hullInv = new THREE.Matrix4());
    this.hull.updateMatrixWorld(true);
    inv.copy(this.hull.matrixWorld).invert();
    const v = this._pv || (this._pv = new THREE.Vector3());
    let live = 0;
    const m = this._pm || (this._pm = new THREE.Matrix4()), e = this._pe || (this._pe = new THREE.Euler()), qq = this._pq || (this._pq = new THREE.Quaternion());
    const sc = this._ps || (this._ps = new THREE.Vector3()), ps = this._pp || (this._pp = new THREE.Vector3());
    for (let i = 0; i < P.n; i++) {
      const st = P.state[i];
      if (!st) continue;
      const j = i * 3;
      P.vel[j + 1] -= 9.81 * dt;
      P.pos[j] += P.vel[j] * dt; P.pos[j + 1] += P.vel[j + 1] * dt; P.pos[j + 2] += P.vel[j + 2] * dt;
      P.rot[j] += P.spin[j] * dt; P.rot[j + 1] += P.spin[j + 1] * dt; P.rot[j + 2] += P.spin[j + 2] * dt;
      let floor;
      if (st === 1) {
        const rel = op.releases[P.rel[i]];
        v.set(P.pos[j], P.pos[j + 1], P.pos[j + 2]).applyMatrix4(inv);
        const hi = rel ? rel.hold : 0;
        const lx = clamp(v.x - HOLD_X[hi], -HOLD_W / 2 + 0.3, HOLD_W / 2 - 0.3), lz = clamp(v.z, -HOLD_B / 2 + 0.3, HOLD_B / 2 - 0.3);
        const f = this.holdPiles[hi].f > 0 ? this.holdPiles[hi].f : 0;
        const localFloor = HOLD_FLOOR + this.holdHeight(hi, lx, lz, f);
        if (v.y <= localFloor) {
          P.state[i] = 0;
          if (rel) {
            rel.landed++;
            op.deposited[rel.hold] = rel.base + rel.carried0 * (rel.landed / rel.N);
            this.heave.v -= 0.0026 * (CYCLE_T / rel.N);
            if ((rel.landed % 5) === 0) this.spawnDust(P.pos[j] + (P.rnd() - 0.5), P.pos[j + 1] + 0.2, P.pos[j + 2] + (P.rnd() - 0.5), 2.6, 0.22);
          }
          continue;
        }
      } else {
        floor = this.pileHeightWorld(P.pos[j], P.pos[j + 2]);
        if (P.pos[j + 1] <= floor) { P.state[i] = 0; continue; }
      }
      e.set(P.rot[j], P.rot[j + 1], P.rot[j + 2]); qq.setFromEuler(e);
      sc.setScalar(P.size[i]); ps.set(P.pos[j], P.pos[j + 1], P.pos[j + 2]);
      m.compose(ps, qq, sc);
      this.rocks.setMatrixAt(live, m);
      if (live !== i) { /* colour variety comes from the slot, which is fine for gravel */ }
      live++;
    }
    this.rocks.count = live;
    this.rocks.instanceMatrix.needsUpdate = true;
    // settle the ledger: releases whose every fragment has landed
    let falling = 0;
    for (const rel of op.releases) {
      if (rel.done) continue;
      const inAir = rel.carried0 * ((rel.spawned - rel.landed) / rel.N);
      falling += inAir;
      if (rel.spawned >= rel.N && rel.landed >= rel.N) { op.deposited[rel.hold] = rel.base + rel.carried0; rel.done = true; }
    }
    op.falling = falling;
    for (let i = 0; i < 3; i++) this.updateHoldPile(i, op.deposited[i] / HOLD_CAP);

    // dust
    const D = this.D;
    for (let i = 0; i < D.n; i++) {
      if (D.life[i] <= 0) { D.alpha[i] = 0; continue; }
      D.life[i] -= dt;
      const j = i * 3, t = 1 - D.life[i] / D.max[i];
      D.pos[j] += D.vel[j] * dt; D.pos[j + 1] += D.vel[j + 1] * dt * (1 - t * 0.6); D.pos[j + 2] += D.vel[j + 2] * dt;
      D.size[i] += dt * 1.1;
      D.alpha[i] = (D.alpha0 ? D.alpha0[i] : 0.3) * Math.min(1, t * 6) * (1 - t);
    }
    this.dust.geometry.attributes.position.needsUpdate = true;
    this.dust.geometry.attributes.aSize.needsUpdate = true;
    this.dust.geometry.attributes.aAlpha.needsUpdate = true;
  }

  vessel() {
    const d = this.op.deposited, dep = d[0] + d[1] + d[2];
    return { mean: DRAFT0 + dep * DRAFT_PER_T, trim: TRIM0 + (d[2] - d[0]) * TRIM_PER_T, list: LIST0, aboard: dep };
  }

  poseHull(dt) {
    const v = this.vessel(), t = this.t, hv = this.heave;
    // heave spring: each landed tonne pushes the hull down, the river pushes it back
    const n = Math.max(1, Math.ceil(dt / (1 / 120))), h = dt / n;
    for (let i = 0; i < n; i++) { hv.v += (-4.2 * hv.y - 1.3 * hv.v) * h; hv.y += hv.v * h; }
    const wave = this.reduced ? 0 : 0.022 * Math.sin(t * 0.9) + 0.012 * Math.sin(t * 1.63 + 1.1);
    this.hull.position.set(0, -v.mean * FT + hv.y + wave, 0);
    this.hull.rotation.z = Math.atan2(v.trim * FT, LOA) * EXAG + (this.reduced ? 0 : 0.0016 * Math.sin(t * 0.47 + 2));
    this.hull.rotation.x = Math.atan2(v.list * FT, BEAM) * EXAG + (this.reduced ? 0 : 0.0035 * Math.sin(t * 0.61));
    this.hull.updateMatrixWorld(true);
    // waterline trace sits where the river meets the hull
    const y = -this.hull.position.y;
    const wl = this.waterline.geometry.attributes.position;
    wl.setY(0, y + 0.02); wl.setY(1, y + 0.02); wl.needsUpdate = true;
  }

  updateSurvey() {
    const op = this.op;
    let scan = -99, on = false;
    if (op.mode === 'survey') { const w = seg(op.modeT, 0.4, 4.8); scan = lerp(-LOA / 2 - 2, LOA / 2 + 2, smooth(w)); on = w > 0 && w < 1; }
    this.latticeMat.uniforms.uScan.value = scan;
    this.latticeMat.uniforms.uBase.value = op.mode === 'survey' ? 0.34 : 0.2;
    this.scanPlane.visible = on;
    if (on) { this.scanPlane.position.x = scan; this.scanPlane.material.opacity = 0.06; }
  }

  updateGlows() {
    const g = this.glows.geometry, P = g.attributes.position, C = g.attributes.aColor, base = this.staticGlowCount;
    const set = (i, p, c, s) => { P.setXYZ(base + i, p.x, p.y, p.z); C.setXYZ(base + i, c[0], c[1], c[2]); if (s) g.attributes.aSize.setX(base + i, s); };
    const lamp = this._lamp || new THREE.Vector3();
    set(0, lamp, [6, 5.6, 5], 1.6);
    set(1, this.obstNode.getWorldPosition(this._obst || (this._obst = new THREE.Vector3())), [3.5, 0.25, 0.15], 1.5);
    set(2, this.cabLight.position, [1.6, 1.1, 0.6], 1.4);
    this.navLamps.forEach((n, i) => set(3 + i, n.p.clone().applyMatrix4(this.hull.matrixWorld), n.c.map(x => x * (i === 2 ? 1.2 : 2.2)), 0.8));
    P.needsUpdate = true; C.needsUpdate = true; g.attributes.aSize.needsUpdate = true;
    const u = this.waterMat.uniforms, b = this.dynLampBase;
    u.uLampPos.value[b].copy(lamp); u.uLampCol.value[b].set(0.9, 0.85, 0.78);
    u.uLampPos.value[b + 1].copy(this.navLamps[0].p.clone().applyMatrix4(this.hull.matrixWorld)); u.uLampCol.value[b + 1].set(0.1, 0.6, 0.25);
    u.uLampPos.value[b + 2].copy(this.navLamps[1].p.clone().applyMatrix4(this.hull.matrixWorld)); u.uLampCol.value[b + 2].set(0.6, 0.08, 0.05);
  }

  /* ───────── render ───────── */
  renderReflection() {
    if (!this.reflRT) return;
    const cam = this.cam, rc = this.reflCam;
    const normal = new THREE.Vector3(0, 1, 0), plane = new THREE.Plane(normal, 0);
    const camPos = cam.getWorldPosition(new THREE.Vector3());
    if (camPos.y < 0.2) return;
    const view = new THREE.Vector3(0, 0, 0).sub(camPos).reflect(normal).negate();
    rc.position.copy(view);
    const rot = new THREE.Matrix4().extractRotation(cam.matrixWorld);
    const look = new THREE.Vector3(0, 0, -1).applyMatrix4(rot).add(camPos);
    const target = new THREE.Vector3().subVectors(new THREE.Vector3(), look).reflect(normal).negate();
    rc.up.set(0, 1, 0).applyMatrix4(rot).reflect(normal);
    rc.lookAt(target);
    rc.far = cam.far; rc.near = cam.near;
    rc.updateMatrixWorld();
    rc.projectionMatrix.copy(cam.projectionMatrix);
    // texture matrix: world → reflection texture
    const tm = this.waterMat.uniforms.uTexMat.value;
    tm.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1);
    tm.multiply(rc.projectionMatrix).multiply(rc.matrixWorldInverse);
    // oblique near plane so nothing below the river surface reflects
    const cp = plane.clone().applyMatrix4(rc.matrixWorldInverse);
    const clip = new THREE.Vector4(cp.normal.x, cp.normal.y, cp.normal.z, cp.constant);
    const pm = rc.projectionMatrix, q = new THREE.Vector4();
    q.x = (Math.sign(clip.x) + pm.elements[8]) / pm.elements[0];
    q.y = (Math.sign(clip.y) + pm.elements[9]) / pm.elements[5];
    q.z = -1.0; q.w = (1.0 + pm.elements[10]) / pm.elements[14];
    clip.multiplyScalar(2.0 / clip.dot(q));
    pm.elements[2] = clip.x; pm.elements[6] = clip.y; pm.elements[10] = clip.z + 1.0 - 0.003; pm.elements[14] = clip.w;
    this.water.visible = false;
    const r = this.renderer;
    r.setRenderTarget(this.reflRT);
    r.clear();
    r.render(this.scene, rc);
    r.setRenderTarget(null);
    this.water.visible = true;
  }

  renderFrame(dt) {
    this.updateSurvey();
    this.updatePlan();
    this.updateGlows();
    this.placeCamera(dt);
    const t = this.t;
    this.skyMat.uniforms.uTime.value = t;
    this.waterMat.uniforms.uTime.value = t;
    this.glowMat.uniforms.uTime.value = t;
    this.renderer.shadowMap.autoUpdate = true;
    this.renderReflection();
    this.renderer.shadowMap.autoUpdate = !this.reflRT;
    this.renderer.render(this.scene, this.cam);
    this.renderer.shadowMap.autoUpdate = true;
  }

  requestFrame() {
    if (!this.renderer || this._raf || this._failed) return;
    this._raf = requestAnimationFrame(() => { this._raf = 0; this.tick(); });
  }
  loop() { this.requestFrame(); }

  tick() {
    if (!this._visible || document.hidden) return;
    const dt = Math.min(0.05, this.clock.getDelta());
    this.resize();
    if (!this.paused) this.step(dt);
    else if (this.explore) this.pose(0);
    this.renderFrame(this.paused ? 0.016 : dt);
    this.emit(false);
    this.checkPerf(dt);
    if (!this.paused || this.explore || Math.abs(this.pointer.x - this.pointer.sx) > 0.002) this.requestFrame();
  }

  /* drop to a lighter tier if this device cannot hold the frame rate */
  checkPerf(dt) {
    if (this._perfDone || this.paused) return;
    if (this._forceHigh === undefined) this._forceHigh = /[?&]hmq=high\b/.test(location.search);
    if (this._forceHigh) { this._perfDone = true; return; }
    this._pf = this._pf || { n: 0, s: 0 };
    this._pf.n++; this._pf.s += dt;
    if (this._pf.n < 90) return;
    this._perfDone = true;
    if (this._pf.s / this._pf.n > 0.034) {
      this.renderer.setPixelRatio(1);
      if (this.reflRT) { this.reflRT.dispose(); this.reflRT = null; this.waterMat.uniforms.uUseRefl.value = 0; }
      this.resize(true);
    }
  }

  snapshot() {
    const op = this.op, v = this.vessel();
    const sgm = op.segs[op.si], hold = HOLD_NAME[op.hold];
    const LABEL = {
      lower: 'Grab lowering into the stockpile', close: 'Jaws closing on the cargo', lift: 'Loaded grab lifting clear',
      carry: `Slewing to the ${hold} hold`, spot: `Lowering over the ${hold} hatch`, release: `Releasing into the ${hold} hold`,
      settle: 'Cargo settles · the barge takes the load', return: 'Empty grab returning to the stockpile',
    };
    let label = LABEL[sgm.k];
    if (op.mode === 'survey') label = 'Closing survey · draft read at the six hull positions';
    if (op.mode === 'fade' || (op.mode === 'fadein' && op.modeT < 0.3)) label = 'Next transfer';
    const dep = op.deposited;
    const r = Math.round;
    return {
      running: !this.paused, reduced: this.reduced, mode: op.mode, t: Math.round(this.t * 100) / 100,
      cycle: op.k + 1, cycles: PLAN.length, hold, seg: sgm.k, label,
      stockpile: r(op.source), inGrab: r(op.carried), falling: r(op.falling),
      holds: { forward: r(dep[0]), midship: r(dep[1]), aft: r(dep[2]) },
      aboard: r(v.aboard), total: TOTAL,
      conserved: Math.abs(op.source + op.carried + op.falling + v.aboard - TOTAL) < 0.5,
      mean: v.mean, trim: v.trim,
    };
  }

  emit(force) {
    if (!this.op) return;
    const now = performance.now();
    if (!force && now - this._lastEmit < 180) return;
    const s = this.snapshot();
    const key = [s.running, s.label, s.stockpile, s.inGrab, s.falling, s.aboard, s.mean.toFixed(2)].join('|');
    if (!force && key === this._lastKey) return;
    this._lastKey = key; this._lastEmit = now;
    this.dispatchEvent(new CustomEvent('hmstate', { detail: s }));
  }
}

Object.assign(HarborMotion.prototype, SCENE);

if (!customElements.get('harbor-motion')) customElements.define('harbor-motion', HarborMotion);
