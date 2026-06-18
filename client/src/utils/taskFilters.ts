import type { ProjectTask, TaskStatus } from "../types";

export function matchesSearch(task: ProjectTask, q: string): boolean {
  if (!q.trim()) return true;
  const needle = q.toLowerCase();
  return (
    task.title.toLowerCase().includes(needle) ||
    task.description.toLowerCase().includes(needle) ||
    task.category.toLowerCase().includes(needle)
  );
}

export function matchesStatus(task: ProjectTask, status: TaskStatus | "ALL"): boolean {
  if (status === "ALL") return true;
  return task.status === status;
}
