<template>
  <header class="flex justify-center py-6">
    <Nav />
  </header>
  <RouterView />
  <Footer/>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Nav from './components/NavComp.vue'
import Footer from './components/FooterComp.vue'
</script>
