import { defineStore } from 'pinia'
import { fetchPriceData } from '../../utils/index'

export const usePriceStore = defineStore('priceStore', {
  state: () => ({
    data: {},
    spots: [],
    categories: {},
    sortBy: 'price',
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
        this.error = 'Failed to fetch price data. Please try again.'
      } finally {
        this.loading = false
      }
    },

    setData(newData) {
      this.data = newData
    },

    setSpots(newSpots) {
      this.spots = newSpots || []
      
      const grouped = {}
    
      newSpots.forEach(spot => {
        const category = spot.categoryName
        if (!grouped[category]) {
          grouped[category] = []
        }
        grouped[category].push(spot)
      })
    
      // sort each category by datetime and limit to top 5
      Object.keys(grouped).forEach(category => {
        grouped[category] = grouped[category]
          .sort((a, b) => new Date(b.datetime) - new Date(a.datetime))
          .slice(0, 5) 
      })
    
      this.categories = grouped
      console.log('Spots:', this.spots)
      console.log('Categories:', this.categories)
    },

    sortData(criteria) {
      this.sortBy = criteria
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'
    
      // sorting the main spots array
      this.spots.sort((a, b) => {
        const valA = a[criteria]
        const valB = b[criteria]
    
        let comparison = 0
        if (valA < valB) comparison = -1
        if (valA > valB) comparison = 1
        if (this.sortDirection === 'desc') comparison *= -1
    
        return comparison
      })
      
      // sorting each category
      Object.keys(this.categories).forEach(category => {
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
    }
  },
})