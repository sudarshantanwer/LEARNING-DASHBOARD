# Candidate Info

**Project:** AI Learning Dashboard / Project Tracker  
**Purpose:** Practical assessment artifact demonstrating AI-assisted full-stack delivery with Cursor.

## What was delivered

- Monorepo with `client/` (React + Vite + Tailwind + TanStack Query) and `server/` (Express + TypeScript + Zod)
- JSON persistence under `database/` with automatic read/write on mutations
- Vitest + Supertest (API) and Vitest + RTL (UI) tests
- Docker + docker-compose for one-command startup
- GitHub Actions CI for install, lint, build, and tests
- Assessment documentation set (this folder)

## Assumptions

- `GET /api/users` was added to support owner selection and display without duplicating seed data in the frontend.

## How to run

See `README.md`.
