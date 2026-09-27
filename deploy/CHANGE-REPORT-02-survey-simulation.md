# Change report 02 — freqarena six-phase survey on the Simulation page

| Field | Content |
|---|---|
| Change ID & scope | Step 02, owner request: "Add the https://freqarena.vercel.app/ Simulate 6 phase survey design to the new deployment." Additive; outside the handoff's optimization sequence, so it counts as a new feature with owner sign-off. |
| Source of the design | `freq.arena` (serves `freqsystems.dev`) · `app.prod.js?v=3` · `SimulationPage.jsx` |
| Files touched | `index.html` (+1 `<script>` line) · `survey-simulation.js` (new) · `assets/crane.jpg`, `assets/cargo.jpg` (new paths over existing bytes) |
| Deployments | preview `dpl_AwdkZ5xVgGSjKBrZ8pFr1NCtZTri` (validated) → production `dpl_71fXbMXmLCt92HSbdXQe9K8uhGkt` (same SHA-1 set) |

## What changed

The Simulation page now opens on a two-view switch:

- **6-phase survey** (default) — freqarena's `SimulationPage`, verbatim: phase buttons with
  DONE / LIVE / QUEUED state, survey-run progress, the photoreal `PhaseScene` stage with a
  different holographic overlay per phase, the kinetic caption and the telemetry panel with
  Pause / Resume run.
- **Operation walkthrough** — the existing `simulation-ground.js` page, mounted unchanged
  (`<harbor-stage>` 3D model, measurement positions, capability inventory).

Everything the survey needs already shipped in this build (`Stage`, `PhaseScene`, `RunProgress`,
`HeroMark`, `Icon`, the design-system `PhaseButton` / `TelemetryStat` / `StatusBadge`, and the phase
table in `data.js`). Where the two builds differ, this build's copies are the newer ones:
`PhaseScene` adds the DepthStage 2.5D camera and fixes a dead fallback, and `HeroMark` points at
images that exist. `app.prod.js` and every other baseline file are byte-identical.

Not brought over: freqarena's `MotionSystem` showcase, which this build deliberately replaced with
the Capability Inventory (still on the walkthrough view).

Two fixes made the design work cleanly here:

1. **Phase plates 03 and 04.** `PhaseScene` asks for `assets/crane.jpg` and `assets/cargo.jpg`
   first, and its own comment says to "drop" those files in. They did not exist, so each visit to
   phases 03/04 logged two 404s. Both paths now serve the dedicated renders that already ship
   (`phase-03-crane.jpg`, `phase-04-cargo-v2.jpg`), deployed by SHA-1 with no new bytes. This is
   the handoff's P2 #9 "ship the intended files" option, applied to these two references only.
2. **Tablet and phone layout.** `PhaseButton` sets `flex: 1` inline, so all six buttons share one
   row and the state badge overruns below ~870 px — freqarena itself does this. A rule scoped to
   the survey's phase list gives three buttons per row at ≤ 1024 px and two at ≤ 560 px; desktop
   keeps six across.

## Before / after

| Metric | Before (step 01) | After | Note |
|---|---|---|---|
| HTML | 18,289 B | 18,336 B | +47 B, one script tag |
| Same-origin JS | 375,211 B · 7 files | 387,162 B · 8 files | +11,951 B (+3.2 %) — owner-requested feature |
| Same-origin CSS | 9,713 B | 9,713 B | the survey's layout rule ships inside the JS |
| New image bytes | — | 0 B | two new paths reuse stored files |
| Console, Simulation page | clean | clean, all six survey phases | before the alias fix: 2 × 404 on phases 03/04 |

## Verification matrix

Local harness (`tools/verify/run.sh`): headless Chromium; CDN libraries served from the npm tarballs
of the same versions (Lucide `@latest` resolved to 1.48.0); placeholder plates in place of the real
images, which are not in git. The two changed text files were then proven byte-identical to what
Vercel serves (SHA-1 from the deployment file tree), so the tested bytes are the deployed bytes.

| ID | Result | Evidence |
|---|---|---|
| V1 File integrity | **PASS** | 39 unchanged baseline files identical by SHA-1. Deployed `index.html` = `f7dfceb2…` and `survey-simulation.js` = `bc3d6c0e…`, equal to `site/`. Aliases carry the existing hashes. Deviations listed below. |
| V2 Console-clean | **PASS** (this step's runs) | Home at 1440 and 390, Simulation at 1440 / 768 / 390: zero console errors and zero failed requests. The intermittent baseline `hero-core.jpg` 404 (report 01) is pre-existing and untouched. |
| V3 Visual parity | **PASS** locally · deployment URL UNVERIFIED | Home at 1440 and 390 is pixel-identical to the baseline except a ~13 px spot at the pulsing live dot, which differs the same way between two runs of the unchanged baseline. The Simulation page changes by design. No browser can reach `*.vercel.app` from this environment. |
| V4 Six-phase sequence | **PASS** for the survey view · **FAIL** pre-existing for `<harbor-stage>` | Survey: six phases in order, caption = `FREQ.PHASES[i].op`, telemetry = `FREQ.PHASES[i]` (01: 11.80 / 0.0 / 0 · 04: 12.30 / 1.1 / 64 · 06: 12.45 / 0.0 / 100). The 3D model's grab order is unchanged from report 01. |
| V5–V7 Ledger telemetry | UNVERIFIED | Blocked as in report 01; this step does not touch the controller. |
| V8 Reduced motion | **PASS** | Survey view: 0 running CSS animations; the phase walk runs only after the operator presses Resume run. |
| V9 WebGL off | **PASS** | Survey view renders, telemetry intact, zero errors (flat-plate fallback). |
| V10 Missing image | UNVERIFIED | Not re-run; the walkthrough's plate chains are unchanged. |
| V11 Budgets | **FAIL** pre-existing (images) | Image budget as in report 01. JS growth is a new feature, which the handoff allows with owner sign-off. Lighthouse not run. |
| V12 Dependency guard | **PASS** | No new runtime dependency. |

Screenshots: `deploy/evidence/02-*.jpg` (local harness, placeholder plates).

## Deviations from byte parity

- `index.html`: one added line, `<script src="survey-simulation.js"></script>`, after `simulation-ground.js`.
- `survey-simulation.js`: new file. Relative to freqarena's source it is renamed
  (`SimulationPage` → `SurveySimulation`), drops the `MotionSystem` mount, adds the view switch
  and layout rule, and stores one intro string's `—` escape as the literal "—". That string
  has the same value at runtime; the Vercel connector unescaped it on upload, and the repo copy
  matches the deployed bytes.
- `assets/crane.jpg`, `assets/cargo.jpg`: new paths, same bytes as the phase-03 / phase-04 renders.

## Rollback note

Before-state = step 01, deployment `dpl_A4DKwZ6rDBYQB4vZ9bJFc8EQkLGw` (still READY; re-promote it
for an instant rollback) and commit `46af32e` in git. The revert state is exercised on every harness
run: `run.sh` serves the step-01 tree from git as the "before" site, and it loaded clean in these
runs.
