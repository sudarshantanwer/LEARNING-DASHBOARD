import { Link, NavLink } from "react-router-dom";

const linkBase =
  "rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500";

export function NavigationBar() {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight text-slate-900">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white">
            AI
          </span>
          <span className="hidden sm:inline">Learning Dashboard</span>
        </Link>
        <nav className="flex flex-wrap items-center gap-1 sm:gap-2" aria-label="Primary">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `${linkBase} ${isActive ? "bg-slate-100 text-slate-900" : "text-slate-600"}`}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/tasks"
            className={({ isActive }) => `${linkBase} ${isActive ? "bg-slate-100 text-slate-900" : "text-slate-600"}`}
          >
            Tasks
          </NavLink>
          <NavLink
            to="/tasks/new"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? "bg-indigo-50 text-indigo-800" : "text-indigo-700"}`
            }
          >
            New task
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
