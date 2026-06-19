import type { ComponentType } from "react";
import type { DashboardStats } from "../types";
import { IconBolt, IconCalendarAlert, IconCheckCircle, IconLayers, IconLoader } from "./icons";

function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  iconWrapClass
}: {
  label: string;
  value: number;
  hint?: string;
  icon: ComponentType<{ className?: string }>;
  iconWrapClass: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-semibold tabular-nums text-slate-900">{value}</p>
          {hint ? <p className="mt-2 text-xs text-slate-500">{hint}</p> : null}
        </div>
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 ring-inset ${iconWrapClass}`}
        >
          <Icon className="h-5 w-5" />
        </span>
      </div>
    </div>
  );
}

export function DashboardCards({ stats }: { stats: DashboardStats }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      <StatCard
        label="Total items"
        value={stats.totalItems}
        hint="All tracked tasks"
        icon={IconLayers}
        iconWrapClass="bg-slate-50 text-slate-700 ring-slate-200/80"
      />
      <StatCard
        label="Completed"
        value={stats.completedItems}
        hint="Status: completed"
        icon={IconCheckCircle}
        iconWrapClass="bg-emerald-50 text-emerald-700 ring-emerald-200/80"
      />
      <StatCard
        label="In progress"
        value={stats.inProgressItems}
        hint="Active work"
        icon={IconLoader}
        iconWrapClass="bg-sky-50 text-sky-700 ring-sky-200/80"
      />
      <StatCard
        label="Overdue"
        value={stats.overdueItems}
        hint="Not completed & past due"
        icon={IconCalendarAlert}
        iconWrapClass="bg-orange-50 text-orange-800 ring-orange-200/80"
      />
      <StatCard
        label="High priority"
        value={stats.highPriorityItems}
        hint="Priority: high"
        icon={IconBolt}
        iconWrapClass="bg-rose-50 text-rose-700 ring-rose-200/80"
      />
    </div>
  );
}
