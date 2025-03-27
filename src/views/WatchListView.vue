<template>
  <div class="min-h-screen bg-primary-50 text-slate-100 p-6">
    <div class="max-w-6xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-md md:text-3xl font-bold">My Watchlist</h1>
        <div class="flex max-sm:flex-col space-x-3 items-center justify-center gap-2">
          <button
            @click="clearWatchlist"
            class="px-2 py-1 md:px-4 md:py-2 text-sm md:text-lg btn-secondary rounded-md hover:cursor-pointer"
            :disabled="loading"
          >
            Clear All
          </button>
          <button
            @click="refreshWatchlist"
            class="px-2 py-1 md:px-4 md:py-2 text-sm md:text-lg bg-primary-600 rounded-md hover:bg-primary-700 transition-colors hover:cursor-pointer"
            :disabled="loading"
          >
            Refresh
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center py-12">
        <Loader />
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-red-400 text-center py-12">
        {{ error }}
      </div>

      <!-- Empty State -->
      <div
        v-else-if="watchlistItems.length === 0 && !loading"
        class="text-center py-12 text-slate-400"
      >
        <p class="text-xl mb-4">Your watchlist is empty</p>
        <router-link
          to="/"
          class="text-blue-400 hover:text-blue-300 underline hover:cursor-pointer"
        >
          Browse items to add to your watchlist
        </router-link>
      </div>

      <!-- Card Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="item in watchlistItems"
          :key="item.code"
          class="bg-slate-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div class="p-5">
            <div class="flex justify-between items-start">
              <h3 class="text-xl font-semibold text-slate-100 mb-2 truncate">
                {{ item.fullName }}
              </h3>
              <span
                class="px-2 py-1 text-xs rounded-full"
                :class="itemCategoryClass(item.categoryName)"
              >
                {{ item.categoryName }}
              </span>
            </div>

            <div class="space-y-3 mt-4">
              <div class="flex justify-between">
                <span class="text-slate-400">Price:</span>
                <span class="font-medium">R {{ formatPrice(item.price) }}</span>
              </div>

              <div class="flex justify-between">
                <span class="text-slate-400">Change:</span>
                <span :class="getMoveClass(item.move)">
                  {{ formatPrice(item.move) }} ({{ formatPrice(item.pmove) }}%)
                </span>
              </div>

              <div class="flex justify-between">
                <span class="text-slate-400">Updated:</span>
                <span>{{ formatDateTime(item.datetime) }}</span>
              </div>
            </div>

            <div class="mt-6 flex justify-end space-x-3">
              <button
                @click="removeFromWatchlist(item.code)"
                class="px-4 py-2 bg-secondary-600 rounded-md hover:bg-secondary-700 transition-colors hover:cursor-pointer"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useAuthStore } from '@/stores/auth.store'
import { usePriceStore } from '@/stores/prices.store'
import { useRouter } from 'vue-router'
import { apiUrl } from '../../utils'
import { computed } from 'vue'
import { formatDateTime, formatPrice } from '../../utils/index'
import Loader from '@/components/LoaderComp.vue'

const authStore = useAuthStore()
const priceStore = usePriceStore()
const router = useRouter()

const loading = ref(false)
const error = ref(null)
const watchlistItems = computed(() => priceStore.fullWatchlistItems)

// watching for priceStore.spots changes
watch(
  () => priceStore.spots,
  (newSpots) => {
    if (newSpots.length > 0 && authStore.isAuthenticated) {
      fetchWatchlist()
    }
  },
)

const fetchWatchlist = async () => {
  try {
    loading.value = true
    error.value = null

    const response = await fetch(`${apiUrl}/user/watchlist`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })

    if (!response.ok) throw new Error('Failed to fetch watchlist')

    const { data } = await response.json()
    const watchlistCodes = data.map((item) => item.share_code)

    // Wait for spots to be loaded if empty before showing watchlist
    if (priceStore.spots.length === 0) {
      await new Promise((resolve) => {
        const unwatch = watch(
          () => priceStore.spots,
          (spots) => {
            if (spots.length > 0) {
              unwatch()
              resolve()
            }
          },
        )
      })
    }

    watchlistItems.value = priceStore.spots.filter((item) => watchlistCodes.includes(item.code))
  } catch (err) {
    console.error('Watchlist error:', err)
    error.value = err.message || 'Failed to load watchlist'
  } finally {
    loading.value = false
  }
}

const removeFromWatchlist = async (shareCode) => {
  try {
    loading.value = true
    await priceStore.toggleWatchlist(shareCode)
  } catch (err) {
    console.error('Remove error:', err)
    error.value = err.message || 'Failed to remove item'
  } finally {
    loading.value = false
  }
}

// Refresh watchlist data
const refreshWatchlist = async () => {
  try {
    loading.value = true
    await priceStore.fetchWatchlist()
  } catch (err) {
    console.error('Refresh error:', err)
    error.value = err.message || 'Failed to refresh watchlist'
  } finally {
    loading.value = false
  }
}

// Clear watchlist data
const clearWatchlist = async () => {
  try {
    loading.value = true
    const response = await fetch(`${apiUrl}/user/watchlist/clearall`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authStore.token}`,
      },
    })

    if (response.ok) {
      await priceStore.fetchWatchlist()
    } else {
      error.value = 'Failed to clear watchlist'
      const data = await response.json()
      if (data.error) {
        error.value = data.error
      } else {
        error.value = 'Failed to clear watchlist'
        if (data.errors) {
          data.errors.forEach((err) => {
            error.value += ` ${err.message}`
          })
        }
      }
    }
  } catch (err) {
    console.error('Clear error:', err)
    error.value = err.message || 'Failed to clear watchlist'
  } finally {
    loading.value = false
  }
}

const getMoveClass = (value) => {
  if (value > 0) return 'text-green-400'
  if (value < 0) return 'text-red-400'
  return 'text-slate-300'
}

const itemCategoryClass = (category) => {
  const classes = {
    COMMODOTIES: 'bg-amber-500/20 text-amber-400',
    CURRENCIES: 'bg-emerald-500/20 text-emerald-400',
    'JSE INDICES': 'bg-blue-500/20 text-blue-400',
    'WORLD INDICES': 'bg-purple-500/20 text-purple-400',
    'SA BONDS': 'bg-rose-500/20 text-rose-400',
  }
  return classes[category] || 'bg-slate-500/20 text-slate-400'
}

// Initial fetch
onMounted(async () => {
  if (!authStore.isAuthenticated) {
    router.push({
      name: 'auth',
      query: {
        mode: 'login',
        redirect: '/watchlist',
      },
    })
    return
  }

  try {
    loading.value = true
    // Ensure spots are loaded
    if (!priceStore.loaded) {
      await priceStore.fetchData()
    }
    // Then load watchlist
    await priceStore.fetchWatchlist()
  } catch (err) {
    console.error('Initial load error:', err)
    error.value = err.message || 'Failed to load watchlist'
  } finally {
    loading.value = false
  }
})
</script>
