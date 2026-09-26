# freqsystems.dev — FREQUENCY Systems website

Source of record for the Vercel project **`frequency-tera-optimized`**, the staging-named project
described in *Website optimization: agent work instructions & deployment path* (§14, "upload as a
NEW deployment … so it cannot be confused with the live project").

| | |
|---|---|
| Production URL | https://frequency-tera-optimized.vercel.app |
| Vercel project | `frequency-tera-optimized` · `prj_uFfwXlhNVcaVosfRrkp6Iy49lnUH` |
| Vercel team | `team_X5LI2up5bH06FG6XJI2w5ToR` |
| Baseline source | project `frequency-mega`, deployment `dpl_9frhjqZ7DK6dVqVULkbpjM9tnC94` |
| Live site (not touched) | `freqsystems.dev` / `www.freqsystems.dev` → project `freq.arena` |

The new project is protected by Vercel Authentication on its `*.vercel.app` URLs (the team default),
so only signed-in team members can open it. Making it public — turning protection off or attaching a
custom domain — is an owner decision.

## Architecture (unchanged from the baseline)

Static site: no build step, no SSR, no API routes. One HTML document; navigation is client-side
state (no router, no per-page URLs). Five pages: Home, Simulation, Architecture, Investor, Contact.

| File | Role |
|---|---|
| `index.html` | Document, page-level CSS (motion keyframes, responsive rules), script order |
| `_ds_bundle.js` | Design system (`window.FREQAIDesignSystem_019dc6`: Button, Eyebrow, PhaseButton, TelemetryStat, StatusBadge …) |
| `data.js` | Locked BARGE-402 constants and the six-phase table (`window.FREQ`) |
| `depthstage.js` | 2.5D WebGL camera for photoreal plates (`FreqDepthStage.create/setPhase/destroy`) |
| `home-sections.js` | Image-led Home / Investor sections |
| `simulation-ground.js` | Operator-driven walkthrough, measurement positions, capability inventory |
| `harbor-stage.js` | `<harbor-stage>` custom element — Three.js 0.169.0 operational model (ES module) |
| `app.prod.js` | App shell and pages (pre-transpiled JSX) |
| `styles.css`, `tokens/*.css` | Design tokens: colour, type, spacing, effects, fonts |
| `vercel.json` | Clean URLs and cache headers (`/assets/*` is `immutable` for a year) |

Runtime dependencies (CDN, unchanged): React 18.3.1 + ReactDOM (unpkg, pinned), Lucide UMD
(`@latest`, unpinned), Three.js 0.169.0 (unpkg, pinned), Google Fonts (Space Grotesk, Inter,
JetBrains Mono).

## Repository layout

```
site/        every text file Vercel serves, byte-identical (SHA-1 in deploy/manifest.json)
deploy/      manifest.json (all deployed paths + SHA-1), build_manifest.py, change reports, evidence
tools/verify local browser harness used to verify each step (dev-only, never deployed)
```

Binary files (15 plates, favicons) are **not** in git. They live in the Vercel team's file store and
are deployed by SHA-1 reference; `deploy/manifest.json` lists every one (`"inRepo": false`).

## Deploying

There is no build. A deployment is the file list in `deploy/manifest.json`: text files uploaded
from `site/`, binaries referenced by SHA-1 (already in the team's store). New work lands as a
preview deployment, is checked against the verification matrix, then goes to production of this
project only. The previous production deployment stays in place for instant rollback.

Never point `freqsystems.dev` (or any live domain) at this project without the owner's approval.

## Change log

| Step | What | Report |
|---|---|---|
| 01 | Byte-identical clone of the baseline into the new project | `deploy/CHANGE-REPORT-01-baseline-clone.md` |

## Known issues carried from the baseline

- **Controller ≠ handoff §07.** This build's `harbor-stage.js` has no cargo ledger,
  `window.FREQ_OP_META` or `checkpointAt()`, and its grab order differs from gate V4. The ledger
  controller exists only in the separate, redesigned `frequency-systems` project.
- **Reference URL gone.** `frequency-tera.vercel.app` returns 404 for every path (checked
  2026-09-26), so the byte-for-byte comparison target in the handoff no longer exists.
- **Dead image references.** `_ds_bundle.js` still names `hero-core.jpg` and
  `freq-brand-logo.png`; Home intermittently logs a 404 for `hero-core.jpg` (handoff P2 #9).
- **Mobile header.** The header nav is ~470 px wide and overflows a 390 px viewport
  (document width 708 px) on every page.
- **Unpinned Lucide.** Loaded from `lucide@latest` (resolved to 1.48.0 when tested).
