import type { ReactNode } from "react";

export function PageHeader({
  title,
  subtitle,
  actions,
  icon
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  /** Optional leading visual (typically an SVG icon inside a tinted tile). */
  icon?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex min-w-0 items-start gap-3 sm:items-center sm:gap-4">
        {icon ? (
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 shadow-sm ring-1 ring-indigo-100 sm:h-12 sm:w-12">
            {icon}
          </span>
        ) : null}
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{title}</h1>
          {subtitle ? <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">{subtitle}</p> : null}
        </div>
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}
