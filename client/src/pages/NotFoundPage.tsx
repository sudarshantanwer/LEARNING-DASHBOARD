import { Link } from "react-router-dom";
import { EmptyState } from "../components/EmptyState";

export function NotFoundPage() {
  return (
    <div className="py-10">
      <EmptyState
        title="Page not found"
        description="That route does not exist. Head back to the dashboard to keep tracking progress."
        action={
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
          >
            Go home
          </Link>
        }
      />
    </div>
  );
}
