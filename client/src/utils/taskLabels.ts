import type { TaskStatus } from "../types";

export function formatTaskStatus(status: TaskStatus): string {
  switch (status) {
    case "TODO":
      return "To do";
    case "IN_PROGRESS":
      return "In progress";
    case "COMPLETED":
      return "Completed";
    default:
      return status;
  }
}
