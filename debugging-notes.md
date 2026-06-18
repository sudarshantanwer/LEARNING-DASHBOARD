# Debugging Notes

## React Router warnings in tests

Vitest output included `No routes matched location "/tasks/:id"` after `navigate()` from create/edit flows because `MemoryRouter` only mounted a single route.

**Mitigation (optional):** extend test routers with stub routes for navigation targets.

## Server `tsconfig` + tests

`tests/` lived outside `rootDir` when `tsc --noEmit` included them. **Fix:** `server/tsconfig.json` now typechecks `src/` only; Vitest compiles tests independently.

## Coverage gates

Initial client coverage failed global thresholds because config files were included in the denominator. **Fix:** `coverage.all: false` + `coverage.include` in `client/vite.config.ts`.

## Docker pathing

The API resolves the monorepo root from `server/dist/utils/paths.js` and expects `database/` at `<repo>/database`. Compose mounts `./database` to `/app/database` accordingly.
