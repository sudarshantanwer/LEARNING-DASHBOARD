# Test Strategy

## Backend (Vitest + Supertest)

- Spin up Express `app` without listening on a port
- Use `TEST_DATA_DIR` temp directories with isolated `tasks.json` / `users.json`
- Cover:
  - create task (happy path)
  - validation failures
  - get/update/patch status
  - dashboard aggregation edge cases (overdue + high priority counting)
  - unknown owner rejection
  - missing task 404

## Frontend (Vitest + RTL + jsdom)

- Mock `fetch` at the boundary (no MSW dependency)
- Cover:
  - dashboard rendering with mocked API payloads
  - task list search + filter interactions
  - create/edit flows (submit triggers expected network calls)
  - presentational states (`LoadingState`, `EmptyState`, `ErrorState`)
  - pure utilities (`taskFilters`)

## Coverage policy

- Server: enforce thresholds on compiled `src/` coverage; exclude `src/index.ts` and generated summaries as configured in `server/vitest.config.ts`.
- Client: use `coverage.all: false` and `coverage.include: ["src/**/*.{ts,tsx}"]` so thresholds reflect exercised application code rather than config-only files.

## CI

GitHub Actions runs `npm ci`, `npm run lint`, `npm run build`, `npm run test`.
