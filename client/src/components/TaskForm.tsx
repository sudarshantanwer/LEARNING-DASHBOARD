import type { FormEvent } from "react";
import type { ProjectTask, TaskPriority, TaskStatus, User } from "../types";
import { toDatetimeLocalValue } from "../utils/datetime";

export type TaskFormMode = "create" | "edit";

export function TaskForm({
  mode,
  users,
  defaultValues,
  submitting,
  error,
  onSubmit
}: {
  mode: TaskFormMode;
  users: User[];
  defaultValues?: Partial<ProjectTask>;
  submitting: boolean;
  error?: string | null;
  onSubmit: (values: {
    title: string;
    description: string;
    category: string;
    priority: TaskPriority;
    status: TaskStatus;
    ownerId: string;
    dueDate: string;
  }) => void;
}) {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    onSubmit({
      title: String(fd.get("title") ?? "").trim(),
      description: String(fd.get("description") ?? ""),
      category: String(fd.get("category") ?? "General"),
      priority: String(fd.get("priority")) as TaskPriority,
      status: String(fd.get("status")) as TaskStatus,
      ownerId: String(fd.get("ownerId") ?? ""),
      dueDate: String(fd.get("dueDate") ?? "")
    });
  }

  const dueLocal = defaultValues?.dueDate ? toDatetimeLocalValue(defaultValues.dueDate) : "";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-900" role="alert">
          {error}
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-slate-700" htmlFor="title">
            Title <span className="text-rose-600">*</span>
          </label>
          <input
            id="title"
            name="title"
            required
            defaultValue={defaultValues?.title ?? ""}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-slate-700" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            defaultValue={defaultValues?.description ?? ""}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700" htmlFor="category">
            Category
          </label>
          <input
            id="category"
            name="category"
            defaultValue={defaultValues?.category ?? "General"}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700" htmlFor="priority">
            Priority {mode === "create" ? <span className="text-rose-600">*</span> : null}
          </label>
          <select
            id="priority"
            name="priority"
            required={mode === "create"}
            defaultValue={defaultValues?.priority ?? "MEDIUM"}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          >
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={defaultValues?.status ?? "TODO"}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          >
            <option value="TODO">TODO</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="COMPLETED">COMPLETED</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700" htmlFor="ownerId">
            Owner <span className="text-rose-600">*</span>
          </label>
          <select
            id="ownerId"
            name="ownerId"
            required
            defaultValue={defaultValues?.ownerId ?? ""}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          >
            <option value="" disabled>
              Select an owner
            </option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.role})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700" htmlFor="dueDate">
            Due date <span className="text-rose-600">*</span>
          </label>
          <input
            id="dueDate"
            name="dueDate"
            type="datetime-local"
            required
            defaultValue={dueLocal}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
          <p className="mt-1 text-xs text-slate-500">Stored as an ISO timestamp in UTC.</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2 border-t border-slate-100 pt-5">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {submitting ? "Saving…" : mode === "create" ? "Create task" : "Save changes"}
        </button>
      </div>
    </form>
  );
}
