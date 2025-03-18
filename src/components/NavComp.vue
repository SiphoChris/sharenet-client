<template>
  <nav class="w-full md:w-10/12 flex justify-between items-center bg-red-500 rounded-xl px-8 py-4">
    <Logo />
    <div class="flex gap-x-24">
      <ul v-for="link in navLinks" :key="link.name">
        <li><RouterLink :to="link.path">{{ link.name }}</RouterLink></li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import Logo from './LogoComp.vue';
import { RouterLink } from 'vue-router';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Contact', path: '/contact' },
  { name: 'See more', path: '/venues' },
]


</script>
