# Pull Request Description

## Summary

Introduces the **AI Learning Dashboard** monorepo: an Express/TypeScript API with JSON persistence, a React/Vite/Tailwind client with TanStack Query, Vitest tests, Docker packaging, and CI.

## Why

Provides an end-to-end assessment artifact that mirrors real SaaS dashboard patterns while keeping persistence intentionally simple (JSON files).

## Test plan

- [ ] `npm install`
- [ ] `npm run dev` (verify dashboard loads, tasks CRUD works)
- [ ] `npm run test`
- [ ] `docker compose up --build` (verify UI on `:8080` loads and `/api` proxy works)

## Notes

- Includes `GET /api/users` for owner selection/display.
