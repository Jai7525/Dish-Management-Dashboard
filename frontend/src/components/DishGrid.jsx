import DishCard from './DishCard'
import Icon from './Icon'

export default function DishGrid({ dishes, onToggle, togglingIds }) {
  if (!dishes.length) {
    return (
      <div className="surface-card flex min-h-72 flex-col items-center justify-center px-6 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-500">
          <Icon name="search" size={26} />
        </div>
        <h2 className="mt-4 font-bold text-ink">No dishes found</h2>
        <p className="mt-1 text-sm text-muted">Try another search term or sort option.</p>
      </div>
    )
  }

  return (
    <section aria-label="Dishes" className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {dishes.map((dish) => (
        <DishCard
          dish={dish}
          isToggling={togglingIds.has(dish.id)}
          key={dish.id}
          onToggle={onToggle}
        />
      ))}
    </section>
  )
}
