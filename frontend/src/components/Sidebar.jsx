import Icon from './Icon'
import RealtimeStatusCard from './RealtimeStatusCard'

function Brand() {
  return (
    <div className="flex items-center gap-3 px-2">
      <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white shadow-lg shadow-brand-500/20">
        <Icon name="bowl" size={22} />
      </div>
      <span className="text-lg font-bold tracking-tight text-ink">Dish Manager</span>
    </div>
  )
}

export default function Sidebar({ open, onClose, realtimeStatus }) {
  return (
    <>
      {open && (
        <button
          aria-label="Close sidebar"
          className="fixed inset-0 z-30 bg-slate-950/30 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          type="button"
        />
      )}
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r bg-white px-4 py-6 shadow-sidebar transition-transform duration-300 lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between">
          <Brand />
          <button aria-label="Close navigation" className="rounded-lg p-1.5 text-muted hover:bg-slate-100 lg:hidden" onClick={onClose} type="button">
            <Icon name="close" />
          </button>
        </div>

        <nav aria-label="Primary navigation" className="mt-10 space-y-2">
          <a className="flex items-center gap-3 rounded-xl bg-brand-50 px-4 py-3.5 text-sm font-semibold text-brand-600" href="#dashboard">
            <Icon name="grid" />
            Dashboard
          </a>
          <a className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-ink" href="#dishes">
            <Icon name="dishes" />
            All Dishes
          </a>
        </nav>

        <div className="my-7 border-t" />
        <div className="mt-auto">
          <RealtimeStatusCard compact status={realtimeStatus} />
          <div className="mt-5 flex items-center gap-3 px-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-violet-700 text-sm font-semibold text-white">AD</div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-ink">Admin</p>
              <p className="truncate text-xs text-muted">Administrator</p>
            </div>
            <Icon name="chevronDown" className="text-muted" size={16} />
          </div>
        </div>
      </aside>
    </>
  )
}
