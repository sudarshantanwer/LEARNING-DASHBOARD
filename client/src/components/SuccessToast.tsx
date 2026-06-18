import { useEffect } from "react";

export function SuccessToast({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  useEffect(() => {
    const t = window.setTimeout(() => onDismiss(), 3500);
    return () => window.clearTimeout(t);
  }, [message, onDismiss]);

  return (
    <div
      className="fixed bottom-4 right-4 z-50 max-w-sm rounded-xl border border-emerald-200 bg-white p-4 shadow-card"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white">✓</div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-900">Saved</p>
          <p className="mt-1 text-sm text-slate-600">{message}</p>
        </div>
        <button
          type="button"
          onClick={onDismiss}
          className="ml-auto rounded-md px-2 py-1 text-sm text-slate-500 hover:bg-slate-50 hover:text-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Close
        </button>
      </div>
    </div>
  );
}
