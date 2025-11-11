
# Star Wars Graph — React + TypeScript + React Flow + Tailwind

Lists Star Wars heroes and visualizes their Films → Starships graph.

## Highlights
- Infinite scroll (IntersectionObserver) with animated loader
- Details in modal (no page reload)
- React Flow graph
- Tailwind responsive UI
- Unit tests with Vitest + MSW (no real API calls)
- Comments in English, clear naming, SOLID/DRY/KISS

## Install
```bash
npm install
```

## Dev
```bash
npm run dev
# open http://localhost:5173
```

## Build & Preview
```bash
npm run build
npm run preview
```

## Tests (no real HTTP)
```bash
npm test        # run once
npm run test:ui # watch mode
npm run coverage
```

### Why tests do not hit the real API
- MSW (`src/mocks/*`) intercepts all `fetch` calls.
- `setupTests.ts` starts the MSW server before tests and shuts it down after.
- Also mocks `IntersectionObserver` and `ResizeObserver` so React Flow and infinite scroll work in jsdom.
