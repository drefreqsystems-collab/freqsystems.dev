---
name: vercel-troubleshoot-common-issues
description: Checklist for the usual Vercel problems on the FREQUENCY site. Covers the owner still seeing the old design after a deploy, the preview alias pointing at the wrong deployment, 401/403 from deployment protection, 404s, missing images, console errors, and uploads that don't match local files. Use when "it didn't deploy" or "it still shows the old version" comes up.
---

# Troubleshoot common issues

Work down the list and stop at the first confirmed cause. Every conclusion needs evidence: a tool result, headers or a hash.

1. **Wrong deployment behind the URL.**
   - Call `mcp__Vercel__get_deployment` on the newest deployment and confirm `alias` contains `frequency-tera-optimized.vercel.app`.
   - If it doesn't, check `mcp__Vercel__list_deployment_aliases`.
   - Never touch freqsystems.dev or www (see `vercel-system-instructions`).
2. **Upload differs from the repo.**
   - Compare `mcp__Vercel__list_deployment_files` uids with the local SHA-1s.
   - A mismatch in a JS/HTML file is almost always `\uXXXX` escapes in the source that the connector decoded. Convert them to literal characters and redeploy.
3. **Stale browser cache.** This is the owner seeing the old design although the deploy is correct.
   - `vercel.json` gives `*.js` `max-age=3600` with no revalidation.
   - Fix: version the changed script URLs in `site/index.html` (`?v=rN`).
   - Confirm with `mcp__Vercel__web_fetch_vercel_url` that the live HTML references the new versions.
4. **401/403.**
   - `*.vercel.app` is protected by Vercel SSO (`all_except_custom_domains`), so the owner must be logged in to Vercel.
   - For automated checks use `mcp__Vercel__web_fetch_vercel_url` with the team ID. For a temporary share link use `mcp__Vercel__get_access_to_vercel_url`.
5. **404 or missing asset.**
   - The site uses `cleanUrls: true` and `trailingSlash: false`, and assets live under `/assets/`.
   - Check that the file is in `list_deployment_files` and that its path matches the reference exactly, including case.
6. **Runtime errors.**
   - Load the page in Playwright locally (`tools/verify`) and collect `pageerror` and console errors.
   - `mcp__Vercel__get_runtime_errors` only covers functions; this site has none.
7. **Report** the confirmed cause, the fix, and the evidence (header, hash or log line).
