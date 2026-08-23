# AGENTS.md

## Cursor Cloud specific instructions

`freqsystems.dev` is a **frontend-only** React 18 + TypeScript + Vite single-page app.
There is no backend, database, or external service — the "Signal Lab" oscilloscope and
its DSP core (`src/lib/signal.ts`) run entirely in the browser. End-to-end testing only
requires the single Vite dev server.

Standard commands live in `README.md` and `package.json` scripts (`dev`, `build`,
`preview`, `lint`, `typecheck`, `test`). Node `>=20` is required (developed on Node 22).

Non-obvious notes:

- Dependency install and the dev server are wired through `.cursor/environment.json`:
  `install` runs `npm ci`, and a `dev-server` terminal auto-runs `npm run dev`. The dev
  server binds to `0.0.0.0:5173` (not the default 5173-on-localhost-only), so it is
  reachable across the VM network as well as `http://localhost:5173`.
- Vite HMR hot-reloads edits to files under `src/` without a restart. However, after
  installing/updating dependencies you must restart the dev server, because Vite caches
  pre-bundled deps in `.vite/` and will not pick up new packages on its own.
- `npm run build` and `npm run typecheck` use `tsc -b` (project references across
  `tsconfig.app.json` / `tsconfig.node.json`); build artifacts land in `dist/` and
  TypeScript incremental info in `*.tsbuildinfo` (both git-ignored).
- Tests use Vitest with jsdom (`src/test/setup.ts`); `npm test` runs once, `npm run
  test:watch` watches.
