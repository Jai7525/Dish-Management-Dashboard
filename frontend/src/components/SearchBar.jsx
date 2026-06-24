import Icon from './Icon'

export default function SearchBar({ value, onChange }) {
  return (
    <label className="relative block w-full max-w-md">
      <span className="sr-only">Search dishes by name</span>
      <Icon name="search" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
      <input
        className="h-12 w-full rounded-xl border bg-white pl-12 pr-4 text-sm text-ink shadow-sm outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10"
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search dishes by name..."
        type="search"
        value={value}
      />
    </label>
  )
}
