# Test Results (representative)

Captured from a local run of:

```bash
npm run test
npm run test:coverage
```

## Unit + integration summary

- **Server:** 10 tests passed (Supertest API suite + dashboard service unit test)
- **Client:** 9 tests passed (RTL page/util/state tests)

## Coverage notes

- Server coverage is strongest around repositories/routes/validators; middleware error handler is lightly exercised (acceptable for this assessment scope).
- Client coverage thresholds are applied to included `src/**` files with `all: false` so the gate reflects meaningful UI modules.

> Re-run commands locally to regenerate exact percentages for your machine.
