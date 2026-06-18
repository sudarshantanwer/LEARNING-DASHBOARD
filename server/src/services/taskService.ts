import { randomUUID } from "node:crypto";
import type { DashboardStats, ProjectTask, TaskStatus } from "../types/index.js";
import type { CreateTaskBody, UpdateTaskBody } from "../validators/taskValidators.js";
import { TaskRepository } from "../repositories/taskRepository.js";
import { UserRepository } from "../repositories/userRepository.js";

function startOfTodayUtc(): Date {
  const d = new Date();
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}

export class DashboardService {
  constructor(private readonly tasks: TaskRepository) {}

  async getStats(): Promise<DashboardStats> {
    const all = await this.tasks.list();
    const today = startOfTodayUtc();

    const completedItems = all.filter((t) => t.status === "COMPLETED").length;
    const inProgressItems = all.filter((t) => t.status === "IN_PROGRESS").length;
    const overdueItems = all.filter((t) => {
      if (t.status === "COMPLETED") return false;
      const due = new Date(t.dueDate);
      return due < today;
    }).length;
    const highPriorityItems = all.filter((t) => t.priority === "HIGH").length;

    return {
      totalItems: all.length,
      completedItems,
      inProgressItems,
      overdueItems,
      highPriorityItems
    };
  }
}

export class TaskService {
  constructor(
    private readonly tasks: TaskRepository,
    private readonly users: UserRepository
  ) {}

  async list(): Promise<ProjectTask[]> {
    return this.tasks.list();
  }

  async getById(id: string): Promise<ProjectTask | null> {
    const task = await this.tasks.findById(id);
    return task ?? null;
  }

  async create(body: CreateTaskBody): Promise<ProjectTask> {
    const owner = await this.users.findById(body.ownerId);
    if (!owner) {
      throw Object.assign(new Error("Owner not found"), { statusCode: 400 });
    }

    const now = new Date().toISOString();
    const task: ProjectTask = {
      id: randomUUID(),
      title: body.title,
      description: body.description ?? "",
      category: body.category ?? "General",
      priority: body.priority,
      status: body.status ?? "TODO",
      ownerId: body.ownerId,
      dueDate: body.dueDate,
      createdAt: now,
      updatedAt: now
    };

    return this.tasks.create(task);
  }

  async update(id: string, body: UpdateTaskBody): Promise<ProjectTask | null> {
    const existing = await this.tasks.findById(id);
    if (!existing) return null;

    if (body.ownerId) {
      const owner = await this.users.findById(body.ownerId);
      if (!owner) {
        throw Object.assign(new Error("Owner not found"), { statusCode: 400 });
      }
    }

    return this.tasks.update(id, {
      ...(body.title !== undefined ? { title: body.title } : {}),
      ...(body.description !== undefined ? { description: body.description } : {}),
      ...(body.category !== undefined ? { category: body.category } : {}),
      ...(body.priority !== undefined ? { priority: body.priority } : {}),
      ...(body.status !== undefined ? { status: body.status } : {}),
      ...(body.ownerId !== undefined ? { ownerId: body.ownerId } : {}),
      ...(body.dueDate !== undefined ? { dueDate: body.dueDate } : {})
    });
  }

  async updateStatus(id: string, status: TaskStatus): Promise<ProjectTask | null> {
    const existing = await this.tasks.findById(id);
    if (!existing) return null;
    return this.tasks.update(id, { status });
  }
}
