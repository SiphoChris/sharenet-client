<template>
  <div class="min-h-screen flex flex-col">
    <header class="flex justify-center py-6 bg-primary-50">
      <Nav />
    </header>
    <main class="flex-grow">
      <RouterView v-if="priceStore.loaded" />
      <div v-else class="flex justify-center items-center h-full">
        <Loader />
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import Nav from './components/NavComp.vue'
import Footer from './components/FooterComp.vue'
import { usePriceStore } from '@/stores/prices.store'
import Loader from './components/LoaderComp.vue'

const priceStore = usePriceStore()

onMounted(async () => {
  if (!priceStore.loaded) {
    await priceStore.fetchData()
  }
})
</script>
