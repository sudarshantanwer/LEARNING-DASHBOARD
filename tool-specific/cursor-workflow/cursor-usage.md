# Cursor Usage

## Prompts used (representative)

- Monorepo scaffolding with npm workspaces (`client`, `server`) and root scripts for `dev/build/test/lint`.
- “Implement repository/service/controller split for Express + TS with Zod validators and JSON persistence.”
- “Build a Tailwind SaaS UI with dashboard cards, searchable task table, task detail, and forms with accessible labels.”
- “Add Vitest + Supertest API tests using temp JSON directories via `TEST_DATA_DIR`.”
- “Add Docker + nginx reverse proxy for `/api` and GitHub Actions CI.”

## Files generated

- Entire `client/` and `server/` trees (excluding lockfile produced by `npm install`)
- `database/*.json` seeds
- `docker-compose.yml`, Dockerfiles, `.github/workflows/ci.yml`
- Documentation set + `ai-prompts/` + this workflow doc

## Manual modifications

- Coverage threshold tuning (`client/vite.config.ts`, `server/vitest.config.ts`)
- `server/tsconfig.json` include scope adjusted for `tsc --noEmit` linting
- Datetime helpers extracted to `client/src/utils/datetime.ts` for ESLint react-refresh compliance

## Debugging process

- Iterated on Vitest coverage configuration to avoid unrelated files failing thresholds
- Resolved server TS `rootDir` issues for tests vs lint

## Testing process

- Ran `npm run test` repeatedly while wiring Supertest temp directories
- Added RTL tests with `fetch` mocking once UI stabilized

## Lessons learned

- Decide early how “project root” is discovered from `dist/` in Docker vs local dev
- For Vitest coverage gates, explicitly scope `coverage.include` on the client to avoid config noise
