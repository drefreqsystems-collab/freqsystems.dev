/* Frequency Systems — Simulation Ground.
 * A paused-by-default, operator-driven walkthrough of the six-phase cargo-transfer
 * workflow. No autonomous motion: the scene changes only when the operator changes it.
 *
 * Registered as window.SimulationGround and consumed by app.prod.js as the Simulation page.
 *
 * Data status: every number on this page is a configured scenario value, labelled
 * ILLUSTRATIVE. Nothing here is presented as a field measurement.
 */

/* Six operational phases of one cargo transfer. These are workflow phases — distinct from
 * the six draft measurement positions (FP/FS/MP/MS/AP/AS), which are physical locations
 * read during the survey phases. Ballast and trim are conditional decisions: they occur
 * when the plan calls for them, not automatically on every transfer. */
window.FREQ_PHASE_DETAIL = [
  {
    key: 'pre-survey', name: 'Pre-Survey', short: 'Pre-Survey',
    img: 'pre-survey.jpg',
    objective: 'Establish the starting hull condition before any cargo moves.',
    input: 'Draft readings at the six measurement positions; vessel particulars from the operations record.',
    decision: 'Operator confirms the baseline is within the expected range for an empty hull, or re-runs the survey.',
    record: 'Baseline draft set, with the reading at each position and the time it was taken.',
    conditional: false,
    annotations: [
      { x: 20, y: 30, label: 'Six measurement positions', note: 'FP · FS · MP · MS · AP · AS' },
      { x: 62, y: 66, label: 'Hull at rest', note: 'No cargo aboard' }
    ]
  },
  {
    key: 'ballast', name: 'Ballast Adjustment', short: 'Ballast',
    img: 'ballast.jpg',
    objective: 'Bring the hull to an acceptable attitude before loading, where the plan requires it.',
    input: 'Baseline draft record; fore and aft tank state; the loading plan.',
    decision: 'Operator approves a ballast transfer, or records that no adjustment is needed. Not every transfer requires one.',
    record: 'Adjustment approved or waived, with the reason and the resulting attitude.',
    conditional: true,
    annotations: [
      { x: 22, y: 62, label: 'Forward tanks', note: 'Transfer target' },
      { x: 58, y: 62, label: 'Aft tanks', note: 'Transfer source' }
    ]
  },
  {
    key: 'crane', name: 'Crane Position', short: 'Crane',
    img: 'phase-03-crane.jpg',
    objective: 'Place the crane so the approved hold sequence can be worked safely.',
    input: 'Approved cargo plan; crane availability and reach; hold access.',
    decision: 'Operator confirms the crane is positioned for the first hold in the sequence.',
    record: 'Position confirmed against the plan, with the hold order to be worked.',
    conditional: false,
    annotations: [
      { x: 52, y: 26, label: 'Boom and grab', note: 'Positioned over the hold' },
      { x: 24, y: 68, label: 'Hold access', note: 'First in the approved sequence' }
    ]
  },
  {
    key: 'cargo', name: 'Cargo Load', short: 'Cargo Load',
    img: 'phase-04-cargo-v2.jpg',
    objective: 'Move cargo into the holds in the approved order and quantity.',
    input: 'Cargo plan; grab cycles worked; running hold fill.',
    decision: 'Operator holds or continues the sequence as the hull attitude changes.',
    record: 'Quantity placed per hold, cycle count, and any deviation from the plan.',
    conditional: false,
    annotations: [
      { x: 30, y: 40, label: 'Hold under load', note: 'Cargo placed to plan' },
      { x: 66, y: 62, label: 'Adjacent hold', note: 'Queued in the sequence' }
    ]
  },
  {
    key: 'trim', name: 'Trim Correction', short: 'Trim',
    img: 'phase-05-trim.jpg',
    objective: 'Correct fore-and-aft distribution before the closing survey, where required.',
    input: 'Running draft readings; distribution across the holds.',
    decision: 'Operator approves a redistribution or ballast correction, or records that none is required.',
    record: 'Correction approved or waived, with the attitude before and after.',
    conditional: true,
    annotations: [
      { x: 24, y: 54, label: 'Forward reading', note: 'Compared against aft' },
      { x: 62, y: 54, label: 'Aft reading', note: 'Distribution check' }
    ]
  },
  {
    key: 'final-survey', name: 'Final Survey', short: 'Final Survey',
    img: 'final-survey.jpg',
    objective: 'Establish the closing hull condition and produce the outcome record.',
    input: 'Draft readings at the same six positions; the baseline record.',
    decision: 'Operator approves the closing figures, or rejects and re-surveys.',
    record: 'Outcome record: closing draft per position, the quantity derived from it, and the approval.',
    conditional: false,
    annotations: [
      { x: 22, y: 34, label: 'Closing survey', note: 'Same six positions as baseline' },
      { x: 60, y: 62, label: 'Outcome record', note: 'Approved and stored' }
    ]
  }
];

/* Draft at the six measurement positions, per phase. Configured scenario values.
 * Position readings are measured inputs; mean draft, trim and list are calculated from them. */
window.FREQ_STATIONS = {
  order: ['FP', 'FS', 'MP', 'MS', 'AP', 'AS'],
  labels: {
    FP: 'Forward port', FS: 'Forward starboard',
    MP: 'Midship port', MS: 'Midship starboard',
    AP: 'Aft port',     AS: 'Aft starboard'
  },
  // ft, per phase index
  readings: [
    { FP: 11.74, FS: 11.76, MP: 11.80, MS: 11.81, AP: 11.84, AS: 11.85 },
    { FP: 12.01, FS: 12.02, MP: 12.05, MS: 12.06, AP: 12.08, AS: 12.09 },
    { FP: 12.06, FS: 12.07, MP: 12.10, MS: 12.11, AP: 12.13, AS: 12.14 },
    { FP: 12.22, FS: 12.24, MP: 12.30, MS: 12.32, AP: 12.37, AS: 12.38 },
    { FP: 12.39, FS: 12.40, MP: 12.42, MS: 12.43, AP: 12.44, AS: 12.45 },
    { FP: 12.44, FS: 12.45, MP: 12.45, MS: 12.45, AP: 12.46, AS: 12.46 }
  ]
};

/* ---- The stage: one static photoreal plate per phase, with quiet HTML annotations. ---- */
function PhaseStage({ phase, index, inspect, advancing }) {
  const hostRef = React.useRef(null);
  const elRef = React.useRef(null);
  const [playing, setPlaying] = React.useState(false);
  const [t, setT] = React.useState(0);
  const reduced = React.useMemo(function () {
    return typeof window.matchMedia === 'function' &&
           window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  React.useEffect(function () {
    const el = hostRef.current && hostRef.current.querySelector('harbor-stage');
    if (!el) return;
    elRef.current = el;
    function onProgress(e) { setT(e.detail.t); }
    function onComplete() { setPlaying(false); }
    el.addEventListener('phaseprogress', onProgress);
    el.addEventListener('phasecomplete', onComplete);
    return function () {
      el.removeEventListener('phaseprogress', onProgress);
      el.removeEventListener('phasecomplete', onComplete);
    };
  }, []);

  // Phase change is replay navigation, not a completed transfer: reset local transport state.
  React.useEffect(function () { setPlaying(false); setT(0); }, [index]);

  const call = function (name) {
    const el = elRef.current;
    if (el && typeof el[name] === 'function') el[name]();
  };

  const chip = function (text, tone) {
    return /*#__PURE__*/React.createElement('span', {
      className: 'mono',
      style: {
        fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase',
        color: tone === 'warn' ? '#F5C368' : 'var(--text-muted)',
        padding: '4px 9px', borderRadius: 'var(--radius-sm)',
        border: '1px solid ' + (tone === 'warn' ? 'rgba(245,158,11,0.38)' : 'var(--border-faint)'),
        background: tone === 'warn' ? 'rgba(245,158,11,0.12)' : 'rgba(8,12,24,0.72)'
      }
    }, text);
  };

  // Neither this scene nor the walkthrough is running: the stage reads as inactive, not live.
  const inactive = !playing && !advancing;

  const ctl = function (label, onClick, disabled) {
    return /*#__PURE__*/React.createElement('button', {
      key: label, type: 'button', onClick: onClick, disabled: !!disabled,
      style: {
        padding: '8px 13px', borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--border-faint)', background: 'var(--dm-bg)',
        color: disabled ? 'var(--text-faint)' : 'var(--text-strong)',
        cursor: disabled ? 'default' : 'pointer', fontFamily: 'var(--font-mono)',
        fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
        transition: 'border-color var(--dur-fast) var(--ease-standard)'
      }
    }, label);
  };

  return /*#__PURE__*/React.createElement('div', null,
    /*#__PURE__*/React.createElement('div', {
      ref: hostRef,
      style: {
        position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden',
        border: '1px solid var(--border-default)', background: '#05080F',
        aspectRatio: '3 / 2', boxShadow: 'var(--shadow-raised)'
      }
    },
      /*#__PURE__*/React.createElement('harbor-stage', {
        phase: String(index),
        playing: playing && !reduced ? '1' : '0',
        reduced: reduced ? '1' : '0',
        exagg: '5',
        style: {
          position: 'absolute', inset: 0, display: 'block', width: '100%', height: '100%',
          filter: inactive ? 'saturate(0.45) brightness(0.8)' : 'none', transition: 'filter 300ms var(--ease-out)'
        }
      }),
      /*#__PURE__*/React.createElement('div', {
        style: { position: 'absolute', top: 12, left: 14, display: 'flex', gap: 6, flexWrap: 'wrap', maxWidth: '68%', pointerEvents: 'none' }
      },
        chip('Illustrative 3D operational model'),
        chip('Attitude ×5 for legibility', 'warn')
      ),
      /*#__PURE__*/React.createElement('span', {
        className: 'mono',
        style: {
          position: 'absolute', top: 12, right: 14, fontSize: 11, letterSpacing: '0.1em',
          color: 'var(--text-muted)', padding: '4px 9px', borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-default)', background: 'rgba(8,12,24,0.62)'
        }
      }, 'PHASE ' + String(index + 1).padStart(2, '0') + ' / 06' + (inactive ? ' · INACTIVE' : '')),
      /*#__PURE__*/React.createElement('span', {
        className: 'mono',
        style: {
          position: 'absolute', bottom: 12, left: 14, fontSize: 10.5, letterSpacing: '0.12em',
          color: 'var(--text-faint)', textTransform: 'uppercase'
        }
      }, 'Illustrative 3D operational model · not a field capture'),
      /*#__PURE__*/React.createElement('span', {
        className: 'mono',
        style: {
          position: 'absolute', bottom: 12, right: 14, fontSize: 10.5, letterSpacing: '0.1em',
          color: 'var(--text-faint)'
        }
      }, 'drag · scroll · click a station')
    ),
    /*#__PURE__*/React.createElement('div', {
      style: {
        display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginTop: 10,
        padding: '10px 12px', border: '1px solid var(--border-faint)',
        borderRadius: 'var(--radius-md)', background: 'var(--surface-card)'
      }
    },
      /*#__PURE__*/React.createElement('span', {
        className: 'mono',
        style: { fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-faint)', marginRight: 2 }
      }, 'Scene'),
      ctl(reduced ? 'Motion reduced' : playing ? '❚❚ Hold' : t > 0 ? '▶ Resume' : '▶ Run motion',
          function () { if (!reduced) setPlaying(function (p) { return !p; }); }, reduced),
      ctl('↺ Replay', function () { setPlaying(false); setT(0); call('replayPhase'); }),
      ctl('Reset view', function () { call('resetView'); }),
      /*#__PURE__*/React.createElement('span', {
        style: {
          flex: '1 1 120px', minWidth: 90, height: 4, borderRadius: 2,
          background: 'var(--indigo-line-2)', overflow: 'hidden'
        }
      },
        /*#__PURE__*/React.createElement('span', {
          style: {
            display: 'block', height: '100%', width: (t * 100).toFixed(1) + '%',
            background: 'var(--signal-live)', transition: 'width 120ms linear'
          }
        })
      ),
      /*#__PURE__*/React.createElement('span', {
        className: 'mono',
        style: { fontSize: 10.5, letterSpacing: '0.14em', color: 'var(--text-faint)', textTransform: 'uppercase' }
      }, reduced ? 'Static settled pose' : playing ? 'Running' : t >= 1 ? 'Phase complete · held' : t > 0 ? 'Paused · pose held' : 'Paused at phase start')
    )
  );
}
window.PhaseStage = PhaseStage;

/* ---- Data status: mode, source, timestamp. Explicit, never a live-looking counter. ---- */
function DataStatus({ stamp }) {
  const rows = [
    ['Mode', 'Illustrative'],
    ['Source', 'Configured scenario'],
    ['Units', 'Feet (draft), degrees (attitude)'],
    ['Scenario set', stamp]
  ];
  return /*#__PURE__*/React.createElement('div', {
    style: {
      display: 'flex', flexWrap: 'wrap', gap: '10px 26px', padding: '12px 16px',
      border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)',
      background: 'var(--surface-card)'
    }
  }, rows.map(([k, v]) => /*#__PURE__*/React.createElement('span', {
    key: k, className: 'mono', style: { fontSize: 11.5, letterSpacing: '0.06em', color: 'var(--text-muted)' }
  },
    k.toUpperCase() + ' ',
    /*#__PURE__*/React.createElement('span', { style: { color: 'var(--text-body)' } }, v)
  )));
}
window.DataStatus = DataStatus;

/* Critically damped spring (damping ratio = 1.0): the value reaches its target and stops,
 * with no overshoot and therefore no bounce. Integrated per animation frame and halted on
 * settle, so nothing runs continuously. Honoured as a no-op under reduced motion. */
function useSpring(target, stiffness) {
  const k = stiffness || 200;
  const c = 2 * Math.sqrt(k);                 // critical damping for mass = 1
  const reduced = React.useRef(window.matchMedia('(prefers-reduced-motion: reduce)').matches).current;
  const [v, setV] = React.useState(target);
  const st = React.useRef({ v: target, dv: 0, raf: 0, last: 0 });
  React.useEffect(() => {
    if (reduced) { setV(target); return; }
    const s = st.current;
    const step = now => {
      const dt = Math.min(0.032, (now - (s.last || now)) / 1000);
      s.last = now;
      const a = k * (target - s.v) - c * s.dv;
      s.dv += a * dt;
      s.v += s.dv * dt;
      if (Math.abs(target - s.v) < 0.0008 && Math.abs(s.dv) < 0.004) {
        s.v = target; s.dv = 0; setV(target); s.raf = 0; return;   // settled: stop the loop
      }
      setV(s.v);
      s.raf = requestAnimationFrame(step);
    };
    s.last = 0;
    s.raf = requestAnimationFrame(step);
    return () => { if (s.raf) cancelAnimationFrame(s.raf); s.raf = 0; };
  }, [target, reduced, k, c]);
  return v;
}
window.useSpring = useSpring;

/* A control whose press response is that spring, not a CSS easing curve. */
function SpringPress({ children, style, onClick, label, pressed }) {
  const [down, setDown] = React.useState(false);
  const s = useSpring(down ? 1 : 0, 260);
  return /*#__PURE__*/React.createElement('button', {
    onClick: onClick,
    'aria-label': label,
    'aria-pressed': typeof pressed === 'boolean' ? pressed : undefined,
    onPointerDown: () => setDown(true),
    onPointerUp: () => setDown(false),
    onPointerLeave: () => setDown(false),
    onBlur: () => setDown(false),
    style: { ...style, transform: 'translateY(' + (s * 1.4).toFixed(2) + 'px) scale(' + (1 - s * 0.022).toFixed(4) + ')' }
  }, children);
}
window.SpringPress = SpringPress;

/* Kinetic typography, to the stated constraint: a user-triggered response on the variable
 * weight axis only. It fires when the operator changes phase, settles on the same spring,
 * and cannot reflow — the block reserves its height and the line never re-wraps. */
function KineticTitle({ text, index }) {
  const [bump, setBump] = React.useState(0);
  const w = useSpring(bump ? 640 : 520, 150);
  const first = React.useRef(true);
  React.useEffect(() => {
    if (first.current) { first.current = false; return; }   // not on first render: nothing has been triggered yet
    setBump(1);
    const t = setTimeout(() => setBump(0), 220);
    return () => clearTimeout(t);
  }, [index]);
  return /*#__PURE__*/React.createElement('h2', {
    style: {
      fontSize: 21, lineHeight: 1.2, margin: 0, minHeight: 26,
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontVariationSettings: '"wght" ' + Math.round(w),
      fontSynthesis: 'none',
      textWrap: 'nowrap'
    }
  }, text);
}
window.KineticTitle = KineticTitle;

/* ---- The page. Paused by default; nothing advances without an operator action. ---- */
function SimulationGround() {
  const { Eyebrow, Button } = window.FREQAIDesignSystem_019dc6;
  const PHASES = window.FREQ_PHASE_DETAIL;
  const ST = window.FREQ_STATIONS;
  const [i, setI] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);   // default paused
  const [inspect, setInspect] = React.useState(false);
  const [gap, setGap] = React.useState(false);          // preview missing-observation handling
  const stamp = React.useRef(new Date().toISOString().slice(0, 16).replace('T', ' ') + ' UTC').current;

  React.useEffect(() => {
    const narrow = window.matchMedia('(max-width: 900px)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setInspect(!narrow && !reduced);
  }, []);

  // Advance only while explicitly playing. Any manual selection pauses (no auto-resume).
  React.useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => setI(p => (p + 1) % PHASES.length), 5200);
    return () => clearTimeout(t);
  }, [playing, i]);

  const select = n => { setPlaying(false); setI((n + PHASES.length) % PHASES.length); };
  const phase = PHASES[i];
  // One position is withheld while the missing-data preview is on, so the handling is
  // visible: the value is reported missing, never interpolated, and the calculated figures
  // are recomputed from the reduced set and labelled as such.
  const r = Object.assign({}, ST.readings[i]);
  if (gap) r.MP = null;
  const vals = ST.order.map(k => r[k]).filter(v => v !== null);
  const mean = vals.reduce((a, b) => a + b, 0) / vals.length;
  const fwd = (r.FP + r.FS) / 2, aft = (r.AP + r.AS) / 2;
  const trim = aft - fwd;
  const list = r.MP === null
    ? ((r.FS + r.AS) - (r.FP + r.AP)) / 2
    : ((r.FS + r.MS + r.AS) - (r.FP + r.MP + r.AP)) / 3;
  const basis = gap ? vals.length + ' of 6 positions' : 'all six positions';
  // Mean draft per phase, for the chart. Uses the full configured set.
  const series = ST.readings.map(rd => ST.order.reduce((a, k) => a + rd[k], 0) / 6);

  const ctl = {
    display: 'inline-flex', alignItems: 'center', gap: 7, padding: '9px 14px',
    fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.08em',
    color: 'var(--text-body)', background: 'var(--surface-card)',
    border: '1px solid var(--border-default)', borderRadius: 'var(--radius-sm)',
    cursor: 'pointer', textTransform: 'uppercase',
    transition: 'border-color 180ms var(--ease-out), color 180ms var(--ease-out), transform 180ms var(--ease-out)'
  };

  const detail = [
    ['Objective', phase.objective],
    ['Inputs', phase.input],
    ['Decision / approval', phase.decision],
    ['Resulting record', phase.record]
  ];

  return /*#__PURE__*/React.createElement('div', null,
    /*#__PURE__*/React.createElement('section', {
      style: { maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'var(--space-8) var(--container-pad) 0' }
    },
      /*#__PURE__*/React.createElement(Eyebrow, null, 'Simulation Ground'),
      /*#__PURE__*/React.createElement('h1', {
        style: { fontSize: 'clamp(30px, 4.5vw, 46px)', lineHeight: 1.08, maxWidth: 780, marginTop: 16 }
      }, 'A controlled walkthrough of one cargo transfer.'),
      /*#__PURE__*/React.createElement('p', {
        style: { fontSize: 17.5, lineHeight: 1.65, color: 'var(--text-body)', maxWidth: 720, marginTop: 18 }
      }, 'This is the validation environment for the product — six operational phases of a single cargo transfer, each with its objective, inputs, the decision an operator makes, and the record it produces. It runs on configured scenario values, not field measurements, and it advances only when you advance it.'),
      /*#__PURE__*/React.createElement('div', { style: { marginTop: 24 } },
        /*#__PURE__*/React.createElement(DataStatus, { stamp: stamp })
      )
    ),

    /*#__PURE__*/React.createElement('section', {
      style: { maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'var(--space-8) var(--container-pad) 0' }
    },
      /* phase selector */
      /*#__PURE__*/React.createElement('div', {
        role: 'tablist', 'aria-label': 'Cargo transfer phases',
        className: 'freq-phase-rail',
        style: { display: 'grid', gridTemplateColumns: 'repeat(6, minmax(0, 1fr))', gap: 8 }
      }, PHASES.map((p, n) => /*#__PURE__*/React.createElement('button', {
        key: p.key, role: 'tab', id: 'phase-tab-' + p.key,
        'aria-selected': n === i, 'aria-controls': 'phase-panel',
        onClick: () => select(n),
        style: {
          display: 'flex', flexDirection: 'column', gap: 5, textAlign: 'left',
          padding: '12px 13px', cursor: 'pointer',
          // live blue only while the walkthrough is advancing; a paused selection is indigo
          background: n === i ? (playing ? 'rgba(56,189,248,0.08)' : 'rgba(99,102,241,0.10)') : 'var(--surface-card)',
          border: '1px solid ' + (n === i ? (playing ? 'var(--signal-live)' : 'var(--indigo)') : 'var(--border-default)'),
          borderRadius: 'var(--radius-sm)',
          transition: 'border-color 180ms var(--ease-out), background 180ms var(--ease-out)'
        }
      },
        /*#__PURE__*/React.createElement('span', {
          className: 'mono', style: { fontSize: 11, letterSpacing: '0.1em', color: n === i ? (playing ? 'var(--signal-live)' : 'var(--indigo-300)') : 'var(--text-faint)' }
        }, String(n + 1).padStart(2, '0')),
        /*#__PURE__*/React.createElement('span', {
          style: { fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 600, color: n === i ? 'var(--text-headline)' : 'var(--text-body)', lineHeight: 1.2 }
        }, p.short)
      ))),

      /* controls */
      /*#__PURE__*/React.createElement('div', {
        style: { display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginTop: 14 }
      },
        /*#__PURE__*/React.createElement(SpringPress, { onClick: () => select(i - 1), style: ctl, label: 'Previous phase' }, '← Previous'),
        /*#__PURE__*/React.createElement(SpringPress, { onClick: () => select(i + 1), style: ctl, label: 'Next phase' }, 'Next →'),
        /*#__PURE__*/React.createElement(SpringPress, { onClick: () => { setPlaying(false); setI(0); }, style: ctl, label: 'Reset to first phase' }, 'Reset'),
        /*#__PURE__*/React.createElement(SpringPress, {
          onClick: () => setPlaying(p => !p), pressed: playing,
          style: { ...ctl, borderColor: playing ? 'var(--signal-live)' : 'var(--border-default)', color: playing ? 'var(--signal-live)' : 'var(--text-body)' }
        }, playing ? 'Pause' : 'Play'),
        /*#__PURE__*/React.createElement('span', {
          className: 'mono', role: 'status',
          style: {
            display: 'inline-flex', alignItems: 'center', gap: 8, marginLeft: 4, padding: '6px 11px',
            fontSize: 11.5, letterSpacing: '0.1em', borderRadius: 'var(--radius-sm)',
            color: playing ? 'var(--signal-live)' : 'var(--text-muted)',
            border: '1px solid ' + (playing ? 'var(--signal-live)' : 'var(--border-default)'),
            background: playing ? 'rgba(56,189,248,0.08)' : 'transparent'
          }
        },
          /*#__PURE__*/React.createElement('span', {
            'aria-hidden': true,
            style: { width: 7, height: 7, borderRadius: 999, boxSizing: 'border-box', border: '1.5px solid currentColor', background: playing ? 'currentColor' : 'transparent' }
          }),
          playing ? 'ADVANCING · ONE PHASE EVERY 5 S' : 'INACTIVE · PAUSED — PRESS PLAY TO ADVANCE')
      ),

      /* stage + phase detail */
      /*#__PURE__*/React.createElement('div', {
        id: 'phase-panel', role: 'tabpanel', 'aria-labelledby': 'phase-tab-' + phase.key,
        className: 'freq-stage-grid',
        style: { display: 'grid', gridTemplateColumns: 'minmax(0, 1.35fr) minmax(0, 1fr)', gap: 24, marginTop: 20, alignItems: 'start' }
      },
        /*#__PURE__*/React.createElement(PhaseStage, { phase: phase, index: i, inspect: inspect, advancing: playing }),
        /*#__PURE__*/React.createElement('div', {
          style: { display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }
        },
          /*#__PURE__*/React.createElement('div', {
            style: { padding: '16px 18px', background: 'rgba(8,12,24,0.7)', borderBottom: '1px solid var(--border-faint)' }
          },
            /*#__PURE__*/React.createElement(KineticTitle, { text: phase.name, index: i }),
            phase.conditional && /*#__PURE__*/React.createElement('span', {
              className: 'mono',
              style: { display: 'inline-block', marginTop: 9, fontSize: 10.5, letterSpacing: '0.1em', color: 'var(--text-muted)', padding: '4px 8px', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-sm)' }
            }, 'CONDITIONAL · PERFORMED WHEN THE PLAN REQUIRES IT')
          ),
          detail.map(([k, v]) => /*#__PURE__*/React.createElement('div', {
            key: k,
            style: { padding: '14px 18px', borderTop: '1px solid var(--border-faint)', background: 'var(--surface-card)' }
          },
            /*#__PURE__*/React.createElement('span', {
              className: 'mono', style: { display: 'block', fontSize: 10.5, letterSpacing: '0.14em', color: 'var(--text-faint)', textTransform: 'uppercase' }
            }, k),
            /*#__PURE__*/React.createElement('span', {
              style: { display: 'block', fontSize: 15, lineHeight: 1.6, color: 'var(--text-body)', marginTop: 6 }
            }, v)
          ))
        )
      )
    ),

    /* measurement positions — separate from the phase rail */
    /*#__PURE__*/React.createElement('section', {
      style: { maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'var(--space-9) var(--container-pad) 0' }
    },
      /*#__PURE__*/React.createElement(Eyebrow, null, 'Measurement Positions'),
      /*#__PURE__*/React.createElement('h2', {
        style: { fontSize: 'clamp(24px, 3vw, 32px)', lineHeight: 1.15, maxWidth: 640, marginTop: 14 }
      }, 'Six positions on the hull — not the same thing as the six phases.'),
      /*#__PURE__*/React.createElement('p', {
        style: { fontSize: 16.5, lineHeight: 1.65, color: 'var(--text-body)', maxWidth: 680, marginTop: 14 }
      }, 'Draft is read at six fixed positions on the hull. Those readings are measured inputs. Mean draft, trim and list are calculated from them — they are not read anywhere.'),
      /*#__PURE__*/React.createElement('div', {
        className: 'freq-station-grid',
        style: { display: 'grid', gridTemplateColumns: 'repeat(6, minmax(0, 1fr))', gap: 8, marginTop: 22 }
      }, ST.order.map(k => /*#__PURE__*/React.createElement('div', {
        key: k,
        style: { padding: '13px 14px', background: 'var(--surface-card)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-sm)', display: 'flex', flexDirection: 'column', gap: 4 }
      },
        /*#__PURE__*/React.createElement('span', { className: 'mono', style: { fontSize: 11, letterSpacing: '0.12em', color: 'var(--signal-live)' } }, k),
        r[k] === null
          ? /*#__PURE__*/React.createElement('span', { className: 'mono', style: { fontSize: 15, color: 'var(--status-pending)' } }, '— missing')
          : /*#__PURE__*/React.createElement('span', { className: 'mono', style: { fontSize: 17, color: 'var(--text-headline)' } }, r[k].toFixed(2), /*#__PURE__*/React.createElement('span', { style: { fontSize: 11, color: 'var(--text-muted)' } }, ' ft')),
        /*#__PURE__*/React.createElement('span', { style: { fontSize: 11.5, color: 'var(--text-muted)', lineHeight: 1.35 } }, ST.labels[k])
      ))),
      /*#__PURE__*/React.createElement('div', {
        className: 'freq-calc-grid',
        style: { display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 8, marginTop: 8 }
      }, [
        ['Mean draft', mean.toFixed(2) + ' ft', 'Calculated from ' + basis],
        ['Trim (aft − fwd)', (trim >= 0 ? '+' : '') + trim.toFixed(2) + ' ft', 'Calculated from the fore and aft pairs'],
        ['List (stbd − port)', (list >= 0 ? '+' : '') + list.toFixed(2) + ' ft', 'Calculated from ' + basis]
      ].map(([k, v, n]) => /*#__PURE__*/React.createElement('div', {
        key: k,
        style: { padding: '13px 14px', background: 'rgba(8,12,24,0.62)', border: '1px dashed var(--border-default)', borderRadius: 'var(--radius-sm)', display: 'flex', flexDirection: 'column', gap: 4 }
      },
        /*#__PURE__*/React.createElement('span', { className: 'mono', style: { fontSize: 10.5, letterSpacing: '0.12em', color: 'var(--text-faint)', textTransform: 'uppercase' } }, k),
        /*#__PURE__*/React.createElement('span', { className: 'mono', style: { fontSize: 17, color: 'var(--text-headline)' } }, v),
        /*#__PURE__*/React.createElement('span', { style: { fontSize: 11.5, color: 'var(--text-muted)' } }, n)
      ))),
      /*#__PURE__*/React.createElement('div', {
        style: { display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginTop: 18 }
      },
        /*#__PURE__*/React.createElement(SpringPress, {
          onClick: () => setGap(v => !v), pressed: gap,
          style: { ...ctl, borderColor: gap ? 'var(--status-pending)' : 'var(--border-default)', color: gap ? 'var(--status-pending)' : 'var(--text-body)' },
          label: 'Preview missing-observation handling'
        }, gap ? 'Restore full set' : 'Preview missing data'),
        /*#__PURE__*/React.createElement('span', {
          className: 'mono', style: { fontSize: 11.5, letterSpacing: '0.06em', color: 'var(--text-muted)' }
        }, gap ? 'MP WITHHELD · REPORTED MISSING, NOT INTERPOLATED' : 'ALL SIX POSITIONS PRESENT')
      ),
      /*#__PURE__*/React.createElement('div', {
        style: { marginTop: 20, border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', background: 'var(--surface-card)', padding: '18px 18px 12px' }
      },
        /*#__PURE__*/React.createElement('div', {
          style: { display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }
        },
          /*#__PURE__*/React.createElement('span', {
            className: 'mono', style: { fontSize: 11, letterSpacing: '0.14em', color: 'var(--text-faint)', textTransform: 'uppercase' }
          }, 'Mean draft by phase · ft'),
          /*#__PURE__*/React.createElement('span', {
            className: 'mono', style: { fontSize: 11, letterSpacing: '0.08em', color: 'var(--text-muted)' }
          }, 'ILLUSTRATIVE · CONFIGURED SCENARIO · ' + stamp)
        ),
        /*#__PURE__*/React.createElement('svg', {
          viewBox: '0 0 600 150', role: 'img',
          'aria-label': 'Mean draft across the six phases, from ' + series[0].toFixed(2) + ' to ' + series[5].toFixed(2) + ' feet. Illustrative configured values.',
          style: { width: '100%', height: 'auto', marginTop: 12, display: 'block', overflow: 'visible' }
        },
          [0, 0.5, 1].map(t => /*#__PURE__*/React.createElement('line', {
            key: t, x1: 0, x2: 600, y1: 12 + t * 96, y2: 12 + t * 96,
            stroke: 'var(--border-faint)', strokeWidth: 1
          })),
          /*#__PURE__*/React.createElement('polyline', {
            fill: 'none', stroke: 'var(--indigo)', strokeWidth: 2,
            points: series.map((v, n) => {
              const lo = Math.min.apply(null, series), hi = Math.max.apply(null, series);
              const x = 24 + n * 110;
              const y = 108 - ((v - lo) / (hi - lo || 1)) * 96;
              return x + ',' + y;
            }).join(' ')
          }),
          series.map((v, n) => {
            const lo = Math.min.apply(null, series), hi = Math.max.apply(null, series);
            const x = 24 + n * 110;
            const y = 108 - ((v - lo) / (hi - lo || 1)) * 96;
            const on = n === i;
            return /*#__PURE__*/React.createElement('g', { key: n },
              /*#__PURE__*/React.createElement('circle', {
                cx: x, cy: y, r: on ? 5.5 : 3.5,
                fill: on ? 'var(--signal-live)' : 'var(--bg-page)',
                stroke: on ? 'var(--signal-live)' : 'var(--indigo)', strokeWidth: 1.5
              }),
              /*#__PURE__*/React.createElement('text', {
                x: x, y: 132, textAnchor: 'middle', className: 'mono',
                style: { fontSize: 11, fill: on ? 'var(--text-strong)' : 'var(--text-faint)' }
              }, String(n + 1).padStart(2, '0')),
              on && /*#__PURE__*/React.createElement('text', {
                x: x, y: y - 12, textAnchor: 'middle', className: 'mono',
                style: { fontSize: 11, fill: 'var(--signal-live)' }
              }, v.toFixed(2))
            );
          })
        )
      ),
      /*#__PURE__*/React.createElement('p', {
        className: 'mono',
        style: { fontSize: 11.5, letterSpacing: '0.05em', color: 'var(--text-faint)', marginTop: 14 }
      }, 'Vessel configuration held as supplied: ' + window.FREQ.BARGE.id + ' · ' + window.FREQ.BARGE.length + ' × ' + window.FREQ.BARGE.beam + '. Scenario values are illustrative.')
    ),

    /*#__PURE__*/React.createElement(window.CapabilityInventory, null)
  );
}
window.SimulationGround = SimulationGround;

/* ---- Honest capability inventory. Replaces the old motion-vocabulary showcase. ---- */
function CapabilityInventory() {
  const { Eyebrow } = window.FREQAIDesignSystem_019dc6;
  const rows = [
    { t: 'State-driven interaction', s: 'in', d: 'One phase index drives the scene, the annotations, the phase record and the readings. Phase tabs, previous/next/reset and play/pause are the only inputs that change it; default is paused and a manual selection always pauses, so there is no autonomous restart.' },
    { t: 'Physics-based micro-interactions', s: 'in', d: 'Controls run on a critically damped spring integrator (damping ratio 1.0, mass 1): the press response reaches its target and stops, with no overshoot and therefore no bounce. The loop halts on settle rather than running continuously, and is a no-op under reduced motion.' },
    { t: 'Multi-axis parallax inspection', s: 'in', d: 'Two bounded axes inside the simulation viewer only: pointer position, and the viewer’s own position in the viewport as you scroll. Both are clamped to a few per cent of frame, never move page scroll or reading position, and are disabled under reduced motion and below 900px. This is a 2.5D depth warp of a photographic plate, not a 3D asset.' },
    { t: 'Telemetry mapping', s: 'in', d: 'Readings drive the station cards, the calculated figures and the mean-draft chart, all carrying mode (illustrative), source (configured scenario), units and scenario timestamp. Missing-observation handling is implemented and can be previewed: a withheld position is reported missing rather than interpolated, and the calculated figures recompute from the reduced set and say so. No value is animated to look live.' },
    { t: 'Kinetic typography', s: 'in', d: 'A user-triggered response on the variable weight axis of Space Grotesk (wght 300–700), fired when the operator changes phase and settled on the same spring. Layout is stable by construction: the block reserves its height, the line does not re-wrap, and font synthesis is off. Nothing stretches or animates on its own.' },
    { t: 'Ambient occlusion', s: 'part', d: 'Not implemented. The plates carry only the lighting baked into the supplied renders. No CSS shadow is presented as AO; real AO needs a rendered 3D scene (for example three.js GTAOPass) or baked AO maps shipped with a model.' },
    { t: 'Geospatial digital twin', s: 'out', d: 'Needs a georeferenced terminal model with real coordinates, asset provenance and attribution. Not supplied. The harbour plates are illustrative and labelled illustrative.' },
    { t: 'Gaussian splatting', s: 'out', d: 'Needs an actual splat dataset and a supporting renderer with level-of-detail handling. Not supplied. A warped image is not a splat and is not described as one here.' },
    { t: 'Real-world scale topology', s: 'out', d: 'Needs model units and verified dimensions so vessel and crane hold their dimensional relationship. Vessel particulars exist as supplied text, which does not establish geometric scale.' },
    { t: 'Rigged articulation / motion capture', s: 'out', d: 'Needs a rigged crane model to drive joint limits. Capture data would be required before any motion-capture claim, and a joint rig alone would not be one. Neither supplied.' }
  ];
  const badge = s => ({
    in:   { t: 'Implemented',     c: 'var(--signal-live)' },
    part: { t: 'Not implemented', c: 'var(--text-muted)' },
    out:  { t: 'Needs asset',     c: 'var(--text-muted)' }
  }[s]);
  return /*#__PURE__*/React.createElement('section', {
    style: { maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'var(--space-9) var(--container-pad) 0' }
  },
    /*#__PURE__*/React.createElement(Eyebrow, null, 'Capability Inventory'),
    /*#__PURE__*/React.createElement('h2', {
      style: { fontSize: 'clamp(24px, 3vw, 32px)', lineHeight: 1.15, maxWidth: 640, marginTop: 14 }
    }, 'What this build actually does.'),
    /*#__PURE__*/React.createElement('p', {
      style: { fontSize: 16.5, lineHeight: 1.65, color: 'var(--text-body)', maxWidth: 680, marginTop: 14 }
    }, 'Techniques are listed here only where they are implemented, and named as unavailable where the underlying asset does not exist. Nothing is described as a capability on the strength of a visual approximation.'),
    /*#__PURE__*/React.createElement('div', {
      style: { marginTop: 22, border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }
    }, rows.map((r, n) => /*#__PURE__*/React.createElement('div', {
      key: r.t,
      className: 'freq-cap-row',
      style: {
        display: 'grid', gridTemplateColumns: 'minmax(0, 0.8fr) 132px minmax(0, 1.6fr)', gap: 16,
        padding: '15px 18px', background: 'var(--surface-card)',
        borderTop: n === 0 ? 'none' : '1px solid var(--border-faint)', alignItems: 'start'
      }
    },
      /*#__PURE__*/React.createElement('span', {
        style: { fontFamily: 'var(--font-display)', fontSize: 15.5, fontWeight: 600, color: 'var(--text-headline)', lineHeight: 1.3 }
      }, r.t),
      /*#__PURE__*/React.createElement('span', {
        className: 'mono',
        style: { fontSize: 10.5, letterSpacing: '0.1em', color: badge(r.s).c, textTransform: 'uppercase', paddingTop: 3 }
      }, badge(r.s).t),
      /*#__PURE__*/React.createElement('span', {
        style: { fontSize: 14.5, lineHeight: 1.6, color: 'var(--text-body)' }
      }, r.d)
    )))
  );
}
window.CapabilityInventory = CapabilityInventory;
