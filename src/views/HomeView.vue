<template>
  <header>
    <Hero />
  </header>
  <main>
    <section>
      <div>
        <div v-if="priceData.loading">Loading...</div>
        <div v-if="priceData.error">{{ priceData.error }}</div>
        <DataTable :data="priceData.spots" />
      </div>
    </section>
  </main>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import { usePriceStore } from '../stores/index'
import Hero from '../components/HeroSection.vue'
import DataTable from '../components/TableComp.vue'

export default defineComponent({
  name: 'App',
  components: {
    DataTable,
    Hero,
  },
  setup() {
    const priceData = usePriceStore()
    onMounted(() => {
      priceData.fetchData()
    })

    return { priceData }
  },
})
</script>
