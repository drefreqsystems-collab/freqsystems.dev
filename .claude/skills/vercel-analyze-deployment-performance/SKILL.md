---
name: vercel-analyze-deployment-performance
description: Measure what a deployment of the FREQUENCY site actually ships and how Vercel serves it. Covers per-page payload, the largest assets, scripts that load but aren't used, cache headers and CDN cache hits. Reports numbers, not impressions. Use before and after any optimization, or when the site feels slow.
---

# Analyze deployment performance

1. **Inventory.**
   - Call `mcp__Vercel__list_deployment_files` for the deployment and join it with local `site/` sizes (`wc -c`, `ls -l`).
   - Rank the ten largest files.
   - Flag images that are really PNG data behind a `.jpg` name (`file site/assets/*` or the magic bytes).
2. **What each page loads.**
   - Serve `site/` locally (`tools/verify/serve.py`) and load each page (Home, Simulation, Architecture, Investor, Contact) in Playwright at 1440×900 and 390×844.
   - Record total transferred bytes, request count, and any script that loads on a page that never uses it (for example a Three.js module on a page with no 3D).
3. **Served headers.**
   - Call `mcp__Vercel__web_fetch_vercel_url` on the preview URL and on one asset of each type.
   - Record `cache-control`, `x-vercel-cache` (HIT/MISS) and `content-encoding`.
   - Expected: HTML `max-age=0, must-revalidate`; `/assets/*` `max-age=31536000, immutable`; `*.js` `max-age=3600`.
4. **Motion cost.** For pages meant to be static, confirm `document.getAnimations()` is empty and no `requestAnimationFrame` loop keeps running.
5. **Report** a short table (page → bytes, requests, largest item) and a ranked list of the biggest wins with estimated savings. Do not change anything here; hand the fixes to `vercel-optimize-deployment`.
