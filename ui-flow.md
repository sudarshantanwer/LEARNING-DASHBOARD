# UI Flow

## Navigation

- Primary navigation: Dashboard, Tasks, New task
- Task table links to detail; detail links to edit

## Dashboard (`/`)

1. Load dashboard stats + tasks + users in parallel
2. Render summary cards from stats
3. Show up to 3 “recent” tasks (first items returned by `/api/tasks`)

## Task list (`/tasks`)

1. Load tasks + users
2. Client-side keyword search across title/description/category
3. Client-side status filter (`ALL` + each status)

## Create task (`/tasks/new`)

1. Load users for owner `<select>`
2. Submit creates task via `POST /api/tasks`
3. Navigate to `/tasks/:id`

## Task detail (`/tasks/:id`)

1. Load task + users
2. Quick actions call `PATCH /api/tasks/:id/status`
3. Success toast feedback
4. “Delete (demo)” opens confirmation modal (no backend delete)

## Edit task (`/tasks/:id/edit`)

1. Prefill `TaskForm` with existing task
2. `PUT /api/tasks/:id` persists edits

## Not found (`*`)

Friendly empty state with link back home.
