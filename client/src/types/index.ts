export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";
export type TaskStatus = "TODO" | "IN_PROGRESS" | "COMPLETED";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface ProjectTask {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: TaskPriority;
  status: TaskStatus;
  ownerId: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalItems: number;
  completedItems: number;
  inProgressItems: number;
  overdueItems: number;
  highPriorityItems: number;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  category?: string;
  priority: TaskPriority;
  status?: TaskStatus;
  ownerId: string;
  dueDate: string;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  category?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
  ownerId?: string;
  dueDate?: string;
}
