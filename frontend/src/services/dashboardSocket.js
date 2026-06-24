import { mapDishUpdatedEvent } from '../api/dashboardApi'
import { WEBSOCKET_URL } from '../api/client'

const INITIAL_RECONNECT_DELAY = 1000
const MAX_RECONNECT_DELAY = 10000

export function createDashboardSocket({ onDishUpdated, onStatusChange }) {
  let socket = null
  let reconnectTimer = null
  let reconnectAttempts = 0
  let stopped = false

  function scheduleReconnect() {
    if (stopped || reconnectTimer) return
    const delay = Math.min(
      INITIAL_RECONNECT_DELAY * (2 ** reconnectAttempts),
      MAX_RECONNECT_DELAY,
    )
    reconnectAttempts += 1
    reconnectTimer = window.setTimeout(() => {
      reconnectTimer = null
      connect()
    }, delay)
  }

  function connect() {
    if (stopped) return
    onStatusChange('reconnecting')
    socket = new WebSocket(WEBSOCKET_URL)

    socket.addEventListener('open', () => {
      reconnectAttempts = 0
      onStatusChange('connected')
    })

    socket.addEventListener('message', (message) => {
      try {
        const payload = JSON.parse(message.data)
        if (payload.event === 'dish_updated') {
          onDishUpdated(mapDishUpdatedEvent(payload))
        }
      } catch (error) {
        console.warn('Ignored an invalid realtime event', error)
      }
    })

    socket.addEventListener('close', () => {
      socket = null
      if (stopped) return
      onStatusChange('disconnected')
      scheduleReconnect()
    })

    socket.addEventListener('error', () => {
      socket?.close()
    })
  }

  connect()

  return () => {
    stopped = true
    if (reconnectTimer) window.clearTimeout(reconnectTimer)
    reconnectTimer = null
    socket?.close()
    socket = null
  }
}
