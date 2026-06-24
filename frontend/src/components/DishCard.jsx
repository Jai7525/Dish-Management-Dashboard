import Icon from './Icon'
import { formatRelativeTime } from '../utils/time'

export default function DishCard({ dish, isToggling, onToggle }) {
  return (
    <article className="surface-card group flex min-h-52 overflow-hidden p-3 transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg">
      <img
        alt={dish.name}
        className="w-[42%] min-w-28 rounded-xl object-cover transition duration-500 group-hover:scale-[1.02]"
        loading="lazy"
        src={dish.imageUrl}
      />
      <div className="flex min-w-0 flex-1 flex-col py-1 pl-4 pr-1">
        <div className="flex items-start justify-between gap-2">
          <h2 className="line-clamp-2 text-base font-bold leading-snug text-ink">{dish.name}</h2>
          <button
            aria-label={`${dish.isPublished ? 'Unpublish' : 'Publish'} ${dish.name}`}
            aria-pressed={dish.isPublished}
            className={`relative mt-0.5 h-6 w-11 shrink-0 overflow-hidden rounded-full transition-colors disabled:cursor-wait disabled:opacity-60 ${dish.isPublished ? 'bg-emerald-500' : 'bg-slate-300'}`}
            disabled={isToggling}
            onClick={() => onToggle(dish.id)}
            type="button"
          >
            <span className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${dish.isPublished ? 'translate-x-5' : 'translate-x-0'}`} />
          </button>
        </div>

        <span className={`mt-3 w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${dish.isPublished ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-600'}`}>
          {dish.isPublished ? 'Published' : 'Unpublished'}
        </span>
        <p className="mt-3 line-clamp-3 text-sm leading-5 text-slate-600">{dish.description}</p>
        <div className="mt-auto flex items-center gap-1.5 pt-3 text-[11px] text-muted">
          <Icon name="clock" size={15} />
          <span>{isToggling ? 'Updating status...' : `Status updated ${formatRelativeTime(dish.updatedAt)}`}</span>
        </div>
      </div>
    </article>
  )
}
