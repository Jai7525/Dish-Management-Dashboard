import Icon from './Icon'
import { getRealtimePresentation } from '../utils/realtimeStatus'

export default function Header({ onMenuClick, realtimeStatus }) {
  const presentation = getRealtimePresentation(realtimeStatus)
  return (
    <header className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex items-start gap-3">
        <button aria-label="Open navigation" className="mt-1 rounded-xl border bg-white p-2 text-ink shadow-sm lg:hidden" onClick={onMenuClick} type="button">
          <Icon name="menu" />
        </button>
        <div>
          <h1 className="text-xl font-bold leading-tight tracking-tight text-ink sm:text-[28px]">Dish Management Dashboard</h1>
          <p className="mt-1 text-sm text-muted sm:text-base">Manage your dishes and their visibility in real time</p>
        </div>
      </div>

      <div className="hidden items-center gap-6 sm:flex">
        <div className={`flex items-center gap-4 rounded-xl border px-4 py-3 text-sm ${presentation.softClass}`}>
          <span className={`inline-block h-2.5 w-2.5 rounded-full ${presentation.dotClass}`} />
          <span className={`font-medium ${presentation.textClass}`}>Realtime Status</span>
          <span className="h-5 border-l border-current opacity-20" />
          <span className={`font-semibold ${presentation.textClass}`}>{presentation.label}</span>
        </div>
        <div className="flex items-center gap-3 border-l pl-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-violet-700 font-semibold text-white">AD</div>
          <span className="text-sm font-semibold">Admin</span>
          <Icon name="chevronDown" className="text-muted" size={16} />
        </div>
      </div>
    </header>
  )
}
