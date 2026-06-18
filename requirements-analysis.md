# Requirements Analysis

## Goal

Build a learning/project task tracker with dashboard analytics and CRUD task flows, persisted as JSON files that survive process restarts.

## Users

- Users are **seed-only** (5 users) stored in `database/users.json`.

## Tasks (`ProjectTask`)

- Fields: id, title, description, category, priority, status, ownerId, dueDate, createdAt, updatedAt
- Priorities: LOW | MEDIUM | HIGH
- Statuses: TODO | IN_PROGRESS | COMPLETED

## Functional requirements

- Dashboard cards computed from persisted tasks
- Create task with validation for required fields (title, priority, owner, due date)
- List tasks with search + status filter
- Task detail view + edit view
- Quick actions: mark in progress / completed (implemented via `PATCH /api/tasks/:id/status`)

## Non-functional requirements

- TypeScript throughout
- Zod validation on API boundaries
- Automated tests + CI
- Dockerized local deployment

## Out of scope (explicit)

- DELETE task API (UI includes a demo-only confirmation modal)
