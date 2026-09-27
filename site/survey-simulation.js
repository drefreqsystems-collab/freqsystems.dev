/* Frequency Systems — Survey simulation: the six-phase survey design.
 * Brought in verbatim from the freqarena build (SimulationPage.jsx in app.prod.js?v=3) at the
 * owner's request. Two edits only: renamed SimulationPage -> SurveySimulation, and the trailing
 * MotionSystem showcase is not mounted (this build replaced it with the Capability Inventory).
 *
 * It reuses what this build already ships: Stage, PhaseScene, RunProgress, HeroMark and Icon
 * (app.prod.js), the design-system PhaseButton / TelemetryStat / StatusBadge (_ds_bundle.js) and
 * the locked phase table (data.js). Load after simulation-ground.js and before app.prod.js.
 */
// Frequency Systems — SIMULATION. The ONLY page with motion.
// State-driven phase rail · telemetry data mapping · kinetic typography · physics pause button.
function SurveySimulation() {
  const {
    Eyebrow,
    PhaseButton,
    TelemetryStat,
    StatusBadge
  } = window.FREQAIDesignSystem_019dc6;
  const {
    PHASES,
    BARGE
  } = window.FREQ;
  // Start at pre-survey; calm by default (paused). Each phase animates its own
  // operation regardless of play state — pressing play walks the full run.
  const [active, setActive] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);

  // Optional walk-through of the six locked phases when the run is playing.
  React.useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => setActive(a => (a + 1) % PHASES.length), 3600);
    return () => clearTimeout(t);
  }, [active, playing]);
  const phase = PHASES[active];
  function stateOf(i) {
    if (i === active) return 'live';
    if (i < active) return 'done';
    return 'queued';
  }
  function togglePlay() {
    setPressed(true);
    setTimeout(() => setPressed(false), 220);
    setPlaying(p => !p);
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--space-8) var(--container-pad) 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "freq-enter freq-sim-intro",
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    live: true
  }, "Simulation Ground"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'clamp(30px, 4.5vw, 46px)',
      marginTop: 18,
      maxWidth: 760
    }
  }, "Six locked phases. Live proof surface."), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-body)',
      fontSize: 17,
      lineHeight: 1.6,
      maxWidth: 680,
      marginTop: 18
    }
  }, "The simulation ground is the proof surface. Each phase orchestrates the LiDAR sweep, crane geometry, hold fill, draft, and trim — driven by a single state engine, not placeholder labels.")), /*#__PURE__*/React.createElement(HeroMark, {
    variant: "emblem",
    size: 150
  })), /*#__PURE__*/React.createElement("div", {
    className: "freq-enter",
    style: {
      animationDelay: '90ms',
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    "aria-label": "Survey phases",
    style: {
      display: 'flex',
      gap: 10,
      flexWrap: 'wrap'
    }
  }, PHASES.map((p, i) => /*#__PURE__*/React.createElement(PhaseButton, {
    key: p.name,
    index: i + 1,
    name: p.name,
    state: stateOf(i),
    onClick: () => {
      setActive(i);
      setPlaying(false);
    }
  }))), /*#__PURE__*/React.createElement(RunProgress, {
    index: active,
    total: PHASES.length,
    playing: playing
  })), /*#__PURE__*/React.createElement("div", {
    className: "freq-enter freq-sim-grid",
    style: {
      animationDelay: '180ms',
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 1.55fr) minmax(280px, 1fr)',
      gap: 18,
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Stage, {
    phase: phase,
    index: active,
    total: PHASES.length
  }), /*#__PURE__*/React.createElement("div", {
    key: active,
    className: "freq-kinetic",
    role: "status",
    "aria-live": "polite",
    style: {
      marginTop: 14,
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12,
      background: 'var(--surface-card)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-md)',
      padding: '14px 18px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 12,
      color: 'var(--signal-live)',
      letterSpacing: '0.08em',
      paddingTop: 2,
      flex: 'none'
    }
  }, String(active + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 16,
      fontWeight: 600,
      color: 'var(--text-headline)',
      marginBottom: 4
    }
  }, phase.name), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      lineHeight: 1.55,
      color: 'var(--text-body)'
    }
  }, phase.op)))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-lg)',
      padding: 22,
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Telemetry"), /*#__PURE__*/React.createElement(StatusBadge, {
    status: "live"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(TelemetryStat, {
    label: "Phase",
    value: /*#__PURE__*/React.createElement("span", {
      key: active,
      className: "freq-accent"
    }, String(active + 1)),
    unit: "/ 06"
  }), /*#__PURE__*/React.createElement(TelemetryStat, {
    label: "Draft",
    value: /*#__PURE__*/React.createElement("span", {
      key: active,
      className: "freq-accent"
    }, phase.draft),
    unit: "ft"
  }), /*#__PURE__*/React.createElement(TelemetryStat, {
    label: "List",
    value: /*#__PURE__*/React.createElement("span", {
      key: active,
      className: "freq-accent"
    }, phase.list),
    unit: "\xB0"
  }), /*#__PURE__*/React.createElement(TelemetryStat, {
    label: "Hold Fill",
    value: /*#__PURE__*/React.createElement("span", {
      key: active,
      className: "freq-accent"
    }, phase.fill),
    unit: "%"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: 'var(--border-faint)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, [['LiDAR', phase.lidar], ['Crane', phase.crane], ['Stability', phase.stability]].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "freq-eyebrow"
  }, k), /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 13,
      color: 'var(--text-strong)'
    }
  }, v)))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: 'var(--border-faint)'
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: togglePlay,
    "aria-pressed": playing,
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 9,
      height: 46,
      borderRadius: 'var(--radius-md)',
      cursor: 'pointer',
      background: 'var(--surface-raised)',
      border: '1px solid var(--indigo)',
      color: 'var(--text-headline)',
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      fontWeight: 600,
      transform: pressed ? 'scale(0.94)' : 'scale(1)',
      transition: 'transform var(--dur-base) var(--ease-spring), background var(--dur-fast)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: playing ? 'pause' : 'play',
    size: 16
  }), playing ? 'Pause run' : 'Resume run'), /*#__PURE__*/React.createElement("p", {
    className: "mono",
    style: {
      fontSize: 11,
      color: 'var(--text-faint)',
      lineHeight: 1.5
    }
  }, BARGE.id, " \xB7 ", BARGE.length, " \xD7 ", BARGE.beam, " \xB7 run ", BARGE.runtime, " min \xB7 accuracy ", BARGE.accuracy, " ft"))));
}
window.SurveySimulation = SurveySimulation;


/* Simulation page = two views of the same six locked phases, switched in client state (no router,
 * matching the rest of the site). The survey view is the default; the operator-driven walkthrough
 * with the <harbor-stage> model is the original simulation-ground.js page, mounted unchanged. */
(function () {
  var Walkthrough = window.SimulationGround;
  if (!Walkthrough || !window.React) return;
  var VIEWS = [
    { key: 'survey', label: '6-phase survey' },
    { key: 'walkthrough', label: 'Operation walkthrough' }
  ];
  // PhaseButton sets flex: 1 inline, so six buttons share one row at every width and the state
  // badge overruns below ~870px. Tablets get three per row, phones two; desktop keeps six across.
  var SURVEY_CSS =
    '@media (max-width: 1024px) { [role="tablist"][aria-label="Survey phases"] > button { flex: 1 1 calc(33.333% - 7px) !important; } }' +
    '@media (max-width: 560px) { [role="tablist"][aria-label="Survey phases"] > button { flex: 1 1 calc(50% - 5px) !important; } }';
  function SimulationHub() {
    var st = React.useState('survey');
    var view = st[0], setView = st[1];
    var tab = function (v) {
      var on = v.key === view;
      return /*#__PURE__*/React.createElement('button', {
        key: v.key, type: 'button', role: 'tab', id: 'sim-view-' + v.key,
        'aria-selected': on, 'aria-controls': 'sim-view-panel',
        onClick: function () { setView(v.key); },
        style: {
          height: 44, padding: '0 18px', borderRadius: 'var(--radius-sm)', cursor: 'pointer',
          fontFamily: 'var(--font-mono)', fontSize: 11.5, letterSpacing: '0.12em', textTransform: 'uppercase',
          color: on ? 'var(--text-headline)' : 'var(--text-muted)',
          background: on ? 'var(--surface-raised)' : 'transparent',
          border: '1px solid ' + (on ? 'var(--indigo)' : 'transparent'),
          transition: 'border-color var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard)'
        }
      }, v.label);
    };
    return /*#__PURE__*/React.createElement(React.Fragment, null,
      /*#__PURE__*/React.createElement('style', null, SURVEY_CSS),
      /*#__PURE__*/React.createElement('div', {
        style: { maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'var(--space-6) var(--container-pad) 0' }
      },
        /*#__PURE__*/React.createElement('div', {
          role: 'tablist', 'aria-label': 'Simulation views',
          style: {
            display: 'inline-flex', gap: 4, padding: 4, flexWrap: 'wrap',
            border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', background: 'var(--surface-card)'
          }
        }, VIEWS.map(tab))
      ),
      /*#__PURE__*/React.createElement('div', { id: 'sim-view-panel', role: 'tabpanel', 'aria-labelledby': 'sim-view-' + view },
        view === 'survey'
          ? /*#__PURE__*/React.createElement(SurveySimulation, null)
          : /*#__PURE__*/React.createElement(Walkthrough, null)
      )
    );
  }
  window.SimulationHub = SimulationHub;
  window.SimulationGround = SimulationHub;
})();
