# Design Notes

## Architecture

- **Repository pattern:** `TaskRepository` / `UserRepository` encapsulate JSON IO.
- **Service layer:** `TaskService` validates owner existence; `DashboardService` computes analytics.
- **Client layering:** hooks wrap TanStack Query; components remain mostly stateless; pages orchestrate UX.

## Persistence strategy

- Read/modify/write entire JSON arrays for correctness on small datasets (assessment scale).
- `TEST_DATA_DIR` allows integration tests without mutating the developer database directory.

## UI/UX

- SaaS-style neutral palette (slate) + indigo primary + semantic accents (emerald success, rose danger).
- Forms use visible labels, `sr-only` where appropriate, and native controls for accessibility.

## Date handling

- API accepts ISO-parseable date strings.
- Dashboard overdue logic compares due timestamps against **UTC start of “today”** for deterministic tests.

## Docker networking

- Browser calls `/api/*` on the web origin; nginx proxies to `api:4010` (compose + Dockerfile default `PORT`).
