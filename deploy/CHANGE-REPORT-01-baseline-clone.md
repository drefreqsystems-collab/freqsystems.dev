# Change report 01 — baseline clone into `frequency-tera-optimized`

| Field | Content |
|---|---|
| Change ID & scope | Step 01 (snapshot discipline). New Vercel project `frequency-tera-optimized`; first deployment is the exact baseline build. No file content changed. |
| Deployment | `dpl_A4DKwZ6rDBYQB4vZ9bJFc8EQkLGw` (production at the time; now the instant-rollback target) |
| Source | `frequency-mega` · `dpl_9frhjqZ7DK6dVqVULkbpjM9tnC94` |
| Files | 40 paths, all deployed by SHA-1 reference (no re-upload, no transcription) |

## Why `frequency-mega` is the baseline

The handoff's reference URL, `frequency-tera.vercel.app`, is outside this Vercel connection, and a
crawl from a Vercel Sandbox on 2026-09-26 returned 404 for every path, including `/`. The
`frequency-mega` build is the one whose fingerprint matches the handoff's measured baseline (§09):

| Metric | Handoff §09 | This build |
|---|---|---|
| HTML | 18.3 KB | 18,289 B |
| Same-origin JS | ~380 KB, 6 scripts + 1 module | 375,211 B, 6 scripts + 1 module |
| Same-origin CSS | ~10 KB, entry + 6 token files | 9,713 B, entry + 6 token files |
| Images | 15 files | 15 files (same names, incl. the six phase plates) |

## Verification matrix

PASS = checked and held, with evidence. FAIL = checked and did not hold. UNVERIFIED = could not be
checked here (never reported as PASS).

| ID | Result | Evidence |
|---|---|---|
| V1 File integrity | **PASS** | All 40 deployed files carry the same SHA-1 as the source deployment (Vercel file tree); `data.js` served with the identical ETag `W/"db4673fe…"`. |
| V2 Console-clean | **FAIL** (pre-existing, intermittent) | Local harness, Home at 1440 (390 not console-captured): clean in 2 of 3 runs; one run logged a 404 for `assets/hero-core.jpg`, a dead reference in `_ds_bundle.js` (handoff P2 #9). |
| V3 Visual parity | UNVERIFIED | No browser can reach `*.vercel.app` from this environment; local renders use placeholder plates. |
| V4 Six-phase sequence | **FAIL** (pre-existing) | Captions follow `FREQ.PHASES`, but `harbor-stage.js` grabs fwd, aft, mid, fwd in phase 04 and aft, mid in phase 05 (plus one in 06), not the aft, aft, mid, mid → fwd, fwd sequence V4 specifies. |
| V5 End-state telemetry | UNVERIFIED | Blocked: this build has no `checkpointAt()`. |
| V6 Cargo increments | UNVERIFIED | Blocked: this build has no `window.FREQ_OP_META`. |
| V7 Hold capacity | UNVERIFIED | Blocked: no cargo ledger in this build. |
| V8 Reduced motion | UNVERIFIED | Not run for this step. |
| V9 WebGL off | UNVERIFIED | Not run for this step. |
| V10 Missing image | UNVERIFIED | Not run for this step. |
| V11 Budgets | **FAIL** (pre-existing) | Image payload is the handoff's ~9.3 MB against a 3.5 MB budget (P0 work not started); Three.js loads on every page. Lighthouse not run. |
| V12 Dependency guard | **PASS** | Files identical to the source build; no dependency added. |

## Deviations

None: every byte matches the source deployment. `DELIVERY.md` from the source deployment was
deliberately not published (a delivery note, not part of the site).

## Rollback note

Known-good state = this deployment. It stays READY in the project and can be re-promoted at any
time; the repo's first commit holds the same text files.
