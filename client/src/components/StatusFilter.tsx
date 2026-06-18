import type { TaskStatus } from "../types";

const options: { value: TaskStatus | "ALL"; label: string }[] = [
  { value: "ALL", label: "All statuses" },
  { value: "TODO", label: "To do" },
  { value: "IN_PROGRESS", label: "In progress" },
  { value: "COMPLETED", label: "Completed" }
];

export function StatusFilter({
  value,
  onChange
}: {
  value: TaskStatus | "ALL";
  onChange: (next: TaskStatus | "ALL") => void;
}) {
  return (
    <label className="block w-full max-w-xs">
      <span className="mb-1 block text-xs font-medium text-slate-600">Status</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as TaskStatus | "ALL")}
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
