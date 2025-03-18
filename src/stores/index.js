import { defineStore } from 'pinia'
import { fetchPriceData } from '../../utils/index'

export const usePriceStore = defineStore('priceStore', {
  state: () => ({
    data: [],
    spots: [],
    sortBy: 'Price',
    sortDirection: 'desc',
    loading: false,
    error: null,
  }),

  actions: {
    async fetchData() {
      this.loading = true
      this.error = null

      try {
        const fetchedData = await fetchPriceData()
        this.setData(fetchedData)
        this.setSpots(fetchedData.spots)
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

    setData(newData) {
      this.data = newData
    },

    setSpots(newSpots) {
      this.spots = newSpots
    },

    sortData(criteria) {
      this.sortBy = criteria
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'

      this.data.sort((a, b) => {
        const valA = a[criteria]
        const valB = b[criteria]

        let comparison = 0
        if (valA < valB) comparison = -1
        if (valA > valB) comparison = 1
        if (this.sortDirection === 'desc') comparison *= -1

        return comparison
      })
    },
  },
})
