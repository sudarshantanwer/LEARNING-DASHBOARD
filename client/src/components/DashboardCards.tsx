import type { DashboardStats } from "../types";

function StatCard({
  label,
  value,
  hint
}: {
  label: string;
  value: number;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-semibold tabular-nums text-slate-900">{value}</p>
      {hint ? <p className="mt-2 text-xs text-slate-500">{hint}</p> : null}
    </div>
  );
}

export function DashboardCards({ stats }: { stats: DashboardStats }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      <StatCard label="Total items" value={stats.totalItems} hint="All tracked tasks" />
      <StatCard label="Completed" value={stats.completedItems} hint="Status: completed" />
      <StatCard label="In progress" value={stats.inProgressItems} hint="Active work" />
      <StatCard label="Overdue" value={stats.overdueItems} hint="Not completed & past due" />
      <StatCard label="High priority" value={stats.highPriorityItems} hint="Priority: high" />
    </div>
  );
}
