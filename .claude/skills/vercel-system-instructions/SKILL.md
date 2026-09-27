---
name: vercel-system-instructions
description: Operating rules for any Vercel work on the FREQUENCY site (Vercel project frequency-tera-optimized). Covers which team, project and URL to target, how to deploy this static site through the Vercel MCP tools without corrupting files, how to prove a deploy landed, and what must never be touched (the freqsystems.dev and www domains). Load before any Vercel deploy, alias, or troubleshooting step.
---

# Vercel system instructions: FREQUENCY site

## Targets
| What | Value |
|---|---|
| Team | `team_X5LI2up5bH06FG6XJI2w5ToR` (slug `frequency-electro`) |
| Project | `prj_uFfwXlhNVcaVosfRrkp6Iy49lnUH` (`frequency-tera-optimized`) |
| Preview URL (the work surface) | https://frequency-tera-optimized.vercel.app |
| Source | `site/` in this repo: a static site with no build step |
| Held domains | `freqsystems.dev` and `www.freqsystems.dev` stay on the old build |

## Hard rules
- **Domains.** Never call `mcp__Vercel__assign_alias`, `add_project_domain` or `request_promote` for freqsystems.dev or www. Never re-point either one unless the owner explicitly says "publish".
- **Pull requests.** Never open a PR unless the owner asks for one.
- **Secrets.** No passwords, tokens, API keys or account credentials in any file, commit or message.
- **Inspect, change, verify.** Inspect before changing anything, and verify after. A deploy you have not verified is not done.
- **Deploy count.** One deploy per change set. Validate locally first (`tools/verify/`); don't use deploys to experiment.

## Deploying (static, no build)
1. Compute the SHA-1 and byte size of every file under `site/`.
2. Call `mcp__Vercel__create_deployment` with `project: prj_uFfwXlhNVcaVosfRrkp6Iy49lnUH`, `name: frequency-tera-optimized` and `target: "production"`. The production target is what moves the preview URL above; it does not touch the held domains.
   - Changed text files go **inline**: `{file, data, encoding: "utf-8"}`.
   - Unchanged files are **referenced**: `{file, sha, size}`.
3. **Inline-data pitfall.** The connector decodes `\uXXXX` escape sequences inside inline data. Source files must contain literal characters (`—`, `·`, `→`), never `—`-style escapes. Otherwise the uploaded file differs from the repo. Plain JSON escaping (`\n`, `\"`, `\\`) is fine.
4. **Browser cache.** `vercel.json` caches `*.js` for an hour. When a script changes, bump its query in `site/index.html` (`simulation-ground.js?v=rN`) so every browser fetches the new file. HTML is served `max-age=0, must-revalidate`.

## Verifying a deploy
- Call `mcp__Vercel__get_deployment` and check `readyState: READY`, that `alias` includes `frequency-tera-optimized.vercel.app`, and that `aliasError` is null.
- Call `mcp__Vercel__list_deployment_files`. Every file's `uid` must equal the local SHA-1. Any mismatch means the upload is corrupt, so fix it before reporting.
- Call `mcp__Vercel__web_fetch_vercel_url` on the preview URL (with the `teamId`) to read the live HTML and headers. `*.vercel.app` sits behind Vercel SSO and the sandbox proxy blocks it, so fetch through the tool rather than curl.

## Reporting
State the preview URL, the deployment ID and the files changed. Say explicitly that freqsystems.dev and www were not touched. Do not ask the owner to verify.
