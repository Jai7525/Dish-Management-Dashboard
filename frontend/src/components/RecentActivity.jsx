import Icon from './Icon'
import { formatRelativeTime } from '../utils/time'

const actionStyle = {
  published: 'bg-emerald-500 text-white',
  unpublished: 'bg-rose-500 text-white',
  updated: 'bg-slate-400 text-white',
}

export default function RecentActivity({ activities }) {
  return (
    <section className="surface-card overflow-hidden" id="activity">
      <div className="flex items-center gap-3 border-b px-5 py-4">
        <Icon name="activity" className="text-ink" />
        <h2 className="text-sm font-bold text-ink">Recent Activity</h2>
      </div>
      {activities.length === 0 ? (
        <p className="px-5 py-8 text-center text-sm text-muted">No activity yet. Toggle a dish to create the first entry.</p>
      ) : (
      <div className="grid divide-y md:grid-cols-2 md:divide-x md:divide-y-0 xl:grid-cols-4">
        {activities.slice(0, 4).map((item) => (
          <article className="flex items-center gap-3 px-5 py-4" key={item.id}>
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${actionStyle[item.action] || actionStyle.updated}`}>
              <Icon name={item.action === 'unpublished' ? 'eyeOff' : 'check'} size={17} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-ink">{item.dishName} {item.action}</p>
              <p className="mt-1 text-[11px] text-muted">by Admin</p>
            </div>
            <span className="whitespace-nowrap text-[11px] text-muted">{formatRelativeTime(item.createdAt)}</span>
          </article>
        ))}
      </div>
      )}
    </section>
  )
}
