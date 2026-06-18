import type { Express } from "express";
import { Router } from "express";
import {
  createDashboardController,
  createTaskController
} from "../controllers/taskController.js";
import { createUserController } from "../controllers/userController.js";
import type { DashboardService, TaskService } from "../services/taskService.js";
import type { UserRepository } from "../repositories/userRepository.js";

export function registerRoutes(
  app: Express,
  deps: {
    taskService: TaskService;
    dashboardService: DashboardService;
    userRepository: UserRepository;
  }
): void {
  const api = Router();
  const tasks = createTaskController(deps.taskService);
  const dashboard = createDashboardController(deps.dashboardService);
  const users = createUserController(deps.userRepository);

  api.get("/users", users.list);
  api.get("/tasks", tasks.list);
  api.get("/tasks/:id", tasks.getById);
  api.post("/tasks", tasks.create);
  api.put("/tasks/:id", tasks.update);
  api.patch("/tasks/:id/status", tasks.patchStatus);
  api.get("/dashboard", dashboard.get);

  app.use("/api", api);
}
