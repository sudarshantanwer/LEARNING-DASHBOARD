# Final AI Usage Summary

AI assistance (Cursor) was used to:

- Scaffold the monorepo structure and align it to the requested directory layout
- Generate initial API + repository + Zod validators + Express wiring
- Implement the React UI with Tailwind components and TanStack Query hooks
- Author Vitest tests and iterate on coverage configuration
- Produce documentation templates and prompt logs under `ai-prompts/`

Human review steps that mattered:

- Verifying date/overdue semantics vs the spec
- Ensuring Docker path resolution matched runtime `dist/` layout
- Trimming TypeScript project includes so CI lint/typecheck stayed meaningful
