# Data Model

## `User`

```ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}
```

Seeded records live in `database/users.json` (5 users).

## `ProjectTask`

```ts
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";
export type TaskStatus = "TODO" | "IN_PROGRESS" | "COMPLETED";

export interface ProjectTask {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: TaskPriority;
  status: TaskStatus;
  ownerId: string;
  dueDate: string; // ISO timestamp string
  createdAt: string;
  updatedAt: string;
}
```

Persisted in `database/tasks.json`.

## Dashboard DTO

```ts
export interface DashboardStats {
  totalItems: number;
  completedItems: number;
  inProgressItems: number;
  overdueItems: number;
  highPriorityItems: number;
}
```
