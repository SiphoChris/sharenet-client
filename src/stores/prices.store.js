import { defineStore } from 'pinia'
import { apiUrl, fetchPriceData } from '../../utils/index'
import { useAuthStore } from './auth.store' // Import the auth store

export const usePriceStore = defineStore('priceStore', {
  state: () => ({
    data: {},
    spots: [],
    categories: {},
    sortBy: 'price',
    sortDirection: 'desc',
    loading: false,
    error: null,
    watchlistItems: [],
    loaded: false,
    watchlistLoaded: false,
  }),

  actions: {
    async fetchData() {
      this.loading = true
      this.error = null

      try {
        const fetchedData = await fetchPriceData()
        this.setData(fetchedData)
        this.setSpots(fetchedData.spots)
        this.loaded = true
      } catch (error) {
        this.error = 'Failed to fetch price data. Please try again.'
        this.loaded = false
      } finally {
        this.loading = false
      }
    },

    async fetchWatchlist() {
      const authStore = useAuthStore()

      if (!authStore.isAuthenticated) {
        this.watchlistItems = []
        this.watchlistLoaded = true
        return
      }

      if (!this.loaded) {
        await this.fetchData()
      }

      try {
        const response = await fetch(`${apiUrl}/user/watchlist`, {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        })

        if (!response.ok) throw new Error('Failed to fetch watchlist')

        const { data } = await response.json()
        this.watchlistItems = data.map((item) => item.share_code)
        this.watchlistLoaded = true
      } catch (error) {
        console.error('Watchlist fetch error:', error)
        this.watchlistLoaded = false
      }
    },

    setData(newData) {
      this.data = newData
    },

    setSpots(newSpots) {
      this.spots = newSpots || []

      const grouped = {}

      newSpots.forEach((spot) => {
        const category = spot.categoryName
        if (!grouped[category]) {
          grouped[category] = []
        }
        grouped[category].push(spot)
      })

      Object.keys(grouped).forEach((category) => {
        grouped[category] = grouped[category]
          .sort((a, b) => new Date(b.datetime) - new Date(a.datetime))
          .slice(0, 5)
      })

      this.categories = grouped
    },

    sortData(criteria) {
      this.sortBy = criteria
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'

      this.spots.sort((a, b) => {
        const valA = a[criteria]
        const valB = b[criteria]

        let comparison = 0
        if (valA < valB) comparison = -1
        if (valA > valB) comparison = 1
        if (this.sortDirection === 'desc') comparison *= -1

        return comparison
      })

      Object.keys(this.categories).forEach((category) => {
        this.categories[category].sort((a, b) => {
          const valA = a[criteria]
          const valB = b[criteria]

          let comparison = 0
          if (valA < valB) comparison = -1
          if (valA > valB) comparison = 1
          if (this.sortDirection === 'desc') comparison *= -1

          return comparison
        })
      })
    },

    isInWatchlist(shareCode) {
      return this.watchlistItems.includes(shareCode)
    },

    async toggleWatchlist(shareCode) {
      const authStore = useAuthStore() // get auth store instance

      if (!authStore.isAuthenticated) {
        return
      }

      try {
        if (this.isInWatchlist(shareCode)) {
          const response = await fetch(`${apiUrl}/user/watchlist`, {
            headers: {
              Authorization: `Bearer ${authStore.token}`,
            },
          })

          if (response.ok) {
            const { data } = await response.json()
            const item = data.find((item) => item.share_code === shareCode)

            if (item) {
              await fetch(`${apiUrl}/user/watchlist/item/${item.watchlist_id}`, {
                method: 'DELETE',
                headers: {
                  Authorization: `Bearer ${authStore.token}`,
                },
              })
              this.watchlistItems = this.watchlistItems.filter((code) => code !== shareCode)
            }
          }
        } else {
          const response = await fetch(`${apiUrl}/user/watchlist`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${authStore.token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ share_code: shareCode }),
          })

          if (response.ok) {
            this.watchlistItems.push(shareCode)
          }
        }
      } catch (error) {
        console.error('Watchlist toggle error:', error)
      }
    },
  },

  getters: {
    fullWatchlistItems: (state) => {
      return state.spots.filter((spot) => state.watchlistItems.includes(spot.code))
    },
  },
})
