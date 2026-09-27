---
name: vercel-fix-recent-build
description: Find the most recent deployment of the FREQUENCY site (Vercel project frequency-tera-optimized). If it failed, is stuck, or serves something other than the committed code, read its build events, find the root cause, fix the source, redeploy once, and verify. Use when a Vercel build errored, a deploy never reached READY, or the live preview doesn't match the repo.
---

# Fix the most recent build

Follow `vercel-system-instructions` for targets and hard rules.

1. **Find it.** Call `mcp__Vercel__list_deployments` with `projectId: prj_uFfwXlhNVcaVosfRrkp6Iy49lnUH`, the team ID and `limit: 5`. Take the newest deployment and note its `state` and `target`.
2. **Classify it.**
   - `ERROR` or `CANCELED`: go to step 3.
   - `QUEUED`, `INITIALIZING` or `BUILDING` for more than 5 minutes: read its events (step 3). Cancel it only if it is clearly hung (`mcp__Vercel__cancel_deployment`).
   - `READY` but wrong content: compare `mcp__Vercel__list_deployment_files` uids with the local SHA-1s of `site/`. A mismatch means a corrupt upload; see the inline-data pitfall in `vercel-system-instructions`. If everything matches, check which deployment the preview alias points at (`mcp__Vercel__list_deployment_aliases`).
3. **Read the build.** Call `mcp__Vercel__list_deployment_events` for the deployment ID. Find the first error line, not the last. Typical causes:
   - a `vercel.json` schema error;
   - a `buildCommand` left over from a diagnostic deploy (this site has no build step);
   - a file referenced by SHA that was never uploaded (`missing_files`).
4. **Fix it in the repo.** Make the smallest change that removes the cause. Validate locally with `tools/verify/run.sh`, or at least load the changed page in Playwright with zero console errors.
5. **Redeploy once**, then verify, both per `vercel-system-instructions`.
6. **Report** the root cause in one sentence, the fix, the new deployment ID and its READY state.
