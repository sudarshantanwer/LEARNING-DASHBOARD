import { Link, NavLink } from "react-router-dom";
import { IconDashboard, IconPlus, IconTasks } from "./icons";

const linkBase =
  "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500";

const iconClass = "h-4 w-4 shrink-0 opacity-90";

export function NavigationBar() {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight text-slate-900">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm ring-1 ring-indigo-700/30">
            <IconDashboard className="h-5 w-5" strokeWidth={2} aria-hidden />
          </span>
          <span className="hidden sm:inline">Learning Dashboard</span>
        </Link>
        <nav className="flex flex-wrap items-center gap-1 sm:gap-2" aria-label="Primary">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `${linkBase} ${isActive ? "bg-slate-100 text-slate-900" : "text-slate-600"}`}
          >
            <IconDashboard className={iconClass} />
            Dashboard
          </NavLink>
          <NavLink
            to="/tasks"
            className={({ isActive }) => `${linkBase} ${isActive ? "bg-slate-100 text-slate-900" : "text-slate-600"}`}
          >
            <IconTasks className={iconClass} />
            Tasks
          </NavLink>
          <NavLink
            to="/tasks/new"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? "bg-indigo-50 text-indigo-800 ring-1 ring-indigo-100" : "text-indigo-700"}`
            }
          >
            <IconPlus className={iconClass} />
            New task
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
