export function ErrorState({ title, message, onRetry }: { title: string; message?: string; onRetry?: () => void }) {
  return (
    <div
      className="rounded-2xl border border-red-200 bg-red-50 p-6"
      role="alert"
      aria-live="assertive"
    >
      <h2 className="text-lg font-semibold text-red-900">{title}</h2>
      {message ? <p className="mt-2 text-sm text-red-800">{message}</p> : null}
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 inline-flex items-center justify-center rounded-lg bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
        >
          Try again
        </button>
      ) : null}
    </div>
  );
}
