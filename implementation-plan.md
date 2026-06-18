# Implementation Plan

## Milestone A — Backend foundation

- Express app wiring + error handling
- JSON repositories for tasks/users
- Zod validators for create/update/status patch
- Services: task lifecycle + dashboard aggregation
- Supertest suite using temp `TEST_DATA_DIR`

## Milestone B — Frontend application

- Vite + Tailwind + Router + QueryClient
- API client module (`client/src/services/api.ts`)
- Pages: dashboard, list, detail, create, edit, not found
- Components: tables, filters, forms, modals, toasts

## Milestone C — Quality + packaging

- Vitest coverage configuration (server + client)
- ESLint (client) + TS typecheck (server)
- Dockerfiles + compose + nginx proxy
- GitHub Actions workflow

## Milestone D — Documentation

- Contract + model + UI flow + test strategy/results
- AI prompt pack + Cursor workflow notes
