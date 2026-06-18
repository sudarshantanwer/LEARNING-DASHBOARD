import { Link } from "react-router-dom";
import type { ProjectTask, TaskPriority, TaskStatus, User } from "../types";

function priorityBadge(p: TaskPriority) {
  if (p === "HIGH") return "bg-rose-50 text-rose-800 ring-rose-100";
  if (p === "MEDIUM") return "bg-amber-50 text-amber-900 ring-amber-100";
  return "bg-slate-50 text-slate-800 ring-slate-100";
}

function statusBadge(s: TaskStatus) {
  if (s === "COMPLETED") return "bg-emerald-50 text-emerald-900 ring-emerald-100";
  if (s === "IN_PROGRESS") return "bg-indigo-50 text-indigo-900 ring-indigo-100";
  return "bg-slate-50 text-slate-800 ring-slate-100";
}

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
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${priorityBadge(t.priority)}`}>
                    {t.priority}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${statusBadge(t.status)}`}>
                    {t.status.replace("_", " ")}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-700">{usersById[t.ownerId]?.name ?? t.ownerId}</td>
                <td className="px-4 py-3 text-slate-700 tabular-nums">{new Date(t.dueDate).toLocaleDateString()}</td>
                <td className="px-4 py-3 text-right">
                  <Link
                    to={`/tasks/${t.id}`}
                    className="inline-flex rounded-lg px-3 py-1.5 text-sm font-semibold text-indigo-700 hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    View
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
