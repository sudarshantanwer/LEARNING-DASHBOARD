# AI Learning Dashboard / Project Tracker

Production-style monorepo demonstrating AI-assisted engineering with **Cursor**: a React + Vite dashboard backed by an **Express + TypeScript** API, **Zod** validation, **TanStack Query** on the client, **JSON file persistence** (no database), **Vitest** tests (Supertest + React Testing Library), **Docker**, and **GitHub Actions CI**.

## Features

- Dashboard analytics computed from persisted tasks (`GET /api/dashboard`)
- Task CRUD via REST (`GET/POST/PUT` tasks, `PATCH` status)
- Seeded users (`database/users.json`) and persisted tasks (`database/tasks.json`)
- Modern responsive SaaS UI (Tailwind) with loading/empty/error states and accessible forms

## Prerequisites

- Node.js **20+** recommended (CI uses Node 20)

## Quick start (local)

Install dependencies at the repo root (npm workspaces):

```bash
npm install
npm run dev
```

This runs:

- API: `http://localhost:4010` (default; avoids clashes with other apps on **4000**)
- Web: `http://localhost:5173` (Vite dev server proxies `/api` → `4010`)

## Scripts (root)

| Script | Description |
| --- | --- |
| `npm run dev` | Run API + web together |
| `npm run build` | Build server + client |
| `npm run test` | Run all Vitest suites |
| `npm run test:coverage` | Run coverage (workspace thresholds configured) |
| `npm run lint` | Typecheck server + ESLint client |

## Docker

```bash
docker compose up --build
```

- UI: `http://localhost:8080` (nginx serves the SPA and proxies `/api` to the API container)
- API (host): `http://localhost:4010`
- `./database` is mounted into the API container so JSON changes survive restarts on the host volume.

## Project layout

- `client/` — React + TypeScript + Vite + Tailwind + React Router + TanStack Query
- `server/` — Express + TypeScript + Zod + repository/service layers
- `database/` — `users.json` + `tasks.json` (seeded, persisted)
- `ai-prompts/` — example prompts used during development
- `tool-specific/cursor-workflow/` — Cursor workflow notes

## Troubleshooting

### “Could not load users” / `Request failed (404)` on `/api/users`

The UI calls **`/api/users`** on the **same origin** as the page. That only works if:

1. **API is running** on port **4010** (this project’s default), and  
2. The dev or preview server **proxies** `/api` → `http://127.0.0.1:4010` (configured in `client/vite.config.ts`).

**Do this:** from the repo root, start **both** processes:

```bash
npm run dev
```

If you only start the client (`npm run dev -w client`), start the API in another terminal:

```bash
npm run dev -w server
```

**Quick check:** open [http://localhost:4010/api/users](http://localhost:4010/api/users) — you should see JSON. If that 404s, the server build/routes are wrong or you’re not hitting this project’s API.

If you use **`vite preview`**, the API must still be running on **4010** (or whatever `PORT` you set); preview uses the same `/api` proxy as dev.

### `EADDRINUSE` / “port … is already in use”

Something else is already listening on the **same port** this app uses (default **4010** for the API).

1. **See what owns the port (macOS):**

   ```bash
   lsof -nP -iTCP:4010 -sTCP:LISTEN
   ```

2. **Stop that process** (replace `<pid>` with the second column from `lsof`):

   ```bash
   kill <pid>
   ```

3. Start again: `npm run dev`

If you intentionally need a different API port, run **both** with matching values (Vite reads `API_PROXY_PORT` in `client/vite.config.ts`):

```bash
PORT=4020 API_PROXY_PORT=4020 npm run dev
```

## Notes

- The UI includes `GET /api/users` to populate owner pickers and display owner names (not listed in the original minimal contract, but required for UX). See `api-contract.md`.

## Documentation

See the assessment documents in the repo root (`requirements-analysis.md`, `test-strategy.md`, etc.).

**Junior / AI coding lab:** step-by-step assignment — [`docs/assignment/AI_CODING_LAB.md`](docs/assignment/AI_CODING_LAB.md). **Project UI walkthrough** (Markdown + PDF with all mockups): [`docs/assignment/PROJECT_UI_WALKTHROUGH.md`](docs/assignment/PROJECT_UI_WALKTHROUGH.md) · [`docs/assignment/PROJECT_UI_WALKTHROUGH.pdf`](docs/assignment/PROJECT_UI_WALKTHROUGH.pdf). **UI mockup gallery:** [`docs/assignment/UI_MOCKUPS.md`](docs/assignment/UI_MOCKUPS.md).
