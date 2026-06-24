import Icon from './Icon'

export default function SortDropdown({ value, onChange }) {
  return (
    <label className="relative flex h-12 w-full items-center rounded-xl border bg-white shadow-sm sm:w-72">
      <span className="whitespace-nowrap pl-4 text-sm font-medium text-ink">Sort by:</span>
      <select
        className="h-full min-w-0 flex-1 appearance-none bg-transparent pl-2 pr-10 text-sm font-semibold text-ink outline-none"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        <option value="name-asc">Name (A-Z)</option>
        <option value="name-desc">Name (Z-A)</option>
        <option value="published">Published first</option>
        <option value="unpublished">Unpublished first</option>
      </select>
      <Icon name="chevronDown" className="pointer-events-none absolute right-4 text-ink" size={16} />
    </label>
  )
}
