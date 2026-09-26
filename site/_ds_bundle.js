/* @ds-bundle: {"format":4,"namespace":"FREQAIDesignSystem_019dc6","components":[{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"StatusBadge","sourcePath":"components/core/StatusBadge.jsx"},{"name":"PhaseButton","sourcePath":"components/data/PhaseButton.jsx"},{"name":"TelemetryStat","sourcePath":"components/data/TelemetryStat.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"}],"sourceHashes":{"components/core/Button.jsx":"1f678cf09ff6","components/core/Card.jsx":"831bd654de1c","components/core/Eyebrow.jsx":"8a0a3db79a02","components/core/StatusBadge.jsx":"7f5101f5529a","components/data/PhaseButton.jsx":"2c7a71b941e3","components/data/TelemetryStat.jsx":"5d02f686edde","components/forms/Input.jsx":"244f35eda608","components/forms/Select.jsx":"2866457dd482","ui_kits/freqsystems-dev/ArchitecturePage.jsx":"769e4351477d","ui_kits/freqsystems-dev/ContactPage.jsx":"a7d221d44052","ui_kits/freqsystems-dev/Footer.jsx":"7713e8907f6a","ui_kits/freqsystems-dev/Header.jsx":"e8524d7afae5","ui_kits/freqsystems-dev/HeroMark.jsx":"1589987c8fc0","ui_kits/freqsystems-dev/HomePage.jsx":"57681d4bebc8","ui_kits/freqsystems-dev/Icon.jsx":"9dc18517937c","ui_kits/freqsystems-dev/InvestorPage.jsx":"0a3c5cb85477","ui_kits/freqsystems-dev/MotionSystem.jsx":"f2b1fd38ddd5","ui_kits/freqsystems-dev/PhaseScene.jsx":"387835415fd4","ui_kits/freqsystems-dev/SimulationPage.jsx":"18731e32d1ff","ui_kits/freqsystems-dev/Stage.jsx":"23b507440141","ui_kits/freqsystems-dev/Wordmark.jsx":"725e939226a9","ui_kits/freqsystems-dev/app.prod.js":"c64c80ae41dd","ui_kits/freqsystems-dev/assets-inline.js":"6037f9b59550","ui_kits/freqsystems-dev/data.js":"599a0bdcd99f","ui_kits/freqsystems-dev/motion.jsx":"f3d458804740"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.FREQAIDesignSystem_019dc6 = window.FREQAIDesignSystem_019dc6 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Frequency Systems — Button
 * Sovereign, engineered. Three variants. NOTE: electric blue (live-data signal)
 * is intentionally never used here — secondary uses indigo per the color rule.
 */
function Button({
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  iconLeft = null,
  iconRight = null,
  children,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      padding: '0 14px',
      height: 34,
      font: 13
    },
    md: {
      padding: '0 20px',
      height: 42,
      font: 14
    },
    lg: {
      padding: '0 28px',
      height: 52,
      font: 16
    }
  };
  const s = sizes[size] || sizes.md;
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    height: s.height,
    padding: s.padding,
    fontFamily: 'var(--font-body)',
    fontSize: s.font,
    fontWeight: 600,
    letterSpacing: '0.01em',
    borderRadius: 'var(--radius-md)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    border: '1px solid transparent',
    transition: 'background var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard), opacity var(--dur-fast) var(--ease-standard)',
    whiteSpace: 'nowrap',
    userSelect: 'none'
  };
  const variants = {
    // White button — the primary action ("View Architecture")
    primary: {
      background: 'var(--white)',
      color: 'var(--dm-bg)',
      borderColor: 'var(--white)'
    },
    // Indigo outline — secondary action ("See Simulation Ground")
    secondary: {
      background: 'transparent',
      color: 'var(--text-strong)',
      borderColor: 'var(--indigo)'
    },
    // Ghost — tertiary / nav
    ghost: {
      background: 'transparent',
      color: 'var(--text-body)',
      borderColor: 'transparent'
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    "data-variant": variant,
    className: "freq-btn",
    style: {
      ...base,
      ...(variants[variant] || variants.primary),
      ...style
    }
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Frequency Systems — Card
 * The base surface primitive: Dark Matter panel, 1px indigo hairline border,
 * 6px radius. Depth from border + faint inner sheen, never a fluffy shadow.
 * Optional eyebrow + icon header.
 */
function Card({
  eyebrow,
  title,
  icon = null,
  raised = false,
  interactive = false,
  children,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: "freq-card",
    "data-interactive": interactive ? '' : undefined,
    style: {
      background: raised ? 'var(--surface-raised)' : 'var(--surface-card)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-md)',
      padding: 'var(--space-5)',
      boxShadow: 'var(--shadow-panel)',
      transition: interactive ? 'border-color var(--dur-base) var(--ease-standard), transform var(--dur-base) var(--ease-standard)' : 'none',
      cursor: interactive ? 'pointer' : 'default',
      ...style
    }
  }, rest), (icon || eyebrow) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 14
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)',
      display: 'inline-flex'
    }
  }, icon), eyebrow && /*#__PURE__*/React.createElement("span", {
    className: "freq-eyebrow"
  }, eyebrow)), title && /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--text-h3)',
      marginBottom: 8
    }
  }, title), children && /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--text-body)',
      fontSize: 15,
      lineHeight: 1.6
    }
  }, children));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Frequency Systems — Eyebrow
 * Mono, uppercase, wide-tracked label. Optional leading live-dot.
 * When `live` is set, the dot is electric blue + glow (legitimate — it marks
 * a live surface like the hero badge: "BARGE-402 · LIVE · METRICS-LOCKED").
 */
function Eyebrow({
  children,
  live = false,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      ...style
    }
  }, rest), live && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: '999px',
      background: 'var(--signal-live)',
      boxShadow: 'var(--glow-live-dot)',
      flex: 'none',
      animation: 'freqPulse 2s var(--ease-standard) infinite'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-micro)',
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, children));
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/core/StatusBadge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Frequency Systems — StatusBadge
 * Status token with a leading dot. Used for phase state (QUEUED/LIVE/DONE)
 * and system status (ACTIVE/PENDING/FAULT). The "live" status is the one
 * place electric blue + glow appear on a badge — because it IS live data.
 */
function StatusBadge({
  status = 'active',
  label,
  glow,
  style = {},
  ...rest
}) {
  const map = {
    active: {
      color: 'var(--status-active)',
      wash: 'var(--active-wash)',
      text: 'ACTIVE'
    },
    pending: {
      color: 'var(--status-pending)',
      wash: 'var(--pending-wash)',
      text: 'PENDING'
    },
    fault: {
      color: 'var(--status-fault)',
      wash: 'var(--fault-wash)',
      text: 'FAULT'
    },
    live: {
      color: 'var(--signal-live)',
      wash: 'var(--live-wash)',
      text: 'LIVE'
    },
    queued: {
      color: 'var(--gray-500)',
      wash: 'rgba(138,151,173,0.10)',
      text: 'QUEUED'
    },
    done: {
      color: 'var(--status-active)',
      wash: 'var(--active-wash)',
      text: 'DONE'
    }
  };
  const c = map[status] || map.active;
  const showGlow = glow ?? (status === 'live' || status === 'active');
  return /*#__PURE__*/React.createElement("span", _extends({
    "data-status": status,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      height: 24,
      padding: '0 10px',
      borderRadius: 'var(--radius-pill)',
      background: c.wash,
      border: `1px solid ${c.color}`,
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.12em',
      color: c.color,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: '999px',
      background: c.color,
      boxShadow: showGlow ? `0 0 8px 0 ${c.color}` : 'none',
      flex: 'none'
    }
  }), label || c.text);
}
Object.assign(__ds_scope, { StatusBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/StatusBadge.jsx", error: String((e && e.message) || e) }); }

// components/data/PhaseButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Frequency Systems — PhaseButton
 * One button in the Simulation phase rail. Shows index, phase name and its
 * state (QUEUED / LIVE / DONE). Clicking jumps the simulation to that phase
 * (state-driven interactive motion). The LIVE phase border glows electric blue.
 */
function PhaseButton({
  index,
  name,
  state = 'queued',
  // 'queued' | 'live' | 'done'
  onClick,
  style = {},
  ...rest
}) {
  const isLive = state === 'live';
  const isDone = state === 'done';
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    onClick: onClick,
    "data-state": state,
    style: {
      flex: 1,
      minWidth: 0,
      textAlign: 'left',
      background: isLive ? 'var(--live-wash)' : 'var(--surface-card)',
      border: `1px solid ${isLive ? 'var(--signal-live)' : isDone ? 'var(--border-default)' : 'var(--border-faint)'}`,
      boxShadow: isLive ? '0 0 18px -4px var(--live-glow)' : 'none',
      borderRadius: 'var(--radius-md)',
      padding: '12px 14px',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      transition: 'border-color var(--dur-base) var(--ease-standard), background var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard)'
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--text-muted)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, String(index).padStart(2, '0')), /*#__PURE__*/React.createElement(__ds_scope.StatusBadge, {
    status: state
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 14,
      fontWeight: 600,
      color: isLive || isDone ? 'var(--text-headline)' : 'var(--text-muted)',
      lineHeight: 1.2,
      letterSpacing: '-0.01em'
    }
  }, name));
}
Object.assign(__ds_scope, { PhaseButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/PhaseButton.jsx", error: String((e && e.message) || e) }); }

// components/data/TelemetryStat.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Frequency Systems — TelemetryStat
 * A single live readout: mono label + mono value. The value is electric blue
 * because it is live data — this is the canonical, allowed use of the signal.
 * Set `live={false}` for a static/spec value (renders in white, not blue).
 */
function TelemetryStat({
  label,
  value,
  unit,
  live = true,
  align = 'left',
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      alignItems: align === 'right' ? 'flex-end' : 'flex-start',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-micro)',
      letterSpacing: 'var(--tracking-caps)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'baseline',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 26,
      fontWeight: 500,
      lineHeight: 1,
      fontVariantNumeric: 'tabular-nums',
      color: live ? 'var(--data-live)' : 'var(--text-headline)',
      textShadow: live ? '0 0 16px rgba(56,189,248,0.35)' : 'none',
      transition: 'color var(--dur-base) var(--ease-out)'
    }
  }, value), unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, unit)));
}
Object.assign(__ds_scope, { TelemetryStat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/TelemetryStat.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Frequency Systems — Input
 * Text field / textarea on Dark Matter. Indigo hairline, mono-free body text.
 * Focus brightens the border to full indigo (no electric blue — not live data).
 */
function Input({
  label,
  hint,
  multiline = false,
  rows = 4,
  id,
  style = {},
  ...rest
}) {
  const fieldId = id || (label ? `freq-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const fieldStyle = {
    width: '100%',
    background: 'var(--surface-card)',
    border: '1px solid var(--border-default)',
    borderRadius: 'var(--radius-md)',
    color: 'var(--text-strong)',
    fontFamily: 'var(--font-body)',
    fontSize: 15,
    padding: multiline ? '12px 14px' : '0 14px',
    height: multiline ? 'auto' : 46,
    lineHeight: 1.6,
    outline: 'none',
    resize: multiline ? 'vertical' : undefined,
    transition: 'border-color var(--dur-fast) var(--ease-standard), background var(--dur-fast) var(--ease-standard)',
    ...style
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 7
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    className: "freq-eyebrow",
    style: {
      color: 'var(--text-strong)'
    }
  }, label), multiline ? /*#__PURE__*/React.createElement("textarea", _extends({
    id: fieldId,
    rows: rows,
    className: "freq-field",
    style: fieldStyle
  }, rest)) : /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    className: "freq-field",
    style: fieldStyle
  }, rest)), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Frequency Systems — Select
 * Native dropdown styled to match Input. Used for Contact "Project Type".
 * Custom chevron, indigo hairline, Dark Matter surface.
 */
function Select({
  label,
  hint,
  options = [],
  placeholder,
  id,
  style = {},
  ...rest
}) {
  const fieldId = id || (label ? `freq-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 7
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    className: "freq-eyebrow",
    style: {
      color: 'var(--text-strong)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: fieldId,
    className: "freq-field",
    style: {
      width: '100%',
      appearance: 'none',
      WebkitAppearance: 'none',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-md)',
      color: 'var(--text-strong)',
      fontFamily: 'var(--font-body)',
      fontSize: 15,
      padding: '0 38px 0 14px',
      height: 46,
      outline: 'none',
      cursor: 'pointer',
      transition: 'border-color var(--dur-fast) var(--ease-standard)',
      ...style
    },
    defaultValue: ""
  }, rest), placeholder && /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, placeholder), options.map(opt => {
    const value = typeof opt === 'string' ? opt : opt.value;
    const text = typeof opt === 'string' ? opt : opt.label;
    return /*#__PURE__*/React.createElement("option", {
      key: value,
      value: value
    }, text);
  })), /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      position: 'absolute',
      right: 14,
      top: '50%',
      transform: 'translateY(-50%)',
      color: 'var(--text-muted)',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "m6 9 6 6 6-6"
  }))), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, hint));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// ui_kits/freqsystems-dev/ArchitecturePage.jsx
try { (() => {
// Frequency Systems — ARCHITECTURE. Technical explainer. No motion.
function ArchitecturePage() {
  const {
    Card,
    Eyebrow
  } = window.FREQAIDesignSystem_019dc6;
  const modules = [{
    n: '01',
    t: 'Vessel Mirror',
    d: 'A continuously reconciled software twin of BARGE-402 — draft, trim, ballast, cargo — updated from sensor truth, never assumption.'
  }, {
    n: '02',
    t: 'Decision Fabric',
    d: 'The deterministic orchestration layer. Survey, ballast, and load actions sequenced under locked constraints.'
  }, {
    n: '03',
    t: 'Draft Intelligence',
    d: 'Unmanned LiDAR survey across six stations, resolving mean draft to ±0.02 ft. Fourteen minutes, no crew on deck.'
  }, {
    n: '04',
    t: 'Locked Baseline',
    d: '45m × 10m hull, 1,482.6T maximum cargo, 12.45 ft mean draft. Fixed, verified — ground truth for every module.'
  }, {
    n: '05',
    t: 'Load Execution',
    d: 'Trim and load decisions translated into crane-side action, in step with the survey. Measurement and execution never drift.'
  }, {
    n: '06',
    t: 'Proof Surface',
    d: 'One live review surface. The numbers on screen are the numbers in the system — no separate marketing data path.'
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
  }, /*#__PURE__*/React.createElement("img", {
    src: window.freqImg('architecture-diagram.jpg'),
    alt: "BARGE-402 digital twin \u2014 six architecture layers from Sensor / LiDAR to Proof Surface",
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
  }, "Digital twin \xB7 six layers \xB7 L1 Sensor / LiDAR \u2192 L6 Proof Surface"))), /*#__PURE__*/React.createElement("div", {
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
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/freqsystems-dev/ArchitecturePage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/freqsystems-dev/ContactPage.jsx
try { (() => {
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
  }, "12.45 ft mean draft \xB7 \xB10.02 ft")), /*#__PURE__*/React.createElement("div", {
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
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/freqsystems-dev/ContactPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/freqsystems-dev/Footer.jsx
try { (() => {
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
  }, "Autonomous maritime cargo intelligence. Proven on BARGE-402.")), /*#__PURE__*/React.createElement("div", {
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
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/freqsystems-dev/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/freqsystems-dev/Header.jsx
try { (() => {
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
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/freqsystems-dev/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/freqsystems-dev/HeroMark.jsx
try { (() => {
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
  const src = window.freqImg('freq-brand-logo.png');
  if (variant === 'ambient') {
    // Flagship hero composite: the orbital core blazes on the right, feathered into
    // Dark Matter under the headline column. Cinematic exposure + vignette + a faint
    // electric rim give it edge. Light multi-axis parallax drift only.
    const hero = window.freqImg('hero-core.jpg');
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
        backgroundPosition: '70% 44%',
        filter: 'brightness(1.14) saturate(1.12) contrast(1.05)',
        transition: 'transform 260ms var(--ease-out)'
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
      backgroundPosition: '50% 33%',
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
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/freqsystems-dev/HeroMark.jsx", error: String((e && e.message) || e) }); }

// ui_kits/freqsystems-dev/HomePage.jsx
try { (() => {
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
    title: 'Vessel Mirror',
    body: 'A software twin of BARGE-402, reconciled from sensor truth — never assumption.'
  }, {
    icon: 'layout-grid',
    title: 'Decision Fabric',
    body: 'A deterministic core that sequences survey, ballast, and load under locked constraints.'
  }, {
    icon: 'scan-line',
    title: 'Draft Intelligence',
    body: 'Unmanned LiDAR survey — ±0.02 ft across six stations, in fourteen minutes.'
  }, {
    icon: 'lock',
    title: 'Locked Baseline',
    body: '45m × 10m, 1,482.6T max cargo, 12.45 ft mean draft. Fixed and verified.'
  }, {
    icon: 'move-3d',
    title: 'Load Execution',
    body: 'Trim and load decisions executed crane-side, in step with the survey.'
  }, {
    icon: 'activity',
    title: 'Proof Surface',
    body: 'Every number on screen is the number in the system. One source of truth.'
  }];
  const pipeline = ['Sensor / LiDAR', 'BARGE-402 Draft', 'Decision Fabric', 'Simulation Ground', 'Load Execution', 'Investor Decision'];
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
      minHeight: '86vh',
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(HeroMark, {
    variant: "ambient",
    offset: par
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      inset: '-40px',
      backgroundImage: 'linear-gradient(var(--indigo-line-2) 1px, transparent 1px), linear-gradient(90deg, var(--indigo-line-2) 1px, transparent 1px)',
      backgroundSize: '48px 48px',
      transform: `translate(${par.x * -10}px, ${par.y * -10}px)`,
      transition: 'transform 240ms var(--ease-out)',
      maskImage: 'radial-gradient(80% 110% at 6% 42%, #000 26%, transparent 64%)',
      WebkitMaskImage: 'radial-gradient(80% 110% at 6% 42%, #000 26%, transparent 64%)',
      opacity: 0.7
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "freq-hero-content freq-enter",
    style: {
      position: 'relative',
      width: '100%',
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '120px var(--container-pad) 104px'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    live: true
  }, "BARGE-402 \xB7 LIVE \xB7 METRICS-LOCKED"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'clamp(42px, 6.2vw, 68px)',
      lineHeight: 1.02,
      maxWidth: 640,
      marginTop: 22
    }
  }, "Autonomous Maritime Cargo Intelligence"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 19,
      lineHeight: 1.6,
      color: 'var(--text-body)',
      maxWidth: 560,
      marginTop: 24
    }
  }, "A manual draft survey takes a four-person crew four hours on open deck. Frequency runs it in fourteen minutes, unmanned, accurate to \xB10.02 ft \u2014 proven on BARGE-402 and ready to scale across the fleet."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      marginTop: 36,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    onClick: () => onNav('architecture')
  }, "View Architecture"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg",
    onClick: () => onNav('simulation')
  }, "See Simulation Ground")))), /*#__PURE__*/React.createElement("section", {
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
  })))))), /*#__PURE__*/React.createElement("section", {
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
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/freqsystems-dev/HomePage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/freqsystems-dev/Icon.jsx
try { (() => {
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
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/freqsystems-dev/Icon.jsx", error: String((e && e.message) || e) }); }

// ui_kits/freqsystems-dev/InvestorPage.jsx
try { (() => {
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
  const metrics = [{
    label: 'Survey time',
    node: /*#__PURE__*/React.createElement(CountUp, {
      target: 14
    }),
    unit: 'min',
    sub: 'Down from 4 hours, manned.'
  }, {
    label: 'Draft accuracy',
    node: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 30,
        verticalAlign: 'top'
      }
    }, "\xB1"), /*#__PURE__*/React.createElement(CountUp, {
      target: 0.02,
      decimals: 2
    })),
    unit: 'ft',
    sub: 'Across all six stations.'
  }, {
    label: 'Max cargo',
    node: /*#__PURE__*/React.createElement(CountUp, {
      target: 1482.6,
      decimals: 1
    }),
    unit: 'T',
    sub: 'BARGE-402, locked.'
  }, {
    label: 'Crew on deck',
    node: /*#__PURE__*/React.createElement(CountUp, {
      target: 0
    }),
    unit: '',
    sub: 'Fully unmanned survey.'
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
  }, "BARGE-402 \xB7 PROVEN \xB7 METRICS-LOCKED"), /*#__PURE__*/React.createElement("h1", {
    className: "freq-rise",
    style: {
      fontSize: 'clamp(36px, 5.5vw, 60px)',
      lineHeight: 1.05,
      maxWidth: 820,
      marginTop: 22
    }
  }, "The proof, in numbers."), /*#__PURE__*/React.createElement("p", {
    className: "freq-rise",
    style: {
      fontSize: 19,
      lineHeight: 1.6,
      color: 'var(--text-body)',
      maxWidth: 600,
      marginTop: 22,
      animationDelay: '90ms'
    }
  }, "Frequency is not a forecast. It is a measured result on a real vessel \u2014 a four-hour manual survey replaced by a fourteen-minute unmanned run, accurate to two hundredths of a foot."))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--space-9) var(--container-pad) 0'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Locked Proof"), /*#__PURE__*/React.createElement("div", {
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
  }, "MANUAL SURVEY"), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: '16px 0 0',
      padding: 0,
      listStyle: 'none',
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, ['Four-person crew on open deck', 'Four hours per survey', 'Reading error compounds by hand', 'Weather and fatigue exposed'].map(t => /*#__PURE__*/React.createElement("li", {
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
  }, "FREQUENCY"), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: '16px 0 0',
      padding: 0,
      listStyle: 'none',
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, ['Unmanned, zero crew on deck', 'Fourteen minutes per survey', 'Accurate to ±0.02 ft, repeatable', 'Runs in any condition, on demand'].map(t => /*#__PURE__*/React.createElement("li", {
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
  }, "Scale the proven layer across the fleet"), /*#__PURE__*/React.createElement("p", {
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
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/freqsystems-dev/InvestorPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/freqsystems-dev/MotionSystem.jsx
try { (() => {
// Frequency Systems — Motion System table (Simulation page only).
// The proper 2026 motion terminology, with each technique's status on Frequency Systems:
// Active (runs now, on the sovereign CSS/SVG stack) or Future (real technique,
// needs a heavier engine we don't run). Motion lives ONLY on this page.
function MotionSystem() {
  const {
    Eyebrow
  } = window.FREQAIDesignSystem_019dc6;
  const rows = [{
    t: 'State-Driven Interactive Motion',
    domain: 'System Logic',
    win: '1–2s',
    status: 'active',
    use: 'The phase rail and hover-to-probe scan update the proof surface live from one state engine.'
  }, {
    t: 'Physics-Based Micro-Interactions',
    domain: 'Rigid Body Dynamics',
    win: '1–3s',
    status: 'active',
    use: 'The pause / resume button — a small natural bounce on press, never a flat linear click.'
  }, {
    t: 'Telemetry Data Mapping',
    domain: 'Environmental Monitoring',
    win: '1–5s',
    status: 'active',
    use: 'The whole stage — draft, trim and cargo numbers drive the graphics in real time.'
  }, {
    t: 'Kinetic Responsive Typography',
    domain: 'Fluid Dynamics',
    win: '1–3s',
    status: 'active',
    use: 'The live caption and telemetry readouts re-type cleanly each time the phase changes.'
  }, {
    t: 'Scroll-Driven Multi-Axis Parallax',
    domain: 'Kinematics',
    win: '3–5s',
    status: 'active-light',
    use: 'Used once — the hero background on Home, a few pixels of drift — and nowhere else.'
  }, {
    t: 'Geospatial Digital Twin Visualization',
    domain: 'Telemetry Mapping',
    win: 'Continuous',
    status: 'future',
    use: 'Would require Cesium or a mapping engine. Not part of this sovereign build.'
  }, {
    t: 'Gaussian Splatting Interpretation',
    domain: 'Realistic Imagery',
    win: '2–4s',
    status: 'future',
    use: 'Photo-real 3D scenes; needs a splat-rendering library. Not part of this build.'
  }, {
    t: 'Real-World Scale Topology',
    domain: 'Geometry Scaling',
    win: 'Continuous',
    status: 'future-spirit',
    use: "Spirit already followed — crane and barge scaled to BARGE-402's real 45m × 10m, in 2D SVG."
  }, {
    t: 'Ambient Occlusion Shading',
    domain: 'Photorealistic Lighting',
    win: 'Continuous',
    status: 'future-spirit',
    use: 'A simplified version — one soft contact shadow under the hull — is already on the stage.'
  }, {
    t: 'Rigged Motion Capture Sequences',
    domain: 'Biomechanical Simulation',
    win: '2–5s',
    status: 'future',
    use: 'Not applicable — there are no characters or rigged figures on this site.'
  }];
  const badge = {
    active: {
      label: 'ACTIVE',
      color: 'var(--status-active)',
      wash: 'var(--active-wash)'
    },
    'active-light': {
      label: 'ACTIVE · LIGHT',
      color: 'var(--status-active)',
      wash: 'var(--active-wash)'
    },
    future: {
      label: 'FUTURE',
      color: 'var(--text-muted)',
      wash: 'rgba(138,151,173,0.08)'
    },
    'future-spirit': {
      label: 'FUTURE · SPIRIT',
      color: 'var(--status-pending)',
      wash: 'var(--pending-wash)'
    }
  };
  return /*#__PURE__*/React.createElement("section", {
    style: {
      marginTop: 'var(--space-9)'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "The Motion System"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'clamp(26px, 3.5vw, 36px)',
      marginTop: 16,
      maxWidth: 760
    }
  }, "Motion only happens here. Every other page is still."), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-body)',
      fontSize: 16,
      lineHeight: 1.6,
      maxWidth: 720,
      marginTop: 16
    }
  }, "The full 2026 vocabulary for interactive web motion, with each technique's status on Frequency Systems. Active techniques run on a sovereign CSS + SVG stack \u2014 no Three.js, no heavy 3D engine. Motion here follows Tubik's six effective types \u2014 hero/entrance, loading, navigation, attention accents, sequence, and aesthetic motion \u2014 used as a behaviour tool, never decoration. That restraint is what makes the simulation feel earned."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28,
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      background: 'var(--surface-card)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "freq-motion-head",
    style: {
      display: 'grid',
      gridTemplateColumns: '1.3fr 140px 2.1fr 96px',
      gap: 16,
      padding: '14px 22px',
      borderBottom: '1px solid var(--border-faint)',
      background: 'var(--surface-raised)'
    }
  }, ['Technique', 'Status', 'Where it runs', 'Window'].map(h => /*#__PURE__*/React.createElement("span", {
    key: h,
    className: "freq-eyebrow"
  }, h))), rows.map((r, i) => {
    const b = badge[r.status];
    return /*#__PURE__*/React.createElement("div", {
      key: r.t,
      className: "freq-motion-row",
      style: {
        display: 'grid',
        gridTemplateColumns: '1.3fr 140px 2.1fr 96px',
        gap: 16,
        alignItems: 'center',
        padding: '16px 22px',
        borderBottom: i < rows.length - 1 ? '1px solid var(--border-faint)' : 'none'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 15,
        fontWeight: 600,
        color: 'var(--text-headline)',
        lineHeight: 1.25
      }
    }, r.t), /*#__PURE__*/React.createElement("span", {
      className: "mono",
      style: {
        fontSize: 11,
        color: 'var(--text-faint)'
      }
    }, r.domain)), /*#__PURE__*/React.createElement("span", {
      style: {
        justifySelf: 'start',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        whiteSpace: 'nowrap',
        height: 22,
        padding: '0 9px',
        borderRadius: 'var(--radius-pill)',
        background: b.wash,
        border: `1px solid ${b.color}`,
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        letterSpacing: '0.08em',
        color: b.color
      }
    }, b.label), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        color: 'var(--text-body)',
        lineHeight: 1.55
      }
    }, r.use), /*#__PURE__*/React.createElement("span", {
      className: "mono freq-motion-win",
      style: {
        fontSize: 12,
        color: 'var(--text-muted)'
      }
    }, r.win));
  })));
}
window.MotionSystem = MotionSystem;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/freqsystems-dev/MotionSystem.jsx", error: String((e && e.message) || e) }); }

// ui_kits/freqsystems-dev/PhaseScene.jsx
try { (() => {
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
  ['crane.jpg', 'crane.png', 'sim-barge-402.png'],
  // 03 Crane Position
  ['cargo.jpg', 'cargo.png', 'sim-barge-402.png'],
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
    className: "ov-photo",
    style: {
      position: 'absolute',
      inset: 0,
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
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/freqsystems-dev/PhaseScene.jsx", error: String((e && e.message) || e) }); }

// ui_kits/freqsystems-dev/SimulationPage.jsx
try { (() => {
// Frequency Systems — SIMULATION. The ONLY page with motion.
// State-driven phase rail · telemetry data mapping · kinetic typography · physics pause button.
function SimulationPage() {
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
  }, "The simulation ground is the proof surface. Each phase orchestrates the LiDAR sweep, crane geometry, hold fill, draft, and trim \u2014 driven by a single state engine, not placeholder labels.")), /*#__PURE__*/React.createElement(HeroMark, {
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
  }, BARGE.id, " \xB7 ", BARGE.length, " \xD7 ", BARGE.beam, " \xB7 run ", BARGE.runtime, " min \xB7 accuracy ", BARGE.accuracy, " ft"))), /*#__PURE__*/React.createElement(MotionSystem, null));
}
window.SimulationPage = SimulationPage;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/freqsystems-dev/SimulationPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/freqsystems-dev/Stage.jsx
try { (() => {
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
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/freqsystems-dev/Stage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/freqsystems-dev/Wordmark.jsx
try { (() => {
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
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/freqsystems-dev/Wordmark.jsx", error: String((e && e.message) || e) }); }

// ui_kits/freqsystems-dev/app.prod.js
try { (() => {
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
  const src = window.freqImg('freq-brand-logo.png');
  if (variant === 'ambient') {
    // Flagship hero composite: the orbital core blazes on the right, feathered into
    // Dark Matter under the headline column. Cinematic exposure + vignette + a faint
    // electric rim give it edge. Light multi-axis parallax drift only.
    const hero = window.freqImg('hero-core.jpg');
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
        backgroundPosition: '70% 44%',
        filter: 'brightness(1.14) saturate(1.12) contrast(1.05)',
        transition: 'transform 260ms var(--ease-out)'
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
      backgroundPosition: '50% 33%',
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
  }, "Autonomous maritime cargo intelligence. Proven on BARGE-402.")), /*#__PURE__*/React.createElement("div", {
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
  ['crane.jpg', 'crane.png', 'sim-barge-402.png'],
  // 03 Crane Position
  ['cargo.jpg', 'cargo.png', 'sim-barge-402.png'],
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
    className: "ov-photo",
    style: {
      position: 'absolute',
      inset: 0,
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

/* ==== MotionSystem.jsx ==== */
// Frequency Systems — Motion System table (Simulation page only).
// The proper 2026 motion terminology, with each technique's status on Frequency Systems:
// Active (runs now, on the sovereign CSS/SVG stack) or Future (real technique,
// needs a heavier engine we don't run). Motion lives ONLY on this page.
function MotionSystem() {
  const {
    Eyebrow
  } = window.FREQAIDesignSystem_019dc6;
  const rows = [{
    t: 'State-Driven Interactive Motion',
    domain: 'System Logic',
    win: '1–2s',
    status: 'active',
    use: 'The phase rail and hover-to-probe scan update the proof surface live from one state engine.'
  }, {
    t: 'Physics-Based Micro-Interactions',
    domain: 'Rigid Body Dynamics',
    win: '1–3s',
    status: 'active',
    use: 'The pause / resume button — a small natural bounce on press, never a flat linear click.'
  }, {
    t: 'Telemetry Data Mapping',
    domain: 'Environmental Monitoring',
    win: '1–5s',
    status: 'active',
    use: 'The whole stage — draft, trim and cargo numbers drive the graphics in real time.'
  }, {
    t: 'Kinetic Responsive Typography',
    domain: 'Fluid Dynamics',
    win: '1–3s',
    status: 'active',
    use: 'The live caption and telemetry readouts re-type cleanly each time the phase changes.'
  }, {
    t: 'Scroll-Driven Multi-Axis Parallax',
    domain: 'Kinematics',
    win: '3–5s',
    status: 'active-light',
    use: 'Used once — the hero background on Home, a few pixels of drift — and nowhere else.'
  }, {
    t: 'Geospatial Digital Twin Visualization',
    domain: 'Telemetry Mapping',
    win: 'Continuous',
    status: 'future',
    use: 'Would require Cesium or a mapping engine. Not part of this sovereign build.'
  }, {
    t: 'Gaussian Splatting Interpretation',
    domain: 'Realistic Imagery',
    win: '2–4s',
    status: 'future',
    use: 'Photo-real 3D scenes; needs a splat-rendering library. Not part of this build.'
  }, {
    t: 'Real-World Scale Topology',
    domain: 'Geometry Scaling',
    win: 'Continuous',
    status: 'future-spirit',
    use: "Spirit already followed — crane and barge scaled to BARGE-402's real 45m × 10m, in 2D SVG."
  }, {
    t: 'Ambient Occlusion Shading',
    domain: 'Photorealistic Lighting',
    win: 'Continuous',
    status: 'future-spirit',
    use: 'A simplified version — one soft contact shadow under the hull — is already on the stage.'
  }, {
    t: 'Rigged Motion Capture Sequences',
    domain: 'Biomechanical Simulation',
    win: '2–5s',
    status: 'future',
    use: 'Not applicable — there are no characters or rigged figures on this site.'
  }];
  const badge = {
    active: {
      label: 'ACTIVE',
      color: 'var(--status-active)',
      wash: 'var(--active-wash)'
    },
    'active-light': {
      label: 'ACTIVE · LIGHT',
      color: 'var(--status-active)',
      wash: 'var(--active-wash)'
    },
    future: {
      label: 'FUTURE',
      color: 'var(--text-muted)',
      wash: 'rgba(138,151,173,0.08)'
    },
    'future-spirit': {
      label: 'FUTURE · SPIRIT',
      color: 'var(--status-pending)',
      wash: 'var(--pending-wash)'
    }
  };
  return /*#__PURE__*/React.createElement("section", {
    style: {
      marginTop: 'var(--space-9)'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "The Motion System"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'clamp(26px, 3.5vw, 36px)',
      marginTop: 16,
      maxWidth: 760
    }
  }, "Motion only happens here. Every other page is still."), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-body)',
      fontSize: 16,
      lineHeight: 1.6,
      maxWidth: 720,
      marginTop: 16
    }
  }, "The full 2026 vocabulary for interactive web motion, with each technique's status on Frequency Systems. Active techniques run on a sovereign CSS + SVG stack \u2014 no Three.js, no heavy 3D engine. Motion here follows Tubik's six effective types \u2014 hero/entrance, loading, navigation, attention accents, sequence, and aesthetic motion \u2014 used as a behaviour tool, never decoration. That restraint is what makes the simulation feel earned."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28,
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      background: 'var(--surface-card)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "freq-motion-head",
    style: {
      display: 'grid',
      gridTemplateColumns: '1.3fr 140px 2.1fr 96px',
      gap: 16,
      padding: '14px 22px',
      borderBottom: '1px solid var(--border-faint)',
      background: 'var(--surface-raised)'
    }
  }, ['Technique', 'Status', 'Where it runs', 'Window'].map(h => /*#__PURE__*/React.createElement("span", {
    key: h,
    className: "freq-eyebrow"
  }, h))), rows.map((r, i) => {
    const b = badge[r.status];
    return /*#__PURE__*/React.createElement("div", {
      key: r.t,
      className: "freq-motion-row",
      style: {
        display: 'grid',
        gridTemplateColumns: '1.3fr 140px 2.1fr 96px',
        gap: 16,
        alignItems: 'center',
        padding: '16px 22px',
        borderBottom: i < rows.length - 1 ? '1px solid var(--border-faint)' : 'none'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 15,
        fontWeight: 600,
        color: 'var(--text-headline)',
        lineHeight: 1.25
      }
    }, r.t), /*#__PURE__*/React.createElement("span", {
      className: "mono",
      style: {
        fontSize: 11,
        color: 'var(--text-faint)'
      }
    }, r.domain)), /*#__PURE__*/React.createElement("span", {
      style: {
        justifySelf: 'start',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        whiteSpace: 'nowrap',
        height: 22,
        padding: '0 9px',
        borderRadius: 'var(--radius-pill)',
        background: b.wash,
        border: `1px solid ${b.color}`,
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        letterSpacing: '0.08em',
        color: b.color
      }
    }, b.label), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        color: 'var(--text-body)',
        lineHeight: 1.55
      }
    }, r.use), /*#__PURE__*/React.createElement("span", {
      className: "mono freq-motion-win",
      style: {
        fontSize: 12,
        color: 'var(--text-muted)'
      }
    }, r.win));
  })));
}
window.MotionSystem = MotionSystem;

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
    title: 'Vessel Mirror',
    body: 'A software twin of BARGE-402, reconciled from sensor truth — never assumption.'
  }, {
    icon: 'layout-grid',
    title: 'Decision Fabric',
    body: 'A deterministic core that sequences survey, ballast, and load under locked constraints.'
  }, {
    icon: 'scan-line',
    title: 'Draft Intelligence',
    body: 'Unmanned LiDAR survey — ±0.02 ft across six stations, in fourteen minutes.'
  }, {
    icon: 'lock',
    title: 'Locked Baseline',
    body: '45m × 10m, 1,482.6T max cargo, 12.45 ft mean draft. Fixed and verified.'
  }, {
    icon: 'move-3d',
    title: 'Load Execution',
    body: 'Trim and load decisions executed crane-side, in step with the survey.'
  }, {
    icon: 'activity',
    title: 'Proof Surface',
    body: 'Every number on screen is the number in the system. One source of truth.'
  }];
  const pipeline = ['Sensor / LiDAR', 'BARGE-402 Draft', 'Decision Fabric', 'Simulation Ground', 'Load Execution', 'Investor Decision'];
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
      minHeight: '86vh',
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(HeroMark, {
    variant: "ambient",
    offset: par
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": true,
    style: {
      position: 'absolute',
      inset: '-40px',
      backgroundImage: 'linear-gradient(var(--indigo-line-2) 1px, transparent 1px), linear-gradient(90deg, var(--indigo-line-2) 1px, transparent 1px)',
      backgroundSize: '48px 48px',
      transform: `translate(${par.x * -10}px, ${par.y * -10}px)`,
      transition: 'transform 240ms var(--ease-out)',
      maskImage: 'radial-gradient(80% 110% at 6% 42%, #000 26%, transparent 64%)',
      WebkitMaskImage: 'radial-gradient(80% 110% at 6% 42%, #000 26%, transparent 64%)',
      opacity: 0.7
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "freq-hero-content freq-enter",
    style: {
      position: 'relative',
      width: '100%',
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '120px var(--container-pad) 104px'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    live: true
  }, "BARGE-402 \xB7 LIVE \xB7 METRICS-LOCKED"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'clamp(42px, 6.2vw, 68px)',
      lineHeight: 1.02,
      maxWidth: 640,
      marginTop: 22
    }
  }, "Autonomous Maritime Cargo Intelligence"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 19,
      lineHeight: 1.6,
      color: 'var(--text-body)',
      maxWidth: 560,
      marginTop: 24
    }
  }, "A manual draft survey takes a four-person crew four hours on open deck. Frequency runs it in fourteen minutes, unmanned, accurate to \xB10.02 ft \u2014 proven on BARGE-402 and ready to scale across the fleet."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      marginTop: 36,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    onClick: () => onNav('architecture')
  }, "View Architecture"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg",
    onClick: () => onNav('simulation')
  }, "See Simulation Ground")))), /*#__PURE__*/React.createElement("section", {
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
  })))))), /*#__PURE__*/React.createElement("section", {
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

/* ==== SimulationPage.jsx ==== */
// Frequency Systems — SIMULATION. The ONLY page with motion.
// State-driven phase rail · telemetry data mapping · kinetic typography · physics pause button.
function SimulationPage() {
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
  }, "The simulation ground is the proof surface. Each phase orchestrates the LiDAR sweep, crane geometry, hold fill, draft, and trim \u2014 driven by a single state engine, not placeholder labels.")), /*#__PURE__*/React.createElement(HeroMark, {
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
  }, BARGE.id, " \xB7 ", BARGE.length, " \xD7 ", BARGE.beam, " \xB7 run ", BARGE.runtime, " min \xB7 accuracy ", BARGE.accuracy, " ft"))), /*#__PURE__*/React.createElement(MotionSystem, null));
}
window.SimulationPage = SimulationPage;

/* ==== ArchitecturePage.jsx ==== */
// Frequency Systems — ARCHITECTURE. Technical explainer. No motion.
function ArchitecturePage() {
  const {
    Card,
    Eyebrow
  } = window.FREQAIDesignSystem_019dc6;
  const modules = [{
    n: '01',
    t: 'Vessel Mirror',
    d: 'A continuously reconciled software twin of BARGE-402 — draft, trim, ballast, cargo — updated from sensor truth, never assumption.'
  }, {
    n: '02',
    t: 'Decision Fabric',
    d: 'The deterministic orchestration layer. Survey, ballast, and load actions sequenced under locked constraints.'
  }, {
    n: '03',
    t: 'Draft Intelligence',
    d: 'Unmanned LiDAR survey across six stations, resolving mean draft to ±0.02 ft. Fourteen minutes, no crew on deck.'
  }, {
    n: '04',
    t: 'Locked Baseline',
    d: '45m × 10m hull, 1,482.6T maximum cargo, 12.45 ft mean draft. Fixed, verified — ground truth for every module.'
  }, {
    n: '05',
    t: 'Load Execution',
    d: 'Trim and load decisions translated into crane-side action, in step with the survey. Measurement and execution never drift.'
  }, {
    n: '06',
    t: 'Proof Surface',
    d: 'One live review surface. The numbers on screen are the numbers in the system — no separate marketing data path.'
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
  }, /*#__PURE__*/React.createElement("img", {
    src: window.freqImg('architecture-diagram.jpg'),
    alt: "BARGE-402 digital twin \u2014 six architecture layers from Sensor / LiDAR to Proof Surface",
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
  }, "Digital twin \xB7 six layers \xB7 L1 Sensor / LiDAR \u2192 L6 Proof Surface"))), /*#__PURE__*/React.createElement("div", {
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
  const metrics = [{
    label: 'Survey time',
    node: /*#__PURE__*/React.createElement(CountUp, {
      target: 14
    }),
    unit: 'min',
    sub: 'Down from 4 hours, manned.'
  }, {
    label: 'Draft accuracy',
    node: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 30,
        verticalAlign: 'top'
      }
    }, "\xB1"), /*#__PURE__*/React.createElement(CountUp, {
      target: 0.02,
      decimals: 2
    })),
    unit: 'ft',
    sub: 'Across all six stations.'
  }, {
    label: 'Max cargo',
    node: /*#__PURE__*/React.createElement(CountUp, {
      target: 1482.6,
      decimals: 1
    }),
    unit: 'T',
    sub: 'BARGE-402, locked.'
  }, {
    label: 'Crew on deck',
    node: /*#__PURE__*/React.createElement(CountUp, {
      target: 0
    }),
    unit: '',
    sub: 'Fully unmanned survey.'
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
  }, "BARGE-402 \xB7 PROVEN \xB7 METRICS-LOCKED"), /*#__PURE__*/React.createElement("h1", {
    className: "freq-rise",
    style: {
      fontSize: 'clamp(36px, 5.5vw, 60px)',
      lineHeight: 1.05,
      maxWidth: 820,
      marginTop: 22
    }
  }, "The proof, in numbers."), /*#__PURE__*/React.createElement("p", {
    className: "freq-rise",
    style: {
      fontSize: 19,
      lineHeight: 1.6,
      color: 'var(--text-body)',
      maxWidth: 600,
      marginTop: 22,
      animationDelay: '90ms'
    }
  }, "Frequency is not a forecast. It is a measured result on a real vessel \u2014 a four-hour manual survey replaced by a fourteen-minute unmanned run, accurate to two hundredths of a foot."))), /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: 'var(--space-9) var(--container-pad) 0'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Locked Proof"), /*#__PURE__*/React.createElement("div", {
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
  }, "MANUAL SURVEY"), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: '16px 0 0',
      padding: 0,
      listStyle: 'none',
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, ['Four-person crew on open deck', 'Four hours per survey', 'Reading error compounds by hand', 'Weather and fatigue exposed'].map(t => /*#__PURE__*/React.createElement("li", {
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
  }, "FREQUENCY"), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: '16px 0 0',
      padding: 0,
      listStyle: 'none',
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, ['Unmanned, zero crew on deck', 'Fourteen minutes per survey', 'Accurate to ±0.02 ft, repeatable', 'Runs in any condition, on demand'].map(t => /*#__PURE__*/React.createElement("li", {
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
  }, "Scale the proven layer across the fleet"), /*#__PURE__*/React.createElement("p", {
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
  }, "12.45 ft mean draft \xB7 \xB10.02 ft")), /*#__PURE__*/React.createElement("div", {
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
    simulation: window.SimulationPage,
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
  if (window.HomePage && window.SimulationPage && window.ArchitecturePage && window.ContactPage && window.InvestorPage && window.Header && window.Footer && window.Stage && window.HeroMark && window.MotionSystem && window.RunProgress && window.AnimatedNumber && window.PhaseScene && window.CountUp) {
    ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
  } else {
    setTimeout(boot, 30);
  }
}
boot();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/freqsystems-dev/app.prod.js", error: String((e && e.message) || e) }); }

// ui_kits/freqsystems-dev/assets-inline.js (data URIs stripped for deploy — runtime freqImg() loads /assets/* files)

// ui_kits/freqsystems-dev/data.js
try { (() => {
// Frequency Systems — locked constants (BARGE-402). NEVER alter these numbers.
window.FREQ = window.FREQ || {};
window.FREQ.BARGE = {
  id: 'BARGE-402',
  length: '45m',
  beam: '10m',
  maxCargo: '1,482.6',
  // T
  meanDraft: '12.45',
  // ft
  accuracy: '±0.02',
  // ft
  runtime: '14',
  // minutes
  stations: ['FP', 'FS', 'MP', 'MS', 'AP', 'AS']
};
window.FREQ.EMAIL = 'frequency.systems@outlook.com';

// Resolve an image to its inlined data-URI (deploy-safe) or fall back to the
// on-disk relative path. Accepts a bare filename or a '../../assets/x' path.
window.freqImg = function (ref) {
  var name = String(ref).replace(/^.*\//, '');
  return window.FREQ_IMG && window.FREQ_IMG[name] || 'assets/' + name;
};

// Six locked simulation phases. Telemetry drives the stage 1:1.
// `op` = what is physically happening this phase (kinetic caption on the stage).
window.FREQ.PHASES = [{
  name: 'Pre-Survey',
  draft: '11.80',
  list: '0.0',
  fill: 0,
  lidar: 'SCANNING',
  crane: 'STOWED',
  stability: 'NOMINAL',
  op: 'LiDAR sweeps the empty hull to fix the baseline draft across all six stations.'
}, {
  name: 'Ballast Adjustment',
  draft: '12.05',
  list: '0.4',
  fill: 8,
  lidar: 'IDLE',
  crane: 'STOWED',
  stability: 'ADJUSTING',
  op: 'Fore and aft ballast transfer levels the hull to even keel before loading.'
}, {
  name: 'Crane Position',
  draft: '12.10',
  list: '0.6',
  fill: 14,
  lidar: 'IDLE',
  crane: 'SLEWING',
  stability: 'HOLD',
  op: 'The crane slews into position and the hook descends over the open holds.'
}, {
  name: 'Cargo Load',
  draft: '12.30',
  list: '1.1',
  fill: 64,
  lidar: 'IDLE',
  crane: 'LOADING',
  stability: 'DYNAMIC',
  op: 'Cargo lowers into the holds — draft rises and list is tracked in real time.'
}, {
  name: 'Trim Correction',
  draft: '12.42',
  list: '0.3',
  fill: 92,
  lidar: 'IDLE',
  crane: 'STOWED',
  stability: 'CORRECTING',
  op: 'Trim converges toward zero as load distribution is balanced fore-to-aft.'
}, {
  name: 'Final Survey',
  draft: '12.45',
  list: '0.0',
  fill: 100,
  lidar: 'SCANNING',
  crane: 'STOWED',
  stability: 'LOCKED',
  op: 'A full LiDAR sweep confirms and locks the final mean draft to ±0.02 ft.'
}];
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/freqsystems-dev/data.js", error: String((e && e.message) || e) }); }

// ui_kits/freqsystems-dev/motion.jsx
try { (() => {
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
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/freqsystems-dev/motion.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.StatusBadge = __ds_scope.StatusBadge;

__ds_ns.PhaseButton = __ds_scope.PhaseButton;

__ds_ns.TelemetryStat = __ds_scope.TelemetryStat;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

})();
