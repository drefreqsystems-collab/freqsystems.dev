/* FREQUENCY — harbor-scene.js
 * Builds the river terminal for <harbor-motion>: materials, sky and river, floodlights, quay,
 * skyline, BARGE-402, the pedestal crane and its clamshell grab, cargo, glows and the plan overlay.
 * Mixed into the element's prototype by harbor-motion.js; every method runs with `this` = element.
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

export const SCENE = {
  buildMaterials() {
    const conc = concreteMaps();
    this.mat = {};
    const M = this.mat;
    M.concrete = new THREE.MeshStandardMaterial({ color: 0x9a968e, roughness: 1, metalness: 0.02,
      map: toTex(conc.map, true, [1, 1]), normalMap: toTex(conc.normal, false, [1, 1]), roughnessMap: toTex(conc.rough, false, [1, 1]) });
    M.concrete.normalScale.set(0.6, 0.6);
    M.concreteDark = new THREE.MeshStandardMaterial({ color: 0x4b4a47, roughness: 0.95, map: M.concrete.map, normalMap: M.concrete.normalMap });

    const hullS = steelMaps(3, [44, 48, 56], 1.0, true);
    M.hull = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, metalness: 0.55, side: THREE.DoubleSide,
      map: toTex(hullS.map, true, [9, 1]), roughnessMap: toTex(hullS.rough, false, [9, 1]), normalMap: toTex(hullS.normal, false, [9, 1]) });
    M.hull.normalScale.set(0.5, 0.5);
    const deckS = steelMaps(8, [70, 56, 44], 1.4, true);
    M.deck = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, metalness: 0.45,
      map: toTex(deckS.map, true, [8, 2]), roughnessMap: toTex(deckS.rough, false, [8, 2]), normalMap: toTex(deckS.normal, false, [8, 2]) });
    M.holdIn = new THREE.MeshStandardMaterial({ color: 0x9c8a78, roughness: 1, metalness: 0.3, map: M.deck.map, side: THREE.DoubleSide });
    M.coaming = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, metalness: 0.5,
      map: toTex(steelMaps(4, [38, 40, 44], 1.1, false).map, true, [3, 1]) });

    const paintS = paintMaps(21, [206, 204, 196], 1);
    M.paint = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, metalness: 0.28,
      map: toTex(paintS.map, true, [1.5, 1.5]), roughnessMap: toTex(paintS.rough, false, [1.5, 1.5]) });
    const pedS = paintMaps(23, [112, 116, 122], 1.2);
    M.pedestal = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, metalness: 0.3,
      map: toTex(pedS.map, true, [2, 1]), roughnessMap: toTex(pedS.rough, false, [2, 1]) });
    const yS = paintMaps(22, [196, 150, 40], 1.6);
    M.yellow = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, metalness: 0.3,
      map: toTex(yS.map, true, [1, 1]), roughnessMap: toTex(yS.rough, false, [1, 1]) });
    M.darkSteel = new THREE.MeshStandardMaterial({ color: 0x3b3f45, roughness: 0.62, metalness: 0.75, map: M.coaming.map });
    M.steel = new THREE.MeshStandardMaterial({ color: 0x8b9097, roughness: 0.42, metalness: 0.9 });
    M.rope = new THREE.MeshStandardMaterial({ color: 0x2a2c30, roughness: 0.55, metalness: 0.8 });
    M.rubber = new THREE.MeshStandardMaterial({ color: 0x0c0d0f, roughness: 0.92 });
    M.stripe = new THREE.MeshStandardMaterial({ map: stripeTex(), roughness: 0.8, metalness: 0.2 });
    M.glass = new THREE.MeshStandardMaterial({ color: 0x0b131c, roughness: 0.08, metalness: 0.6, emissive: 0x2a2014, emissiveIntensity: 1.6 });
    M.lampHead = new THREE.MeshStandardMaterial({ color: 0x222222, emissive: 0xffc27a, emissiveIntensity: 3.2 });
    M.whiteLamp = new THREE.MeshStandardMaterial({ color: 0x222222, emissive: 0xfff1dc, emissiveIntensity: 3.0 });

    const agg = aggregateMaps(31, [132, 124, 114]);
    M.agg = new THREE.MeshStandardMaterial({ color: 0xd6cec2, roughness: 1, metalness: 0,
      map: toTex(agg.map, true, [5, 5]), normalMap: toTex(agg.normal, false, [5, 5]) });
    M.agg.normalScale.set(1.1, 1.1);
    M.aggHold = M.agg.clone(); M.aggHold.map = M.agg.map.clone(); M.aggHold.map.repeat.set(2.4, 1.6); M.aggHold.normalMap = M.agg.normalMap.clone(); M.aggHold.normalMap.repeat.set(2.4, 1.6);
    M.aggGrab = M.agg.clone(); M.aggGrab.map = M.agg.map.clone(); M.aggGrab.map.repeat.set(1, 1); M.aggGrab.normalMap = M.agg.normalMap.clone(); M.aggGrab.normalMap.repeat.set(1, 1);
    M.rock = new THREE.MeshStandardMaterial({ color: 0x6f675d, roughness: 0.95, metalness: 0 });

    M.silhouette = new THREE.MeshStandardMaterial({ color: 0x1a1d24, roughness: 0.95, metalness: 0.2, map: M.concrete.map });
    M.hivis = new THREE.MeshStandardMaterial({ color: 0xc6e83a, roughness: 0.75, emissive: 0x0e1400, emissiveIntensity: 0.4 });
    M.helmet = new THREE.MeshStandardMaterial({ color: 0xf0f0ea, roughness: 0.4 });
    M.navy = new THREE.MeshStandardMaterial({ color: 0x1c2330, roughness: 0.8 });
  },

  buildSky() {
    this.skyMat = skyMaterial();
    const sky = new THREE.Mesh(new THREE.SphereGeometry(1400, 48, 24), this.skyMat);
    sky.frustumCulled = false; sky.renderOrder = -10;
    this.scene.add(sky);
  },

  buildWater() {
    this.waterMat = waterMaterial(waterNormalMap());
    const water = this.water = new THREE.Mesh(new THREE.PlaneGeometry(3000, 3000), this.waterMat);
    water.rotation.x = -Math.PI / 2;
    this.scene.add(water);
  },

  setupReflection(w, h) {
    const hf = this.renderer.extensions.has('EXT_color_buffer_float') || this.renderer.extensions.has('EXT_color_buffer_half_float');
    this.reflRT = new THREE.WebGLRenderTarget(Math.max(2, w * 0.5 | 0), Math.max(2, h * 0.5 | 0), { type: hf ? THREE.HalfFloatType : THREE.UnsignedByteType });
    this.reflCam = new THREE.PerspectiveCamera();
    this.waterMat.uniforms.uRefl.value = this.reflRT.texture;
    this.waterMat.uniforms.uUseRefl.value = 1;
  },

  buildLights() {
    const S = this.scene;
    S.add(new THREE.HemisphereLight(0x2a3a5c, 0x07080a, 0.32));
    const moon = new THREE.DirectionalLight(0x9db4e0, 0.34);
    moon.position.set(90, 120, -140); S.add(moon);
    const river = new THREE.DirectionalLight(0x7f96bd, 0.22);  // sky bounce off the river onto the hull side
    river.position.set(-40, 18, 140); S.add(river);

    // quay floodlights: sodium masts. A lit its own shadow; B works the stockpile.
    const mk = (x, z, tx, tz, I, ang, shadow) => {
      const sp = new THREE.SpotLight(0xffb366, I, 150, ang, 0.65, 1.6);
      sp.position.set(x, QUAY_Y + 26.5, z); sp.target.position.set(tx, 0, tz);
      if (shadow) {
        sp.castShadow = true; sp.shadow.mapSize.set(this.q.shadow, this.q.shadow);
        sp.shadow.camera.near = 6; sp.shadow.camera.far = 120; sp.shadow.bias = -0.00025; sp.shadow.normalBias = 0.04;
      }
      S.add(sp, sp.target);
      return sp;
    };
    this.floodA = mk(-27, -8.2, -6, -2, 2600, 0.72, true);
    this.floodB = mk(34, -14, 20, -26, 1500, 0.62, false);
    this.floodC = mk(-62, -8.2, -52, -18, 900, 0.7, false);

    // crane boom-head work light: follows the boom, lights the grab and whatever is under it
    this.work = new THREE.SpotLight(0xfff0da, 1400, 70, 0.42, 0.5, 1.4);
    this.work.castShadow = true;
    this.work.shadow.mapSize.set(this.small ? 512 : 1024, this.small ? 512 : 1024);
    this.work.shadow.camera.near = 2; this.work.shadow.camera.far = 60; this.work.shadow.bias = -0.0004; this.work.shadow.normalBias = 0.05;
    S.add(this.work, this.work.target);

    this.cabLight = new THREE.PointLight(0xffc98f, 60, 18, 2);
    S.add(this.cabLight);
    this.loaderLight = new THREE.SpotLight(0xfff4e0, 380, 40, 0.5, 0.6, 1.5);
    S.add(this.loaderLight, this.loaderLight.target);
  },

  buildQuay() {
    const S = this.scene, M = this.mat, B = new Batch();
    // apron slab and quay wall
    const slab = new THREE.BoxGeometry(420, 10, 200, 1, 1, 1);
    // scale UVs so the concrete tile repeats every ~8 m
    const uv = slab.attributes.uv, p = slab.attributes.position;
    for (let i = 0; i < uv.count; i++) {
      const x = p.getX(i), y = p.getY(i), z = p.getZ(i), nrm = slab.attributes.normal;
      const ny = Math.abs(nrm.getY(i)), nz = Math.abs(nrm.getZ(i));
      if (ny > 0.5) uv.setXY(i, x / 8, z / 8); else if (nz > 0.5) uv.setXY(i, x / 8, y / 8); else uv.setXY(i, z / 8, y / 8);
    }
    B.add(M.concrete, place(slab, 20, QUAY_Y - 5, QUAY_FACE - 100), false, true);
    // wet dark band on the wall face at the waterline
    B.add(M.concreteDark, place(new THREE.BoxGeometry(420, 1.6, 0.2), 20, 0.35, QUAY_FACE + 0.02), false, true);
    // steel edge protection and painted safety line
    B.add(M.darkSteel, place(new THREE.BoxGeometry(420, 0.22, 0.34), 20, QUAY_Y + 0.11, QUAY_FACE - 0.1), true, true);
    const line = new THREE.MeshStandardMaterial({ color: 0xc9a032, roughness: 0.7 });
    B.add(line, place(new THREE.BoxGeometry(420, 0.02, 0.24), 20, QUAY_Y + 0.011, QUAY_FACE - 1.6), false, true);
    // fenders along the berth
    for (let i = -8; i <= 8; i++) {
      B.add(M.rubber, place(new THREE.CylinderGeometry(0.36, 0.36, 4.2, 14), i * 6 + 0.5, QUAY_Y - 2.3, QUAY_FACE + 0.34));
    }
    // bollards
    for (let i = -5; i <= 5; i++) {
      const x = i * 11 + 3;
      B.add(M.darkSteel, place(new THREE.CylinderGeometry(0.34, 0.44, 0.9, 16), x, QUAY_Y + 0.45, QUAY_FACE - 1.0));
      B.add(M.darkSteel, place(new THREE.CylinderGeometry(0.5, 0.5, 0.12, 16), x, QUAY_Y + 0.95, QUAY_FACE - 1.0));
    }
    // light masts
    this.mastHeads = [];
    for (const [x, z] of [[-62, -8.2], [-27, -8.2], [34, -14], [70, -8.2], [-97, -8.2], [-132, -8.2], [-167, -8.2], [106, -8.2]]) {
      B.add(M.darkSteel, place(new THREE.CylinderGeometry(0.22, 0.42, 26, 10), x, QUAY_Y + 13, z));
      B.add(M.darkSteel, place(new THREE.BoxGeometry(3.4, 0.25, 0.3), x, QUAY_Y + 26.1, z));
      for (let k = -1; k <= 1; k += 2) {
        B.add(M.lampHead, place(new THREE.BoxGeometry(0.9, 0.35, 0.7), x + k * 1.1, QUAY_Y + 25.8, z + 0.25, -0.5, 0, 0), false, false);
      }
      this.mastHeads.push(new THREE.Vector3(x, QUAY_Y + 25.7, z + 0.3));
    }
    // front-end loader parked at the stockpile toe — a scale reference
    const L = new THREE.Group(); L.position.set(PILE.x - 15.5, QUAY_Y, PILE.z + 10.5); L.rotation.y = 0.7;
    const LB = new Batch();
    LB.add(M.yellow, place(new THREE.BoxGeometry(5.2, 1.5, 2.5), -0.6, 1.55, 0));
    LB.add(M.yellow, place(new THREE.BoxGeometry(2.0, 1.0, 2.3), -2.4, 2.8, 0));
    LB.add(M.glass, place(new THREE.BoxGeometry(1.8, 1.4, 2.0), 0.4, 3.0, 0));
    LB.add(M.darkSteel, place(new THREE.BoxGeometry(1.9, 0.12, 2.1), 0.4, 3.75, 0));
    for (const [wx, wz] of [[1.2, 1.3], [1.2, -1.3], [-2.2, 1.3], [-2.2, -1.3]]) LB.add(M.rubber, place(new THREE.CylinderGeometry(0.85, 0.85, 0.62, 18), wx, 0.85, wz, Math.PI / 2, 0, 0));
    LB.add(M.darkSteel, place(new THREE.BoxGeometry(0.9, 1.2, 2.9), 3.6, 0.9, 0));
    LB.add(M.darkSteel, place(new THREE.BoxGeometry(1.8, 0.25, 0.25), 2.7, 1.7, 0.8));
    LB.add(M.darkSteel, place(new THREE.BoxGeometry(1.8, 0.25, 0.25), 2.7, 1.7, -0.8));
    LB.build(L); S.add(L);
    this.loader = L;
    this.loaderLight.position.set(0, 0, 0);
    L.updateMatrixWorld(true);
    this.loaderLight.position.copy(L.localToWorld(new THREE.Vector3(1.6, 3.4, 0)));
    this.loaderLight.target.position.copy(L.localToWorld(new THREE.Vector3(12, 0, 0)));
    this.loaderLamps = [L.localToWorld(new THREE.Vector3(1.45, 3.35, 0.7)), L.localToWorld(new THREE.Vector3(1.45, 3.35, -0.7))];

    // two line handlers on the berth — hi-vis, 1.8 m: they set the scale of everything else
    this.people = [];
    for (const [x, z, ry] of [[-17.5, QUAY_FACE - 2.2, 0.4], [-15.9, QUAY_FACE - 3.4, -0.9], [PILE.x - 20, PILE.z + 13, 1.9]]) {
      const P = new THREE.Group(); P.position.set(x, QUAY_Y, z); P.rotation.y = ry;
      const PB = new Batch();
      PB.add(M.navy, place(new THREE.CapsuleGeometry(0.15, 0.62, 4, 8), -0.1, 0.46, 0));
      PB.add(M.navy, place(new THREE.CapsuleGeometry(0.15, 0.62, 4, 8), 0.1, 0.46, 0));
      PB.add(M.hivis, place(new THREE.CapsuleGeometry(0.24, 0.5, 4, 10), 0, 1.18, 0));
      PB.add(M.hivis, place(new THREE.CapsuleGeometry(0.08, 0.5, 4, 6), 0.3, 1.12, 0.02, 0, 0, 0.12));
      PB.add(M.hivis, place(new THREE.CapsuleGeometry(0.08, 0.5, 4, 6), -0.3, 1.12, 0.02, 0, 0, -0.12));
      PB.add(M.helmet, place(new THREE.SphereGeometry(0.15, 12, 8), 0, 1.72, 0));
      PB.build(P); S.add(P); this.people.push(P);
    }
    B.build(S);
  },

  buildPools() {
    const c = canvas(128), g = c.getContext('2d');
    const rg = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    rg.addColorStop(0, 'rgba(255,170,90,0.55)'); rg.addColorStop(0.45, 'rgba(255,150,70,0.18)'); rg.addColorStop(1, 'rgba(255,140,60,0)');
    g.fillStyle = rg; g.fillRect(0, 0, 128, 128);
    const mat = new THREE.MeshBasicMaterial({ map: toTex(c, true), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, color: 0x8a6a4a });
    this.mastHeads.forEach((h, i) => {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), mat);
      m.rotation.x = -Math.PI / 2; m.position.set(h.x, QUAY_Y + 0.03, h.z - 6); m.scale.set(38, 30, 1); m.renderOrder = 2;
      this.scene.add(m);
    });
  },

  buildBackground() {
    const S = this.scene, M = this.mat, B = new Batch();
    // sheds, silos, a conveyor gallery and two distant harbor cranes, all in the haze
    const lit = new THREE.MeshStandardMaterial({ color: 0x111111, emissive: 0xffb45c, emissiveIntensity: 0.75 });
    const litCool = new THREE.MeshStandardMaterial({ color: 0x111111, emissive: 0xcfd8e6, emissiveIntensity: 0.4 });
    const roof = new THREE.MeshStandardMaterial({ color: 0x23272e, roughness: 0.7, metalness: 0.5 });
    this.sheds = [[-190, -300, 70, 11, 30], [-110, -330, 50, 14, 34], [-20, -380, 96, 15, 40], [70, -320, 70, 12, 36], [160, -300, 56, 9, 26], [250, -360, 80, 12, 40]];
    this.sheds.forEach(([x, z, sx, sy, sz], n) => {
      B.add(M.silhouette, place(new THREE.BoxGeometry(sx, sy, sz), x, QUAY_Y + sy / 2, z));
      // pitched metal roof
      const rf = new THREE.CylinderGeometry(sz * 0.72, sz * 0.72, sx, 3, 1, false);
      rf.rotateZ(Math.PI / 2); rf.scale(1, 0.22, 1);
      B.add(roof, place(rf, x, QUAY_Y + sy + sz * 0.08, z));
      // lit roller doors and office windows on the quay-facing wall
      const fz = z + sz / 2 + 0.06;
      for (let k = 0; k < Math.max(1, Math.floor(sx / 22)); k++) B.add(n % 2 ? lit : litCool, place(new THREE.BoxGeometry(4.2, 4.4, 0.1), x - sx / 2 + 8 + k * 20, QUAY_Y + 2.2, fz), false, false);
      for (let k = 0; k < Math.floor(sx / 7); k++) if ((k + n) % 3 === 1) B.add(lit, place(new THREE.BoxGeometry(1.6, 0.8, 0.1), x - sx / 2 + 3 + k * 7, QUAY_Y + sy - 3.5, fz), false, false);
    });
    for (let i = 0; i < 5; i++) B.add(M.silhouette, place(new THREE.CylinderGeometry(5.6, 5.6, 26, 20), 96 + i * 12.2, QUAY_Y + 13, -210));
    B.add(M.silhouette, place(new THREE.BoxGeometry(62, 3, 5), 120, QUAY_Y + 27, -210));
    // distant cranes (silhouettes)
    for (const [x, z, a] of [[-96, -14, 2.3], [118, -16, 0.6]]) {
      B.add(M.silhouette, place(new THREE.CylinderGeometry(1.2, 1.6, 9, 10), x, QUAY_Y + 4.5, z));
      B.add(M.silhouette, place(new THREE.BoxGeometry(6, 3, 4), x, QUAY_Y + 10.5, z, 0, a, 0));
      const tip = new THREE.Vector3(x + Math.cos(a) * 20, QUAY_Y + 26, z - Math.sin(a) * 20);
      B.add(M.silhouette, strutGeo(new THREE.Vector3(x, QUAY_Y + 11, z), tip, 0.5, 6));
      this._farTips = (this._farTips || []).concat([tip]);
    }
    // far treeline / levee
    B.add(new THREE.MeshStandardMaterial({ color: 0x07090d, roughness: 1 }), place(new THREE.BoxGeometry(2400, 10, 60), 0, 3, -520), false, false);
    B.build(S);
  },

  buildBarge() {
    const M = this.mat;
    const hull = this.hull = new THREE.Group();
    this.scene.add(hull);
    const B = new Batch();

    const s = new THREE.Shape();
    s.moveTo(-LOA / 2, DEPTH); s.lineTo(-LOA / 2, 2.3); s.lineTo(-LOA / 2 + 4.2, 0);
    s.lineTo(LOA / 2 - 5.2, 0); s.lineTo(LOA / 2, 2.1); s.lineTo(LOA / 2, DEPTH); s.closePath();
    // open shell: two side plates, the end plates and rakes, the bottom — the deck (with its hatch
    // openings) closes the top, so the holds are real voids the cargo can be seen landing in
    for (const sg of [-1, 1]) {
      const sp = new THREE.ShapeGeometry(s);
      const uv = sp.attributes.uv, p = sp.attributes.position;
      for (let i = 0; i < uv.count; i++) uv.setXY(i, (p.getX(i) + LOA / 2) / LOA, p.getY(i) / 5);
      B.add(M.hull, sp.translate(0, 0, sg * BEAM / 2));
    }
    const prof = [[-LOA / 2, DEPTH], [-LOA / 2, 2.3], [-LOA / 2 + 4.2, 0], [LOA / 2 - 5.2, 0], [LOA / 2, 2.1], [LOA / 2, DEPTH]];
    for (let i = 0; i < prof.length - 1; i++) {
      const [x0, y0] = prof[i], [x1, y1] = prof[i + 1], len = Math.hypot(x1 - x0, y1 - y0);
      const pl = new THREE.PlaneGeometry(len, BEAM);
      pl.rotateX(-Math.PI / 2);
      pl.rotateZ(Math.atan2(y1 - y0, x1 - x0));
      pl.translate((x0 + x1) / 2, (y0 + y1) / 2, 0);
      B.add(M.hull, pl, true, true);
    }

    // rub rails and deck-edge angle
    for (const sg of [-1, 1]) {
      B.add(M.darkSteel, place(new THREE.BoxGeometry(LOA - 1.2, 0.28, 0.24), 0, DEPTH - 0.35, sg * (BEAM / 2 + 0.1)));
      B.add(M.darkSteel, place(new THREE.BoxGeometry(LOA - 9, 0.22, 0.2), -0.5, 2.9, sg * (BEAM / 2 + 0.08)));
    }
    // deck with three hatch openings
    const dk = new THREE.Shape();
    dk.moveTo(-LOA / 2, -BEAM / 2); dk.lineTo(LOA / 2, -BEAM / 2); dk.lineTo(LOA / 2, BEAM / 2); dk.lineTo(-LOA / 2, BEAM / 2); dk.closePath();
    HOLD_X.forEach(cx => {
      const hl = new THREE.Path();
      hl.moveTo(cx - HOLD_W / 2, -HOLD_B / 2); hl.lineTo(cx + HOLD_W / 2, -HOLD_B / 2);
      hl.lineTo(cx + HOLD_W / 2, HOLD_B / 2); hl.lineTo(cx - HOLD_W / 2, HOLD_B / 2); hl.closePath();
      dk.holes.push(hl);
    });
    const dg = new THREE.ExtrudeGeometry(dk, { depth: 0.3, bevelEnabled: false });
    dg.rotateX(-Math.PI / 2); dg.translate(0, DEPTH, 0);
    const duv = dg.attributes.uv, dp = dg.attributes.position;
    for (let i = 0; i < duv.count; i++) duv.setXY(i, (dp.getX(i) + LOA / 2) / LOA, (dp.getZ(i) + BEAM / 2) / BEAM);
    B.add(M.deck, dg);

    // hold boxes and coamings
    HOLD_X.forEach(cx => {
      B.add(M.holdIn, place(new THREE.BoxGeometry(HOLD_W, 0.3, HOLD_B), cx, HOLD_FLOOR - 0.15, 0), false, true);
      [[0, -HOLD_B / 2 - 0.1, HOLD_W + 0.4, 0.2], [0, HOLD_B / 2 + 0.1, HOLD_W + 0.4, 0.2], [-HOLD_W / 2 - 0.1, 0, 0.2, HOLD_B], [HOLD_W / 2 + 0.1, 0, 0.2, HOLD_B]]
        .forEach(([ox, oz, sx, sz]) => {
          B.add(M.holdIn, place(new THREE.BoxGeometry(sx, DECK_TOP - HOLD_FLOOR, sz), cx + ox, (DECK_TOP + HOLD_FLOOR) / 2, oz), false, true);
          B.add(M.coaming, place(new THREE.BoxGeometry(sx + 0.16, COAM_H, sz + 0.16), cx + ox, DECK_TOP + COAM_H / 2, oz));
        });
      // coaming top flat bar
      B.add(M.steel, place(new THREE.BoxGeometry(HOLD_W + 0.6, 0.06, 0.34), cx, COAM_TOP + 0.03, -HOLD_B / 2 - 0.1), false, true);
      B.add(M.steel, place(new THREE.BoxGeometry(HOLD_W + 0.6, 0.06, 0.34), cx, COAM_TOP + 0.03, HOLD_B / 2 + 0.1), false, true);
    });
    // bitts at the corners, and the mooring bitts on the quay side
    for (const [x, z] of [[-20.5, -3.9], [-20.5, 3.9], [20.5, -3.9], [20.5, 3.9], [-7, -4.2], [7, -4.2]]) {
      for (const dx of [-0.35, 0.35]) B.add(M.darkSteel, place(new THREE.CylinderGeometry(0.2, 0.22, 0.7, 12), x + dx, DECK_TOP + 0.35, z));
      B.add(M.darkSteel, place(new THREE.BoxGeometry(1.2, 0.1, 0.5), x, DECK_TOP + 0.05, z));
    }
    B.build(hull);

    // name and draft marks on the starboard (river) side
    const name = new THREE.Mesh(new THREE.PlaneGeometry(7.2, 1.0),
      new THREE.MeshStandardMaterial({ map: textTex('BARGE-402', 512, 72, '700 60px "Space Grotesk", Arial, sans-serif', '#ecebe4'), transparent: true, roughness: 0.8 }));
    name.position.set(9.5, DEPTH - 0.85, BEAM / 2 + 0.11); hull.add(name);
    const dm = draftMarkTex();
    const dmMat = new THREE.MeshStandardMaterial({ map: dm, transparent: true, roughness: 0.8 });
    for (const x of [LOA / 2 - 1.2, 0.4, -LOA / 2 + 1.2]) {
      const mk = new THREE.Mesh(new THREE.PlaneGeometry(0.62, 4 * FT), dmMat);  // one texture band per foot, 12–16 ft
      mk.position.set(x, 14 * FT, BEAM / 2 + 0.12); hull.add(mk);
    }

    // hold piles: heightfields that grow only from deposited tonnage
    this.holdPiles = HOLD_X.map((cx, i) => {
      const g = new THREE.PlaneGeometry(HOLD_W - 0.3, HOLD_B - 0.3, 30, 18);
      g.rotateX(-Math.PI / 2);
      const m = new THREE.Mesh(g, M.aggHold);
      m.position.set(cx, HOLD_FLOOR, 0); m.castShadow = true; m.receiveShadow = true; m.visible = false;
      hull.add(m);
      return { mesh: m, f: -1, seed: i * 17 + 3, base: g.attributes.position.array.slice() };
    });

    // FREQUENCY survey lattice: the measurement overlay drawn on the hull's river side
    const L = [], V = (x, y, z) => L.push(x, y, z), zs = BEAM / 2 + 0.16;
    for (let i = 0; i <= 14; i++) { const x = -LOA / 2 + 1.2 + i * ((LOA - 2.4) / 14); V(x, 2.6, zs); V(x, DEPTH + 0.28, zs); }
    V(-LOA / 2 + 1.2, DEPTH + 0.28, zs); V(LOA / 2 - 1.2, DEPTH + 0.28, zs);
    V(-LOA / 2 + 1.2, DEPTH - 0.55, zs); V(LOA / 2 - 1.2, DEPTH - 0.55, zs);
    const lg = new THREE.BufferGeometry(); lg.setAttribute('position', new THREE.Float32BufferAttribute(L, 3));
    this.latticeMat = new THREE.ShaderMaterial({
      uniforms: { uScan: { value: -99 }, uBase: { value: 0.22 } },
      vertexShader: `varying float vX; void main(){ vX = position.x; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: `uniform float uScan; uniform float uBase; varying float vX;
        void main(){ float k = uBase + 1.4 * exp(-pow((vX - uScan) / 1.6, 2.0));
          gl_FragColor = vec4(vec3(0.22, 0.74, 0.97) * k, 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }`,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    });
    const lat = new THREE.LineSegments(lg, this.latticeMat); lat.renderOrder = 5; hull.add(lat);
    // live waterline trace: where the river meets the hull at the current draft
    const wl = new THREE.BufferGeometry();
    wl.setAttribute('position', new THREE.Float32BufferAttribute([-LOA / 2 + 1, 0, zs + 0.02, LOA / 2 - 1, 0, zs + 0.02], 3));
    this.waterlineMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.85, depthWrite: false, blending: THREE.AdditiveBlending });
    this.waterline = new THREE.Line(wl, this.waterlineMat); this.waterline.renderOrder = 6; hull.add(this.waterline);
    // scan plane swept along the hull during the closing survey
    this.scanPlane = new THREE.Mesh(new THREE.PlaneGeometry(BEAM + 3, 7), new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending }));
    this.scanPlane.rotation.y = Math.PI / 2; this.scanPlane.position.y = 3.6; this.scanPlane.visible = false; hull.add(this.scanPlane);

    this.heave = { y: 0, v: 0 };
    this.navLamps = [
      { p: new THREE.Vector3(LOA / 2 - 0.6, DECK_TOP + 1.2, BEAM / 2 - 0.4), c: [0.2, 1.0, 0.45] },
      { p: new THREE.Vector3(LOA / 2 - 0.6, DECK_TOP + 1.2, -BEAM / 2 + 0.4), c: [1.0, 0.16, 0.12] },
      { p: new THREE.Vector3(-LOA / 2 + 0.6, DECK_TOP + 1.3, 0), c: [1.0, 0.95, 0.85] },
    ];
    for (const n of this.navLamps) {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.2, 6), M.darkSteel);
      post.position.set(n.p.x, DECK_TOP + 0.6, n.p.z); hull.add(post);
    }
  },

  buildCrane() {
    const M = this.mat;
    const base = new THREE.Group(); base.position.set(CR.x, QUAY_Y, CR.z); this.scene.add(base);
    const B = new Batch();
    B.add(M.darkSteel, place(new THREE.CylinderGeometry(3.4, 3.8, 0.9, 8), 0, 0.45, 0));
    B.add(M.pedestal, place(new THREE.CylinderGeometry(1.7, 2.1, PED_H - 0.9, 24), 0, 0.9 + (PED_H - 0.9) / 2, 0));
    B.add(M.stripe, place(new THREE.CylinderGeometry(2.12, 2.12, 0.7, 24, 1, true), 0, 1.3, 0));
    // access ladder and platform ring
    B.add(M.darkSteel, place(new THREE.BoxGeometry(0.5, PED_H - 1.5, 0.08), 1.95, PED_H / 2, 0.9, 0, 0.45, 0));
    B.add(M.darkSteel, place(new THREE.TorusGeometry(2.6, 0.05, 6, 40), 0, PED_H - 0.4, 0, Math.PI / 2, 0, 0));
    B.build(base);

    const slew = this.slew = new THREE.Group(); slew.position.set(CR.x, SLEW_Y, CR.z); this.scene.add(slew);
    const SB = new Batch();
    SB.add(M.steel, place(new THREE.CylinderGeometry(2.6, 2.6, 0.55, 30), 0, 0.28, 0));
    SB.add(M.paint, place(new THREE.BoxGeometry(8.4, 3.6, 5.0), -2.2, 2.35, 0));
    SB.add(M.darkSteel, place(new THREE.BoxGeometry(3.6, 3.3, 5.3), -7.9, 2.2, 0));
    SB.add(M.stripe, place(new THREE.BoxGeometry(0.06, 1.0, 5.3), -9.72, 1.2, 0));
    // louvres on the machinery house
    for (let i = 0; i < 6; i++) SB.add(M.darkSteel, place(new THREE.BoxGeometry(0.9, 0.08, 0.05), -4.6 + i * 1.1, 3.1, 2.52), false, false);
    // roof handrail
    for (const z of [-2.4, 2.4]) SB.add(M.yellow, place(new THREE.BoxGeometry(8.2, 0.06, 0.06), -2.2, 5.2, z), false, false);
    for (let i = 0; i < 6; i++) for (const z of [-2.4, 2.4]) SB.add(M.yellow, place(new THREE.BoxGeometry(0.06, 1.0, 0.06), -6 + i * 1.6, 4.7, z), false, false);
    // operator cab, glazed, on the boom side
    SB.add(M.paint, place(new THREE.BoxGeometry(2.6, 2.7, 2.4), 2.6, 3.5, 2.55));
    SB.add(M.glass, place(new THREE.BoxGeometry(2.64, 1.5, 2.2), 2.62, 3.9, 2.56));
    // A-frame
    this.aTop = new THREE.Vector3(-1.2, 11.2, 0);
    for (const z of [-1.9, 1.9]) {
      SB.add(M.paint, strutGeo(new THREE.Vector3(0.6, 4.1, z), this.aTop.clone().setZ(z * 0.35), 0.2, 8));
      SB.add(M.paint, strutGeo(new THREE.Vector3(-6.2, 4.1, z), this.aTop.clone().setZ(z * 0.35), 0.16, 8));
    }
    SB.add(M.steel, place(new THREE.CylinderGeometry(0.5, 0.5, 1.6, 16), this.aTop.x, this.aTop.y, 0, Math.PI / 2, 0, 0));
    SB.build(slew);

    // lattice boom: four chords with lacing, heel wide, head narrow
    const boom = this.boom = new THREE.Group(); boom.position.set(PIV_X, PIV_Y, 0); slew.add(boom);
    const BB = new Batch();
    const r0 = 1.25, r1 = 0.5, N = 12;
    const cn = (t, sy, sz) => { const r = lerp(r0, r1, t); return new THREE.Vector3(t * BOOM, sy * r * 0.9, sz * r); };
    for (const [sy, sz] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) BB.add(M.paint, strutGeo(cn(0, sy, sz), cn(1, sy, sz), 0.13, 8));
    for (let i = 0; i < N; i++) {
      const a = i / N, b = (i + 1) / N;
      for (const sz of [1, -1]) { BB.add(M.paint, strutGeo(cn(a, 1, sz), cn(b, -1, sz), 0.06, 5)); BB.add(M.paint, strutGeo(cn(b, 1, sz), cn(b, -1, sz), 0.055, 5)); }
      for (const sy of [1, -1]) { BB.add(M.paint, strutGeo(cn(a, sy, 1), cn(b, sy, -1), 0.05, 5)); BB.add(M.paint, strutGeo(cn(b, sy, 1), cn(b, sy, -1), 0.045, 5)); }
    }
    BB.add(M.darkSteel, place(new THREE.BoxGeometry(1.8, 1.4, 1.5), BOOM + 0.2, 0, 0));
    BB.add(M.steel, place(new THREE.CylinderGeometry(0.72, 0.72, 0.5, 20), BOOM + 0.7, -0.1, 0.45, Math.PI / 2, 0, 0));
    BB.add(M.steel, place(new THREE.CylinderGeometry(0.72, 0.72, 0.5, 20), BOOM + 0.7, -0.1, -0.45, Math.PI / 2, 0, 0));
    BB.add(M.darkSteel, place(new THREE.BoxGeometry(1.2, 0.5, 2.2), 1.0, 0, 0));
    BB.add(M.whiteLamp, place(new THREE.BoxGeometry(0.5, 0.3, 0.5), BOOM - 1.2, -0.7, 0), false, false);
    BB.build(boom);
    this.tipNode = new THREE.Object3D(); this.tipNode.position.set(BOOM + 0.7, -0.8, 0); boom.add(this.tipNode);
    this.lampNode = new THREE.Object3D(); this.lampNode.position.set(BOOM - 1.2, -0.9, 0); boom.add(this.lampNode);
    this.obstNode = new THREE.Object3D(); this.obstNode.position.set(BOOM + 0.6, 0.85, 0); boom.add(this.obstNode);

    // luffing ropes: A-frame apex → boom head
    this.luffRopes = [-0.3, 0.3].map(z => { const m = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 1, 6), M.rope); m.castShadow = true; slew.add(m); m.userData.z = z; return m; });

    // hoist ropes (world space) and the clamshell grab
    this.hoistRopes = [-0.42, 0.42].map(() => { const m = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1, 6), M.rope); m.castShadow = true; this.scene.add(m); return m; });
    this.buildGrab();
  },

  buildGrab() {
    const M = this.mat;
    const grab = this.grab = new THREE.Group(); this.scene.add(grab);
    // head block (rides on the hoist ropes), crosshead at the hinge line
    const head = this.grabHead = new THREE.Group(); grab.add(head);
    const HB = new Batch();
    HB.add(M.yellow, place(new THREE.BoxGeometry(1.9, 0.9, 1.3), 0, 0, 0));
    HB.add(M.darkSteel, place(new THREE.BoxGeometry(2.4, 0.3, 2.9), 0, -0.4, 0));
    HB.add(M.steel, place(new THREE.CylinderGeometry(0.42, 0.42, 0.24, 16), 0, 0.5, 0.42, Math.PI / 2, 0, 0));
    HB.add(M.steel, place(new THREE.CylinderGeometry(0.42, 0.42, 0.24, 16), 0, 0.5, -0.42, Math.PI / 2, 0, 0));
    HB.build(head);
    const cross = new Batch();
    cross.add(M.darkSteel, place(new THREE.CylinderGeometry(0.26, 0.26, SHELL_W + 0.5, 16), 0, 0, 0, Math.PI / 2, 0, 0));
    cross.add(M.yellow, place(new THREE.BoxGeometry(1.1, 0.7, 0.5), 0, 0.2, 0));
    cross.build(grab);

    // shells
    const curve = new THREE.SplineCurve(SKIN.map(p => new THREE.Vector2(p[0], p[1])));
    const pts = curve.getPoints(24);
    const side = new THREE.Shape();
    side.moveTo(0, 0); pts.forEach(p => side.lineTo(p.x, p.y)); side.lineTo(0, 0);
    const sideGeo = new THREE.ShapeGeometry(side);
    const pos = [], nor = [], uv = [], idx = [];
    for (let i = 0; i < pts.length; i++) {
      const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
      const tx = b.x - a.x, ty = b.y - a.y, l = Math.hypot(tx, ty) || 1;
      for (const z of [-SHELL_W / 2, SHELL_W / 2]) { pos.push(pts[i].x, pts[i].y, z); nor.push(-ty / l, tx / l, 0); uv.push(i / (pts.length - 1), z > 0 ? 1 : 0); }
    }
    for (let i = 0; i < pts.length - 1; i++) { const a = i * 2, b = a + 1, c = a + 2, d = a + 3; idx.push(a, b, c, b, d, c); }
    const skin = new THREE.BufferGeometry();
    skin.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    skin.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
    skin.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    skin.setIndex(idx);
    const shellMat = M.yellow.clone(); shellMat.side = THREE.DoubleSide;
    this.jaws = [1, -1].map(sx => {
      const mirror = new THREE.Group(); mirror.scale.x = sx; grab.add(mirror);
      const j = new THREE.Group(); j.position.set(HINGE_X, 0, 0); mirror.add(j);
      const SBt = new Batch();
      SBt.add(shellMat, skin.clone());
      SBt.add(shellMat, sideGeo.clone().translate(0, 0, -SHELL_W / 2));
      SBt.add(shellMat, sideGeo.clone().translate(0, 0, SHELL_W / 2));
      // wear plate on the lip and teeth
      const lip = pts[pts.length - 1];
      SBt.add(M.steel, place(new THREE.BoxGeometry(0.34, 0.12, SHELL_W), lip.x + 0.1, lip.y + 0.04, 0));
      for (let k = 0; k < 6; k++) SBt.add(M.steel, place(new THREE.ConeGeometry(0.1, 0.36, 5), lip.x - 0.1, lip.y - 0.02, -SHELL_W / 2 + 0.25 + k * ((SHELL_W - 0.5) / 5), 0, 0, Math.PI / 2 + 0.25));
      // ribs across the back of the shell
      for (const t of [0.25, 0.55]) { const q = curve.getPoint(t); SBt.add(M.darkSteel, place(new THREE.BoxGeometry(0.16, 0.16, SHELL_W + 0.1), q.x + 0.05, q.y, 0)); }
      SBt.build(j);
      mirror.userData.jaw = j;
      return j;
    });
    // arms: head → shell top corners (world-posed each frame)
    this.arms = [];
    for (const sx of [1, -1]) for (const sz of [1, -1]) {
      const m = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 1, 8), M.darkSteel);
      m.castShadow = true; grab.add(m); this.arms.push({ m, sx, sz });
    }
    // the load in the grab: a heaped mound, shown only while the ledger says it is carried
    const lg = new THREE.SphereGeometry(1, 22, 14);
    const lp = lg.attributes.position;
    for (let i = 0; i < lp.count; i++) {
      const x = lp.getX(i), y = lp.getY(i), z = lp.getZ(i);
      const n = 1 + (hash2(Math.round(x * 6), Math.round(z * 6) + Math.round(y * 6) * 7) - 0.5) * 0.14;
      lp.setXYZ(i, x * n, y * (y > 0 ? 0.55 : 1) * n, z * n);
    }
    lg.computeVertexNormals();
    this.load = new THREE.Mesh(lg, M.aggGrab);
    this.load.castShadow = true;
    grab.add(this.load);
    this.grab.traverse(o => { if (o.isMesh) o.castShadow = true; });
  },

  buildCargo() {
    // stockpile heightfield: radial grid, eroded by each bite
    const NR = 34, NS = 72;
    const g = new THREE.BufferGeometry(), pos = [], uv = [], idx = [];
    pos.push(0, 0, 0); uv.push(0.5, 0.5);
    for (let i = 1; i <= NR; i++) for (let j = 0; j < NS; j++) {
      const r = Math.pow(i / NR, 0.92) * PILE.r * 1.14, a = j / NS * Math.PI * 2;
      pos.push(Math.cos(a) * r, 0, Math.sin(a) * r); uv.push(0.5 + Math.cos(a) * r / 24, 0.5 + Math.sin(a) * r / 24);
    }
    for (let j = 0; j < NS; j++) idx.push(0, 1 + (j + 1) % NS, 1 + j);
    for (let i = 1; i < NR; i++) for (let j = 0; j < NS; j++) {
      const a = 1 + (i - 1) * NS + j, b = 1 + (i - 1) * NS + (j + 1) % NS, c = 1 + i * NS + j, d = 1 + i * NS + (j + 1) % NS;
      idx.push(a, b, c, b, d, c);
    }
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    this.pile = new THREE.Mesh(g, this.mat.agg);
    this.pile.position.set(PILE.x, QUAY_Y, PILE.z);
    this.pile.castShadow = true; this.pile.receiveShadow = true;
    this.scene.add(this.pile);
    this.pileBase = pos.slice();
    this.craters = [];
    this.rebuildPile();
    // a second, untouched heap behind — the terminal holds more than this one transfer
    const g2 = g.clone(), p2 = g2.attributes.position;
    for (let k = 0; k < p2.count; k++) {
      const x = p2.getX(k), z = p2.getZ(k), r = Math.hypot(x, z) / (PILE.r * 1.14);
      p2.setY(k, Math.max(0, (1 - Math.pow(r, 1.08)) * 6.2 + (vnoise(x * 0.8, z * 0.8 + 11) - 0.5) * 0.5 * (r < 1 ? 1 : 0)));
    }
    g2.computeVertexNormals();
    const heap2 = new THREE.Mesh(g2, this.mat.agg);
    heap2.position.set(PILE.x + 26, QUAY_Y, PILE.z - 14); heap2.scale.set(1.2, 1, 0.9);
    heap2.castShadow = true; heap2.receiveShadow = true;
    this.scene.add(heap2);

    // falling cargo: instanced rock chunks
    const rg = new THREE.IcosahedronGeometry(1, 0), rp = rg.attributes.position;
    for (let i = 0; i < rp.count; i++) { const k = 0.75 + hash2(i * 3.1, 7.7) * 0.5; rp.setXYZ(i, rp.getX(i) * k, rp.getY(i) * k * 0.75, rp.getZ(i) * k); }
    rg.computeVertexNormals();
    const NMAX = this.q.pour + 120;
    this.rocks = new THREE.InstancedMesh(rg, this.mat.rock, NMAX);
    this.rocks.castShadow = true; this.rocks.count = 0; this.rocks.frustumCulled = false;
    this.rocks.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    const col = new THREE.Color();
    const R = mulberry(9);
    for (let i = 0; i < NMAX; i++) { const k = 0.55 + R() * 0.6; col.setRGB(k, k * 0.96, k * 0.9); this.rocks.setColorAt(i, col); }
    this.scene.add(this.rocks);
    this.P = { n: NMAX, pos: new Float32Array(NMAX * 3), vel: new Float32Array(NMAX * 3), rot: new Float32Array(NMAX * 3), spin: new Float32Array(NMAX * 3),
      size: new Float32Array(NMAX), state: new Uint8Array(NMAX), rel: new Int16Array(NMAX), rnd: mulberry(402) };

    // dust
    const DN = this.small ? 160 : 320;
    const dg = new THREE.BufferGeometry();
    dg.setAttribute('position', new THREE.BufferAttribute(new Float32Array(DN * 3), 3).setUsage(THREE.DynamicDrawUsage));
    dg.setAttribute('aSize', new THREE.BufferAttribute(new Float32Array(DN), 1).setUsage(THREE.DynamicDrawUsage));
    dg.setAttribute('aAlpha', new THREE.BufferAttribute(new Float32Array(DN), 1).setUsage(THREE.DynamicDrawUsage));
    this.dustMat = dustMaterial();
    this.dust = new THREE.Points(dg, this.dustMat); this.dust.frustumCulled = false; this.dust.renderOrder = 8;
    this.scene.add(this.dust);
    this.D = { n: DN, pos: dg.attributes.position.array, vel: new Float32Array(DN * 3), life: new Float32Array(DN), max: new Float32Array(DN), size: dg.attributes.aSize.array, alpha: dg.attributes.aAlpha.array, next: 0 };
  },

  buildGlows() {
    const R = mulberry(88), P = [], C = [], Sz = [], Ph = [];
    const add = (x, y, z, c, s, ph) => { P.push(x, y, z); C.push(...c); Sz.push(s); Ph.push(ph == null ? R() : ph); };
    // horizon: terminal and road lighting across the far bank of the basin
    for (let i = 0; i < 90; i++) {  // yard lighting between the quay and the sheds
      const x = -300 + R() * 620, z = -70 - R() * 220, y = QUAY_Y + 5 + R() * 7;
      add(x, y, z, R() > 0.25 ? [1.7, 1.0, 0.45] : [1.3, 1.35, 1.4], 1.2 + R() * 1.0);
    }
    for (let i = 0; i < 150; i++) {
      const x = -700 + R() * 1400, z = -420 - R() * 120, y = QUAY_Y + 1 + R() * 9;
      const warm = R() > 0.22, k = 0.6 + R() * 0.8;
      add(x, y, z, warm ? [1.6 * k, 0.95 * k, 0.45 * k] : [1.3 * k, 1.35 * k, 1.4 * k], 1.4 + R() * 1.6);
    }
    for (let i = 0; i < 70; i++) add(-520 + i * 15, QUAY_Y + 8, -470, [2.0, 1.15, 0.5], 2.4);  // levee road: the horizon lamp row
    this.sheds.forEach(([x, z, sx, sy, sz]) => { for (let k = 0; k < 3; k++) add(x - sx / 2 + (k + 0.5) * sx / 3, QUAY_Y + sy - 1.2, z + sz / 2 + 0.4, [2.6, 1.6, 0.7], 1.1); });
    // mast heads
    this.mastHeads.forEach(h => { add(h.x - 1.1, h.y, h.z, [5.2, 2.7, 1.0], 2.3); add(h.x + 1.1, h.y, h.z, [5.2, 2.7, 1.0], 2.3); });
    // loader lamps, far crane obstruction lights (blinking)
    this.loaderLamps.forEach(p => add(p.x, p.y, p.z, [5, 4.8, 4.2], 1.2));
    (this._farTips || []).forEach((t, i) => add(t.x, t.y + 0.6, t.z, [4, 0.3, 0.2], 2.4, -0.3 * (i + 1)));
    this.staticGlowCount = Sz.length;
    // dynamic slots: crane boom lamp, obstruction light, cab, barge nav lights (3)
    for (let i = 0; i < 6; i++) add(0, -100, 0, [0, 0, 0], 1, 0.5);
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(P, 3));
    g.setAttribute('aColor', new THREE.Float32BufferAttribute(C, 3));
    g.setAttribute('aSize', new THREE.Float32BufferAttribute(Sz, 1));
    g.setAttribute('aPhase', new THREE.Float32BufferAttribute(Ph, 1));
    this.glowMat = glowMaterial();
    this.glows = new THREE.Points(g, this.glowMat); this.glows.frustumCulled = false; this.glows.renderOrder = 9;
    this.scene.add(this.glows);

    // light beams under the floodlights and from the boom head (haze)
    const cone = new THREE.CylinderGeometry(0.4, 1, 1, 32, 1, true);
    const mkBeam = (from, to, rad, col, I) => {
      const m = new THREE.Mesh(cone, beamMaterial(col, I));
      const d = new THREE.Vector3().subVectors(to, from), len = d.length();
      m.scale.set(rad, len, rad);
      m.position.copy(from).addScaledVector(d, 0.5);
      m.quaternion.setFromUnitVectors(UP, d.normalize().negate());
      m.renderOrder = 7; this.scene.add(m); return m;
    };
    mkBeam(this.floodA.position, new THREE.Vector3(-8, 0, -1), 13, 0xffb060, 0.11);
    mkBeam(this.floodB.position, new THREE.Vector3(24, QUAY_Y, -27), 11, 0xffb060, 0.09);
    this.workBeam = mkBeam(new THREE.Vector3(0, 30, 0), new THREE.Vector3(0, 0, 0), 5, 0xfff2df, 0.05);

    // water glints: the brightest sources
    const u = this.waterMat.uniforms;
    const lamps = [];
    this.mastHeads.filter(h => Math.abs(h.x) < 100).forEach(h => lamps.push([h, [1.0, 0.62, 0.3]]));  // far masts reflect via the mirror pass
    this.loaderLamps.slice(0, 1).forEach(p => lamps.push([p, [0.5, 0.48, 0.42]]));
    lamps.length = Math.min(lamps.length, MAX_LAMPS - 3);
    lamps.forEach(([p, c], i) => { u.uLampPos.value[i].copy(p); u.uLampCol.value[i].set(c[0], c[1], c[2]); });
    this.dynLampBase = lamps.length;
    u.uLampN.value = lamps.length + 3;
  },

  buildPlan() {
    const N = 120, pos = new Float32Array(N * 3), tt = new Float32Array(N);
    for (let i = 0; i < N; i++) tt[i] = i / (N - 1);
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute('aT', new THREE.BufferAttribute(tt, 1));
    this.pathMat = new THREE.ShaderMaterial({
      uniforms: { uScale: { value: 600 }, uTime: { value: 0 }, uA: { value: 0 } },
      vertexShader: `attribute float aT; uniform float uScale; uniform float uTime; uniform float uA; varying float vK;
        void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.0);
          float wave = pow(fract(aT * 5.0 - uTime * 0.45), 8.0);
          vK = uA * (0.35 + 1.6 * wave) * smoothstep(0.0, 0.04, aT) * smoothstep(1.0, 0.94, aT);
          gl_PointSize = clamp((0.34 + 0.25 * wave) * uScale / -mv.z, 1.5, 14.0); gl_Position = projectionMatrix * mv; }`,
      fragmentShader: `varying float vK; void main(){ vec2 c = gl_PointCoord - 0.5; float r2 = dot(c, c) * 4.0; if (r2 > 1.0) discard;
          gl_FragColor = vec4(vec3(0.22, 0.74, 0.97) * vK * (1.0 - r2), 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }`,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    });
    this.path = new THREE.Points(g, this.pathMat); this.path.frustumCulled = false; this.path.renderOrder = 10;
    this.scene.add(this.path);
    // receiving hatch outlines, drawn on the coaming tops
    this.hatchMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending });
    this.hatchLines = HOLD_X.map(cx => {
      const w = HOLD_W / 2 + 0.3, b = HOLD_B / 2 + 0.3, y = COAM_TOP + 0.1;
      const lg = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(cx - w, y, -b), new THREE.Vector3(cx + w, y, -b), new THREE.Vector3(cx + w, y, b), new THREE.Vector3(cx - w, y, b)]);
      const l = new THREE.LineLoop(lg, this.hatchMat.clone()); l.renderOrder = 10; this.hull.add(l); return l;
    });
    // bite ring on the stockpile
    const ring = []; for (let i = 0; i <= 48; i++) { const a = i / 48 * Math.PI * 2; ring.push(new THREE.Vector3(Math.cos(a) * 2.2, 0, Math.sin(a) * 2.2)); }
    this.biteRing = new THREE.Line(new THREE.BufferGeometry().setFromPoints(ring), new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }));
    this.biteRing.renderOrder = 10; this.scene.add(this.biteRing);
  },
};
