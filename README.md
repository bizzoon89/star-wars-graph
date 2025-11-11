# Star Wars Graph Viewer

This project is a **React + TypeScript + Vite** app that visualizes relationships between Star Wars characters, films, and starships using **React Flow**.

The app fetches data from the public API [`https://sw-api.starnavi.io`](https://sw-api.starnavi.io).

---

## 🚀 Features

- Infinite scroll list of people (React Query)
- On-demand graph visualization for each character
- Modal-based display (no full page reload)
- Unit tests for all main logic (Vitest + React Testing Library)
- Clean, SOLID, DRY, and KISS compliant architecture

---

## 🧱 Tech Stack

- **React 18** + **TypeScript**
- **React Query** (`@tanstack/react-query`)
- **React Flow** for graph visualization
- **Vite** for build
- **TailwindCSS** for UI
- **Vitest** + **@testing-library/react** for unit tests

---

## ⚙️ Installation

```bash
# 1. Clone the repository
git clone https://github.com/bizzoon89/star-wars-graph.git
cd star-wars-graph

# 2. Install dependencies
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
```
