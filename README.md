# freqsystems.dev — FREQUENCY Systems website

Source of record for the Vercel project **`frequency-tera-optimized`**, the staging-named project
described in *Website optimization: agent work instructions & deployment path* (§14, "upload as a
NEW deployment … so it cannot be confused with the live project").

| | |
|---|---|
| Production URL | https://frequency-tera-optimized.vercel.app |
| Current production | step 03, deployment `dpl_HUBqxDSRLqCNPkBUczGtngUajDpj` (motion-first Home) |
| Vercel project | `frequency-tera-optimized` · `prj_uFfwXlhNVcaVosfRrkp6Iy49lnUH` |
| Vercel team | `team_X5LI2up5bH06FG6XJI2w5ToR` |
| Baseline source | project `frequency-mega`, deployment `dpl_9frhjqZ7DK6dVqVULkbpjM9tnC94` |
| Live site (not touched) | `freqsystems.dev` / `www.freqsystems.dev` → project `frequency-systems`, deployment `dpl_AnVcZB9vTr1u8tJMBZVLFSsC33po` (earlier revisions of this file and report 02 said `freq.arena`; that was wrong) |

The new project is protected by Vercel Authentication on its `*.vercel.app` URLs (the team default),
so only signed-in team members can open it. Making it public — turning protection off or attaching a
custom domain — is an owner decision.

## Architecture

Static site: no build step, no SSR, no API routes. One HTML document; navigation is client-side
state (no router, no per-page URLs). Five pages: Home, Simulation, Architecture, Investor, Contact.
Since step 03 the Home page opens on a live 3D model of one cargo transfer — a pedestal crane's
clamshell grab working 900 t of aggregate into BARGE-402's holds — with its cargo ledger beside it.

| File | Role |
|---|---|
| `index.html` | Document, page-level CSS (motion keyframes, responsive rules, Home hero layout), script order, and the guard that keeps `_ds_bundle.js`'s stale app from booting |
| `_ds_bundle.js` | Design system (`window.FREQAIDesignSystem_019dc6`: Button, Eyebrow, PhaseButton, TelemetryStat, StatusBadge …) plus a stale copy of an older app (see known issues) |
| `data.js` | Locked BARGE-402 constants and the six-phase table (`window.FREQ`) |
| `depthstage.js` | 2.5D WebGL camera for photoreal plates (`FreqDepthStage.create/setPhase/destroy`) |
| `home-hero.js` | Home hero (`window.HarborHero`): headline, calls to action, play / explore controls, and the ledger HUD fed by the model's `hmstate` events — step 03 |
| `harbor-motion.js` | `<harbor-motion>` custom element: the crane–grab–cargo cycle, cargo ledger (stockpile + in grab + falling + aboard = 900 t every frame), hull draft and trim, camera framing (ES module) — step 03 |
| `harbor-scene.js` | Scene builders for `<harbor-motion>`: quay, crane, clamshell grab, barge hull and holds, stockpile, lights, water reflection — step 03 |
| `harbor-kit.js` | Scenario constants, geometry and procedural-texture helpers, shaders shared by the two files above — step 03 |
| `home-sections.js` | Image-led Home / Investor sections |
| `simulation-ground.js` | Operator-driven walkthrough, measurement positions, capability inventory (the Simulation page) |
| `harbor-stage.js` | `<harbor-stage>` custom element — Three.js 0.169.0 operational model used by the walkthrough (ES module) |
| `app.prod.js` | App shell and pages (pre-transpiled JSX) |
| `styles.css`, `tokens/*.css` | Design tokens: colour, type, spacing, effects, fonts |
| `vercel.json` | Clean URLs and cache headers (`/assets/*` is `immutable` for a year) |

Runtime dependencies (CDN, unchanged): React 18.3.1 + ReactDOM (unpkg, pinned), Lucide UMD
(`@latest`, unpinned), Three.js 0.169.0 (unpkg, pinned; the Home model and the walkthrough share one
instance), Google Fonts (Space Grotesk, Inter, JetBrains Mono).

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

Text files are sent inline through the Vercel connector, which decodes `\uXXXX` escape sequences
inside file data. A source file holding a JavaScript `—` escape is therefore stored with the
literal "—", so repo copies keep such characters literal (`app.prod.js` since step 03) and the repo
stays byte-identical to what Vercel serves. `\xNN` escapes and every other backslash pass through
unchanged. Check each upload's SHA-1 against `site/` before building a deployment on it.

## Change log

| Step | What | Report |
|---|---|---|
| 01 | Byte-identical clone of the baseline into the new project | `deploy/CHANGE-REPORT-01-baseline-clone.md` |
| 02 | freqarena's six-phase survey design on the Simulation page (default view), next to the original walkthrough | `deploy/CHANGE-REPORT-02-survey-simulation.md` |
| 03 | Motion-first Home: the live 3D crane–grab–cargo transfer is the hero; the six-phase survey and its view switch are removed; the retired Home no longer flashes on load | `deploy/CHANGE-REPORT-03-motion-first-home.md` |

## Verifying a change

`tools/verify/run.sh [baseline-commit]` serves the current `site/` and a baseline `site/` exported
from git, with placeholder plates, and runs the Playwright checks: the Home hero is the live 3D
stage, the model runs on its own and its ledger balances, only the current app ever paints, layouts
at 1440 / 1024 / 390 px, reduced motion, WebGL off, the walkthrough page, pixel parity of the other
pages against the baseline, and console and network errors. It needs Node, Playwright with Chromium,
Python 3 and Pillow; CDN libraries are fetched from npm at the versions the site pins.

## Known issues

- **Controller ≠ handoff §07.** The walkthrough's `harbor-stage.js` has no cargo ledger,
  `window.FREQ_OP_META` or `checkpointAt()`, and its grab order differs from gate V4. The Home model
  (`harbor-motion.js`) keeps its own 900 t ledger and loads aft, aft, midship, midship, forward,
  forward, but exposes no `FREQ_OP_META` / `checkpointAt()` API either.
- **Reference URL gone.** `frequency-tera.vercel.app` returns 404 for every path (checked
  2026-09-26), so the byte-for-byte comparison target in the handoff no longer exists.
- **Stale app inside `_ds_bundle.js`.** 160,866 of the bundle's 181,641 B are copies of an older
  build of the site (`ui_kits/freqsystems-dev/*`), including a `boot()` that rendered its own Home into
  `#root` on every load. Since step 03 `index.html` hands that boot an inert root, so the retired Home
  never paints and its dead `hero-core.jpg` / `freq-brand-logo.png` references are no longer
  requested. The bytes still ship; stripping them from the bundle is a separate optimization.
- **Unpinned Lucide.** Loaded from `lucide@latest` (resolved to 1.48.0 when tested).

Resolved in step 03: the header's phone-width overflow (the nav now scrolls inside the bar at
≤ 640 px on every page; Home measures 390 px wide at a 390 px viewport, the other pages were not
re-measured at phone width) and the intermittent `hero-core.jpg` 404 on Home.
