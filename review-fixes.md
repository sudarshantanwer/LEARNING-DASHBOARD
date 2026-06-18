# Review Fixes

This document tracks review-driven adjustments applied during hardening:

- Tightened TypeScript project boundaries (`server/tsconfig.json`) so `npm run lint` typecheck matches build inputs.
- Adjusted Vitest coverage configuration to avoid penalizing non-source files on the client.
- Moved datetime conversion helpers out of `TaskForm.tsx` to satisfy `react-refresh/only-export-components`.
- Added `GET /api/users` to avoid duplicating seed data in the frontend while keeping owner UX correct.
