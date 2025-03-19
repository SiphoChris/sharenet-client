<template>
  <header>
    <Hero />
  </header>
  <main>
    <section>
      <div>
        <Loader class="mx-auto" v-if="priceData.loading" />
        <div v-else-if="priceData.error" class="text-red-500">{{ priceData.error }}</div>
        <DataTable
          v-else-if="priceData.spots && priceData.spots.length > 0"
          :data="priceData.spots"
        />
        <div v-else class="text-center py-12 text-red-500 font-bold text-2xl">
          No data available
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import { usePriceStore } from '../stores/index'
import Hero from '../components/HeroSection.vue'
import DataTable from '../components/TableComp.vue'
import Loader from '../components/LoaderComp.vue'

export default defineComponent({
  name: 'App',
  components: {
    DataTable,
    Hero,
    Loader,
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
