import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { EmptyState } from "../components/EmptyState";
import { ErrorState } from "../components/ErrorState";
import { LoadingState } from "../components/LoadingState";
import { PageHeader } from "../components/PageHeader";
import { SearchBar } from "../components/SearchBar";
import { StatusFilter } from "../components/StatusFilter";
import { TaskTable } from "../components/TaskTable";
import { useTasks } from "../hooks/useTasks";
import { useUsers } from "../hooks/useUsers";
import type { TaskStatus, User } from "../types";
import { matchesSearch, matchesStatus } from "../utils/taskFilters";

export function TaskListPage() {
  const tasks = useTasks();
  const users = useUsers();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<TaskStatus | "ALL">("ALL");

  const usersById = useMemo(() => {
    const map: Record<string, User | undefined> = {};
    for (const u of users.data ?? []) map[u.id] = u;
    return map;
  }, [users.data]);

  const filtered = useMemo(() => {
    const all = tasks.data ?? [];
    return all.filter((t) => matchesSearch(t, q) && matchesStatus(t, status));
  }, [tasks.data, q, status]);

  if (tasks.isLoading || users.isLoading) return <LoadingState />;

  if (tasks.isError) {
    return <ErrorState title="Could not load tasks" message={String(tasks.error)} onRetry={() => tasks.refetch()} />;
  }

  const list = tasks.data ?? [];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Tasks"
        subtitle="Search, filter, and drill into details. Data persists in JSON files on the server."
        actions={
          <Link
            to="/tasks/new"
            className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            New task
          </Link>
        }
      />

      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <SearchBar value={q} onChange={setQ} />
        <StatusFilter value={status} onChange={setStatus} />
      </div>

      {list.length === 0 ? (
        <EmptyState
          title="No tasks yet"
          description="Create a task to see it listed here."
          action={
            <Link
              to="/tasks/new"
              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
            >
              Create task
            </Link>
          }
        />
      ) : filtered.length === 0 ? (
        <EmptyState title="No matches" description="Try adjusting your search or status filter." />
      ) : (
        <TaskTable tasks={filtered} usersById={usersById} />
      )}
    </div>
  );
}
