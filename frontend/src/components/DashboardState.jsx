export function DashboardLoading() {
  return (
    <div aria-label="Loading dashboard" aria-live="polite" className="mt-7 animate-pulse">
      <span className="sr-only">Loading dashboard data...</span>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => <div className="h-36 rounded-2xl border bg-white" key={index} />)}
      </div>
      <div className="mt-7 flex justify-between gap-4">
        <div className="h-12 w-full max-w-md rounded-xl bg-white" />
        <div className="hidden h-12 w-72 rounded-xl bg-white sm:block" />
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => <div className="h-52 rounded-2xl border bg-white" key={index} />)}
      </div>
    </div>
  )
}

export function DashboardError({ message, onRetry }) {
  return (
    <div className="surface-card mt-7 flex min-h-80 flex-col items-center justify-center px-6 text-center" role="alert">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-xl font-bold text-rose-500">!</div>
      <h2 className="mt-4 text-lg font-bold text-ink">Dashboard data is unavailable</h2>
      <p className="mt-2 max-w-md text-sm text-muted">{message}</p>
      <button className="mt-5 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/20 hover:bg-brand-700" onClick={onRetry} type="button">
        Try again
      </button>
    </div>
  )
}
