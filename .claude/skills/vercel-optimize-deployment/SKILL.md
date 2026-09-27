---
name: vercel-optimize-deployment
description: Apply safe, measurable optimizations to the static FREQUENCY deployment without adding build tooling or changing the design, then prove each one with before/after numbers. Covers cache headers and cache-busting, lazy/async image loading, dropping scripts a page doesn't use, and image weight. Use after vercel-analyze-deployment-performance, or whenever a change adds weight.
---

# Optimize the deployment

Follow `vercel-system-instructions`. No new dependencies, frameworks or build steps unless the owner approves them.

Work in this order and measure after each change:

1. **Don't load what a page doesn't use.** Remove `<script>` tags for modules no page renders. For example, drop the `harbor-stage.js` module once nothing uses `<harbor-stage>`. Keep the file itself only if another page still imports it.
2. **Images.**
   - Give every non-hero image `loading="lazy"` and `decoding="async"`, plus explicit `width`/`height` or a CSS `aspect-ratio`, so nothing shifts.
   - Hero and first-screen images stay eager.
   - Re-encoding the mislabeled PNG plates to real JPEG or WebP is the biggest byte win (about 8.2 MB down to under 2 MB). It needs new binary uploads, so propose it and don't improvise it.
3. **Caching.**
   - `/assets/*` stays immutable.
   - When a script changes, bump its `?v=` in `index.html` rather than weakening the cache.
   - Never cache HTML.
4. **No motion on static pages.** Remove idle animation loops and CSS animations from pages meant to be still. Honour `prefers-reduced-motion` everywhere else.
5. **Verify.**
   - Re-run the checks in `vercel-analyze-deployment-performance` locally and confirm zero console errors.
   - Deploy once and confirm the uploaded SHAs match (see `vercel-system-instructions`).
   - Report before/after bytes and requests per page.
