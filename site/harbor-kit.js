/* FREQUENCY — harbor-kit.js
 * Shared by harbor-motion.js and harbor-scene.js: the configured scenario, terminal geometry,
 * procedural textures, geometry helpers and the shader materials of the live 3D transfer.
 */
import * as THREE from 'https://unpkg.com/three@0.169.0/build/three.module.js';

/* ───────── configured scenario ───────── */
export const FT = 0.3048;
export const LOA = 45, BEAM = 10, DEPTH = 4.6;  // m, BARGE-402 as supplied
export const TOTAL = 900, CYCLE_T = 150, HOLD_CAP = 300;  // t
export const HOLD_X = [13.5, 0, -13.5];  // hull-local x · 0 forward, 1 midship, 2 aft (bow at +x)
export const HOLD_NAME = ['forward', 'midship', 'aft'];
export const PLAN = [2, 2, 1, 1, 0, 0];  // receiving hold for each grab cycle
export const DRAFT0 = 12.05, DRAFT_PER_T = 0.40 / TOTAL;  // ft after ballast → 12.45 ft with 900 t aboard
export const TRIM0 = 0.02, TRIM_PER_T = 0.001;  // ft by the stern
export const LIST0 = 0.01;  // ft to starboard
export const EXAG = 4;  // attitude drawn ×4 so trim is legible

/* ───────── terminal geometry (m) ───────── */
export const QUAY_Y = 2.4, QUAY_FACE = -5.72;
export const CR = { x: -1, z: -12.4 };  // crane pedestal axis
export const PED_H = 8.6, SLEW_Y = QUAY_Y + PED_H;
export const PIV_X = 2.3, PIV_Y = 2.6, BOOM = 30;
export const PIV_WY = SLEW_Y + PIV_Y;
export const PILE = { x: 26, z: -30.5, r: 11.6, h: 7.6 };
export const TRAVEL_Y = 15.2;  // hinge height while carrying
export const DECK_TOP = DEPTH + 0.3, COAM_H = 0.9, COAM_TOP = DECK_TOP + COAM_H;
export const HOLD_W = 11, HOLD_B = 6.8, HOLD_FLOOR = 0.9;

/* ───────── clamshell grab ───────── */
export const HINGE_X = 0.34, SHELL_W = 3.0;
export const SKIN = [[1.72, 0.18], [2.02, -0.45], [2.06, -1.15], [1.82, -1.78], [1.3, -2.2], [0.6, -2.42], [-0.3, -2.5]];
export const ARM_X = 0.95, ARM_Z = 1.24;
export const ARM_L = Math.hypot(ARM_X - (HINGE_X + SKIN[0][0]), 2.3 - SKIN[0][1]);
export const JAW_OPEN = 1.12;

/* ───────── helpers ───────── */
export const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
export const lerp = (a, b, t) => a + (b - a) * t;
export const smooth = t => t * t * (3 - 2 * t);
export const smoother = t => t * t * t * (t * (t * 6 - 15) + 10);
export const seg = (t, a, b) => clamp((t - a) / (b - a), 0, 1);
export const angDiff = (a, b) => { let d = b - a; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI; return d; };

export function mulberry(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6D2B79F5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
/* tileable value noise: n(x, y, period) */
export function makeNoise(seed) {
  const r = mulberry(seed), P = new Float32Array(65536);
  for (let i = 0; i < 65536; i++) P[i] = r();
  const m = (a, p) => ((a % p) + p) % p;
  return (x, y, per) => {
    const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
    const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
    const x0 = m(xi, per) & 255, x1 = m(xi + 1, per) & 255, y0 = m(yi, per) & 255, y1 = m(yi + 1, per) & 255;
    const a = P[(y0 << 8) | x0], b = P[(y0 << 8) | x1], c = P[(y1 << 8) | x0], d = P[(y1 << 8) | x1];
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  };
}
export function fbm(n, x, y, oct, per) {
  let s = 0, a = 0.5, f = 1, w = 0;
  for (let i = 0; i < oct; i++) { s += a * n(x * f, y * f, per * f); w += a; f *= 2; a *= 0.5; }
  return s / w;
}
export function hash2(x, y) { const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return s - Math.floor(s); }
export function vnoise(x, y) {
  const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  const a = hash2(xi, yi), b = hash2(xi + 1, yi), c = hash2(xi, yi + 1), d = hash2(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

/* ───────── procedural textures ───────── */
export function canvas(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h || w; return c; }
export function toTex(c, srgb, rep) {
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  if (rep) t.repeat.set(rep[0], rep[1]);
  return t;
}
/* normal map from a greyscale height canvas (tileable Sobel) */
export function normalFrom(hc, strength) {
  const S = hc.width, T = hc.height, src = hc.getContext('2d').getImageData(0, 0, S, T).data;
  const c = canvas(S, T), g = c.getContext('2d'), out = g.createImageData(S, T);
  const H = (x, y) => src[((((y + T) % T) * S + ((x + S) % S)) << 2)] / 255;
  for (let y = 0; y < T; y++) for (let x = 0; x < S; x++) {
    const dx = (H(x + 1, y) - H(x - 1, y)) * strength, dy = (H(x, y + 1) - H(x, y - 1)) * strength;
    const l = Math.hypot(dx, dy, 1), i = (y * S + x) << 2;
    out.data[i] = (-dx / l * 0.5 + 0.5) * 255; out.data[i + 1] = (dy / l * 0.5 + 0.5) * 255;
    out.data[i + 2] = (1 / l * 0.5 + 0.5) * 255; out.data[i + 3] = 255;
  }
  g.putImageData(out, 0, 0);
  return c;
}

export function concreteMaps() {
  const S = 256, n = makeNoise(11), c = canvas(S), h = canvas(S), r = canvas(S);
  const g = c.getContext('2d'), gh = h.getContext('2d'), gr = r.getContext('2d');
  const im = g.createImageData(S, S), ih = gh.createImageData(S, S), ir = gr.createImageData(S, S);
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
    const u = x / S, v = y / S;
    const f = fbm(n, u * 6, v * 6, 5, 6), blot = fbm(n, u * 2 + 9, v * 2 + 3, 3, 2);
    const fine = hash2(x, y);
    const joint = (x % 128 < 2) || (y % 128 < 2);
    let k = 0.66 + (f - 0.5) * 0.55 + (blot - 0.5) * 0.45 + (fine - 0.5) * 0.08;
    const wet = clamp((blot - 0.56) * 5, 0, 1);
    k *= 1 - wet * 0.3;
    if (joint) k *= 0.45;
    const i = (y * S + x) << 2;
    im.data[i] = 112 * k; im.data[i + 1] = 108 * k; im.data[i + 2] = 101 * k; im.data[i + 3] = 255;
    const hv = clamp(f * 0.8 + fine * 0.2 - (joint ? 0.5 : 0), 0, 1) * 255;
    ih.data[i] = ih.data[i + 1] = ih.data[i + 2] = hv; ih.data[i + 3] = 255;
    const rv = (0.86 - wet * 0.5 + (fine - 0.5) * 0.1) * 255;
    ir.data[i] = ir.data[i + 1] = ir.data[i + 2] = rv; ir.data[i + 3] = 255;
  }
  g.putImageData(im, 0, 0); gh.putImageData(ih, 0, 0); gr.putImageData(ir, 0, 0);
  return { map: c, normal: normalFrom(h, 2.2), rough: r };
}

/* painted / bare steel with plate seams, chipping and rust runs */
export function steelMaps(seed, base, rust, seams) {
  const S = 256, n = makeNoise(seed), R = mulberry(seed * 7 + 1);
  const c = canvas(S), g = c.getContext('2d'), im = g.createImageData(S, S);
  const rc = canvas(S), gr = rc.getContext('2d'), ir = gr.createImageData(S, S);
  const hc = canvas(S), gh = hc.getContext('2d'), ih = gh.createImageData(S, S);
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
    const u = x / S, v = y / S;
    const f = fbm(n, u * 5, v * 5, 5, 5), chip = fbm(n, u * 11 + 3, v * 11 + 7, 3, 11);
    const bare = clamp((chip - 0.63) * 7, 0, 1) * rust;
    const k = 0.84 + (f - 0.5) * 0.36 + (hash2(x, y) - 0.5) * 0.05;
    const i = (y * S + x) << 2;
    im.data[i] = lerp(base[0] * k, 96 * k, bare); im.data[i + 1] = lerp(base[1] * k, 55 * k, bare);
    im.data[i + 2] = lerp(base[2] * k, 34 * k, bare); im.data[i + 3] = 255;
    ir.data[i] = ir.data[i + 1] = ir.data[i + 2] = (0.52 + bare * 0.4 + (f - 0.5) * 0.2) * 255; ir.data[i + 3] = 255;
    ih.data[i] = ih.data[i + 1] = ih.data[i + 2] = (0.5 + (f - 0.5) * 0.4 - bare * 0.25) * 255; ih.data[i + 3] = 255;
  }
  g.putImageData(im, 0, 0); gr.putImageData(ir, 0, 0); gh.putImageData(ih, 0, 0);
  if (seams) {
    for (const gg of [g, gh]) {
      gg.fillStyle = gg === g ? 'rgba(0,0,0,0.42)' : 'rgba(0,0,0,0.6)';
      for (let yy = 0; yy < S; yy += 64) gg.fillRect(0, yy, S, 2);
      for (let xx = 0; xx < S; xx += 96) gg.fillRect(xx, 0, 2, S);
    }
  }
  // rust runs from seams and fittings
  for (let k = 0; k < 44 * rust; k++) {
    const x = R() * S, y = seams ? Math.floor(R() * 4) * 64 + 2 : R() * S * 0.8, len = 30 + R() * 120, w = 1 + R() * 4;
    const gd = g.createLinearGradient(x, y, x, y + len);
    gd.addColorStop(0, `rgba(110,52,22,${0.35 + R() * 0.3})`); gd.addColorStop(1, 'rgba(110,52,22,0)');
    g.fillStyle = gd; g.fillRect(x, y, w, len);
  }
  return { map: c, rough: rc, normal: normalFrom(hc, 1.4) };
}

export function paintMaps(seed, base, grime) {
  const S = 256, n = makeNoise(seed), R = mulberry(seed * 13 + 5);
  const c = canvas(S), g = c.getContext('2d'), im = g.createImageData(S, S);
  const rc = canvas(S), gr = rc.getContext('2d'), ir = gr.createImageData(S, S);
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
    const u = x / S, v = y / S;
    const f = fbm(n, u * 3, v * 3, 4, 3);
    const run = fbm(n, u * 28 + 5, v * 2 + 9, 3, 28);  // vertical grime runs
    const k = (0.94 + (f - 0.5) * 0.14 + (hash2(x, y) - 0.5) * 0.025) * (1 - clamp((run - 0.52) * 2.2, 0, 1) * 0.22 * grime);
    const i = (y * S + x) << 2;
    im.data[i] = base[0] * k; im.data[i + 1] = base[1] * k; im.data[i + 2] = base[2] * k; im.data[i + 3] = 255;
    ir.data[i] = ir.data[i + 1] = ir.data[i + 2] = (0.5 + (f - 0.5) * 0.2 + clamp(run - 0.5, 0, 1) * 0.25 * grime) * 255; ir.data[i + 3] = 255;
  }
  g.putImageData(im, 0, 0); gr.putImageData(ir, 0, 0);
  for (let k = 0; k < 90 * grime; k++) {  // small chips and rust weeps
    const x = R() * S, y = R() * S, r = 0.6 + R() * 1.6;
    g.fillStyle = `rgba(70,40,22,${0.35 + R() * 0.4})`; g.beginPath(); g.arc(x, y, r, 0, 6.283); g.fill();
    if (R() < 0.35) { const gd = g.createLinearGradient(x, y, x, y + 24 + R() * 40); gd.addColorStop(0, 'rgba(96,50,24,0.28)'); gd.addColorStop(1, 'rgba(96,50,24,0)'); g.fillStyle = gd; g.fillRect(x - 0.6, y, 1.2 + R(), 60); }
  }
  return { map: c, rough: rc };
}

export function aggregateMaps(seed, tint) {
  const S = 256, R = mulberry(seed), c = canvas(S), g = c.getContext('2d'), hc = canvas(S), gh = hc.getContext('2d');
  g.fillStyle = `rgb(${tint[0] * 0.55},${tint[1] * 0.55},${tint[2] * 0.55})`; g.fillRect(0, 0, S, S);
  gh.fillStyle = '#000'; gh.fillRect(0, 0, S, S);
  for (let i = 0; i < 5200; i++) {
    const x = R() * S, y = R() * S, rr = 0.6 + R() * R() * 4.2, k = 0.45 + R() * 0.75;
    g.fillStyle = `rgb(${tint[0] * k | 0},${tint[1] * k | 0},${tint[2] * k | 0})`;
    const hv = (0.35 + R() * 0.65) * 255 | 0;
    gh.fillStyle = `rgb(${hv},${hv},${hv})`;
    for (const [ox, oy] of [[0, 0], [S, 0], [-S, 0], [0, S], [0, -S]]) {
      g.beginPath(); g.arc(x + ox, y + oy, rr, 0, 6.283); g.fill();
      gh.beginPath(); gh.arc(x + ox, y + oy, rr, 0, 6.283); gh.fill();
    }
  }
  return { map: c, normal: normalFrom(hc, 3.2) };
}

export function waterNormalMap() {
  const S = 256, n = makeNoise(77), hc = canvas(S), g = hc.getContext('2d'), im = g.createImageData(S, S);
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
    const u = x / S, v = y / S;
    const h = fbm(n, u * 8, v * 8, 4, 8) * 0.7 + fbm(n, u * 3 + 5, v * 3 + 1, 3, 3) * 0.3;
    const i = (y * S + x) << 2;
    im.data[i] = im.data[i + 1] = im.data[i + 2] = h * 255; im.data[i + 3] = 255;
  }
  g.putImageData(im, 0, 0);
  const t = toTex(normalFrom(hc, 5.5), false);
  t.anisotropy = 4;
  return t;
}

export function stripeTex() {
  const c = canvas(128), g = c.getContext('2d');
  g.fillStyle = '#c9a032'; g.fillRect(0, 0, 128, 128);
  g.fillStyle = '#16171a';
  for (let i = -128; i < 256; i += 36) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i + 18, 0); g.lineTo(i + 146, 128); g.lineTo(i + 128, 128); g.fill(); }
  return toTex(c, true);
}

export function textTex(text, w, h, font, color) {
  const c = canvas(w, h), g = c.getContext('2d');
  g.fillStyle = color; g.font = font; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText(text, w / 2, h / 2 + 2);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
  return t;
}

export function draftMarkTex() {
  const c = canvas(128, 512), g = c.getContext('2d');
  g.fillStyle = '#e8e6df'; g.font = '700 58px "Space Grotesk", "Arial Narrow", sans-serif';
  g.textAlign = 'left'; g.textBaseline = 'bottom';
  // one foot per 128 px band: marks 12, 13, 14, 15 ft from the keel (bottom of the texture = 12 ft)
  for (let k = 0; k < 4; k++) {
    const yb = 512 - k * 128;
    g.fillText(String(12 + k), 8, yb);
    g.fillRect(84, yb - 58, 30, 6);
  }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export function envTexture() {
  const c = canvas(512, 256), g = c.getContext('2d');
  const gd = g.createLinearGradient(0, 0, 0, 256);
  gd.addColorStop(0, '#05080f'); gd.addColorStop(0.42, '#101828'); gd.addColorStop(0.5, '#2a2a2c');
  gd.addColorStop(0.53, '#0c0e12'); gd.addColorStop(1, '#030405');
  g.fillStyle = gd; g.fillRect(0, 0, 512, 256);
  const R = mulberry(5);
  for (let i = 0; i < 70; i++) {
    const x = R() * 512, y = 112 + R() * 20, r = 1 + R() * 3;
    const rg = g.createRadialGradient(x, y, 0, x, y, r * 4);
    rg.addColorStop(0, 'rgba(255,196,120,0.9)'); rg.addColorStop(1, 'rgba(255,160,80,0)');
    g.fillStyle = rg; g.fillRect(x - r * 4, y - r * 4, r * 8, r * 8);
  }
  const t = new THREE.CanvasTexture(c);
  t.mapping = THREE.EquirectangularReflectionMapping; t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/* ───────── geometry helpers ───────── */
export const UP = new THREE.Vector3(0, 1, 0);
const _m4 = new THREE.Matrix4(), _q = new THREE.Quaternion(), _s1 = new THREE.Vector3(1, 1, 1);

export function strutGeo(a, b, r, seg) {
  const dir = new THREE.Vector3().subVectors(b, a), len = dir.length();
  const g = new THREE.CylinderGeometry(r, r, len, seg || 6, 1, false);
  _q.setFromUnitVectors(UP, dir.normalize());
  g.applyMatrix4(_m4.compose(new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5), _q, _s1));
  return g;
}
export function place(g, x, y, z, rx, ry, rz) {
  if (rx || ry || rz) g.applyMatrix4(new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(rx || 0, ry || 0, rz || 0)));
  g.translate(x, y, z);
  return g;
}
export function merge(geos) {
  const list = geos.map(g => {
    const n = g.index ? g.toNonIndexed() : g;
    if (!n.attributes.uv) n.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(n.attributes.position.count * 2), 2));
    if (!n.attributes.normal) n.computeVertexNormals();
    return n;
  });
  let total = 0; list.forEach(g => { total += g.attributes.position.count; });
  const pos = new Float32Array(total * 3), nor = new Float32Array(total * 3), uv = new Float32Array(total * 2);
  let o = 0;
  list.forEach(g => {
    pos.set(g.attributes.position.array, o * 3); nor.set(g.attributes.normal.array, o * 3);
    uv.set(g.attributes.uv.array, o * 2); o += g.attributes.position.count;
  });
  const out = new THREE.BufferGeometry();
  out.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  out.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
  out.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  out.computeBoundingSphere();
  geos.forEach(g => g.dispose());
  return out;
}
/* collects geometry per material and emits one mesh per material */
export class Batch {
  constructor() { this.m = new Map(); }
  add(mat, g, cast = true, recv = true) {
    const k = mat.uuid + (cast ? 'c' : '') + (recv ? 'r' : '');
    if (!this.m.has(k)) this.m.set(k, { mat, cast, recv, geos: [] });
    this.m.get(k).geos.push(g);
    return g;
  }
  build(parent) {
    this.m.forEach(e => {
      const mesh = new THREE.Mesh(merge(e.geos), e.mat);
      mesh.castShadow = e.cast; mesh.receiveShadow = e.recv;
      parent.add(mesh);
    });
    this.m.clear();
  }
}

/* ───────── shared GLSL ───────── */
export const GLSL_NOISE = `
float hh(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vn(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hh(i), hh(i + vec2(1, 0)), u.x), mix(hh(i + vec2(0, 1)), hh(i + vec2(1, 1)), u.x), u.y); }
float fbm3(vec2 p){ float s = 0.0, a = 0.5; for (int i = 0; i < 4; i++) { s += a * vn(p); p *= 2.03; a *= 0.5; } return s; }
`;
export const GLSL_SKY = `
uniform float uTime;
vec3 skyCol(vec3 d) {
  float y = d.y;
  vec3 zen = vec3(0.0016, 0.0026, 0.0062), mid = vec3(0.0034, 0.0052, 0.0125), hor = vec3(0.0085, 0.0105, 0.018);
  vec3 c = mix(hor, mid, smoothstep(0.0, 0.12, y));
  c = mix(c, zen, smoothstep(0.08, 0.55, y));
  // sodium haze low over the terminal
  float toward = clamp(-d.z * 0.8 + 0.35, 0.0, 1.0);
  c += vec3(0.055, 0.026, 0.008) * exp(-max(y, 0.0) * 18.0) * toward;
  // cool glow high on the right (the canvas's #B4CDFF bloom)
  vec3 md = normalize(vec3(0.62, 0.30, -0.72));
  float m = max(dot(d, md), 0.0);
  c += vec3(0.018, 0.024, 0.042) * pow(m, 3.0) + vec3(0.03, 0.036, 0.05) * pow(m, 30.0);
  vec2 p = d.xz / (max(y, 0.0) + 0.14);
  float cl = fbm3(p * 0.55 + vec2(uTime * 0.006, 0.0));
  c += vec3(0.006, 0.0072, 0.010) * smoothstep(0.5, 0.86, cl) * smoothstep(0.02, 0.3, y) * (0.6 + 2.0 * pow(m, 2.0));
  if (y < 0.0) c = mix(hor * 0.6, vec3(0.002, 0.0025, 0.004), smoothstep(0.0, -0.1, y));
  return c;
}
`;

export function skyMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: `varying vec3 vDir; void main(){ vDir = normalize((modelMatrix * vec4(position, 1.0)).xyz - cameraPosition);
      vec4 p = projectionMatrix * viewMatrix * vec4((modelMatrix * vec4(position, 1.0)).xyz, 1.0); gl_Position = p.xyww; }`,
    fragmentShader: GLSL_NOISE + GLSL_SKY + `varying vec3 vDir;
      void main(){ gl_FragColor = vec4(skyCol(normalize(vDir)), 1.0);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
      }`,
    side: THREE.BackSide, depthWrite: false, fog: false,
  });
}

export const MAX_LAMPS = 10;
export function waterMaterial(normal) {
  return new THREE.ShaderMaterial({
    uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.fog, {
      uTime: { value: 0 }, uNormal: { value: normal }, uRefl: { value: null }, uUseRefl: { value: 0 },
      uTexMat: { value: new THREE.Matrix4() },
      uLampPos: { value: Array.from({ length: MAX_LAMPS }, () => new THREE.Vector3()) },
      uLampCol: { value: Array.from({ length: MAX_LAMPS }, () => new THREE.Vector3()) },
      uLampN: { value: 0 },
    }]),
    vertexShader: `uniform mat4 uTexMat; varying vec3 vWorld; varying vec4 vRefl;
      #include <fog_pars_vertex>
      void main(){ vec4 wp = modelMatrix * vec4(position, 1.0); vWorld = wp.xyz; vRefl = uTexMat * wp;
        vec4 mvPosition = viewMatrix * wp; gl_Position = projectionMatrix * mvPosition;
        #include <fog_vertex>
      }`,
    fragmentShader: GLSL_NOISE + GLSL_SKY + `
      uniform sampler2D uNormal; uniform sampler2D uRefl; uniform float uUseRefl;
      uniform vec3 uLampPos[${MAX_LAMPS}]; uniform vec3 uLampCol[${MAX_LAMPS}]; uniform int uLampN;
      varying vec3 vWorld; varying vec4 vRefl;
      #include <fog_pars_fragment>
      void main(){
        vec2 p = vWorld.xz;
        vec3 n1 = texture2D(uNormal, p * 0.050 + vec2(uTime * 0.011, uTime * 0.006)).xyz * 2.0 - 1.0;
        vec3 n2 = texture2D(uNormal, p * 0.140 + vec2(-uTime * 0.018, uTime * 0.013)).xyz * 2.0 - 1.0;
        vec3 n3 = texture2D(uNormal, p * 0.012 + vec2(uTime * 0.004, -uTime * 0.003)).xyz * 2.0 - 1.0;
        vec2 b = n1.xy * 0.45 + n2.xy * 0.30 + n3.xy * 0.55;
        vec3 N = normalize(vec3(b.x * 0.32, 1.0, b.y * 0.32));
        vec3 V = normalize(cameraPosition - vWorld);
        float F = 0.02 + 0.98 * pow(1.0 - max(dot(N, V), 0.0), 5.0);
        vec3 R = reflect(-V, N);
        vec3 refl = skyCol(normalize(vec3(R.x, abs(R.y), R.z)));
        if (uUseRefl > 0.5) {
          vec4 q = vRefl; q.xy += vec2(b.x * 0.018, b.y * 0.05) * q.w;
          refl = texture2DProj(uRefl, q).rgb;
        }
        vec3 col = mix(vec3(0.003, 0.005, 0.009), refl, clamp(F * 1.15, 0.0, 1.0));
        for (int i = 0; i < ${MAX_LAMPS}; i++) {
          if (i >= uLampN) break;
          vec3 Lv = uLampPos[i] - vWorld; float d = length(Lv); vec3 L = Lv / d;
          vec3 H = normalize(L + V);
          float s = pow(max(dot(N, H), 0.0), 520.0);
          col += uLampCol[i] * s * (60.0 / (1.0 + d * d * 0.012));
        }
        gl_FragColor = vec4(col, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
        #include <fog_fragment>
      }`,
    fog: true,
  });
}

export function glowMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: { uScale: { value: 600 }, uTime: { value: 0 }, uFog: { value: 0.0045 } },
    vertexShader: `attribute float aSize; attribute vec3 aColor; attribute float aPhase;
      uniform float uScale; uniform float uTime; uniform float uFog;
      varying vec3 vCol;
      void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.0);
        float blink = aPhase < 0.0 ? step(0.55, fract(uTime * 0.5 - aPhase)) : 1.0;
        float fl = 1.0 + 0.05 * sin(uTime * 9.0 + abs(aPhase) * 40.0) * step(0.86, fract(abs(aPhase) * 7.3));
        float d = -mv.z; float fog = exp(-uFog * uFog * d * d);
        vCol = aColor * fl * blink * fog;
        gl_PointSize = clamp(aSize * uScale / d, 1.0, 180.0);
        gl_Position = projectionMatrix * mv; }`,
    fragmentShader: `varying vec3 vCol;
      void main(){ vec2 c = gl_PointCoord - 0.5; float r2 = dot(c, c) * 4.0; if (r2 > 1.0) discard;
        float a = exp(-r2 * 26.0) + exp(-r2 * 5.0) * 0.28; a *= 1.0 - r2;
        gl_FragColor = vec4(vCol * a, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  });
}

export function beamMaterial(color, strength) {
  return new THREE.ShaderMaterial({
    uniforms: { uColor: { value: new THREE.Color(color) }, uI: { value: strength } },
    vertexShader: `varying float vH; varying vec3 vN; varying vec3 vW;
      void main(){ vH = 1.0 - (position.y + 0.5); vN = normalize(mat3(modelMatrix) * normal);
        vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`,
    fragmentShader: `uniform vec3 uColor; uniform float uI; varying float vH; varying vec3 vN; varying vec3 vW;
      void main(){ vec3 V = normalize(cameraPosition - vW); float e = pow(abs(dot(normalize(vN), V)), 1.6);
        float a = uI * e * pow(1.0 - vH, 1.3) * smoothstep(0.0, 0.08, vH);
        gl_FragColor = vec4(uColor * a, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.FrontSide,
  });
}

export function dustMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: { uScale: { value: 600 } },
    vertexShader: `attribute float aSize; attribute float aAlpha; uniform float uScale; varying float vA;
      void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.0); vA = aAlpha;
        gl_PointSize = clamp(aSize * uScale / -mv.z, 1.0, 260.0); gl_Position = projectionMatrix * mv; }`,
    fragmentShader: `varying float vA;
      void main(){ vec2 c = gl_PointCoord - 0.5; float r2 = dot(c, c) * 4.0; if (r2 > 1.0) discard;
        float a = (1.0 - r2) * (1.0 - r2) * vA;
        gl_FragColor = vec4(vec3(0.62, 0.50, 0.38) * 0.55, a);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
    transparent: true, depthWrite: false,
  });
}
