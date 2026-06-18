# Tool Workflow (Cursor)

High-level workflow used to produce this repository:

1. **Specification intake:** translate the assessment into an explicit file tree, API surface, and UI routes.
2. **Backend-first:** implement persistence + repository + services + routes with Supertest coverage using isolated temp JSON directories via `TEST_DATA_DIR`.
3. **Frontend:** scaffold Vite app, wire TanStack Query to `/api`, implement pages/components, then RTL tests with `fetch` mocking.
4. **Hardening:** CI, Docker, coverage thresholds, lint/typecheck, documentation pass.

Artifacts captured in:

- `tool-specific/cursor-workflow/cursor-usage.md`
- `ai-prompts/`
