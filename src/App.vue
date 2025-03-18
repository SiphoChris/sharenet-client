<template>
  <header class="flex justify-center py-6">
    <Nav />
  </header>
  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router'
import Nav from './components/NavComp.vue'
</script>
