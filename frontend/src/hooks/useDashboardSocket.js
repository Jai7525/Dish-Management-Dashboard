import { useEffect, useRef, useState } from 'react'
import { createDashboardSocket } from '../services/dashboardSocket'

export function useDashboardSocket(onDishUpdated) {
  const [status, setStatus] = useState('reconnecting')
  const eventHandlerRef = useRef(onDishUpdated)
  eventHandlerRef.current = onDishUpdated

  useEffect(() => createDashboardSocket({
    onDishUpdated: (event) => eventHandlerRef.current(event),
    onStatusChange: setStatus,
  }), [])

  return status
}
