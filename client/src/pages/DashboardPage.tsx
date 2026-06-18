import { useMemo } from "react";
import { Link } from "react-router-dom";
import { DashboardCards } from "../components/DashboardCards";
import { EmptyState } from "../components/EmptyState";
import { ErrorState } from "../components/ErrorState";
import { LoadingState } from "../components/LoadingState";
import { PageHeader } from "../components/PageHeader";
import { TaskCard } from "../components/TaskCard";
import { useDashboard, useTasks } from "../hooks/useTasks";
import { useUsers } from "../hooks/useUsers";

export function DashboardPage() {
  const dash = useDashboard();
  const tasks = useTasks();
  const users = useUsers();

  const usersById = useMemo(() => {
    const map: Record<string, User | undefined> = {};
    for (const u of users.data ?? []) map[u.id] = u;
    return map;
  }, [users.data]);

  const recent = useMemo(() => (tasks.data ?? []).slice(0, 3), [tasks.data]);

  if (dash.isLoading || tasks.isLoading || users.isLoading) return <LoadingState />;

  if (dash.isError || !dash.data) {
    return <ErrorState title="Could not load dashboard" message={String(dash.error)} onRetry={() => dash.refetch()} />;
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        subtitle="Track learning goals and project tasks with live analytics from your JSON-backed workspace."
        actions={
          <Link
            to="/tasks/new"
            className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create task
          </Link>
        }
      />

      <DashboardCards stats={dash.data} />

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-3">
          <h2 className="text-lg font-semibold text-slate-900">Recent tasks</h2>
          <Link to="/tasks" className="text-sm font-semibold text-indigo-700 hover:text-indigo-800">
            View all
          </Link>
        </div>

        {tasks.isError ? (
          <ErrorState title="Could not load tasks" message={String(tasks.error)} onRetry={() => tasks.refetch()} />
        ) : recent.length === 0 ? (
          <EmptyState
            title="No tasks yet"
            description="Create your first task to populate the dashboard."
            action={
              <Link
                to="/tasks/new"
                className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
              >
                Create task
              </Link>
            }
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {recent.map((t) => (
              <TaskCard key={t.id} task={t} owner={usersById[t.ownerId]} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
