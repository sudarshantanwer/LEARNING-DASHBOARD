import { Link } from "react-router-dom";
import type { ProjectTask, User } from "../types";
import { TaskPriorityBadge, TaskStatusBadge } from "./TaskBadges";

export function TaskCard({ task, owner }: { task: ProjectTask; owner?: User }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-slate-900">
            <Link className="hover:underline" to={`/tasks/${task.id}`}>
              {task.title}
            </Link>
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Due {new Date(task.dueDate).toLocaleDateString()} · {owner?.name ?? task.ownerId}
          </p>
        </div>
        <TaskPriorityBadge priority={task.priority} />
      </div>
      <p className="mt-3 line-clamp-2 text-sm text-slate-600">{task.description || "No description"}</p>
      <div className="mt-4 flex items-center justify-between gap-2">
        <TaskStatusBadge status={task.status} />
        <Link
          to={`/tasks/${task.id}`}
          className="text-sm font-semibold text-indigo-700 hover:text-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Details
        </Link>
      </div>
    </article>
  );
}
