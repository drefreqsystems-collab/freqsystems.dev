/* FREQUENCY Systems — Home hero (home-hero.js)
 * The live 3D transfer is the page's primary experience. <harbor-motion> (harbor-motion.js) fills
 * the hero: a pedestal crane's clamshell grab works aggregate from the stockpile into BARGE-402's
 * holds. The copy sits over the dark river on the left; the HUD reads the model's own cargo ledger,
 * so every number on it is what the scene is showing at that moment. The step-by-step walkthrough
 * stays on the Simulation page. */
(function () {
  const h = React.createElement;
  const fmt = n => (n == null ? '—' : Math.round(n).toLocaleString('en-US'));
  const HOLDS = [['aft', 'AFT'], ['midship', 'MID'], ['forward', 'FWD']];  // stern → bow, as the scene reads left to right

  function Row({ k, v, strong }) {
    return h('div', { className: 'freq-mh-row' },
      h('span', null, k),
      h('span', { style: { color: strong ? 'var(--white)' : 'var(--text-strong)' } }, v));
  }

  function LedgerHud({ st, failed }) {
    if (failed) {
      return h('div', { className: 'freq-mh-hud' },
        h('div', { className: 'freq-mh-hud-head' }, h('span', null, 'BARGE-402 · SCENARIO'), h('span', null, 'ILLUSTRATIVE')),
        h('p', { className: 'freq-mh-hud-note' }, 'The 3D model needs WebGL, which this browser did not provide. 900 t in six grab cycles of 150 t: aft, aft, midship, midship, forward, forward. Final mean draft 12.45 ft.'));
    }
    const s = st || {};
    const pct = v => Math.max(0, Math.min(100, (v || 0) / 300 * 100));
    return h('div', { className: 'freq-mh-hud', 'aria-label': 'Live cargo ledger from the 3D model' },
      h('div', { className: 'freq-mh-hud-head' },
        h('span', { style: { display: 'inline-flex', alignItems: 'center', gap: 7 } },
          h('span', { 'aria-hidden': true, className: 'freq-mh-dot' + (s.running ? ' is-on' : '') }),
          'LIVE MODEL · BARGE-402'),
        h('span', null, 'ILLUSTRATIVE')),
      h('div', { className: 'freq-mh-status' },
        h('span', { className: 'freq-mh-cycle' }, s.cycle ? `CYCLE ${String(s.cycle).padStart(2, '0')}/${String(s.cycles).padStart(2, '0')}` : 'CYCLE —'),
        h('span', { className: 'freq-mh-label' }, s.label || 'Loading the model…')),
      h('div', { className: 'freq-mh-rows' },
        h(Row, { k: 'Remaining to load', v: `${fmt(s.stockpile)} t` }),
        h(Row, { k: 'In grab · falling', v: `${fmt(s.inGrab)} · ${fmt(s.falling)} t` }),
        h(Row, { k: 'Aboard', v: `${fmt(s.aboard)} of ${fmt(s.total || 900)} t`, strong: true })),
      h('div', { className: 'freq-mh-holds' }, HOLDS.map(([key, lab]) => {
        const v = s.holds ? s.holds[key] : 0;
        return h('div', { key, className: 'freq-mh-hold' },
          h('div', { className: 'freq-mh-hold-k' }, h('span', null, lab), h('span', null, `${fmt(v)} t`)),
          h('div', { className: 'freq-mh-track' }, h('div', { className: 'freq-mh-fill' + (s.hold === key && s.seg && /release|settle|carry|spot/.test(s.seg) ? ' is-target' : ''), style: { width: pct(v) + '%' } })));
      })),
      h('div', { className: 'freq-mh-foot' },
        h('span', null, 'Mean draft ', h('b', null, s.mean ? s.mean.toFixed(2) : '—'), ' ft'),
        h('span', null, 'Trim ', h('b', null, s.trim != null ? (s.trim >= 0 ? '+' : '') + s.trim.toFixed(2) : '—'), ' ft')),
      h('div', { className: 'freq-mh-ledger' }, s.conserved === false ? 'LEDGER CHECK FAILED' : 'LEDGER BALANCED · 900 t ACCOUNTED FOR IN EVERY FRAME'));
  }

  function HarborHero({ onNav }) {
    const { Button, Eyebrow } = window.FREQAIDesignSystem_019dc6;
    const Icon = window.Icon;
    const stageRef = React.useRef(null);
    const reduced = React.useMemo(() => !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches), []);
    const [st, setSt] = React.useState(null);
    const [failed, setFailed] = React.useState(false);
    const [running, setRunning] = React.useState(!reduced);
    const [explore, setExplore] = React.useState(false);

    React.useEffect(() => {
      const el = stageRef.current;
      if (!el) return undefined;
      const onState = e => { setSt(e.detail); setRunning(!!e.detail.running); };
      const onFail = () => setFailed(true);
      el.addEventListener('hmstate', onState);
      el.addEventListener('hmfail', onFail);
      // module blocked or never loaded: fall back to the still plate
      const t = setTimeout(() => { if (!window.customElements || !window.customElements.get('harbor-motion')) setFailed(true); }, 12000);
      return () => { el.removeEventListener('hmstate', onState); el.removeEventListener('hmfail', onFail); clearTimeout(t); };
    }, []);

    const toggle = () => { const el = stageRef.current; if (el && el.toggle) el.toggle(); };
    const onKey = e => {
      if (!explore) return;
      const el = stageRef.current; if (!el || !el.nudge) return;
      const m = { ArrowLeft: [0.12, 0, 0], ArrowRight: [-0.12, 0, 0], ArrowUp: [0, 0.08, 0], ArrowDown: [0, -0.08, 0], '+': [0, 0, -0.08], '=': [0, 0, -0.08], '-': [0, 0, 0.08] }[e.key];
      if (m) { e.preventDefault(); el.nudge(m[0], m[1], m[2]); }
      if (e.key === 'Escape') setExplore(false);
    };

    return h('section', {
      className: 'freq-mh' + (explore ? ' is-explore' : ''),
      'aria-label': 'Live 3D model of one cargo transfer',
      onKeyDown: onKey
    },
      h('div', { className: 'freq-mh-stage' },
        failed
          ? h('img', { className: 'freq-mh-fallback', src: window.freqImg('investor-hero.jpg'), alt: '' })
          : h('harbor-motion', {
              ref: stageRef,
              role: 'img',
              'aria-label': 'Live 3D model at a river terminal at night: a pedestal crane’s clamshell grab bites aggregate out of the stockpile, slews, and pours it into the holds of BARGE-402, which settles as the load lands. Illustrative scenario values.',
              reduced: reduced ? '1' : undefined,
              paused: reduced ? '1' : undefined,
              explore: explore ? '1' : '0'
            }),
        h('div', { className: 'freq-mh-scrim', 'aria-hidden': true }),
        explore && h('div', { className: 'freq-mh-hint mono', 'aria-hidden': true }, 'DRAG TO ORBIT · SCROLL TO ZOOM · ESC TO EXIT')),
      h('div', { className: 'freq-mh-content' },
        h('div', { className: 'freq-mh-copy freq-enter', 'aria-hidden': explore ? true : undefined },
          h(Eyebrow, { live: true }, 'Inland waterways · Cargo execution layer'),
          h('h1', { style: { fontSize: 'clamp(38px, 5vw, 62px)', lineHeight: 1.03, maxWidth: 580, marginTop: 20 } }, 'Cargo decisions, grounded in vessel state.'),
          h('p', { style: { fontSize: 'clamp(16px, 1.35vw, 18.5px)', lineHeight: 1.62, color: 'var(--text-body)', maxWidth: 500, marginTop: 20 } },
            'FREQUENCY Systems is a maritime operational intelligence company building the autonomous cargo execution layer for U.S. inland waterways. Initial focus: one terminal and one cargo-transfer workflow.'),
          h('div', { style: { display: 'flex', gap: 12, marginTop: 30, flexWrap: 'wrap' } },
            h(Button, { variant: 'primary', size: 'lg', onClick: () => setExplore(true), iconLeft: Icon ? h(Icon, { name: 'move-3d', size: 18 }) : null }, 'Explore the 3D stage'),
            h(Button, { variant: 'secondary', size: 'lg', onClick: () => onNav('investor') }, 'Investor Brief')),
          h('button', { type: 'button', className: 'freq-mh-link', onClick: () => onNav('simulation') }, 'Step through the transfer on the Simulation page →'),
          h('div', { className: 'freq-mh-strip mono' },
            h('span', { 'aria-hidden': true, className: 'freq-mh-rule' }),
            'Inland terminal ', h('i', null, '·'), ' Mississippi River ', h('i', null, '·'), ' BARGE-402 ', h('i', null, '·'), ' Live'))),
      h('div', { className: 'freq-mh-bottom' },
        h('div', { className: 'freq-mh-bar' },
          h('div', { className: 'freq-mh-controls' },
            !failed && h(Button, {
              variant: 'secondary', size: 'sm', onClick: toggle, 'aria-pressed': !running,
              iconLeft: Icon ? h(Icon, { name: running ? 'pause' : 'play', size: 15 }) : null
            }, running ? 'Pause' : 'Play'),
            !failed && h(Button, {
              variant: 'secondary', size: 'sm', onClick: () => setExplore(v => !v), 'aria-pressed': explore,
              iconLeft: Icon ? h(Icon, { name: explore ? 'x' : 'move-3d', size: 15 }) : null
            }, explore ? 'Exit 3D view' : 'Explore'),
            h('span', { className: 'freq-mh-caption mono' }, reduced && !running ? 'Paused · reduced motion' : 'Illustrative model · configured scenario')),
          h(LedgerHud, { st, failed }))));
  }

  window.HarborHero = HarborHero;
})();
