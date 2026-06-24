import { useEffect } from 'react'
import Icon from './Icon'

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(onClose, 3200)
    return () => window.clearTimeout(timer)
  }, [toast, onClose])

  if (!toast) return null

  const success = toast.type === 'success'
  return (
    <div className="fixed right-4 top-4 z-50 flex max-w-sm items-center gap-3 rounded-xl border bg-white px-4 py-3 shadow-xl sm:right-6 sm:top-6" role="status">
      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white ${success ? 'bg-emerald-500' : 'bg-rose-500'}`}>
        <Icon name={success ? 'check' : 'close'} size={17} />
      </span>
      <p className="text-sm font-semibold text-ink">{toast.message}</p>
      <button aria-label="Dismiss notification" className="ml-2 rounded-md p-1 text-muted hover:bg-slate-100" onClick={onClose} type="button">
        <Icon name="close" size={16} />
      </button>
    </div>
  )
}
