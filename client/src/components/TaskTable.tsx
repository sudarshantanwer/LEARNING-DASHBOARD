import { Link } from "react-router-dom";
import type { ProjectTask, User } from "../types";
import { IconArrowRight } from "./icons";
import { TaskPriorityBadge, TaskStatusBadge } from "./TaskBadges";

export function TaskTable({
  tasks,
  usersById
}: {
  tasks: ProjectTask[];
  usersById: Record<string, User | undefined>;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-600">
            <tr>
              <th scope="col" className="px-4 py-3">
                Title
              </th>
              <th scope="col" className="px-4 py-3">
                Priority
              </th>
              <th scope="col" className="px-4 py-3">
                Status
              </th>
              <th scope="col" className="px-4 py-3">
                Owner
              </th>
              <th scope="col" className="px-4 py-3">
                Due date
              </th>
              <th scope="col" className="px-4 py-3 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tasks.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50/60">
                <td className="px-4 py-3 font-medium text-slate-900">
                  <Link className="hover:underline" to={`/tasks/${t.id}`}>
                    {t.title}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <TaskPriorityBadge priority={t.priority} />
                </td>
                <td className="px-4 py-3">
                  <TaskStatusBadge status={t.status} />
                </td>
                <td className="px-4 py-3 text-slate-700">{usersById[t.ownerId]?.name ?? t.ownerId}</td>
                <td className="px-4 py-3 text-slate-700 tabular-nums">{new Date(t.dueDate).toLocaleDateString()}</td>
                <td className="px-4 py-3 text-right">
                  <Link
                    to={`/tasks/${t.id}`}
                    className="inline-flex items-center justify-center gap-1 rounded-lg px-3 py-1.5 text-sm font-semibold text-indigo-700 hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    View
                    <IconArrowRight className="h-3.5 w-3.5 shrink-0 opacity-80" aria-hidden />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
