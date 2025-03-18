<script setup>
import { RouterView } from 'vue-router'
import Nav from './components/NavComp.vue'
</script>

<template>
  <div class="flex justify-center bg-amber-200 py-6">
    <Nav />
  </div>

  <RouterView />
</template>
