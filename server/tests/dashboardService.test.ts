import { describe, expect, it, vi } from "vitest";
import { DashboardService } from "../src/services/taskService.js";
import type { ProjectTask } from "../src/types/index.js";

function makeTask(partial: Partial<ProjectTask> & Pick<ProjectTask, "id" | "status" | "priority" | "dueDate">): ProjectTask {
  return {
    title: "T",
    description: "",
    category: "General",
    ownerId: "u1",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    ...partial
  };
}

describe("DashboardService", () => {
  it("computes stats from repository data", async () => {
    const list = vi.fn(async (): Promise<ProjectTask[]> => [
      makeTask({
        id: "1",
        status: "COMPLETED",
        priority: "HIGH",
        dueDate: "2020-01-01T00:00:00.000Z"
      }),
      makeTask({
        id: "2",
        status: "IN_PROGRESS",
        priority: "LOW",
        dueDate: "2030-01-01T00:00:00.000Z"
      }),
      makeTask({
        id: "3",
        status: "TODO",
        priority: "HIGH",
        dueDate: "2020-01-01T00:00:00.000Z"
      })
    ]);

    const svc = new DashboardService({ list } as never);
    const stats = await svc.getStats();
    expect(stats.totalItems).toBe(3);
    expect(stats.completedItems).toBe(1);
    expect(stats.inProgressItems).toBe(1);
    expect(stats.overdueItems).toBe(1);
    expect(stats.highPriorityItems).toBe(2);
  });
});
