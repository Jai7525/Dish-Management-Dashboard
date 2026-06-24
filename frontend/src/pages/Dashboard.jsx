import { useCallback, useEffect, useMemo, useState } from 'react'
import { dashboardApi } from '../api/dashboardApi'
import { DashboardError, DashboardLoading } from '../components/DashboardState'
import DishGrid from '../components/DishGrid'
import Header from '../components/Header'
import RecentActivity from '../components/RecentActivity'
import SearchBar from '../components/SearchBar'
import Sidebar from '../components/Sidebar'
import SortDropdown from '../components/SortDropdown'
import StatsCards from '../components/StatsCards'
import Toast from '../components/Toast'
import { useDashboardSocket } from '../hooks/useDashboardSocket'

export default function Dashboard() {
  const [dishes, setDishes] = useState([])
  const [stats, setStats] = useState(null)
  const [activities, setActivities] = useState([])
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('name-asc')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [togglingIds, setTogglingIds] = useState(() => new Set())
  const [toast, setToast] = useState(null)

  const handleRealtimeUpdate = useCallback((event) => {
    setDishes((items) => {
      const dishExists = items.some((dish) => dish.id === event.dish.id)
      if (!dishExists) return [...items, event.dish]
      return items.map((dish) => dish.id === event.dish.id ? event.dish : dish)
    })
    setStats(event.stats)
    setActivities((items) => [
      event.activity,
      ...items.filter((activity) => activity.id !== event.activity.id),
    ].slice(0, 10))
  }, [])

  const realtimeStatus = useDashboardSocket(handleRealtimeUpdate)

  const loadDashboard = useCallback(async (signal) => {
    setLoading(true)
    setError(null)
    try {
      const dashboard = await dashboardApi.getDashboard(signal)
      setDishes(dashboard.dishes)
      setStats(dashboard.stats)
      setActivities(dashboard.activity)
    } catch (requestError) {
      if (requestError.name !== 'AbortError') setError(requestError.message)
    } finally {
      if (!signal?.aborted) setLoading(false)
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    loadDashboard(controller.signal)
    return () => controller.abort()
  }, [loadDashboard])

  const visibleDishes = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    const filtered = dishes.filter((dish) => dish.name.toLowerCase().includes(normalizedQuery))

    return [...filtered].sort((a, b) => {
      if (sort === 'name-desc') return b.name.localeCompare(a.name)
      if (sort === 'published') return Number(b.isPublished) - Number(a.isPublished) || a.name.localeCompare(b.name)
      if (sort === 'unpublished') return Number(a.isPublished) - Number(b.isPublished) || a.name.localeCompare(b.name)
      return a.name.localeCompare(b.name)
    })
  }, [dishes, query, sort])

  async function handleToggle(id) {
    if (togglingIds.has(id)) return
    setTogglingIds((current) => new Set(current).add(id))

    try {
      const updatedDish = await dashboardApi.toggleDish(id)
      setDishes((items) => items.map((dish) => dish.id === id ? updatedDish : dish))

      const [nextStats, nextActivity] = await Promise.all([
        dashboardApi.getStats(),
        dashboardApi.getActivity(),
      ])
      setStats(nextStats)
      setActivities(nextActivity)
      setToast({
        type: 'success',
        message: `${updatedDish.name} ${updatedDish.isPublished ? 'published' : 'unpublished'} successfully`,
      })
    } catch (requestError) {
      setToast({ type: 'error', message: requestError.message })
    } finally {
      setTogglingIds((current) => {
        const next = new Set(current)
        next.delete(id)
        return next
      })
    }
  }

  const dismissToast = useCallback(() => setToast(null), [])

  return (
    <div id="dashboard" className="min-h-screen bg-[#f7f8fc]">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} realtimeStatus={realtimeStatus} />
      <Toast onClose={dismissToast} toast={toast} />
      <main className="lg:pl-60">
        <div className="mx-auto max-w-[1680px] px-4 py-6 sm:px-6 lg:px-8 lg:py-7">
          <Header onMenuClick={() => setSidebarOpen(true)} realtimeStatus={realtimeStatus} />

          {loading ? <DashboardLoading /> : error ? (
            <DashboardError message={error} onRetry={() => loadDashboard()} />
          ) : (
            <>
              <div className="mt-7">
                <StatsCards realtimeStatus={realtimeStatus} stats={stats} />
              </div>

              <section className="mt-7" id="dishes">
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <SearchBar onChange={setQuery} value={query} />
                  <SortDropdown onChange={setSort} value={sort} />
                </div>
                <DishGrid dishes={visibleDishes} onToggle={handleToggle} togglingIds={togglingIds} />
              </section>

              <div className="mt-5">
                <RecentActivity activities={activities} />
              </div>
            </>
          )}
          <p className="py-6 text-center text-xs text-slate-400">Dish Manager · Admin dashboard</p>
        </div>
      </main>
    </div>
  )
}
