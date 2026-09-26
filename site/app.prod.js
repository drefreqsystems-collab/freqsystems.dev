// Frequency Systems — production bundle (pre-transpiled from JSX; no in-browser Babel).
/* ==== Wordmark.jsx ==== */
// Frequency Systems — Wordmark (typographic logotype). See assets/README.md.
function Wordmark({
  live = false,
  height = 22
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 9,
      height
    }
  }, live && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: '999px',
      background: 'var(--signal-live)',
      boxShadow: 'var(--glow-live-dot)',
      animation: 'freqPulse 2s var(--ease-standard) infinite',
      flex: 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: height,
      letterSpacing: '-0.01em',
      color: 'var(--white)',
      lineHeight: 1
    }
  }, "Frequency"), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 1,
      height: height * 0.72,
      background: 'var(--indigo)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 500,
      fontSize: height * 0.62,
      letterSpacing: '0.12em',
      color: 'var(--gray-300)',
      lineHeight: 1
    }
  }, "SYSTEMS"));
}
window.Wordmark = Wordmark;

/* ==== Icon.jsx ==== */
// Frequency Systems — Lucide icon helper. Renders an <i data-lucide>; App calls
// window.lucide.createIcons() after each render to swap in the SVG.
function Icon({
  name,
  size = 24,
  color = 'currentColor',
  strokeWidth = 1.75,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("i", {
    "data-lucide": name,
    style: {
      width: size,
      height: size,
      color,
      display: 'inline-flex',
      ...style
    },
    "data-stroke": strokeWidth
  });
}
window.Icon = Icon;

/* ==== HeroMark.jsx ==== */
// Frequency Systems — HeroMark. Sophisticated, professional placements of the official
// brand mark (assets/freq-brand-logo.png) in page heroes.
//  - variant="ambient": large orbital-core field feathered into Dark Matter (Home).
//  - variant="emblem":  refined circular brand emblem accent (subpages).
function HeroMark({
  variant = 'emblem',
  size = 156,
  offset = {
    x: 0,
    y: 0
  },
  style = {}
}) {
  const src = window.freqImg('freq-emblem.jpg');
  if (variant === 'ambient') {
    // Flagship hero composite: the orbital core blazes on the right, feathered into
    // Dark Matter under the headline column. Cinematic exposure + vignette + a faint
    // electric rim give it edge. Light multi-axis parallax drift only.
    const hero = window.freqImg('brand-poster.jpg');
    return /*#__PURE__*/React.createElement("div", {
      className: "freq-hero-amb",
      "aria-hidden": true,
      style: {
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        ...style
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "freq-hero-amb-img",
      style: {
        position: 'absolute',
        inset: '-3%',
        transform: `translate(${offset.x * 16}px, ${offset.y * 16}px) scale(1.06)`,
        backgroundImage: `url(${hero})`,
        backgroundSize: 'cover',
        backgroundPosition: '62% 44%',
        transition: 'transform 300ms var(--ease-out)'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: '8%',
        right: '6%',
        width: '52%',
        height: '84%',
        background: 'radial-gradient(closest-side, rgba(56,189,248,0.20), rgba(139,92,246,0.10) 56%, transparent 76%)',
        transform: `translate(${offset.x * 26}px, ${offset.y * 26}px)`,
        transition: 'transform 260ms var(--ease-out)'
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "freq-hero-amb-x",
      style: {
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(90deg, var(--bg-page) 17%, rgba(8,12,24,0.66) 39%, rgba(8,12,24,0.10) 66%, transparent 82%)'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, var(--bg-page) 0.5%, transparent 16%, transparent 78%, var(--bg-page))'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 2,
        background: 'linear-gradient(90deg, transparent, rgba(56,189,248,0.35) 60%, rgba(56,189,248,0.12))'
      }
    }));
  }

  // emblem — circular brand crop, indigo hairline ring + faint live-edge halo
  return /*#__PURE__*/React.createElement("div", {
    className: "freq-emblem",
    style: {
      position: 'relative',
      width: size,
      height: size,
      flex: 'none',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: '50%',
      backgroundImage: `url(${src})`,
      backgroundSize: 'cover',
      backgroundPosition: '50% 50%',
      border: '1px solid var(--indigo-line)',
      boxShadow: 'inset 0 0 26px rgba(0,0,0,0.55)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      inset: -7,
      borderRadius: '50%',
      border: '1px solid var(--border-faint)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      inset: -1,
      borderRadius: '50%',
      boxShadow: '0 0 34px -8px rgba(56,189,248,0.30)',
      pointerEvents: 'none'
    }
  }));
}
window.HeroMark = HeroMark;

/* ==== Header.jsx ==== */
// Frequency Systems — Site header. Sticky, blur over hero only. No motion.
function Header({
  page,
  onNav
}) {
  const links = [{
    id: 'home',
    label: 'Home'
  }, {
    id: 'simulation',
    label: 'Simulation'
  }, {
    id: 'architecture',
    label: 'Architecture'
  }, {
    id: 'investor',
    label: 'Investor'
  }, {
    id: 'contact',
    label: 'Contact'
  }];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(8,12,24,0.72)',
      backdropFilter: 'var(--blur-panel)',
      WebkitBackdropFilter: 'var(--blur-panel)',
      borderBottom: '1px solid var(--border-faint)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '0 var(--container-pad)',
      height: 64,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onNav('home'),
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(Wordmark, null)), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4
    }
  }, links.map(l => /*#__PURE__*/React.createElement("button", {
    key: l.id,
    onClick: () => onNav(l.id),
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      fontWeight: 500,
      padding: '8px 14px',
      borderRadius: 'var(--radius-sm)',
      color: page === l.id ? 'var(--text-headline)' : 'var(--text-muted)',
      transition: 'color var(--dur-fast) var(--ease-standard)'
    }
  }, l.label)))));
}
window.Header = Header;

/* ==== Footer.jsx ==== */
// Frequency Systems — Site footer. Locked email, no motion.
function Footer({
  onNav
}) {
  const {
    EMAIL
  } = window.FREQ;
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      borderTop: '1px solid var(--border-faint)',
      marginTop: 'var(--space-10)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--space-7) var(--container-pad)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      gap: 24,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Wordmark, null), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-muted)',
      fontSize: 13,
      maxWidth: 320
    }
  }, "Maritime operational intelligence for U.S. inland waterways.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      alignItems: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "freq-eyebrow"
  }, "Contact"), /*#__PURE__*/React.createElement("a", {
    href: `mailto:${EMAIL}`,
    className: "mono",
    style: {
      color: 'var(--text-body)',
      fontSize: 13
    }
  }, EMAIL), /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      color: 'var(--text-faint)',
      fontSize: 11,
      marginTop: 4
    }
  }, "freqsystems.dev \xB7 \xA9 2026 Frequency Systems"))));
}
window.Footer = Footer;

/* ==== Stage.jsx ==== */
// Frequency Systems — Simulation Stage. The instrument frame around the live per-phase
// holographic scene (PhaseScene). Corner brackets, a live caption strip, and a
// "hover to probe" scan. Each phase animates its own operation.
function Stage({
  phase,
  index,
  total
}) {
  const [hover, setHover] = React.useState(false);
  const corner = pos => {
    const base = {
      position: 'absolute',
      width: 26,
      height: 26,
      borderColor: 'var(--signal-live)',
      opacity: 0.7,
      pointerEvents: 'none'
    };
    const map = {
      tl: {
        top: 12,
        left: 12,
        borderTop: '1px solid',
        borderLeft: '1px solid'
      },
      tr: {
        top: 12,
        right: 12,
        borderTop: '1px solid',
        borderRight: '1px solid'
      },
      bl: {
        bottom: 12,
        left: 12,
        borderBottom: '1px solid',
        borderLeft: '1px solid'
      },
      br: {
        bottom: 12,
        right: 12,
        borderBottom: '1px solid',
        borderRight: '1px solid'
      }
    };
    return /*#__PURE__*/React.createElement("span", {
      "aria-hidden": true,
      style: {
        ...base,
        ...map[pos]
      }
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: 'relative',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      border: '1px solid var(--indigo-line)',
      background: '#05080F',
      boxShadow: hover ? '0 0 0 1px var(--live-glow), 0 24px 60px -30px rgba(0,0,0,0.9)' : 'var(--shadow-raised)',
      transition: 'box-shadow var(--dur-base) var(--ease-standard)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement(PhaseScene, {
    key: index,
    phase: phase,
    index: index
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      background: 'linear-gradient(180deg, rgba(8,12,24,0.20), transparent 18%, transparent 86%, rgba(8,12,24,0.35))'
    }
  }), corner('tl'), corner('tr'), corner('bl'), corner('br'), hover && /*#__PURE__*/React.createElement("div", {
    className: "freq-probe",
    "aria-hidden": true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      flexWrap: 'wrap',
      borderTop: '1px solid var(--border-faint)',
      padding: '13px 20px',
      background: 'rgba(8,12,24,0.55)',
      backdropFilter: 'blur(4px)',
      WebkitBackdropFilter: 'blur(4px)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 12,
      letterSpacing: '0.14em',
      color: 'var(--text-muted)',
      textTransform: 'uppercase'
    }
  }, "Live scan \xB7 Phase ", String(index + 1).padStart(2, '0'), " / ", String(total).padStart(2, '0'), " \xB7 ", phase.name, " \xB7 Scale 1:500 \xB7", ' ', /*#__PURE__*/React.createElement("span", {
    style: {
      color: hover ? 'var(--signal-live)' : 'var(--text-faint)',
      transition: 'color var(--dur-base)'
    }
  }, "Hover to probe"))));
}
window.Stage = Stage;

/* ==== PhaseScene.jsx ==== */
// Frequency Systems — PhaseScene. Realistic BARGE-402 imagery (digital-art render) as the
// base, with a DIFFERENT energetic holographic motion overlay per phase, so each
// survey step reads as a real operation with live interactive motion on top:
//   01 Pre-Survey      — full-frame LiDAR scan sweep + measurement reticles
//   02 Ballast Adjust  — fwd/aft ballast zones breathing, waterline flow
//   03 Crane Position  — targeting reticle tracks the crane, load arc
//   04 Cargo Load      — descending crate marker + holds filling
//   05 Trim Correction — bubble-level horizon tilts then settles to 0
//   06 Final Survey    — full scan + LOCKED draft confirmation
function PhaseScene({
  phase,
  index
}) {
  // Real BARGE-402 imagery per phase. Phases 03 (crane) and 04 (cargo) use their
  // OWN dedicated renders — drop assets/crane.jpg and assets/cargo.jpg (or .png)
  // and they appear automatically; until then they fall back to the cargo render.
  const phaseImg = [['hero-barge.jpg'],
  // 01 Pre-Survey
  ['hero-barge.jpg'],
  // 02 Ballast
  ['crane.jpg', 'crane.png', 'sim-barge-402.jpg'],
  // 03 Crane Position
  ['cargo.jpg', 'cargo.png', 'sim-barge-402.jpg'],
  // 04 Cargo Load
  ['hero-barge.jpg'],
  // 05 Trim
  ['investor-hero.jpg'] // 06 Final Survey
  ].map(arr => arr.map(n => window.freqImg(n)));
  const list = phaseImg[index] || phaseImg[0];
  const [src, setSrc] = React.useState(list[list.length - 1]);
  React.useEffect(() => {
    let alive = true;
    (function tryNext(n) {
      if (!alive) return;
      if (n >= list.length - 1) {
        setSrc(list[list.length - 1]);
        return;
      }
      const probe = new Image();
      probe.onload = () => {
        if (alive) setSrc(list[n]);
      };
      probe.onerror = () => tryNext(n + 1);
      probe.src = list[n];
    })(0);
    return () => {
      alive = false;
    };
  }, [index]);
  // 2.5D camera: the plate is parallax-marched against a procedural depth field, so
  // the phase reads as a moving survey shot rather than a still. See depthstage.js.
  const hostRef = React.useRef(null);
  const stageRef = React.useRef(null);
  React.useEffect(() => {
    if (!hostRef.current || !window.FreqDepthStage) return;
    stageRef.current = window.FreqDepthStage.create(hostRef.current, {
      src: src,
      phase: index
    });
    return () => {
      if (stageRef.current) stageRef.current.destroy();
      stageRef.current = null;
    };
  }, []);
  React.useEffect(() => {
    if (stageRef.current) stageRef.current.setSrc(src);
  }, [src]);
  const tints = ['saturate(1) brightness(0.96)', 'saturate(1.12) brightness(0.92) hue-rotate(-6deg)', 'saturate(1.06) brightness(0.95)', 'saturate(1.16) brightness(1.0)', 'saturate(1.06) brightness(0.95) hue-rotate(4deg)', 'saturate(1.22) brightness(1.06)'];
  const chips = {
    0: [['LIDAR', 'SCANNING'], ['BASELINE', phase.draft + ' ft']],
    1: [['BALLAST', 'TRANSFER'], ['LEVELLING', phase.list + '°']],
    2: [['CRANE', 'SLEWING'], ['REACH', '32.7 m']],
    3: [['CARGO', 'LOADING'], ['HOLD FILL', phase.fill + ' %']],
    4: [['TRIM', 'CORRECTING'], ['LIST', phase.list + '°']],
    5: [['SURVEY', 'LOCKED'], ['DRAFT', phase.draft + ' ft']]
  }[index] || [];
  function Overlay() {
    if (index === 0 || index === 5) {
      return /*#__PURE__*/React.createElement("div", {
        className: "ov",
        "aria-hidden": true
      }, /*#__PURE__*/React.createElement("div", {
        className: "ov-scanline"
      }), /*#__PURE__*/React.createElement("div", {
        className: "ov-reticle",
        style: {
          left: '24%',
          top: '40%'
        }
      }), /*#__PURE__*/React.createElement("div", {
        className: "ov-reticle",
        style: {
          left: '60%',
          top: '62%',
          animationDelay: '0.6s'
        }
      }), index === 5 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        className: "ov-ring"
      }), /*#__PURE__*/React.createElement("div", {
        className: "ov-lock"
      }, "\u25CF LOCKED")));
    }
    if (index === 1) {
      return /*#__PURE__*/React.createElement("div", {
        className: "ov",
        "aria-hidden": true
      }, /*#__PURE__*/React.createElement("div", {
        className: "ov-zone",
        style: {
          left: '15%',
          top: '64%',
          width: '24%',
          height: '12%'
        }
      }, /*#__PURE__*/React.createElement("span", null, "FWD")), /*#__PURE__*/React.createElement("div", {
        className: "ov-zone",
        style: {
          left: '45%',
          top: '64%',
          width: '24%',
          height: '12%',
          animationDelay: '1.3s'
        }
      }, /*#__PURE__*/React.createElement("span", null, "AFT")), /*#__PURE__*/React.createElement("div", {
        className: "ov-flow",
        style: {
          left: '15%',
          top: '78%',
          width: '54%'
        }
      }));
    }
    if (index === 2) {
      return /*#__PURE__*/React.createElement("div", {
        className: "ov",
        "aria-hidden": true
      }, /*#__PURE__*/React.createElement("div", {
        className: "ov-reticle ov-reticle-lg",
        style: {
          left: '70%',
          top: '30%'
        }
      }), /*#__PURE__*/React.createElement("div", {
        className: "ov-arc"
      }), /*#__PURE__*/React.createElement("div", {
        className: "ov-track",
        style: {
          left: '34%',
          top: '30%',
          width: '38%'
        }
      }, /*#__PURE__*/React.createElement("span", {
        className: "ov-dot"
      })));
    }
    if (index === 3) {
      return /*#__PURE__*/React.createElement("div", {
        className: "ov",
        "aria-hidden": true
      }, /*#__PURE__*/React.createElement("div", {
        className: "ov-droppath",
        style: {
          left: '46%',
          top: '32%',
          height: '26%'
        }
      }, /*#__PURE__*/React.createElement("span", {
        className: "ov-crate"
      })), [18, 30, 42, 54].map((l, i) => /*#__PURE__*/React.createElement("div", {
        key: l,
        className: "ov-fill",
        style: {
          left: l + '%',
          top: '70%',
          width: '9%',
          animationDelay: i * 0.18 + 's'
        }
      })));
    }
    if (index === 4) {
      return /*#__PURE__*/React.createElement("div", {
        className: "ov",
        "aria-hidden": true
      }, /*#__PURE__*/React.createElement("div", {
        className: "ov-level"
      }, /*#__PURE__*/React.createElement("span", {
        className: "ov-bubble"
      })), /*#__PURE__*/React.createElement("div", {
        className: "ov-mark",
        style: {
          left: '16%'
        }
      }, "FWD"), /*#__PURE__*/React.createElement("div", {
        className: "ov-mark",
        style: {
          left: '66%'
        }
      }, "AFT"));
    }
    return null;
  }
  return /*#__PURE__*/React.createElement("div", {
    key: index,
    className: "freq-scene",
    style: {
      position: 'relative',
      width: '100%',
      aspectRatio: '1206 / 792',
      overflow: 'hidden',
      background: '#05080F'
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: hostRef,
    className: "ov-photo",
    style: {
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      backgroundImage: `url(${src})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      filter: tints[index] || tints[0],
      transition: 'filter 600ms var(--ease-standard)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      background: 'linear-gradient(180deg, rgba(8,12,24,0.22), transparent 18%, transparent 80%, rgba(8,12,24,0.42))'
    }
  }), /*#__PURE__*/React.createElement(Overlay, null), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 16,
      left: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      zIndex: 4
    }
  }, chips.map(([k, v], i) => /*#__PURE__*/React.createElement("div", {
    key: k,
    className: "freq-chip",
    style: {
      animationDelay: 120 + i * 90 + 'ms'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      letterSpacing: '0.16em',
      color: 'rgba(203,213,225,0.55)'
    }
  }, k), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: '#7DD3FC',
      letterSpacing: '0.06em'
    }
  }, v)))), /*#__PURE__*/React.createElement("div", {
    className: "freq-chip",
    style: {
      position: 'absolute',
      top: 16,
      right: 16,
      zIndex: 4,
      animationDelay: '120ms'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      letterSpacing: '0.16em',
      color: 'rgba(203,213,225,0.55)'
    }
  }, "PHASE"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: '#7DD3FC'
    }
  }, String(index + 1).padStart(2, '0'), " / 06")));
}
window.PhaseScene = PhaseScene;

/* ==== motion.jsx ==== */
// Frequency Systems — Simulation motion helpers, after Tubik's "6 effective types of web
// animation": purposeful motion as a behaviour tool, not decoration.
//   AnimatedNumber — accent/attention: telemetry counts up when a phase changes.
//   RunProgress    — loading animation: a survey-run progress loader that
//                    reassures the run is advancing, with a live shimmer.

function AnimatedNumber({
  value,
  decimals = 2
}) {
  const target = parseFloat(value);
  const [display, setDisplay] = React.useState(target);
  const fromRef = React.useRef(target);
  React.useEffect(() => {
    if (isNaN(target)) {
      setDisplay(target);
      return;
    }
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setDisplay(target);
      fromRef.current = target;
      return;
    }
    const from = fromRef.current;
    const start = performance.now();
    const dur = 650;
    let raf;
    const tick = now => {
      const t = Math.min(1, (now - start) / dur);
      const e = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setDisplay(from + (target - from) * e);
      if (t < 1) raf = requestAnimationFrame(tick);else fromRef.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  if (isNaN(target)) return value;
  return display.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}
window.AnimatedNumber = AnimatedNumber;
function RunProgress({
  index,
  total,
  playing
}) {
  const pct = (index + 1) / total * 100;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      background: 'var(--surface-card)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-md)',
      padding: '14px 18px',
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "freq-eyebrow"
  }, "Survey Run"), /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 12,
      color: playing ? 'var(--signal-live)' : 'var(--text-muted)',
      letterSpacing: '0.1em'
    }
  }, playing ? 'RUNNING' : 'HOLD', " \xB7 ", String(index + 1).padStart(2, '0'), " / ", String(total).padStart(2, '0'))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 6,
      borderRadius: 999,
      background: 'var(--dm-bg)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      width: pct + '%',
      background: 'var(--signal-live)',
      borderRadius: 999,
      boxShadow: '0 0 12px -1px var(--live-glow)',
      transition: 'width var(--dur-slow) var(--ease-out)'
    }
  }, playing && /*#__PURE__*/React.createElement("span", {
    className: "freq-shimmer",
    "aria-hidden": true
  }))));
}
window.RunProgress = RunProgress;


/* ==== HomePage.jsx ==== */
// Frequency Systems — HOME (hero). The one page with a light parallax background; no other motion.
function HomePage({
  onNav
}) {
  const {
    Button,
    Card,
    Eyebrow
  } = window.FREQAIDesignSystem_019dc6;
  const {
    BARGE,
    EMAIL
  } = window.FREQ;
  const heroRef = React.useRef(null);
  const [par, setPar] = React.useState({
    x: 0,
    y: 0
  });

  // Light multi-axis parallax — a few pixels only, the only parallax on the site.
  function onMove(e) {
    const r = heroRef.current.getBoundingClientRect();
    const dx = (e.clientX - r.left) / r.width - 0.5;
    const dy = (e.clientY - r.top) / r.height - 0.5;
    setPar({
      x: dx,
      y: dy
    });
  }
  const systems = [{
    icon: 'layers',
    title: 'Operations record',
    body: 'Tracks vessels, cargo, equipment, survey results, approvals, and each job’s current status.'
  }, {
    icon: 'layout-grid',
    title: 'Planning engine',
    body: 'Sequences work around equipment availability, receiving capacity, inspection requirements, and operating restrictions.'
  }, {
    icon: 'scan-line',
    title: 'Draft survey',
    body: 'Reads draft at six fixed positions on the hull and derives mean draft, trim and list from those readings.'
  }, {
    icon: 'lock',
    title: 'Vessel configuration',
    body: 'Vessel particulars held as supplied and carried through every job — changed deliberately, never inferred.'
  }, {
    icon: 'move-3d',
    title: 'Execution interface',
    body: 'Puts the approved plan in front of the crane operator, and records what was actually worked.'
  }, {
    icon: 'activity',
    title: 'Outcome record',
    body: 'Closes each job with the readings, the approvals and the resulting quantity, kept together.'
  }];
  const pipeline = ['Observations', 'Operations record', 'Planning & resource allocation', 'Checks & operator approval', 'Execution interface', 'Outcome record'];
  const PHASES = [['01', 'PRE-SURVEY'], ['02', 'BALLAST-ADJ'], ['03', 'CRANE-POS'], ['04', 'CARGO-LOAD'], ['05', 'TRIM-CORR'], ['06', 'FINAL-SURV']];
  const ringNodes = PHASES.map((p, i) => {
    const a = (-90 + i * 60) * Math.PI / 180;
    const co = Math.cos(a), si = Math.sin(a);
    return { n: p[0], k: p[1], x: 260 + 188 * co, y: 260 + 188 * si, lx: 260 + 214 * co, ly: 260 + 214 * si, anchor: co > 0.34 ? 'start' : co < -0.34 ? 'end' : 'middle', active: i === 0 };
  });
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    ref: heroRef,
    className: "freq-hero",
    onMouseMove: onMove,
    onMouseLeave: () => setPar({
      x: 0,
      y: 0
    }),
    style: {
      position: 'relative',
      overflow: 'hidden',
      borderBottom: '1px solid var(--border-faint)',
      minHeight: '92vh',
      display: 'flex',
      alignItems: 'center'
    }
  },
  /*#__PURE__*/React.createElement(window.HeroDepth, {
    src: window.freqImg('investor-hero.jpg')
  }),
  /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(90deg, rgba(8,12,24,0.96) 2%, rgba(8,12,24,0.8) 32%, rgba(8,12,24,0.42) 60%, rgba(8,12,24,0.62) 100%)'
    }
  }),
  /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(180deg, rgba(8,12,24,0.66) 0%, transparent 20%, transparent 66%, var(--bg-page) 100%)'
    }
  }),
  /*#__PURE__*/React.createElement("div", {
    className: "freq-hero-content freq-enter",
    style: {
      position: 'relative',
      width: '100%',
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '92px var(--container-pad) 84px',
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 1.04fr) minmax(0, 0.96fr)',
      gap: 'clamp(28px, 5vw, 68px)',
      alignItems: 'center'
    }
  },
  /*#__PURE__*/React.createElement("div", {
    className: "freq-hero-copy"
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    live: true
  }, "Inland waterways \xB7 Cargo execution layer"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'clamp(40px, 5.4vw, 62px)',
      lineHeight: 1.03,
      maxWidth: 600,
      marginTop: 20
    }
  }, "Cargo decisions, grounded in vessel state."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 19,
      lineHeight: 1.6,
      color: 'var(--text-body)',
      maxWidth: 520,
      marginTop: 22
    }
  }, "FREQUENCY Systems is a maritime operational intelligence company building the autonomous cargo execution layer for U.S. inland waterways. Initial focus: one terminal and one cargo-transfer workflow."),
  /*#__PURE__*/React.createElement("div", {
    className: "freq-hero-metrics",
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, auto)',
      gap: 'clamp(16px, 2.6vw, 32px)',
      marginTop: 30,
      justifyContent: 'start'
    }
  }, [{
    v: '6',
    u: 'PHASES',
    l: 'one cargo transfer'
  }, {
    v: '6',
    u: 'POSITIONS',
    l: 'draft measurement points'
  }, {
    v: '1',
    u: 'TERMINAL',
    l: 'initial scope'
  }, {
    v: '1',
    u: 'WORKFLOW',
    l: 'end to end'
  }].map(m => /*#__PURE__*/React.createElement("div", {
    key: m.u
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'clamp(26px, 3vw, 32px)',
      lineHeight: 1,
      color: 'var(--white)'
    }
  }, m.v), /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 12,
      letterSpacing: '0.08em',
      color: 'var(--indigo)'
    }
  }, m.u)), /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 10.5,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--text-faint)',
      marginTop: 7
    }
  }, m.l)))),
  /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      marginTop: 34,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    onClick: () => onNav('simulation')
  }, "See Simulation Ground"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg",
    onClick: () => onNav('investor')
  }, "Investor Brief")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 34,
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      width: 34,
      height: 1,
      background: 'var(--indigo)',
      flex: 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 12,
      letterSpacing: '0.22em',
      color: 'var(--text-muted)',
      textTransform: 'uppercase'
    }
  }, "Inland terminal ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--indigo)'
    }
  }, "\xB7"), " Mississippi River ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--indigo)'
    }
  }, "\xB7"), " BARGE-402 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--indigo)'
    }
  }, "\xB7"), " Live"))),
  /*#__PURE__*/React.createElement("div", {
    className: "freq-hero-viz",
    style: {
      position: 'relative',
      justifySelf: 'center',
      width: '100%',
      maxWidth: 520,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: { position: 'relative', width: '100%' }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 520 520",
    role: "img",
    "aria-label": "Six-phase cargo transfer workflow: 01 Pre-Survey, 02 Ballast Adjustment, 03 Crane Position, 04 Cargo Load, 05 Trim Correction, 06 Final Survey",
    style: { width: '100%', height: 'auto', overflow: 'visible' }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("radialGradient", {
    id: "freqCore", cx: "50%", cy: "50%", r: "50%"
  }, /*#__PURE__*/React.createElement("stop", { offset: "0%", stopColor: "rgba(99,102,241,0.30)" }), /*#__PURE__*/React.createElement("stop", { offset: "100%", stopColor: "rgba(99,102,241,0)" }))), /*#__PURE__*/React.createElement("circle", {
    cx: 260, cy: 260, r: 120, fill: "url(#freqCore)"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: 260, cy: 260, r: 188, fill: "none", stroke: "var(--indigo-line)", strokeWidth: 1
  }), /*#__PURE__*/React.createElement("circle", {
    cx: 260, cy: 260, r: 150, fill: "none", stroke: "var(--indigo-line-2)", strokeWidth: 1, strokeDasharray: "2 9"
  }), /*#__PURE__*/React.createElement("text", {
    x: 260, y: 249, textAnchor: "middle", className: "mono", style: { fontSize: 12, letterSpacing: "0.3em", fill: "var(--text-muted)" }
  }, "CARGO"), /*#__PURE__*/React.createElement("text", {
    x: 260, y: 271, textAnchor: "middle", className: "mono", style: { fontSize: 12, letterSpacing: "0.3em", fill: "var(--text-muted)" }
  }, "TRANSFER"), /*#__PURE__*/React.createElement("text", {
    x: 260, y: 300, textAnchor: "middle", style: { fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17, letterSpacing: "0.04em", fill: "var(--white)" }
  }, "SIX PHASES"), ringNodes.map(nd => /*#__PURE__*/React.createElement("g", {
    key: nd.n
  }, /*#__PURE__*/React.createElement("circle", {
    cx: nd.x, cy: nd.y, r: 21, fill: "var(--bg-page)", stroke: nd.active ? "var(--signal-live)" : "var(--indigo-line)", strokeWidth: nd.active ? 2 : 1, style: nd.active ? { filter: "drop-shadow(0 0 8px var(--live-glow))" } : {}
  }), /*#__PURE__*/React.createElement("text", {
    x: nd.x, y: nd.y + 5, textAnchor: "middle", className: "mono", style: { fontSize: 14, fontWeight: 600, fill: nd.active ? "var(--signal-live)" : "var(--text-strong)" }
  }, nd.n), /*#__PURE__*/React.createElement("text", {
    x: nd.lx, y: nd.ly + 4, textAnchor: nd.anchor, className: "mono", style: { fontSize: 10.5, letterSpacing: "0.08em", fill: nd.active ? "var(--text-strong)" : "var(--text-muted)" }
  }, nd.k)))), /*#__PURE__*/React.createElement("div", {
    className: "freq-hud",
    style: {
      position: 'absolute',
      top: '1%',
      left: '0%',
      width: 194,
      padding: '13px 15px',
      background: 'rgba(8,12,24,0.74)',
      border: '1px solid var(--indigo-line)',
      borderRadius: 'var(--radius-md)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      boxShadow: 'var(--shadow-panel)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mono", style: { fontSize: 12, letterSpacing: "0.16em", color: "var(--text-strong)", marginBottom: 9 }
  }, "BARGE-402"), [["DRAFT", "11.80 ft"], ["LIST", "0.0\xB0"], ["HOLD FILL", "0%"]].map(r => /*#__PURE__*/React.createElement("div", {
    key: r[0], className: "mono", style: { display: "flex", justifyContent: "space-between", fontSize: 11.5, padding: "3px 0" }
  }, /*#__PURE__*/React.createElement("span", { style: { color: "var(--text-muted)" } }, r[0]), /*#__PURE__*/React.createElement("span", { style: { color: "var(--white)" } }, r[1]))), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true, style: { height: 1, background: "var(--border-faint)", margin: "9px 0" }
  }), /*#__PURE__*/React.createElement("div", {
    className: "mono", style: { display: "flex", alignItems: "center", gap: 7, fontSize: 11.5, color: "var(--signal-live)" }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true, style: { width: 7, height: 7, borderRadius: "999px", background: "var(--signal-live)", boxShadow: "var(--glow-live-dot)", flex: "none" }
  }), "SCENARIO VALUES"), /*#__PURE__*/React.createElement("div", {
    className: "mono", style: { fontSize: 11.5, color: "var(--text-body)", marginTop: 8 }
  }, "6 PHASES \u2192 1 RECORD"), /*#__PURE__*/React.createElement("div", {
    className: "mono", style: { fontSize: 11.5, color: "var(--white)", marginTop: 4 }
  }, "ILLUSTRATIVE"))), /*#__PURE__*/React.createElement("div", {
    style: { display: "flex", alignItems: "center", gap: 12 }
  }, /*#__PURE__*/React.createElement("svg", {
    width: 34, height: 12, viewBox: "0 0 34 12", "aria-hidden": true
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0 6 H8 L11 1 L15 11 L19 3 L22 6 H34", fill: "none", stroke: "var(--indigo)", strokeWidth: 1.5
  })), /*#__PURE__*/React.createElement("span", {
    className: "mono", style: { fontSize: 11, letterSpacing: "0.2em", color: "var(--text-muted)", textTransform: "uppercase" }
  }, "Frequency \xB7 Reliability \xB7 Execution \xB7 Quality"))))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--space-9) var(--container-pad) 0'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "The System"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 18,
      marginTop: 24
    }
  }, systems.map(s => /*#__PURE__*/React.createElement(Card, {
    key: s.title,
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: s.icon,
      size: 22
    }),
    title: s.title,
    interactive: true
  }, s.body)))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--space-9) var(--container-pad) 0'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Architecture Flow"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'stretch',
      gap: 0,
      marginTop: 24,
      flexWrap: 'wrap'
    }
  }, pipeline.map((step, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: step
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 150px',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-md)',
      padding: '18px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 11,
      color: 'var(--text-faint)'
    }
  }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 15,
      fontWeight: 600,
      color: 'var(--text-headline)',
      lineHeight: 1.25
    }
  }, step)), i < pipeline.length - 1 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      padding: '0 6px',
      color: 'var(--indigo)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 18
  })))))), /*#__PURE__*/React.createElement(window.ProofBand, null), /*#__PURE__*/React.createElement(window.HowItWorks, {
    onNav: onNav
  }), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--space-9) var(--container-pad) 0'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "About the Founder"), /*#__PURE__*/React.createElement("div", {
    className: "freq-about-grid",
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(240px, 340px) 1fr',
      gap: 40,
      marginTop: 24,
      alignItems: 'stretch'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      border: '1px solid var(--border-default)',
      boxShadow: '0 0 0 1px rgba(99,102,241,0.10), 0 24px 60px -30px rgba(99,102,241,0.45)',
      alignSelf: 'start'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: window.freqImg('founder-portrait-v2.jpg'),
    alt: "Founder & Chief Architect, Frequency Systems",
    style: {
      display: 'block',
      width: '100%',
      height: 'auto'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      padding: '18px 18px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 3
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 16,
      fontWeight: 600,
      color: 'var(--text-headline)',
      letterSpacing: '0.01em'
    }
  }, "Founder & Chief Architect"), /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 11.5,
      color: 'var(--text-muted)',
      letterSpacing: '0.04em'
    }
  }, "FREQUENCY SYSTEMS"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'clamp(26px, 3.4vw, 36px)',
      lineHeight: 1.1,
      maxWidth: 560
    }
  }, "An operator's throughline \u2014 build the system, then prove it."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 17,
      lineHeight: 1.65,
      color: 'var(--text-body)',
      maxWidth: 620,
      marginTop: 20
    }
  }, "Frequency Systems is led by a founder who builds ventures from the ground up. D-FREQ launched in April 2024 in the fitness industry \u2014 a first company that set the operating discipline behind everything since: ship a real product, measure it honestly, and let the numbers decide."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 17,
      lineHeight: 1.65,
      color: 'var(--text-body)',
      maxWidth: 620,
      marginTop: 16
    }
  }, "In 2025 that discipline moved to maritime infrastructure. What began as a starter venture is now a deliberate bridge into autonomous cargo intelligence \u2014 carrying the same conviction into a domain where precision is measured in hundredths of a foot and every claim is verified against sensor truth."), /*#__PURE__*/React.createElement("div", {
    className: "freq-about-timeline",
    style: {
      display: 'flex',
      alignItems: 'stretch',
      gap: 0,
      marginTop: 30,
      flexWrap: 'wrap'
    }
  }, [{
    date: 'APR 2024',
    title: 'D-FREQ',
    sub: 'Fitness industry · first venture'
  }, {
    date: '2025',
    title: 'Maritime Infrastructure',
    sub: 'Cargo intelligence · BARGE-402'
  }].map((t, i, arr) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: t.title
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 200px',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-md)',
      padding: '16px 18px',
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 11,
      color: 'var(--text-faint)',
      letterSpacing: '0.06em'
    }
  }, t.date), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 16,
      fontWeight: 600,
      color: 'var(--text-headline)'
    }
  }, t.title), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      color: 'var(--text-muted)',
      lineHeight: 1.4
    }
  }, t.sub)), i < arr.length - 1 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      padding: '0 8px',
      color: 'var(--indigo)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 18
  })))))))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--space-9) var(--container-pad) 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-8) var(--space-7)',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'clamp(28px, 4vw, 40px)',
      maxWidth: 620
    }
  }, "Build the Maritime Intelligence Layer"), /*#__PURE__*/React.createElement("a", {
    href: `mailto:${EMAIL}`,
    className: "mono",
    style: {
      color: 'var(--text-body)',
      fontSize: 14
    }
  }, EMAIL), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    onClick: () => onNav('contact'),
    style: {
      marginTop: 6
    }
  }, "Contact"))));
}
window.HomePage = HomePage;


/* ==== ArchitecturePage.jsx ==== */
// Frequency Systems — ARCHITECTURE. Technical explainer. No motion.
function ArchitecturePage() {
  const {
    Card,
    Eyebrow
  } = window.FREQAIDesignSystem_019dc6;
  const modules = [{
    n: '01',
    t: 'Observations',
    d: 'Draft readings, equipment state and job events enter the system as dated observations, each with its source.'
  }, {
    n: '02',
    t: 'Operations record',
    d: 'One record per job holding vessels, cargo, equipment, survey results, approvals and current status.'
  }, {
    n: '03',
    t: 'Draft survey',
    d: 'Draft read at six fixed hull positions. Mean draft, trim and list are calculated from those readings, never read directly.'
  }, {
    n: '04',
    t: 'Vessel configuration',
    d: 'Vessel particulars held as supplied and carried through the job, changed deliberately rather than inferred.'
  }, {
    n: '05',
    t: 'Execution interface',
    d: 'Presents the approved plan to the crane operator and captures what was actually worked against it.'
  }, {
    n: '06',
    t: 'Outcome record',
    d: 'The job closes with its readings, approvals and resulting quantity kept together as one reviewable record.'
  }];
  const agents = [{
    id: 'Draft Monitor',
    x: 50,
    y: 18
  }, {
    id: 'Trim Optimizer',
    x: 82,
    y: 50
  }, {
    id: 'Load Predictor',
    x: 66,
    y: 84
  }, {
    id: 'Stability Guard',
    x: 34,
    y: 84
  }, {
    id: 'E-STOP Override',
    x: 18,
    y: 50
  }];
  const method = ['Intent', 'Architecture', 'Simulation', 'Verification', 'Deployment'];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--space-8) var(--container-pad) 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "Architecture"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'clamp(30px, 4.5vw, 46px)',
      marginTop: 18,
      maxWidth: 760
    }
  }, "How the system actually works")), /*#__PURE__*/React.createElement(HeroMark, {
    variant: "emblem",
    size: 150
  })), /*#__PURE__*/React.createElement("div", {
    className: "freq-arch-hero",
    style: {
      position: 'relative',
      marginTop: 28,
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      border: '1px solid var(--indigo-line)',
      boxShadow: 'var(--shadow-raised)',
      aspectRatio: '1536 / 1024',
      maxHeight: 520
    }
  }, /*#__PURE__*/React.createElement(window.ArchPlate, {
    src: window.freqImg('architecture-diagram.jpg'),
    alt: "Illustrative render \u2014 the six layers of the system, from observations to the outcome record"
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      background: 'linear-gradient(180deg, rgba(8,12,24,0.28), transparent 22%, transparent 78%, rgba(8,12,24,0.45))'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "freq-arch-sweep",
    "aria-hidden": true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 18,
      bottom: 16,
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: 999,
      background: 'var(--signal-live)',
      boxShadow: 'var(--glow-live-dot)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 12,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, "Illustrative render \xB7 six layers \xB7 L1 observations \u2192 L6 outcome record"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 18,
      marginTop: 40
    }
  }, modules.map(m => /*#__PURE__*/React.createElement(Card, {
    key: m.t,
    eyebrow: `MODULE ${m.n}`,
    title: m.t
  }, m.d))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-9)'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Agent Roles"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      marginTop: 24,
      height: 340,
      background: 'var(--surface-card)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 100 100",
    preserveAspectRatio: "none",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%'
    }
  }, agents.map((a, i) => agents.slice(i + 1).map(b => /*#__PURE__*/React.createElement("line", {
    key: a.id + b.id,
    x1: a.x,
    y1: a.y,
    x2: b.x,
    y2: b.y,
    stroke: "var(--indigo)",
    strokeOpacity: "0.22",
    strokeWidth: "0.3",
    vectorEffect: "non-scaling-stroke"
  })))), agents.map(a => /*#__PURE__*/React.createElement("div", {
    key: a.id,
    style: {
      position: 'absolute',
      left: `${a.x}%`,
      top: `${a.y}%`,
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      background: 'var(--surface-raised)',
      border: '1px solid var(--indigo)',
      borderRadius: 'var(--radius-pill)',
      padding: '8px 16px',
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '999px',
      background: a.id === 'E-STOP Override' ? 'var(--status-fault)' : 'var(--indigo-300)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--text-headline)'
    }
  }, a.id))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-7)',
      display: 'flex',
      gap: 14,
      alignItems: 'flex-start',
      background: 'var(--indigo-wash)',
      border: '1px solid var(--indigo)',
      borderRadius: 'var(--radius-md)',
      padding: '20px 22px'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "lock",
    size: 20,
    color: "var(--indigo-300)",
    style: {
      marginTop: 2,
      flex: 'none'
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-strong)',
      fontSize: 16,
      lineHeight: 1.6
    }
  }, "BARGE-402 metrics are locked. No alternate cargo data, vessel identity, or station logic may be introduced without explicit approval.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-9)'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Methodology"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 0,
      marginTop: 24,
      flexWrap: 'wrap'
    }
  }, method.map((step, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: step
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 120px',
      textAlign: 'center',
      padding: '20px 12px',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-md)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mono",
    style: {
      fontSize: 11,
      color: 'var(--text-faint)',
      marginBottom: 8
    }
  }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 16,
      fontWeight: 600,
      color: 'var(--text-headline)'
    }
  }, step)), i < method.length - 1 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 4px',
      color: 'var(--indigo)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 16
  })))))));
}
window.ArchitecturePage = ArchitecturePage;

/* ==== InvestorPage.jsx ==== */
// Frequency Systems — INVESTOR. Confidence and scale. Slow-rise hero + count-up locked
// metrics (Tubik: attention). Motion is restrained — gravity, not flash.
// Locked spec numbers render WHITE (blue stays reserved for live data).

// Count-up that ALWAYS lands on the real value: rAF for smoothness, plus a
// timeout safety-net so a stalled frame loop can never freeze it mid-count.
function CountUp({
  target,
  decimals = 0,
  durationMs = 1000
}) {
  const fmt = n => n.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
  const [display, setDisplay] = React.useState(fmt(target));
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setDisplay(fmt(target));
      return;
    }
    let raf,
      safety,
      started = false;
    const run = () => {
      if (started) return;
      started = true;
      const t0 = performance.now();
      const tick = now => {
        const t = Math.min(1, (now - t0) / durationMs);
        const e = 1 - Math.pow(1 - t, 3);
        setDisplay(fmt(target * e));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      safety = setTimeout(() => {
        cancelAnimationFrame(raf);
        setDisplay(fmt(target));
      }, durationMs + 250);
    };
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          run();
          io.disconnect();
        }
      });
    }, {
      threshold: 0.4
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      clearTimeout(safety);
    };
  }, [target]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref
  }, display);
}
window.CountUp = CountUp;
function InvestorPage({
  onNav
}) {
  const {
    Eyebrow,
    Button
  } = window.FREQAIDesignSystem_019dc6;
  const {
    EMAIL
  } = window.FREQ;
  // Static scope facts. No animated counters, and no timing, accuracy or crew figures:
  // none of those are supported by evidence on this site.
  const metrics = [{
    label: 'Stage',
    node: 'Pre-pilot',
    unit: '',
    sub: 'Proposed product behaviour.'
  }, {
    label: 'Initial scope',
    node: '1',
    unit: 'terminal',
    sub: 'One cargo-transfer workflow.'
  }, {
    label: 'Workflow phases',
    node: '6',
    unit: '',
    sub: 'One cargo transfer, end to end.'
  }, {
    label: 'Measurement positions',
    node: '6',
    unit: '',
    sub: 'FP, FS, MP, MS, AP, AS.'
  }];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      overflow: 'hidden',
      borderBottom: '1px solid var(--border-faint)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "freq-investor-hero",
    style: {
      position: 'absolute',
      inset: 0
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: window.freqImg('investor-hero.jpg'),
    alt: "BARGE-402 underway, live telemetry",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  })), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(180deg, rgba(8,12,24,0.55), rgba(8,12,24,0.35) 30%, rgba(8,12,24,0.88))'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '120px var(--container-pad) 96px'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    live: true
  }, "Investor brief \xB7 Pre-pilot"), /*#__PURE__*/React.createElement("h1", {
    className: "freq-rise",
    style: {
      fontSize: 'clamp(36px, 5.5vw, 60px)',
      lineHeight: 1.05,
      maxWidth: 820,
      marginTop: 22
    }
  }, "A cargo-operations decision system for inland terminals."), /*#__PURE__*/React.createElement("p", {
    className: "freq-rise",
    style: {
      fontSize: 19,
      lineHeight: 1.6,
      color: 'var(--text-body)',
      maxWidth: 600,
      marginTop: 22,
      animationDelay: '90ms'
    }
  }, "The product is a cargo-operations decision system for inland terminals. The six-phase walkthrough on the Simulation page is its validation environment, running configured scenario values \u2014 not a record of field performance."))), /*#__PURE__*/React.createElement(window.OpsSystem, null), /*#__PURE__*/React.createElement(window.InvestorPath, {
    onNav: onNav
  }), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--space-9) var(--container-pad) 0'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Scope"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 18,
      marginTop: 24
    }
  }, metrics.map(m => /*#__PURE__*/React.createElement("div", {
    key: m.label,
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-md)',
      padding: '26px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "freq-eyebrow"
  }, m.label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 44,
      fontWeight: 500,
      color: 'var(--text-headline)',
      lineHeight: 1,
      fontVariantNumeric: 'tabular-nums'
    }
  }, m.node, m.unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      color: 'var(--text-muted)',
      marginLeft: 5
    }
  }, m.unit)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--text-muted)',
      lineHeight: 1.5,
      marginTop: 2
    }
  }, m.sub))))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--space-9) var(--container-pad) 0'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "What Changes"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 18,
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-faint)',
      borderRadius: 'var(--radius-md)',
      padding: 28
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 12,
      letterSpacing: '0.14em',
      color: 'var(--status-pending)'
    }
  }, "COORDINATED BY HAND"), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: '16px 0 0',
      padding: 0,
      listStyle: 'none',
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, ['Observations collected by hand, kept in separate records', 'Job state reconciled between people as work proceeds', 'Decisions documented informally, if at all', 'Outcome recorded apart from the reasoning behind it'].map(t => /*#__PURE__*/React.createElement("li", {
    key: t,
    style: {
      display: 'flex',
      gap: 10,
      color: 'var(--text-body)',
      fontSize: 15
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "minus",
    size: 18,
    color: "var(--status-pending)",
    style: {
      flex: 'none',
      marginTop: 1
    }
  }), t)))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--indigo)',
      borderRadius: 'var(--radius-md)',
      padding: 28
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 12,
      letterSpacing: '0.14em',
      color: 'var(--status-active)'
    }
  }, "PROPOSED WORKFLOW"), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: '16px 0 0',
      padding: 0,
      listStyle: 'none',
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, ['Connected observations in one operations record', 'A plan constrained by equipment, capacity and checks', 'Operator reviews and approves before execution', 'Outcome stored with its readings and approvals'].map(t => /*#__PURE__*/React.createElement("li", {
    key: t,
    style: {
      display: 'flex',
      gap: 10,
      color: 'var(--text-strong)',
      fontSize: 15
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 18,
    color: "var(--status-active)",
    style: {
      flex: 'none',
      marginTop: 1
    }
  }), t)))))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--space-9) var(--container-pad) 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-8) var(--space-7)',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'clamp(26px, 4vw, 38px)',
      maxWidth: 640
    }
  }, "Build the first terminal deployment"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-body)',
      fontSize: 16,
      lineHeight: 1.6,
      maxWidth: 560
    }
  }, "BARGE-402 metrics are locked. Review the system with Frequency Systems \u2014 every figure here is the live number the system runs on; no separate marketing data path."), /*#__PURE__*/React.createElement("a", {
    href: `mailto:${EMAIL}`,
    className: "mono",
    style: {
      color: 'var(--text-body)',
      fontSize: 14
    }
  }, EMAIL), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    onClick: () => onNav('contact'),
    style: {
      marginTop: 6
    }
  }, "Request Investor Review"))));
}
window.InvestorPage = InvestorPage;

/* ==== ContactPage.jsx ==== */
// Frequency Systems — CONTACT. No motion.
function ContactPage() {
  const {
    Eyebrow,
    Input,
    Select,
    Button
  } = window.FREQAIDesignSystem_019dc6;
  const {
    EMAIL
  } = window.FREQ;
  const [sent, setSent] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 920,
      margin: '0 auto',
      padding: 'var(--space-8) var(--container-pad) 0'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Contact"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'clamp(30px, 4.5vw, 46px)',
      marginTop: 18,
      maxWidth: 680
    }
  }, "Talk with Frequency Systems"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-body)',
      fontSize: 17,
      lineHeight: 1.6,
      maxWidth: 620,
      marginTop: 18
    }
  }, "Frequency Systems architects the maritime intelligence layer. This form is for survey pilots, fleet integration, and investor review of BARGE-402. Specific requests get specific answers."), /*#__PURE__*/React.createElement("div", {
    className: "freq-contact-hero",
    style: {
      position: 'relative',
      marginTop: 28,
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      border: '1px solid var(--border-default)',
      aspectRatio: '1536 / 1024',
      maxHeight: 300
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: window.freqImg('contact-hero.jpg'),
    alt: "Frequency Systems operations room overlooking BARGE-402 in harbor",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      background: 'linear-gradient(180deg, rgba(8,12,24,0.25), transparent 30%, rgba(8,12,24,0.55))'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 18,
      bottom: 14,
      display: 'flex',
      alignItems: 'center',
      gap: 9
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: 999,
      background: 'var(--signal-live)',
      boxShadow: 'var(--glow-live-dot)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 11,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, "Operations \xB7 BARGE-402 on station"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 1.6fr) minmax(240px, 1fr)',
      gap: 28,
      marginTop: 44,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      setSent(true);
    },
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Name / Company",
    placeholder: "Jane Rivera \xB7 Atlas Marine",
    required: true
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Email",
    type: "email",
    placeholder: "you@company.com",
    required: true
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Project Type",
    placeholder: "Select a project type",
    options: ['Draft Survey Pilot', 'Fleet Integration', 'Investor Review', 'Other'],
    style: {
      gridColumn: '1 / -1'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1 / -1'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Message",
    multiline: true,
    rows: 5,
    placeholder: "What are you trying to survey, and on what timeline?",
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1 / -1',
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    variant: "primary",
    size: "lg"
  }, "Send Architecture Request"), sent && /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 13,
      color: 'var(--status-active)'
    }
  }, "Request captured \u2014 Frequency Systems will reply from ", EMAIL, "."))), /*#__PURE__*/React.createElement("aside", {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-lg)',
      padding: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Direct"), /*#__PURE__*/React.createElement("a", {
    href: `mailto:${EMAIL}`,
    className: "mono",
    style: {
      fontSize: 14,
      color: 'var(--text-strong)'
    }
  }, EMAIL)), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: 'var(--border-faint)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Proof Vessel"), /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 13,
      color: 'var(--text-body)'
    }
  }, "BARGE-402 \xB7 45m \xD7 10m"), /*#__PURE__*/React.createElement("span", {
    className: "mono",
    style: {
      fontSize: 13,
      color: 'var(--text-body)'
    }
  }, "45m \xD7 10m \xB7 six measurement positions")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: 'var(--border-faint)'
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: 'var(--text-muted)',
      lineHeight: 1.6
    }
  }, "No alternate cargo data or vessel identity is accepted without explicit approval."))));
}
window.ContactPage = ContactPage;

/* ==== bootstrap ==== */

function App() {
  const [page, setPage] = React.useState('home');
  const onNav = p => {
    setPage(p);
    window.scrollTo({
      top: 0
    });
  };

  // Lucide swaps <i data-lucide> -> <svg> after every render.
  React.useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons({
        attrs: {
          'stroke-width': 1.75,
          'aria-hidden': 'true',
          focusable: 'false'
        }
      });
    }
  });
  const Pages = {
    home: window.HomePage,
    simulation: window.SimulationGround,
    architecture: window.ArchitecturePage,
    investor: window.InvestorPage,
    contact: window.ContactPage
  };
  const Current = Pages[page];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#freq-main",
    className: "freq-skip"
  }, "Skip to content"), /*#__PURE__*/React.createElement(Header, {
    page: page,
    onNav: onNav
  }), /*#__PURE__*/React.createElement("main", {
    id: "freq-main",
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Current, {
    onNav: onNav
  })), /*#__PURE__*/React.createElement(Footer, {
    onNav: onNav
  }));
}

// Wait until all babel-transpiled component files have registered on window.
function boot() {
  if (window.HomePage && window.SimulationGround && window.ArchitecturePage && window.ContactPage && window.InvestorPage && window.Header && window.Footer && window.Stage && window.HeroMark && window.RunProgress && window.AnimatedNumber && window.PhaseScene && window.CountUp) {
    ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
  } else {
    setTimeout(boot, 30);
  }
}
boot();