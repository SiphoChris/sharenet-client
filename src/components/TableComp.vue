<template>
  <div
    class="relative flex flex-col w-full md:max-w-5xl mx-auto h-80 overflow-y-auto text-slate-300 bg-slate-800 shadow-md bg-clip-border scrollbar-custom mb-18"
  >
    <div class="overflow-x-auto">
      <table class="w-full text-left table-auto min-w-[700px]">
        <thead class="sticky top-0 z-10">
          <tr>
            <th
              @click="sortTable('fullName')"
              class="p-4 border-b border-slate-600 bg-slate-700 cursor-pointer"
            >
              <p class="text-sm font-normal leading-none text-slate-300">
                <span>Name</span><SortIcon />
              </p>
            </th>
            <th
              @click="sortTable('price')"
              class="p-4 border-b border-slate-600 bg-slate-700 cursor-pointer"
            >
              <p class="text-sm font-normal leading-none text-slate-300">
                <span>Price</span><SortIcon />
              </p>
            </th>
            <th
              @click="sortTable('move')"
              class="p-4 border-b border-slate-600 bg-slate-700 cursor-pointer whitespace-nowrap"
            >
              <p class="text-sm font-normal leading-none text-slate-300">
                <span>Move</span><SortIcon />
              </p>
            </th>
            <th
              @click="sortTable('pmove')"
              class="p-4 border-b border-slate-600 bg-slate-700 cursor-pointer whitespace-nowrap"
            >
              <p class="text-sm font-normal leading-none text-slate-300">
                <span>% Move</span><SortIcon />
              </p>
            </th>
            <th
              @click="sortTable('datetime')"
              class="p-4 border-b border-slate-600 bg-slate-700 cursor-pointer"
            >
              <p class="text-sm font-normal leading-none text-slate-300">
                <span>Time</span><SortIcon />
              </p>
            </th>
            <th class="p-4 border-b border-slate-600 bg-slate-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in sortedTableData"
            :key="item.code"
            class="even:bg-slate-900 hover:bg-slate-700"
          >
            <td class="p-4 border-b border-slate-700">
              <p class="text-sm text-slate-100 font-semibold truncate max-w-[150px]">
                {{ item.fullName }}
              </p>
            </td>
            <td class="p-4 border-b border-slate-700">
              <p class="text-sm text-slate-300">{{ formatPrice(item.price) }}</p>
            </td>
            <td class="p-4 border-b border-slate-700">
              <p class="text-sm" :class="getMoveClass(item.move)">{{ formatPrice(item.move) }}</p>
            </td>
            <td class="p-4 border-b border-slate-700">
              <p class="text-sm" :class="getMoveClass(item.pmove)">
                {{ formatPrice(item.pmove) }}%
              </p>
            </td>
            <td class="p-4 border-b border-slate-700">
              <p class="text-sm text-slate-300">{{ formatDateTime(item.datetime) }}</p>
            </td>
            <td class="p-4 border-b border-slate-700">
              <button
                @click="toggleWatchlist(item.code)"
                class="px-3 py-1 text-sm rounded-md hover:cursor-pointer"
                :class="{
                  'bg-green-600 text-white': isInWatchlist(item.code),
                  'bg-slate-400 text-primary-900': !isInWatchlist(item.code),
                }"
                :disabled="!authStore.isAuthenticated"
              >
                {{
                  !authStore.isAuthenticated
                    ? 'Login to watch'
                    : isInWatchlist(item.code)
                      ? 'Watching'
                      : 'Watch'
                }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { usePriceStore } from '../stores/prices.store'
import { useAuthStore } from '../stores/auth.store'
import SortIcon from './icons/SortIcon.vue'
import { apiUrl } from '../../utils/index.js'

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
})

const priceStore = usePriceStore()
const authStore = useAuthStore()
const watchlist = ref([])
const loading = ref(false)

// Fetch watchlist when component mounts and user is authenticated
onMounted(async () => {
  if (authStore.isAuthenticated) {
    await fetchWatchlist()
  }
})


const fetchWatchlist = async () => {
  try {
    loading.value = true
    const response = await fetch(`${apiUrl}/user/watchlist`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })

    if (response.ok) {
      const data = await response.json()
      watchlist.value = data.data.map((item) => item.share_code)
    }
  } catch (error) {
    console.error('Error fetching watchlist:', error)
  } finally {
    loading.value = false
  }
}

const toggleWatchlist = async (share_code) => {
  if (!authStore.isAuthenticated) {
    return
  }

  try {
    if (isInWatchlist(share_code)) {
      // First we need to get the watchlist_id for this item
      const response = await fetch(`${apiUrl}/user/watchlist`, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      })
      
      if (response.ok) {
        const data = await response.json()
        const item = data.data.find(item => item.share_code === share_code)
        
        if (item) {
          await fetch(`${apiUrl}/user/watchlist/item/${item.watchlist_id}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${authStore.token}`,
            },
          })
          watchlist.value = watchlist.value.filter((code) => code !== share_code)
        }
      }
    } else {
      // Add to watchlist
      const response = await fetch(`${apiUrl}/user/watchlist`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authStore.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ share_code }),
      })

      if (response.ok) {
        watchlist.value.push(share_code)
      }
    }
  } catch (error) {
    console.error('Error updating watchlist:', error)
  }
}


const isInWatchlist = (shareCode) => {
  return watchlist.value.includes(shareCode)
}

const sortedTableData = computed(() => {
  if (!Array.isArray(props.data)) {
    console.error('Data is not an array:', props.data)
    return []
  }

  return [...props.data].sort((a, b) => {
    const valueA = a[priceStore.sortBy]
    const valueB = b[priceStore.sortBy]

    let comparison = 0
    if (valueA < valueB) comparison = -1
    if (valueA > valueB) comparison = 1
    if (priceStore.sortDirection === 'desc') comparison *= -1

    return comparison
  })
})

const sortTable = (criteria) => {
  priceStore.sortData(criteria)
}

const formatDateTime = (datetime) => {
  if (!datetime) return ''
  const date = new Date(datetime)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const formatPrice = (value) => {
  if (value === null || value === undefined) return ''
  return Number(value).toFixed(2)
}

const getMoveClass = (value) => {
  if (value > 0) return 'text-green-400'
  if (value < 0) return 'text-red-400'
  return 'text-slate-300'
}
</script>

<style scoped>
.icon {
  width: 16px;
  height: 16px;
  vertical-align: middle;
}

.scrollbar-custom::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
.scrollbar-custom::-webkit-scrollbar-track {
  background: #1e293b;
  border-radius: 10px;
}
.scrollbar-custom::-webkit-scrollbar-thumb {
  background: #475569;
  border-radius: 10px;
}
.scrollbar-custom::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}

.scrollbar-custom {
  scrollbar-width: thin;
  scrollbar-color: #475569 #1e293b;
}
</style>
