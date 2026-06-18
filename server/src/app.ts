import cors from "cors";
import express, { type Request, type Response } from "express";
import { errorHandler } from "./middleware/errorHandler.js";
import { registerRoutes } from "./routes/index.js";
import { TaskRepository } from "./repositories/taskRepository.js";
import { UserRepository } from "./repositories/userRepository.js";
import { DashboardService, TaskService } from "./services/taskService.js";

export function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  const taskRepository = new TaskRepository();
  const userRepository = new UserRepository();
  const taskService = new TaskService(taskRepository, userRepository);
  const dashboardService = new DashboardService(taskRepository);

  registerRoutes(app, {
    taskService,
    dashboardService,
    userRepository
  });

  app.use((_req: Request, res: Response) => {
    res.status(404).json({ message: "Not found" });
  });

  app.use(errorHandler);
  return app;
}
