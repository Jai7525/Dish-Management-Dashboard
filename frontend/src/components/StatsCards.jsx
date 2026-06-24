import Icon from './Icon'
import RealtimeStatusCard from './RealtimeStatusCard'

const cards = [
  { key: 'total', label: 'Total Dishes', helper: 'All dishes in system', icon: 'bowl', iconStyle: 'bg-brand-50 text-brand-600' },
  { key: 'published', label: 'Published', helper: 'Visible to customers', icon: 'check', iconStyle: 'bg-emerald-50 text-emerald-600' },
  { key: 'unpublished', label: 'Unpublished', helper: 'Hidden from customers', icon: 'eyeOff', iconStyle: 'bg-rose-50 text-rose-500' },
]

export default function StatsCards({ stats, realtimeStatus }) {
  return (
    <section aria-label="Dashboard statistics" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <article className="surface-card flex min-h-36 items-center gap-4 p-5 sm:p-6" key={card.key}>
          <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${card.iconStyle}`}>
            <Icon name={card.icon} size={29} strokeWidth={2} />
          </div>
          <div>
            <p className="text-sm font-semibold text-ink">{card.label}</p>
            <p className="mt-1 text-3xl font-bold tracking-tight text-ink">{stats[card.key]}</p>
            <p className="mt-4 text-xs text-muted">{card.helper}</p>
          </div>
        </article>
      ))}
      <RealtimeStatusCard status={realtimeStatus} />
    </section>
  )
}
