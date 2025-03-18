<template>
    <table class="mx-auto mt-12">
      <thead>
        <tr>
          <th @click="sortTable('FullName')">FullName</th>
          <th @click="sortTable('Price')">Price</th>
          <th @click="sortTable('Move')">Move</th>
          <th @click="sortTable('PercentageMove')">Percentage Move</th>
          <th @click="sortTable('Time')">Time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in sortedData" :key="item.FullName">
          <td>{{ item.FullName }}</td>
          <td>{{ item.Price }}</td>
          <td>{{ item.Move }}</td>
          <td>{{ item.PercentageMove }}</td>
          <td>{{ item.Time }}</td>
        </tr>
        <tr></tr>
      </tbody>
    </table>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { usePriceStore } from '../stores/index'

export default defineComponent({
  name: 'DataTable',
  props: {
    data: Array,
  },
  setup(props) {
    const priceData = usePriceStore()

    priceData.setData(props.data)

    const sortedData = computed(() => {
      return priceData.data
    })

    const sortTable = (criteria) => {
      priceData.sortData(criteria)
    }

    return { sortedData, sortTable }
  },
})
</script>
