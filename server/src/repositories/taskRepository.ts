import { readFile, writeFile } from "node:fs/promises";
import type { ProjectTask } from "../types/index.js";
import { getTasksFilePath } from "../utils/paths.js";

export class TaskRepository {
  private async readAll(): Promise<ProjectTask[]> {
    const raw = await readFile(getTasksFilePath(), "utf-8");
    return JSON.parse(raw) as ProjectTask[];
  }

  private async writeAll(tasks: ProjectTask[]): Promise<void> {
    await writeFile(getTasksFilePath(), JSON.stringify(tasks, null, 2), "utf-8");
  }

  async list(): Promise<ProjectTask[]> {
    return this.readAll();
  }

  async findById(id: string): Promise<ProjectTask | undefined> {
    const tasks = await this.readAll();
    return tasks.find((t) => t.id === id);
  }

  async create(task: ProjectTask): Promise<ProjectTask> {
    const tasks = await this.readAll();
    tasks.push(task);
    await this.writeAll(tasks);
    return task;
  }

  async update(id: string, patch: Partial<ProjectTask>): Promise<ProjectTask | null> {
    const tasks = await this.readAll();
    const idx = tasks.findIndex((t) => t.id === id);
    if (idx === -1) return null;
    const updated = { ...tasks[idx], ...patch, updatedAt: new Date().toISOString() };
    tasks[idx] = updated;
    await this.writeAll(tasks);
    return updated;
  }
}
