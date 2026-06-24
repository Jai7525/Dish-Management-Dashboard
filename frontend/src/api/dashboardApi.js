import { apiRequest } from './client'

export function mapDish(dish) {
  return {
    id: dish.id,
    name: dish.name,
    description: dish.description,
    imageUrl: dish.image_url,
    isPublished: dish.is_published,
    createdAt: dish.created_at,
    updatedAt: dish.updated_at,
  }
}

export function mapStats(stats) {
  return {
    total: stats.total_dishes,
    published: stats.published_count,
    unpublished: stats.unpublished_count,
  }
}

export function mapActivity(activity) {
  return {
    id: activity.id,
    dishId: activity.dish_id,
    dishName: activity.dish_name,
    action: activity.action,
    createdAt: activity.created_at,
  }
}

export function mapDishUpdatedEvent(payload) {
  if (payload?.event !== 'dish_updated' || !payload.dish || !payload.stats || !payload.activity) {
    throw new TypeError('Invalid dish_updated WebSocket event')
  }
  return {
    event: payload.event,
    dish: mapDish(payload.dish),
    stats: mapStats(payload.stats),
    activity: mapActivity(payload.activity),
  }
}

export const dashboardApi = {
  async getDishes(signal) {
    const dishes = await apiRequest('/api/dishes', { signal })
    return dishes.map(mapDish)
  },

  async getStats(signal) {
    return mapStats(await apiRequest('/api/stats', { signal }))
  },

  async getActivity(signal) {
    const activity = await apiRequest('/api/activity', { signal })
    return activity.map(mapActivity)
  },

  async getDashboard(signal) {
    const [dishes, stats, activity] = await Promise.all([
      this.getDishes(signal),
      this.getStats(signal),
      this.getActivity(signal),
    ])
    return { dishes, stats, activity }
  },

  async toggleDish(dishId) {
    return mapDish(await apiRequest(`/api/dishes/${dishId}/toggle`, { method: 'PATCH' }))
  },
}
