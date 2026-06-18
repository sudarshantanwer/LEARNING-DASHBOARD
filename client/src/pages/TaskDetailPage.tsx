import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ConfirmationModal } from "../components/ConfirmationModal";
import { ErrorState } from "../components/ErrorState";
import { LoadingState } from "../components/LoadingState";
import { PageHeader } from "../components/PageHeader";
import { SuccessToast } from "../components/SuccessToast";
import { usePatchTaskStatus, useTask } from "../hooks/useTasks";
import { useUsers } from "../hooks/useUsers";

export function TaskDetailPage() {
  const { id } = useParams();
  const taskQuery = useTask(id);
  const users = useUsers();
  const patch = usePatchTaskStatus();

  const [toast, setToast] = useState<string | null>(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const owner = users.data?.find((u) => u.id === taskQuery.data?.ownerId);

  if (!id) return <ErrorState title="Missing task id" />;

  if (taskQuery.isLoading || users.isLoading) return <LoadingState />;

  if (taskQuery.isError || !taskQuery.data) {
    return (
      <ErrorState title="Could not load task" message={String(taskQuery.error)} onRetry={() => taskQuery.refetch()} />
    );
  }

  const t = taskQuery.data;

  async function setStatus(next: typeof t.status) {
    await patch.mutateAsync({ id: t.id, status: next });
    setToast(`Task marked ${next.replace("_", " ").toLowerCase()}.`);
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title={t.title}
        subtitle={`${t.category} · Owned by ${owner?.name ?? t.ownerId}`}
        actions={
          <>
            <button
              type="button"
              onClick={() => void setStatus("IN_PROGRESS")}
              disabled={patch.isPending}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50 disabled:opacity-60"
            >
              Mark in progress
            </button>
            <button
              type="button"
              onClick={() => void setStatus("COMPLETED")}
              disabled={patch.isPending}
              className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 disabled:opacity-60"
            >
              Mark completed
            </button>
            <Link
              to={`/tasks/${t.id}/edit`}
              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
            >
              Edit
            </Link>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-card lg:col-span-2">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Description</h2>
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700">{t.description || "—"}</p>
        </div>

        <aside className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between gap-3">
              <dt className="text-slate-500">Status</dt>
              <dd className="font-semibold text-slate-900">{t.status.replace("_", " ")}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-slate-500">Priority</dt>
              <dd className="font-semibold text-slate-900">{t.priority}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-slate-500">Due</dt>
              <dd className="font-semibold text-slate-900 tabular-nums">{new Date(t.dueDate).toLocaleString()}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-slate-500">Created</dt>
              <dd className="font-semibold text-slate-900 tabular-nums">{new Date(t.createdAt).toLocaleString()}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-slate-500">Updated</dt>
              <dd className="font-semibold text-slate-900 tabular-nums">{new Date(t.updatedAt).toLocaleString()}</dd>
            </div>
          </dl>

          <div className="border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={() => setConfirmDeleteOpen(true)}
              className="w-full rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-900 hover:bg-red-100"
            >
              Delete (demo)
            </button>
            <p className="mt-2 text-xs text-slate-500">
              Deleting tasks is not part of the core API; this button demonstrates a confirmation modal pattern.
            </p>
          </div>
        </aside>
      </div>

      <ConfirmationModal
        open={confirmDeleteOpen}
        title="Delete task?"
        description="This assessment build does not implement DELETE /api/tasks. This modal is here to demonstrate UX patterns only."
        confirmLabel="Understood"
        cancelLabel="Close"
        tone="neutral"
        onConfirm={() => setConfirmDeleteOpen(false)}
        onCancel={() => setConfirmDeleteOpen(false)}
      />

      {toast ? <SuccessToast message={toast} onDismiss={() => setToast(null)} /> : null}
    </div>
  );
}
