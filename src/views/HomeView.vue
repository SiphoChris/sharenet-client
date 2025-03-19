<!-- <template>
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
import Loader from '../components/LoaderComp.vue'

export default defineComponent({
  name: 'App',
  components: {
    DataTable,
    Hero,
    Loader
  },
  setup() {
    const priceData = usePriceStore()
    onMounted(() => {
      priceData.fetchData()
    })

    return { priceData }
  },
})
</script> -->

<template>
  <header>
    <Hero />
  </header>
  <main>
    <section>
      <div>
        <Loader v-if="priceData.loading" />
        <div v-else-if="priceData.error" class="text-red-500">{{ priceData.error }}</div>
        <DataTable v-else-if="priceData.spots.length" :data="priceData.spots" />
        <div v-else>No data available</div>
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
    Loader
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

