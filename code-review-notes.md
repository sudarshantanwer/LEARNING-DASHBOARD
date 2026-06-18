# Code Review Notes

## Strengths

- Clear layering on the server (routes → controllers → services → repositories)
- Zod validation keeps invalid data out of persistence
- Client uses TanStack Query for caching + invalidation on mutations
- Tests isolate filesystem side effects via `TEST_DATA_DIR`

## Risks / follow-ups

- JSON read/write loads whole files (OK for assessment scale; would need real DB or streaming for large datasets)
- `errorHandler` is not heavily exercised by tests
- No authn/authz (assumed single-user local tool)

## Suggested next PRs

- `DELETE /api/tasks/:id` + transactional writes/locking for concurrent updates
- Pagination for `/api/tasks`
- Structured logging + request IDs
