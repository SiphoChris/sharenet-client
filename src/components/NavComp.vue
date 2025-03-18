<template>
  <nav
    class="w-full md:w-10/12 flex justify-between items-center bg-primary-50 rounded-xl px-8 py-4 shadow-sm shadow-blue-300"
  >
    <Logo />
    <div class="flex gap-x-24">
      <ul v-for="link in navLinks" :key="link.name">
        <li>
          <RouterLink
            :to="link.path"
            class="text-primary-900 text-lg font-bold hover:text-primary-500 transition-color"
            >{{ link.name }}</RouterLink
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import Logo from './LogoComp.vue'
import { RouterLink } from 'vue-router'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Contact', path: '/contact' },
  { name: 'See more', path: '/venues' },
]
</script>
