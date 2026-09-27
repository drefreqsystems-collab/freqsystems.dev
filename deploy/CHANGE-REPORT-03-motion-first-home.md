# Change report 03 — motion-first Home

| Field | Content |
|---|---|
| Change ID & scope | Step 03, owner direction (corrected plan): the 3D harbor stage — crane, clamshell grab, cargo, BARGE-402 — is the Home page's primary experience, not a Simulation tab; the FREQ Arena six-phase survey / Simulation Ground is no longer the hero or a default view; the FREQUENCY shell, identity and tokens stay; deploy to a concrete URL without touching domain aliases. Step 02's survey view is withdrawn. |
| Files touched | `index.html` · `app.prod.js` · `llms.txt` · new `home-hero.js`, `harbor-motion.js`, `harbor-scene.js`, `harbor-kit.js` · removed `survey-simulation.js`, `assets/crane.jpg`, `assets/cargo.jpg` |
| Deployments | preview `dpl_4ZUoCSvjeC798CqZsmndNsz6saDS` (validated) → production `dpl_HUBqxDSRLqCNPkBUczGtngUajDpj` (same SHA-1 set), serving https://frequency-tera-optimized.vercel.app |
| Also created | file-staging previews `dpl_HFYaLhjoned627aksbD4XGcUjYfJ`, `dpl_4jG3rkLAAjkNHe47vUd7hCTtnXh6`, `dpl_DUwTrf3figeWfhcFKMEwYA2yzH9w`, `dpl_HyWtaN5E1ACQTBKe3adzXaf61pHR`, `dpl_EgJyR3Az3WakK6ehEVD8jsuP3Gq7`, `dpl_4u3y6E3Z6YGiuZDpJiP3Kb6oFqhd`; diagnostic build `dpl_Bp4kSAs8Ao1R451bMizAAErBMtpj`; preview `dpl_44TBbz3hbTCefpBnBqqL1X2f9Pan` (built before the first-paint fix, never promoted) |
| Domains | Untouched. `freqsystems.dev` / `www` still serve project `frequency-systems`, deployment `dpl_AnVcZB9vTr1u8tJMBZVLFSsC33po`. No alias was assigned or moved; this project has no custom domain. |

## What changed

### Home: the live model is the hero

`<harbor-motion>` fills the hero, full-bleed behind the copy: a river terminal at night with a
pedestal crane, a clamshell grab, a stockpile of aggregate and BARGE-402 alongside with three open
holds. The model runs on its own:

- **Cycle.** Six grab cycles of 150 t, in the order aft, aft, midship, midship, forward, forward.
  Each cycle bites into the stockpile, closes, hoists, slews over the hold, lowers and opens; the
  load falls as particles and lands in the hold, whose heap grows.
- **Ledger.** Remaining + in grab + falling + aboard = 900 t, checked every frame. The HUD beside the
  model shows the cycle, the operation, those four quantities, the three holds, mean draft and trim,
  read from the model's own state (`hmstate` events), so every number on screen is what the scene is
  doing at that moment.
- **Vessel state.** Mean draft goes from 12.05 to 12.45 ft over 900 t; trim follows the aft–forward
  balance. The hull's attitude is drawn ×4 so a change of a few hundredths of a foot is visible;
  the HUD numbers are not exaggerated. All values are the configured scenario, labelled illustrative.
- **Controls.** Pause / Play; Explore the 3D stage (drag to orbit, scroll to zoom, arrow keys,
  Esc to leave; the copy steps aside while exploring).
- **Fallbacks.** Reduced motion: a still, representative frame, paused, with Play on request.
  No WebGL, or the module blocked: the still plate (`investor-hero.jpg`) and a scenario note.
- **Layout.** Copy over the dark river at desktop widths; a compact HUD on tablets; on phones and
  portrait tablets the model comes first at full width, then the headline, then the ledger, and the
  camera re-frames for that shape.

The copy keeps the brand's voice and claims: eyebrow "Inland waterways · Cargo execution layer",
headline "Cargo decisions, grounded in vessel state.", the company statement, and "Investor Brief".
The step-by-step walkthrough stays on the Simulation page, reached from a link under the buttons.

### Removed

- The old Home hero: depth plate, the six-phase ring and its HUD, and the "See Simulation Ground"
  call to action (`app.prod.js`).
- The six-phase survey view and the Simulation page's view switch (`survey-simulation.js`). The
  Simulation page is the operator-driven walkthrough again (`simulation-ground.js`, unchanged).
- `assets/crane.jpg` and `assets/cargo.jpg`: step 02's alias paths, used only by `PhaseScene`, which
  nothing renders any more.

### The retired Home no longer flashes on load

`_ds_bundle.js` carries, besides the design-system components, copies of an older build of the site
(`ui_kits/freqsystems-dev/*`, 160,866 of its 181,641 B) including that build's `boot()`. Every
global that boot waits for is defined inside the bundle itself, so on every load it rendered its own
App into `#root` before `app.prod.js` ran. The retired Home — "Autonomous Maritime Cargo
Intelligence", with crew, time and accuracy claims this site no longer makes, and a "See Simulation
Ground" button — was on screen until the current app replaced it:

| Probe (every animation frame, local) | Retired Home on screen | Current Home first shown |
|---|---|---|
| Before the fix, scripts served at once | 143 ms | 434 ms |
| Before the fix, one later script delayed 600 ms | 490 ms | 644 ms |
| Before the fix, delayed 1.5 s | 1,419 ms | 1,549 ms |
| After the fix, same three runs | 0 frames | 136 / 657 / 1,546 ms |

It was also the source of the intermittent `hero-core.jpg` 404 noted in reports 01 and 02, and it was
present in steps 01 and 02. `index.html` now gives that boot an inert root: a stub replaces
`ReactDOM.createRoot` just before `_ds_bundle.js`, and the real function is restored right after it,
before any other script. The bundle's components are untouched. What the flash showed:
`deploy/evidence/03-retired-home-first-paint-before-fix.jpg` (captured with `app.prod.js` blocked so
the frame stays on screen).

### Smaller fixes on Home

- Header: at ≤ 640 px the five links scroll inside the bar instead of widening the page.
- "The System" cards go three → two → one column; the proof grid's columns can shrink at ≤ 760 px.
- Reduced motion also stops the design system's pulsing live dot, which is animated from an inline style.

## Before / after

| Metric | Before (step 02) | After | Note |
|---|---|---|---|
| HTML | 18,336 B | 26,279 B | +7,943 B: hero layout and responsive CSS, script tags, first-paint guard |
| Same-origin JS | 387,162 B · 8 files | 482,431 B · 11 files | +95,269 B (+24.6 %): the four new files add 118,485 B; `app.prod.js` −11,265 B (old hero removed); `survey-simulation.js` −11,951 B |
| CDN | React, ReactDOM, Lucide, Three.js 0.169.0 | same | `three.module.js` was already loaded on every page by `harbor-stage.js`; the Home model shares that instance (now `modulepreload`ed) |
| Same-origin CSS | 9,713 B | 9,713 B | |
| Deployed paths | 43 | 44 | +4 scripts, −1 script, −2 image alias paths; no new image bytes (the WebGL fallback reuses `investor-hero.jpg`) |
| Console, Home | intermittent `hero-core.jpg` 404 | clean | first-paint fix |
| Retired Home on screen at load | 143 ms – 1.4 s | never | table above |

## Verification matrix

Local harness (`tools/verify/run.sh`, 18 checks, all PASS on the final bytes): headless Chromium
with SwiftShader WebGL; CDN libraries from the npm tarballs of the same versions (Lucide `@latest`
resolved to 1.48.0); placeholder plates in place of the real images, which are not in git. Software
rendering runs the model far below real time, so the checks read the model's clock and ledger rather
than timing anything. Every tested file is byte-identical to what Vercel serves (SHA-1 from the
deployment file trees).

| ID | Result | Evidence |
|---|---|---|
| V1 File integrity | **PASS** | All 44 paths of the preview and the production deployment read back from Vercel and match `deploy/manifest.json`. Each of the seven new or changed text files was checked by SHA-1 after upload. |
| V2 Console-clean | **PASS** | Every step-03 run — Home at 1440 / 1024 / 390, first paint, reduced motion, WebGL off, the walkthrough, Architecture / Investor / Contact — zero console errors and zero failed requests. |
| V3 Visual parity | **PASS** locally · deployment URL UNVERIFIED | Home and Simulation change by design. Architecture and Contact are pixel-identical to step 01. Investor differs visibly only at the live dot (45 px, the reduced-motion fix); another 171,827 px differ by 1–12 colour levels, 171,531 of them by one level (compositing and anti-aliasing noise, not visible). No browser can reach `*.vercel.app` from this environment. |
| V4 Six-phase sequence | **PASS** for the Home model · **FAIL** pre-existing for `<harbor-stage>` | Home: six 150 t cycles, aft, aft, midship, midship, forward, forward. The walkthrough's model is unchanged from report 01. |
| V5–V7 Ledger telemetry | **PASS** for the Home model · UNVERIFIED for `<harbor-stage>` | Remaining + in grab + falling + aboard = 900 t in every sampled frame (e.g. 450 + 150 + 0 + 300 at cycle 03); the HUD shows the model's values. |
| V8 Reduced motion | **PASS** | Still frame with no autoplay, 0 running CSS animations, Play starts the model. |
| V9 WebGL off | **PASS** | Still plate and scenario note, headline and calls to action intact, zero errors. |
| V10 Missing image | UNVERIFIED | Not re-run. |
| V11 Budgets | **FAIL** pre-existing (images) | JS growth is the owner-directed feature. Lighthouse not run. |
| V12 Dependency guard | **PASS** | No new runtime dependency. |
| First paint (new) | **PASS** | With a later script held back 600 ms: 0 frames of the retired Home, 0 `hero-core.jpg` requests. |

Screenshots: `deploy/evidence/03-*.jpg` (local harness, placeholder plates).

## Deviations from byte parity (against step 02)

- `index.html`: Home hero CSS and responsive rules; `survey-simulation.js` tag removed; `home-hero.js`
  and `harbor-motion.js` tags and a `modulepreload` for Three.js added; the first-paint guard around
  `_ds_bundle.js`.
- `app.prod.js`: the Home hero is `window.HarborHero`; the old hero code is gone; "The System" grid has
  a class for its responsive rule. Nine `\uXXXX` escapes inside strings are stored as the characters
  they encode (—, ●, →). The Vercel connector decodes `\uXXXX` in inline file data (the same
  thing happened to one string in step 02), so the first upload came back 27 B short. A throwaway
  build that printed per-line hashes of the stored file (`dpl_Bp4kSAs8Ao1R451bMizAAErBMtpj`) showed
  those nine lines were the only difference; the repo copy now matches the deployed bytes, with
  identical runtime values.
- `llms.txt`: the Home and Imagery lines describe the live model.
- New files: `home-hero.js`, `harbor-motion.js`, `harbor-scene.js`, `harbor-kit.js`.
- Removed: `survey-simulation.js`, `assets/crane.jpg`, `assets/cargo.jpg`.

## Correction to earlier records

README and report 02 said `freqsystems.dev` is served by project `freq.arena`. It is served by project
`frequency-systems` (production deployment `dpl_AnVcZB9vTr1u8tJMBZVLFSsC33po`). The README is
corrected; report 02 is left as written.

## Rollback note

Before-state = step 02 production `dpl_71fXbMXmLCt92HSbdXQe9K8uhGkt` (READY, now without aliases;
re-promote it for an instant rollback) and commit `d3439f0` in git. Step 01, `dpl_A4DKwZ6rDBYQB4vZ9bJFc8EQkLGw`,
is also still READY.

## Open owner decisions

- `freqsystems.dev` still points at project `frequency-systems`. Moving it to this project is the
  next step and was deliberately not done.
- `https://frequency-tera-optimized.vercel.app` is behind Vercel Authentication (team members only),
  as are all `*.vercel.app` URLs of this project. Under the current setting a custom domain would be
  public.
