<template>
  <div
    class="relative flex flex-col w-full md:max-w-5xl mx-auto h-80 overflow-y-auto overflow-x-hidden text-slate-300 bg-slate-800 shadow-md rounded-lg bg-clip-border scrollbar-custom"
  >
    <table class="w-full text-left table-auto">
      <thead class="sticky top-0 z-10">
        <tr>
          <th
            @click="sortTable('fullName')"
            class="p-4 border-b border-slate-600 bg-slate-700 cursor-pointer"
          >
            <p class="text-sm font-normal leading-none text-slate-300">Name</p>
          </th>
          <th
            @click="sortTable('price')"
            class="p-4 border-b border-slate-600 bg-slate-700 cursor-pointer"
          >
            <p class="text-sm font-normal leading-none text-slate-300">Price</p>
          </th>
          <th
            @click="sortTable('move')"
            class="p-4 border-b border-slate-600 bg-slate-700 cursor-pointer whitespace-nowrap"
          >
            <p class="text-sm font-normal leading-none text-slate-300">Move</p>
          </th>
          <th
            @click="sortTable('pmove')"
            class="p-4 border-b border-slate-600 bg-slate-700 cursor-pointer whitespace-nowrap"
          >
            <p class="text-sm font-normal leading-none text-slate-300">% Move</p>
          </th>
          <th
            @click="sortTable('datetime')"
            class="p-4 border-b border-slate-600 bg-slate-700 cursor-pointer"
          >
            <p class="text-sm font-normal leading-none text-slate-300">Time</p>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in tableData" :key="item.code" class="even:bg-slate-900 hover:bg-slate-700">
          <td class="p-4 border-b border-slate-700">
            <p class="text-sm text-slate-100 font-semibold truncate max-w-[150px]">
              {{ item.fullName }}
            </p>
          </td>
          <td class="p-4 border-b border-slate-700">
            <p class="text-sm text-slate-300">{{ item.price.toFixed(2) }}</p>
          </td>
          <td class="p-4 border-b border-slate-700">
            <p class="text-sm" :class="getMoveClass(item.move)">{{ item.move.toFixed(2) }}</p>
          </td>
          <td class="p-4 border-b border-slate-700">
            <p class="text-sm" :class="getMoveClass(item.pmove)">{{ item.pmove.toFixed(2) }}%</p>
          </td>
          <td class="p-4 border-b border-slate-700">
            <p class="text-sm text-slate-300">{{ formatDateTime(item.datetime) }}</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { usePriceStore } from '../stores/index'

export default defineComponent({
  name: 'DataTable',
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const priceStore = usePriceStore()

    const tableData = computed(() => {
      return props.data || []
    })

    const sortTable = (criteria) => {
      priceStore.sortData(criteria)
    }

    const formatDateTime = (datetime) => {
      if (!datetime) return ''
      const date = new Date(datetime)
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    const getMoveClass = (value) => {
      if (value > 0) return 'text-green-400'
      if (value < 0) return 'text-red-400'
      return 'text-slate-300'
    }

    return { tableData, sortTable, formatDateTime, getMoveClass }
  },
})
</script>

<style scoped>
.scrollbar-custom::-webkit-scrollbar {
  width: 8px;
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
