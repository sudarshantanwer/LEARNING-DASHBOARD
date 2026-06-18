# Acceptance Criteria

## Persistence

- [x] Tasks stored in `database/tasks.json`
- [x] Users stored in `database/users.json`
- [x] Mutations persist to disk and are visible after API restart

## API

- [x] `GET /api/tasks`
- [x] `GET /api/tasks/:id`
- [x] `POST /api/tasks`
- [x] `PUT /api/tasks/:id`
- [x] `PATCH /api/tasks/:id/status`
- [x] `GET /api/dashboard`
- [x] `GET /api/users` (added for owner UX)

## Dashboard metrics

- [x] Totals derived from stored tasks using the specified rules (overdue excludes completed; compares due date to UTC day boundary)

## Frontend

- [x] Required pages exist and are routed
- [x] Required UI states exist (loading/empty/error/success patterns)
- [x] Responsive layout with Tailwind

## Engineering

- [x] `npm install` + `npm run dev` works for local development
- [x] `docker compose up` starts UI + API
- [x] CI runs lint/build/test
