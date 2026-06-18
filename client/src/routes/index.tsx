import { Navigate, Route, Routes } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { CreateTaskPage } from "../pages/CreateTaskPage";
import { DashboardPage } from "../pages/DashboardPage";
import { EditTaskPage } from "../pages/EditTaskPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { TaskDetailPage } from "../pages/TaskDetailPage";
import { TaskListPage } from "../pages/TaskListPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/tasks" element={<TaskListPage />} />
        <Route path="/tasks/new" element={<CreateTaskPage />} />
        <Route path="/tasks/:id" element={<TaskDetailPage />} />
        <Route path="/tasks/:id/edit" element={<EditTaskPage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
