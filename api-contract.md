# API Contract

Base URL:

- Local dev (Vite): `/api` (proxied to `http://localhost:4010/api` by default)
- Docker UI: `/api` (proxied by nginx to the API service)

## Users

### `GET /api/users`

Returns the seeded users list.

**Response:** `User[]`

```json
[
  {
    "id": "user-1",
    "name": "Alex Rivera",
    "email": "alex.rivera@example.com",
    "role": "Engineer"
  }
]
```

## Tasks

### `GET /api/tasks`

**Response:** `ProjectTask[]`

### `GET /api/tasks/:id`

**404:** `{ "message": "Task not found" }`  
**200:** `ProjectTask`

### `POST /api/tasks`

Creates a task.

**Body (JSON):**

```json
{
  "title": "string (required)",
  "priority": "LOW|MEDIUM|HIGH (required)",
  "ownerId": "string (required; must exist in users.json)",
  "dueDate": "ISO-parseable string (required)",
  "description": "string (optional; default \"\")",
  "category": "string (optional; default \"General\")",
  "status": "TODO|IN_PROGRESS|COMPLETED (optional; default TODO)"
}
```

**201:** `ProjectTask`  
**400:** validation error (`{ message, issues }`) or `{ message: "Owner not found" }`

### `PUT /api/tasks/:id`

Partial updates supported by Zod object (only provided fields are applied).

**400:** `{ message: "Owner not found" }` when `ownerId` is invalid  
**404:** `{ message: "Task not found" }`

### `PATCH /api/tasks/:id/status`

**Body:**

```json
{ "status": "TODO|IN_PROGRESS|COMPLETED" }
```

## Dashboard

### `GET /api/dashboard`

**Response:**

```json
{
  "totalItems": 0,
  "completedItems": 0,
  "inProgressItems": 0,
  "overdueItems": 0,
  "highPriorityItems": 0
}
```

## Errors

- Unknown routes return **404** JSON: `{ "message": "Not found" }`
