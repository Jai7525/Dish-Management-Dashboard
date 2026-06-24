import Icon from './Icon'
import { getRealtimePresentation } from '../utils/realtimeStatus'

export default function RealtimeStatusCard({ compact = false, status }) {
  const presentation = getRealtimePresentation(status)

  if (compact) {
    return (
      <div className="surface-card p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-ink">
          <span className={`inline-block h-2.5 w-2.5 rounded-full ${presentation.dotClass}`} />
          Realtime Status
        </div>
        <p className={`mt-3 text-xs font-medium ${presentation.textClass}`}>{presentation.label}</p>
        <div className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${presentation.badgeClass}`}>
          <Icon name="wifi" size={13} />
          {presentation.badge}
        </div>
        <p className="mt-3 text-[11px] text-muted">{presentation.helper}</p>
      </div>
    )
  }

  return (
    <article className="surface-card flex min-h-36 items-center gap-4 p-5 sm:p-6">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        <Icon name="wifi" size={30} />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-ink">Realtime Status</p>
        <p className={`mt-1 text-2xl font-bold ${presentation.textClass}`}>{presentation.summary}</p>
        <span className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${presentation.badgeClass}`}>
          {presentation.badge}
        </span>
        <p className="mt-2 text-xs text-muted">{presentation.helper}</p>
      </div>
    </article>
  )
}
