/* Frequency Systems — image-led sections (Home + Investor).
 * Every section here is built on a photoreal plate driven by the DepthStage camera
 * rather than a flat card. Loaded before app.prod.js; components register on window.
 */

/* Reusable photoreal plate: real render + 2.5D camera + optional HUD children. */
function FreqPlate({ src, rig = 'plate', ratio = '16 / 9', amp = 1, grade, radius = 'var(--radius-lg)', children, style = {} }) {
  const hostRef = React.useRef(null);
  React.useEffect(() => {
    if (!hostRef.current || !window.FreqDepthStage) return;
    const st = window.FreqDepthStage.create(hostRef.current, { src, rig, amp });
    return () => st.destroy();
  }, [src, rig, amp]);
  return /*#__PURE__*/React.createElement('div', {
    style: {
      position: 'relative',
      overflow: 'hidden',
      borderRadius: radius,
      border: '1px solid var(--indigo-line)',
      background: '#05080F',
      aspectRatio: ratio,
      boxShadow: 'var(--shadow-raised)',
      ...style
    }
  },
    /*#__PURE__*/React.createElement('div', {
      ref: hostRef,
      'aria-hidden': true,
      style: {
        position: 'absolute',
        inset: 0,
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: grade || 'saturate(1.04) brightness(0.97)'
      }
    }),
    children
  );
}
window.FreqPlate = FreqPlate;

/* ---- Home: proof band. Manual survey against the same survey run unmanned. ---- */
function ProofBand() {
  const { Eyebrow } = window.FREQAIDesignSystem_019dc6;
  const rows = [
    { k: 'Observations', manual: 'Collected by hand, kept in separate records',   freq: 'Connected observations in one operations record' },
    { k: 'Planning',     manual: 'Reconciled between people as the job proceeds', freq: 'A plan constrained by equipment, capacity and checks' },
    { k: 'Decision',     manual: 'Judgement, documented informally',              freq: 'Operator reviews and approves the proposed plan' },
    { k: 'Outcome',      manual: 'Result recorded apart from its reasoning',      freq: 'Outcome stored with its readings and approvals' }
  ];
  const col = (label, live) => ({
    display: 'flex', flexDirection: 'column', gap: 4,
    padding: '14px 16px',
    background: live ? 'rgba(56,189,248,0.07)' : 'rgba(8,12,24,0.55)',
    borderLeft: live ? '2px solid var(--signal-live)' : '2px solid var(--border-default)'
  });
  return /*#__PURE__*/React.createElement('section', {
    style: { maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'var(--space-9) var(--container-pad) 0' }
  },
    /*#__PURE__*/React.createElement(Eyebrow, null, 'The Workflow'),
    /*#__PURE__*/React.createElement('h2', {
      style: { fontSize: 'clamp(26px, 3.4vw, 36px)', lineHeight: 1.1, maxWidth: 620, marginTop: 14 }
    }, 'Two ways to run the same transfer.'),
    /*#__PURE__*/React.createElement('p', {
      style: { fontSize: 17, lineHeight: 1.65, color: 'var(--text-body)', maxWidth: 620, marginTop: 16 }
    }, 'The left column is how a cargo transfer is coordinated today. The right column is the workflow this product proposes. It is a description of intended behaviour, not a measured comparison.'),
    /*#__PURE__*/React.createElement(FreqPlate, {
      src: window.freqImg('sim-barge-402.jpg'),
      rig: 'plate',
      ratio: '21 / 9',
      style: { marginTop: 28 }
    },
      /*#__PURE__*/React.createElement('div', {
        'aria-hidden': true,
        style: { position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(8,12,24,0.88) 0%, rgba(8,12,24,0.42) 46%, rgba(8,12,24,0.72) 100%)' }
      }),
      /*#__PURE__*/React.createElement('span', {
        className: 'mono',
        style: { position: 'absolute', bottom: 12, left: 16, fontSize: 10.5, letterSpacing: '0.12em', color: 'var(--text-faint)', textTransform: 'uppercase', zIndex: 2 }
      }, 'Illustrative render \u00b7 proposed workflow, not a measured result'),
      /*#__PURE__*/React.createElement('div', {
        className: 'freq-proof-grid',
        style: {
          position: 'absolute', inset: 0, display: 'grid',
          gridTemplateColumns: '104px 1fr 1fr', alignContent: 'center',
          gap: '10px 14px', padding: 'clamp(18px, 3vw, 40px)'
        }
      },
        /*#__PURE__*/React.createElement('span', null),
        /*#__PURE__*/React.createElement('span', {
          className: 'mono', style: { fontSize: 11.5, letterSpacing: '0.16em', color: 'var(--text-muted)', textTransform: 'uppercase' }
        }, 'Coordinated by hand'),
        /*#__PURE__*/React.createElement('span', {
          className: 'mono', style: { fontSize: 11.5, letterSpacing: '0.16em', color: 'var(--signal-live)', textTransform: 'uppercase' }
        }, 'Proposed workflow'),
        ...rows.flatMap(r => [
          /*#__PURE__*/React.createElement('span', {
            key: r.k + '-k', className: 'mono',
            style: { fontSize: 11, letterSpacing: '0.1em', color: 'var(--text-faint)', alignSelf: 'center', textTransform: 'uppercase' }
          }, r.k),
          /*#__PURE__*/React.createElement('div', { key: r.k + '-m', style: col(r.k, false) },
            /*#__PURE__*/React.createElement('span', {
              style: { fontFamily: 'var(--font-display)', fontSize: 'clamp(14px, 1.5vw, 17px)', fontWeight: 600, color: 'var(--text-body)' }
            }, r.manual)
          ),
          /*#__PURE__*/React.createElement('div', { key: r.k + '-f', style: col(r.k, true) },
            /*#__PURE__*/React.createElement('span', {
              style: { fontFamily: 'var(--font-display)', fontSize: 'clamp(14px, 1.5vw, 17px)', fontWeight: 600, color: 'var(--text-headline)' }
            }, r.freq)
          )
        ])
      )
    )
  );
}
window.ProofBand = ProofBand;

/* ---- Home: how it works, three steps. Each step is a plate, not a card. ---- */
function HowItWorks({ onNav }) {
  const { Eyebrow, Button } = window.FREQAIDesignSystem_019dc6;
  const steps = [
    { n: '01', t: 'Survey',  img: 'hero-barge.jpg',           chip: 'SIX MEASUREMENT POSITIONS',
      body: 'Draft is read at six fixed positions on the hull \u2014 FP, FS, MP, MS, AP, AS \u2014 and mean draft, trim and list are calculated from those readings.' },
    { n: '02', t: 'Decide',  img: 'architecture-diagram.jpg', chip: 'PLANNING · APPROVAL',
      body: 'Planning and resource allocation propose a sequence against equipment availability and operating constraints, then hold it for operator approval.' },
    { n: '03', t: 'Execute', img: 'sim-barge-402.jpg',        chip: 'EXECUTION \u00b7 RECORD',
      body: 'The approved plan reaches the crane operator, and the closing survey produces the outcome record for the job.' }
  ];
  return /*#__PURE__*/React.createElement('section', {
    style: { maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'var(--space-9) var(--container-pad) 0' }
  },
    /*#__PURE__*/React.createElement('div', {
      className: 'freq-hiw-head',
      style: { display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }
    },
      /*#__PURE__*/React.createElement('div', null,
        /*#__PURE__*/React.createElement(Eyebrow, null, 'How It Works'),
        /*#__PURE__*/React.createElement('h2', {
          style: { fontSize: 'clamp(26px, 3.4vw, 36px)', lineHeight: 1.1, maxWidth: 560, marginTop: 14 }
        }, 'Three steps, one record.')
      ),
      /*#__PURE__*/React.createElement(Button, {
        variant: 'secondary', size: 'md', onClick: () => onNav && onNav('simulation')
      }, 'Open the walkthrough')
    ),
    /*#__PURE__*/React.createElement('div', {
      className: 'freq-hiw-grid',
      style: { display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 20, marginTop: 28 }
    },
      steps.map((s, i) => /*#__PURE__*/React.createElement('div', {
        key: s.n, style: { display: 'flex', flexDirection: 'column', gap: 16 }
      },
        /*#__PURE__*/React.createElement(FreqPlate, {
          src: window.freqImg(s.img), rig: 'plate', ratio: '4 / 3', amp: 0.8
        },
          /*#__PURE__*/React.createElement('div', {
            'aria-hidden': true,
            style: { position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,12,24,0.55), transparent 40%, rgba(8,12,24,0.6))' }
          }),
          /*#__PURE__*/React.createElement('span', {
            className: 'mono',
            style: {
              position: 'absolute', top: 14, left: 14, fontSize: 26, lineHeight: 1,
              color: 'var(--signal-live)', letterSpacing: '0.04em', textShadow: '0 0 18px rgba(56,189,248,0.5)'
            }
          }, s.n),
          /*#__PURE__*/React.createElement('span', {
            className: 'mono',
            style: {
              position: 'absolute', bottom: 14, left: 14, fontSize: 10, letterSpacing: '0.16em',
              color: '#7DD3FC', padding: '5px 9px', border: '1px solid rgba(56,189,248,0.3)',
              borderRadius: 'var(--radius-sm)', background: 'rgba(8,12,24,0.6)'
            }
          }, s.chip)
        ),
        /*#__PURE__*/React.createElement('h3', {
          style: { fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, color: 'var(--text-headline)', lineHeight: 1.2 }
        }, s.t),
        /*#__PURE__*/React.createElement('p', {
          style: { fontSize: 15.5, lineHeight: 1.6, color: 'var(--text-body)', margin: 0 }
        }, s.body)
      ))
    )
  );
}
window.HowItWorks = HowItWorks;

/* ---- Investor: what the system is, and the components it runs on. ---- */
function OpsSystem() {
  const { Eyebrow } = window.FREQAIDesignSystem_019dc6;
  const parts = [
    { t: 'Operations record', s: 'Proposed', body: 'Tracks vessels, cargo, equipment, survey results, approvals, and each job\u2019s current status.' },
    { t: 'Planning engine',   s: 'Proposed', body: 'Sequences work around equipment availability, receiving capacity, inspection requirements, and operating restrictions.' },
    { t: 'Resource allocation', s: 'Proposed', body: 'Matches available cranes, vessels, crews and time windows to the approved cargo plan, while flagging conflicts for operator review.' },
    { t: 'Checks and operator approval', s: 'Proposed', body: 'Applies the operating checks a job must pass and holds the plan until an operator approves it. Nothing executes on the system\u2019s own authority.' },
    { t: 'Execution interface', s: 'Proposed', body: 'Presents the approved plan to the crane operator and captures what was actually worked.' },
    { t: 'Outcome record', s: 'Proposed', body: 'Closes the job with the readings, the approvals and the resulting quantity, kept together as one record.' }
  ];
  const boundaries = [
    ['Stale observations', 'A reading older than its window is shown as stale with its timestamp, and is not used in a plan until refreshed.'],
    ['Missing observations', 'A gap is reported as missing rather than interpolated. The affected job holds.'],
    ['Exceptions', 'Conflicts and failed checks are raised for operator review with the reason attached, not resolved silently.'],
    ['Approval boundary', 'The system proposes; an operator approves. Approval is recorded against the job.']
  ];
  return /*#__PURE__*/React.createElement('section', {
    style: { maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'var(--space-9) var(--container-pad) 0' }
  },
    /*#__PURE__*/React.createElement(Eyebrow, null, 'What The System Is'),
    /*#__PURE__*/React.createElement('div', {
      className: 'freq-ops-grid',
      style: { display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 0.9fr)', gap: 40, marginTop: 20, alignItems: 'start' }
    },
      /*#__PURE__*/React.createElement('div', null,
        /*#__PURE__*/React.createElement('h2', {
          style: { fontSize: 'clamp(26px, 3.4vw, 36px)', lineHeight: 1.12, maxWidth: 560 }
        }, 'A cargo-operations decision system \u2014 one terminal, one workflow.'),
        /*#__PURE__*/React.createElement('p', {
          style: { fontSize: 17, lineHeight: 1.65, color: 'var(--text-body)', maxWidth: 580, marginTop: 18 }
        }, 'Frequency Systems is a cargo-operations decision system, initially focused on one terminal and one cargo-transfer workflow.'),
        /*#__PURE__*/React.createElement('div', {
          style: { display: 'flex', flexDirection: 'column', gap: 1, marginTop: 26, border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }
        },
          /*#__PURE__*/React.createElement('div', {
            className: 'freq-ops-head',
            style: {
              display: 'grid', gridTemplateColumns: 'minmax(0, 0.7fr) minmax(0, 1.3fr)', gap: 16,
              padding: '12px 18px', background: 'rgba(8,12,24,0.7)', borderBottom: '1px solid var(--border-faint)'
            }
          },
            /*#__PURE__*/React.createElement('span', { className: 'mono', style: { fontSize: 11, letterSpacing: '0.16em', color: 'var(--text-faint)', textTransform: 'uppercase' } }, 'Component'),
            /*#__PURE__*/React.createElement('span', { className: 'mono', style: { fontSize: 11, letterSpacing: '0.16em', color: 'var(--text-faint)', textTransform: 'uppercase' } }, 'What it does \u00b7 status')
          ),
          parts.map(p => /*#__PURE__*/React.createElement('div', {
            key: p.t,
            className: 'freq-ops-row',
            style: {
              display: 'grid', gridTemplateColumns: 'minmax(0, 0.7fr) minmax(0, 1.3fr)', gap: 16,
              padding: '16px 18px', background: 'var(--surface-card)', borderTop: '1px solid var(--border-faint)'
            }
          },
            /*#__PURE__*/React.createElement('span', {
              style: { fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, color: 'var(--text-headline)', lineHeight: 1.3 }
            }, p.t),
            /*#__PURE__*/React.createElement('span', null,
              /*#__PURE__*/React.createElement('span', {
                style: { display: 'block', fontSize: 15, lineHeight: 1.6, color: 'var(--text-body)' }
              }, p.body),
              /*#__PURE__*/React.createElement('span', {
                className: 'mono',
                style: { display: 'inline-block', marginTop: 8, fontSize: 10, letterSpacing: '0.12em', color: 'var(--text-faint)', textTransform: 'uppercase' }
              }, p.s + ' product behaviour \u00b7 not connected equipment')
            )
          ))
        ),
        /*#__PURE__*/React.createElement('h3', {
          style: { fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, color: 'var(--text-headline)', marginTop: 34 }
        }, 'Where the system stops'),
        /*#__PURE__*/React.createElement('div', {
          style: { display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 }
        }, boundaries.map(([k, v]) => /*#__PURE__*/React.createElement('div', {
          key: k, style: { display: 'flex', flexDirection: 'column', gap: 3 }
        },
          /*#__PURE__*/React.createElement('span', {
            className: 'mono', style: { fontSize: 10.5, letterSpacing: '0.12em', color: 'var(--signal-live)', textTransform: 'uppercase' }
          }, k),
          /*#__PURE__*/React.createElement('span', {
            style: { fontSize: 14.5, lineHeight: 1.55, color: 'var(--text-body)' }
          }, v)
        )))
      ),
      /*#__PURE__*/React.createElement(FreqPlate, {
        src: window.freqImg('architecture-diagram.jpg'), rig: 'plate', ratio: '3 / 4', amp: 0.75
      },
        /*#__PURE__*/React.createElement('div', {
          'aria-hidden': true,
          style: { position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,12,24,0.4), transparent 34%, rgba(8,12,24,0.66))' }
        }),
        /*#__PURE__*/React.createElement('span', {
          className: 'mono',
          style: {
            position: 'absolute', bottom: 16, left: 16, right: 16, fontSize: 11, letterSpacing: '0.14em',
            color: '#7DD3FC', textTransform: 'uppercase'
          }
        }, 'Illustrative render \u00B7 one terminal, one cargo-transfer workflow')
      )
    )
  );
}
window.OpsSystem = OpsSystem;

/* ---- Home hero: the plate itself becomes a dimensional camera shot. ---- */
function HeroDepth({ src }) {
  const hostRef = React.useRef(null);
  React.useEffect(() => {
    if (!hostRef.current || !window.FreqDepthStage) return;
    const st = window.FreqDepthStage.create(hostRef.current, { src, rig: 'hero', amp: 0.9 });
    return () => st.destroy();
  }, [src]);
  return /*#__PURE__*/React.createElement('div', {
    ref: hostRef,
    'aria-hidden': true,
    className: 'freq-hero-bg',
    style: {
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      backgroundImage: `url(${src})`,
      backgroundSize: 'cover',
      backgroundPosition: '52% 44%'
    }
  });
}
window.HeroDepth = HeroDepth;

/* ---- Architecture hero: the layer-stack render, on the depth camera.
   Keeps an accessible <img> underneath so the alt text and no-WebGL path survive. ---- */
function ArchPlate({ src, alt }) {
  const hostRef = React.useRef(null);
  React.useEffect(() => {
    if (!hostRef.current || !window.FreqDepthStage) return;
    const st = window.FreqDepthStage.create(hostRef.current, { src, rig: 'plate', amp: 0.7 });
    return () => st.destroy();
  }, [src]);
  return /*#__PURE__*/React.createElement('div', {
    ref: hostRef,
    style: { position: 'absolute', inset: 0, overflow: 'hidden' }
  },
    /*#__PURE__*/React.createElement('img', {
      src: src,
      alt: alt,
      style: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' }
    })
  );
}
window.ArchPlate = ArchPlate;

/* ---- Investor: scope, status, milestone and a working contact path. ---- */
function InvestorPath({ onNav }) {
  const { Eyebrow, Button } = window.FREQAIDesignSystem_019dc6;
  const EMAIL = window.FREQ.EMAIL;
  const items = [
    ['The problem', 'At an inland terminal, cargo-transfer decisions rest on observations collected and reconciled by hand across separate people and records. The current state of a job is hard to establish quickly, and the reasoning behind a decision is rarely kept with its outcome.'],
    ['Initial scope', 'One terminal and one cargo-transfer workflow. Not a fleet platform, and not a general terminal operating system.'],
    ['Operating workflow', 'Observations enter an operations record; planning and resource allocation propose a plan; checks run and an operator approves; the execution interface presents the approved plan; the outcome is recorded with its approvals.'],
    ['Validation status', 'Pre-pilot. The six-phase walkthrough is a controlled simulation on configured scenario values. No field performance, accuracy figure or terminal relationship is claimed on this site.'],
    ['Next demonstrable milestone', 'A single cargo transfer run end to end against one terminal\u2019s real operating constraints, with the outcome record produced by the system.']
  ];
  return /*#__PURE__*/React.createElement('section', {
    style: { maxWidth: 'var(--container-max)', margin: '0 auto', padding: 'var(--space-9) var(--container-pad) 0' }
  },
    /*#__PURE__*/React.createElement(Eyebrow, null, 'Where This Stands'),
    /*#__PURE__*/React.createElement('div', {
      style: { display: 'flex', flexDirection: 'column', gap: 0, marginTop: 20, border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }
    }, items.map(([k, v], n) => /*#__PURE__*/React.createElement('div', {
      key: k,
      className: 'freq-path-row',
      style: {
        display: 'grid', gridTemplateColumns: 'minmax(0, 0.6fr) minmax(0, 1.4fr)', gap: 18,
        padding: '16px 18px', background: 'var(--surface-card)',
        borderTop: n === 0 ? 'none' : '1px solid var(--border-faint)', alignItems: 'start'
      }
    },
      /*#__PURE__*/React.createElement('span', {
        style: { fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, color: 'var(--text-headline)', lineHeight: 1.3 }
      }, k),
      /*#__PURE__*/React.createElement('span', {
        style: { fontSize: 15, lineHeight: 1.62, color: 'var(--text-body)' }
      }, v)
    ))),
    /*#__PURE__*/React.createElement('div', {
      style: { display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 26, alignItems: 'center' }
    },
      /*#__PURE__*/React.createElement('a', {
        href: 'mailto:' + EMAIL + '?subject=Discuss%20a%20pilot',
        style: { textDecoration: 'none' }
      }, /*#__PURE__*/React.createElement(Button, { variant: 'primary', size: 'lg' }, 'Discuss a pilot')),
      /*#__PURE__*/React.createElement('a', {
        href: 'mailto:' + EMAIL + '?subject=Request%20investor%20brief',
        style: { textDecoration: 'none' }
      }, /*#__PURE__*/React.createElement(Button, { variant: 'secondary', size: 'lg' }, 'Request investor brief')),
      /*#__PURE__*/React.createElement('span', {
        className: 'mono', style: { fontSize: 12, color: 'var(--text-muted)', letterSpacing: '0.04em' }
      }, EMAIL)
    )
  );
}
window.InvestorPath = InvestorPath;
