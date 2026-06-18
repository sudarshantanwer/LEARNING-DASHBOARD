import type { Request, Response } from "express";
import { ZodError } from "zod";
import {
  createTaskBodySchema,
  patchTaskStatusBodySchema,
  updateTaskBodySchema
} from "../validators/taskValidators.js";
import type { DashboardService, TaskService } from "../services/taskService.js";

function sendZodError(res: Response, err: ZodError) {
  return res.status(400).json({
    message: "Validation failed",
    issues: err.flatten()
  });
}

export function createTaskController(taskService: TaskService) {
  return {
    list: async (_req: Request, res: Response) => {
      const tasks = await taskService.list();
      res.json(tasks);
    },

    getById: async (req: Request, res: Response) => {
      const task = await taskService.getById(req.params.id as string);
      if (!task) return res.status(404).json({ message: "Task not found" });
      res.json(task);
    },

    create: async (req: Request, res: Response) => {
      try {
        const body = createTaskBodySchema.parse(req.body);
        const task = await taskService.create(body);
        res.status(201).json(task);
      } catch (e) {
        if (e instanceof ZodError) return sendZodError(res, e);
        if (e instanceof Error && "statusCode" in e && (e as { statusCode?: number }).statusCode === 400) {
          return res.status(400).json({ message: e.message });
        }
        throw e;
      }
    },

    update: async (req: Request, res: Response) => {
      try {
        const body = updateTaskBodySchema.parse(req.body);
        const task = await taskService.update(req.params.id as string, body);
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.json(task);
      } catch (e) {
        if (e instanceof ZodError) return sendZodError(res, e);
        if (e instanceof Error && "statusCode" in e && (e as { statusCode?: number }).statusCode === 400) {
          return res.status(400).json({ message: e.message });
        }
        throw e;
      }
    },

    patchStatus: async (req: Request, res: Response) => {
      try {
        const body = patchTaskStatusBodySchema.parse(req.body);
        const task = await taskService.updateStatus(req.params.id as string, body.status);
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.json(task);
      } catch (e) {
        if (e instanceof ZodError) return sendZodError(res, e);
        throw e;
      }
    }
  };
}

export function createDashboardController(dashboardService: DashboardService) {
  return {
    get: async (_req: Request, res: Response) => {
      const stats = await dashboardService.getStats();
      res.json(stats);
    }
  };
}
