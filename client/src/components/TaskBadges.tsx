import type { TaskPriority, TaskStatus } from "../types";
import {
  IconBarsLow,
  IconBarsMed,
  IconBolt,
  IconCheckCircle,
  IconCircleDashed,
  IconLoader
} from "./icons";

const statusMeta: Record<
  TaskStatus,
  { label: string; className: string; Icon: typeof IconCircleDashed }
> = {
  TODO: {
    label: "To do",
    className: "bg-violet-50 text-violet-900 ring-violet-200/80",
    Icon: IconCircleDashed
  },
  IN_PROGRESS: {
    label: "In progress",
    className: "bg-sky-50 text-sky-900 ring-sky-200/80",
    Icon: IconLoader
  },
  COMPLETED: {
    label: "Completed",
    className: "bg-emerald-50 text-emerald-900 ring-emerald-200/80",
    Icon: IconCheckCircle
  }
};

const priorityMeta: Record<
  TaskPriority,
  { label: string; className: string; Icon: typeof IconBarsLow }
> = {
  LOW: {
    label: "Low",
    className: "bg-slate-50 text-slate-700 ring-slate-200/80",
    Icon: IconBarsLow
  },
  MEDIUM: {
    label: "Medium",
    className: "bg-amber-50 text-amber-900 ring-amber-200/80",
    Icon: IconBarsMed
  },
  HIGH: {
    label: "High",
    className: "bg-rose-50 text-rose-900 ring-rose-200/80",
    Icon: IconBolt
  }
};

export function TaskStatusBadge({ status, className = "" }: { status: TaskStatus; className?: string }) {
  const m = statusMeta[status];
  const Icon = m.Icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${m.className} ${className}`}
    >
      <Icon className="h-3.5 w-3.5 shrink-0 opacity-90" />
      {m.label}
    </span>
  );
}

export function TaskPriorityBadge({ priority, className = "" }: { priority: TaskPriority; className?: string }) {
  const m = priorityMeta[priority];
  const Icon = m.Icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${m.className} ${className}`}
    >
      <Icon className="h-3.5 w-3.5 shrink-0 opacity-90" />
      {m.label}
    </span>
  );
}
