const presentations = {
  connected: {
    label: 'Connected',
    summary: 'Active',
    badge: 'WebSocket Connected',
    helper: 'All changes synced instantly',
    dotClass: 'bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.11)]',
    textClass: 'text-emerald-700',
    softClass: 'border-emerald-100 bg-emerald-50/70',
    badgeClass: 'bg-emerald-50 text-emerald-700',
  },
  reconnecting: {
    label: 'Reconnecting',
    summary: 'Syncing',
    badge: 'WebSocket Reconnecting',
    helper: 'Restoring realtime connection',
    dotClass: 'animate-pulse bg-amber-400 shadow-[0_0_0_4px_rgba(251,191,36,0.13)]',
    textClass: 'text-amber-700',
    softClass: 'border-amber-100 bg-amber-50/70',
    badgeClass: 'bg-amber-50 text-amber-700',
  },
  disconnected: {
    label: 'Disconnected',
    summary: 'Offline',
    badge: 'WebSocket Disconnected',
    helper: 'Waiting to reconnect',
    dotClass: 'bg-rose-400 shadow-[0_0_0_4px_rgba(251,113,133,0.12)]',
    textClass: 'text-rose-600',
    softClass: 'border-rose-100 bg-rose-50/70',
    badgeClass: 'bg-rose-50 text-rose-600',
  },
}

export function getRealtimePresentation(status) {
  return presentations[status] || presentations.disconnected
}
