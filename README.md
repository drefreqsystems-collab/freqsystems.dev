# freqsystems.dev

Marketing site and interactive **Signal Lab** for Freq Systems — a deterministic,
fully testable toolkit for generating, transforming, and visualizing signals in
TypeScript.

Built with [Vite](https://vitejs.dev/), React 18, and TypeScript.

## Requirements

- Node.js >= 20 (this repo is developed against Node 22)
- npm (ships with Node)

## Getting started

```bash
npm install       # install dependencies
npm run dev       # start the dev server on http://localhost:5173
```

## Scripts

| Command             | Description                                          |
| ------------------- | ---------------------------------------------------- |
| `npm run dev`       | Start the Vite dev server (host `0.0.0.0`, port 5173) |
| `npm run build`     | Type-check and produce a production build in `dist/` |
| `npm run preview`   | Serve the production build (port 4173)               |
| `npm run lint`      | Lint the project with ESLint                         |
| `npm run typecheck` | Type-check without emitting                          |
| `npm test`          | Run the unit/component test suite (Vitest)           |

## Project layout

```
src/
  lib/signal.ts          Pure DSP core (waveform generation, RMS, SVG path)
  components/SignalLab.*  Interactive oscilloscope UI
  App.tsx                Landing page shell
```

The DSP core in `src/lib/signal.ts` is side-effect free and covered by unit
tests, so signal behavior can be verified independently of the UI.
