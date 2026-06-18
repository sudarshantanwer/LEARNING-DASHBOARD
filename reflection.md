# Reflection

This project was structured to keep the “AI-assisted” story honest: the codebase is split into reviewable layers, tests protect persistence and API contracts, and Docker/CI make the result runnable by someone other than the original author.

The largest product decision outside the strict spec was `GET /api/users`, which avoids duplicating seed data in the client while keeping the UI requirement (“show owner”) achievable.

If this were extended to production, the first architectural change would be replacing whole-file writes with a real database and explicit concurrency control.
