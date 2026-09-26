/* Frequency Systems — DepthStage.
 * 2.5D photoreal camera for the six-phase survey. Takes one real BARGE-402 render
 * and drives it as a dimensional scene: a procedural depth field (horizon ramp +
 * luminance micro-relief) is parallax-marched per pixel, so a moving camera reveals
 * real separation between sky, port line, hull and water. Per-phase camera paths,
 * pointer-driven look, water shimmer below the waterline.
 * No dependencies. Falls back silently to a flat plate if WebGL is unavailable.
 *
 *   const stage = FreqDepthStage.create(hostEl, { src, phase: 0 });
 *   stage.setPhase(3);  stage.destroy();
 */
(function () {
  'use strict';

  var VERT =
    'attribute vec2 p;varying vec2 v;void main(){v=p*0.5+0.5;gl_Position=vec4(p,0.,1.);}';

  var FRAG = [
    'precision highp float;',
    'varying vec2 v;',
    'uniform sampler2D uTex;',
    'uniform vec2  uTexAspect;',   // cover-fit scale
    'uniform vec2  uCam;           // camera lateral / vertical offset',
    'uniform float uZoom;',
    'uniform float uRoll;',
    'uniform float uTime;',
    'uniform float uHorizon;       // v of the horizon line',
    'uniform float uWater;         // v below which water shimmer applies',
    'uniform float uDepth;         // parallax strength',
    'uniform float uShimmer;',

    // cover-fit + zoom + roll around centre
    'vec2 frame(vec2 uv){',
    '  uv = (uv - 0.5) / uZoom;',
    '  float c = cos(uRoll), s = sin(uRoll);',
    '  uv = vec2(uv.x * c - uv.y * s, uv.x * s + uv.y * c);',
    '  return uv * uTexAspect + 0.5;',
    '}',

    'float luma(vec2 uv){',
    '  vec3 c = texture2D(uTex, clamp(uv, 0.001, 0.999)).rgb;',
    '  return dot(c, vec3(0.299, 0.587, 0.114));',
    '}',

    // depth: 0 = near camera, 1 = far. v.y = 0 is the bottom of the frame (nearest water).
    'float depthAt(vec2 uv){',
    '  float d = smoothstep(uHorizon - 0.34, uHorizon + 0.30, uv.y);',
    '  d = mix(d, d * 0.86 + 0.14 * luma(uv), 0.34);',   // micro-relief from the plate
    '  return clamp(d, 0.0, 1.0);',
    '}',

    'void main(){',
    '  vec2 uv = frame(v);',
    // march the parallax offset so near geometry shears less than far geometry
    '  vec2 off = uCam * uDepth;',
    '  vec2 s0 = uv;',
    '  for (int i = 0; i < 4; i++) {',
    '    float d = depthAt(s0);',
    '    s0 = uv + off * (d - 0.45);',
    '  }',
    // water: low-amplitude vertical ripple + horizontal drift below the waterline
    '  float w = smoothstep(uWater + 0.06, uWater - 0.10, v.y);',
    '  if (w > 0.001) {',
    '    float ph = s0.x * 46.0 + uTime * 0.9;',
    '    float amp = uShimmer * w * (0.0016 + 0.0022 * (uWater - v.y));',
    '    s0.y += sin(ph) * amp;',
    '    s0.x += cos(ph * 0.62 - uTime * 0.4) * amp * 0.7;',
    '  }',
    '  vec3 col = texture2D(uTex, clamp(s0, 0.0005, 0.9995)).rgb;',
    // reflected light lift on the water so the shimmer reads
    '  col += vec3(0.03, 0.07, 0.11) * w * uShimmer * (0.5 + 0.5 * sin(s0.x * 30.0 + uTime));',
    // edge fade so the parallax shear never shows a hard seam
    '  vec2 e = smoothstep(vec2(0.0), vec2(0.035), v) * smoothstep(vec2(0.0), vec2(0.035), 1.0 - v);',
    '  col *= min(e.x, e.y) * 0.25 + 0.75;',
    '  gl_FragColor = vec4(col, 1.0);',
    '}'
  ].join('\n');

  // Per-phase camera choreography. Each returns {x, y, zoom, roll} over t (seconds).
  // Amplitudes are deliberately small — this is a survey instrument, not a fly-through.
  var PATHS = [
    // 01 Pre-Survey — slow lateral truck across the empty hull, gentle push in
    function (t) { return { x: Math.sin(t * 0.17) * 0.055, y: Math.sin(t * 0.11) * 0.012, zoom: 1.05 + 0.030 * (0.5 - 0.5 * Math.cos(t * 0.13)), roll: 0 }; },
    // 02 Ballast — sway settling toward level as the hull evens out
    function (t) { return { x: Math.sin(t * 0.26) * 0.040, y: Math.sin(t * 0.34) * 0.020, zoom: 1.07, roll: Math.sin(t * 0.30) * 0.006 }; },
    // 03 Crane Position — drift toward the crane side, slight rise
    function (t) { return { x: 0.030 + Math.sin(t * 0.21) * 0.032, y: 0.014 + Math.sin(t * 0.16) * 0.010, zoom: 1.09 + 0.02 * Math.sin(t * 0.12), roll: 0 }; },
    // 04 Cargo Load — camera settles downward with the load, tight push
    function (t) { return { x: Math.sin(t * 0.19) * 0.026, y: -0.018 - 0.014 * (0.5 - 0.5 * Math.cos(t * 0.24)), zoom: 1.12 + 0.025 * (0.5 - 0.5 * Math.cos(t * 0.15)), roll: 0 }; },
    // 05 Trim Correction — a roll that converges to zero, mirroring list → 0.0°
    function (t) { return { x: Math.sin(t * 0.22) * 0.024, y: 0, zoom: 1.08, roll: Math.sin(t * 0.55) * 0.014 * Math.exp(-((t % 12) / 9)) }; },
    // 06 Final Survey — pull back and lock, near-static hold
    function (t) { return { x: Math.sin(t * 0.09) * 0.020, y: Math.sin(t * 0.07) * 0.008, zoom: 1.10 - 0.045 * (0.5 - 0.5 * Math.cos(t * 0.10)), roll: 0 }; }
  ];

  // horizon / waterline per phase plate (v space, 0 = bottom)
  var GEO = [
    { horizon: 0.52, water: 0.34, depth: 0.115, shimmer: 1.0 },
    { horizon: 0.52, water: 0.34, depth: 0.115, shimmer: 1.0 },
    { horizon: 0.55, water: 0.30, depth: 0.100, shimmer: 0.7 },
    { horizon: 0.55, water: 0.30, depth: 0.100, shimmer: 0.7 },
    { horizon: 0.52, water: 0.34, depth: 0.120, shimmer: 1.0 },
    { horizon: 0.58, water: 0.40, depth: 0.130, shimmer: 1.0 }
  ];

  // Named camera rigs for plates that aren't survey phases. A hero is a long, almost
  // imperceptible drift — dimensional, never distracting from the headline over it.
  var RIGS = {
    hero: {
      geo: { horizon: 0.54, water: 0.30, depth: 0.085, shimmer: 0.55 },
      path: function (t) {
        return {
          x: Math.sin(t * 0.055) * 0.048,
          y: Math.sin(t * 0.041) * 0.014,
          zoom: 1.06 + 0.022 * (0.5 - 0.5 * Math.cos(t * 0.048)),
          roll: 0
        };
      }
    },
    plate: {
      geo: { horizon: 0.52, water: 0.32, depth: 0.095, shimmer: 0.7 },
      path: function (t) {
        return {
          x: Math.sin(t * 0.09) * 0.038,
          y: Math.sin(t * 0.07) * 0.012,
          zoom: 1.05 + 0.018 * (0.5 - 0.5 * Math.cos(t * 0.08)),
          roll: 0
        };
      }
    }
  };

  function compile(gl, type, src) {
    var s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.warn('[DepthStage]', gl.getShaderInfoLog(s));
      return null;
    }
    return s;
  }

  function create(host, opts) {
    opts = opts || {};
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var phase = opts.phase || 0;
    var rig = opts.rig ? RIGS[opts.rig] : null;   // 'hero' | 'plate' | undefined (= survey phase)
    var look = opts.look !== false;               // pointer-driven camera
    var scrollAxis = opts.scrollAxis === true;    // bounded scroll-driven second axis
    var amp = typeof opts.amp === 'number' ? opts.amp : 1;

    var canvas = document.createElement('canvas');
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block';
    host.appendChild(canvas);

    var gl = canvas.getContext('webgl', { antialias: false, alpha: true, premultipliedAlpha: false, preserveDrawingBuffer: true, powerPreference: 'low-power' })
          || canvas.getContext('experimental-webgl');

    // ---- graceful fallback: flat cover plate, no WebGL ----
    if (!gl) {
      canvas.remove();
      var flat = document.createElement('div');
      flat.setAttribute('aria-hidden', 'true');
      flat.style.cssText = 'position:absolute;inset:0;background-size:cover;background-position:center';
      flat.style.backgroundImage = 'url(' + opts.src + ')';
      host.appendChild(flat);
      return { setPhase: function () {}, setSrc: function (s) { flat.style.backgroundImage = 'url(' + s + ')'; }, destroy: function () { flat.remove(); }, fallback: true };
    }

    var prog = gl.createProgram();
    var vs = compile(gl, gl.VERTEX_SHADER, VERT);
    var fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
    gl.useProgram(prog);

    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    var U = {};
    ['uTex', 'uTexAspect', 'uCam', 'uZoom', 'uRoll', 'uTime', 'uHorizon', 'uWater', 'uDepth', 'uShimmer']
      .forEach(function (n) { U[n] = gl.getUniformLocation(prog, n); });

    var tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 1, 1, 0, gl.RGB, gl.UNSIGNED_BYTE, new Uint8Array([5, 8, 15]));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.uniform1i(U.uTex, 0);

    var imgW = 1, imgH = 1, ready = false, frames = 0, lastSrc = '', lastErr = '';

    function load(src) {
      lastSrc = src;
      var im = new Image();
      im.onerror = function (e) { lastErr = 'image load failed: ' + src; };
      im.onload = function () {
        try {
        imgW = im.naturalWidth; imgH = im.naturalHeight;
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, im);
        ready = true;
        ensureSize();
        render(0);            // paint once immediately — never depend on rAF for first paint
        } catch (e) { lastErr = 'texture upload failed: ' + e.message; }
      };
      im.src = src;
    }

    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var lastW = 0, lastH = 0;
    function resize() {
      var r = host.getBoundingClientRect();
      var w = Math.max(1, Math.round(r.width * dpr));
      var h = Math.max(1, Math.round(r.height * dpr));
      lastW = w; lastH = h;
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
      gl.viewport(0, 0, w, h);
      // cover fit: scale the shorter texture axis so the plate always fills the frame
      var ar = (r.width || 1) / (r.height || 1);
      var iar = imgW / imgH;
      var sx = 1, sy = 1;
      if (ar > iar) { sy = iar / ar; } else { sx = ar / iar; }
      gl.uniform2f(U.uTexAspect, sx, sy);
    }

    // Resize only when the host actually reports a box, so a zero rect never caches 1×1.
    function ensureSize() {
      var r = host.getBoundingClientRect();
      if (!r.width || !r.height) return false;
      var w = Math.max(1, Math.round(r.width * dpr));
      var h = Math.max(1, Math.round(r.height * dpr));
      if (w !== lastW || h !== lastH) resize();
      return true;
    }

    var ro = window.ResizeObserver ? new ResizeObserver(resize) : null;
    if (ro) ro.observe(host); else window.addEventListener('resize', resize);

    // pointer look — the "hold the camera" feel; falls to centre when the pointer leaves
    var px = 0, py = 0, tx = 0, ty = 0;
    function onMove(e) {
      var r = host.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
    }
    function onLeave() { tx = 0; ty = 0; }
    if (look) {
      host.addEventListener('pointermove', onMove);
      host.addEventListener('pointerleave', onLeave);
    }

    var t0 = performance.now(), raf = 0, alive = true;

    // One frame. Called from rAF, and directly on image load so the plate is never blank
    // in contexts where animation frames are suspended (background tab, print, capture).
    function render(t) {
      // Size resolution comes FIRST and is unconditional — above the ready guard, and never
      // dependent on rAF or ResizeObserver, both of which a cold or hidden load may not
      // deliver until long after the host has a box.
      ensureSize();
      if (!ready) return;
      frames++;
      // Named rigs (hero / plate) hold a fixed frame: no autonomous drift. Depth responds
      // to the pointer only, so the image is still dimensional but never moves by itself.
      var g = rig ? rig.geo : (GEO[phase] || GEO[0]);
      var path = rig ? rig.path(0) : (PATHS[phase] || PATHS[0])(reduced ? 0 : t);

      px += (tx - px) * 0.055;
      py += (ty - py) * 0.055;

      var sc = 0;
      if (scrollAxis && !reduced) {
        var vr = host.getBoundingClientRect();
        var mid = (vr.top + vr.height / 2) / (window.innerHeight || 1);   // 0 top .. 1 bottom
        sc = Math.max(-1, Math.min(1, (mid - 0.5) * 2)) * 0.020;          // bounded
      }
      gl.uniform2f(U.uCam, (path.x + px * 0.045) * amp, (path.y - py * 0.028 + sc) * amp);
      gl.uniform1f(U.uZoom, path.zoom);
      gl.uniform1f(U.uRoll, path.roll);
      gl.uniform1f(U.uTime, (reduced || rig) ? 0 : t);
      gl.uniform1f(U.uHorizon, g.horizon);
      gl.uniform1f(U.uWater, g.water);
      gl.uniform1f(U.uDepth, g.depth);
      gl.uniform1f(U.uShimmer, (reduced || rig) ? 0 : g.shimmer);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    function draw(now) {
      if (!alive) return;
      raf = requestAnimationFrame(draw);
      render((now - t0) / 1000);
    }

    load(opts.src);
    ensureSize();
    // Bounded retry until the host reports a box — covers hosts that are absolutely
    // positioned, display:none at mount, or laid out after their first paint.
    [0, 16, 50, 150, 400, 900].forEach(function (ms) {
      setTimeout(function () { if (alive && ensureSize()) render(0); }, ms);
    });
    raf = requestAnimationFrame(draw);

    return {
      debug: function () { return { ready: ready, imgW: imgW, imgH: imgH, alive: alive, frames: frames, lastSrc: lastSrc, err: lastErr }; },
      setPhase: function (i) { phase = i; t0 = performance.now(); resize(); render(0); },
      setSrc: function (s) { ready = false; load(s); },
      destroy: function () {
        alive = false;
        cancelAnimationFrame(raf);
        if (ro) ro.disconnect(); else window.removeEventListener('resize', resize);
        host.removeEventListener('pointermove', onMove);
        host.removeEventListener('pointerleave', onLeave);
        canvas.remove();
      },
      fallback: false
    };
  }

  window.FreqDepthStage = { create: create };
})();
