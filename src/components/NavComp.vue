<template>
  <nav
    class="w-full md:w-10/12 flex justify-between items-center bg-primary-50 rounded md:rounded-xl px-8 py-4 shadow-none md:shadow-sm shadow-blue-300"
  >
    <Logo />

    <!-- Desktop Navigation Links -->
    <div class="hidden md:flex gap-x-24">
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

    <!-- Hamburger Menu Button for Mobile and Tablet -->
    <div class="md:hidden">
      <button @click="isMenuOpen = !isMenuOpen" class="focus:outline-none">
        <span class="block w-6 h-0.5 bg-primary-900 mb-1.5"></span>
        <span class="block w-6 h-0.5 bg-primary-900 mb-1.5"></span>
        <span class="block w-6 h-0.5 bg-primary-900"></span>
      </button>
    </div>
  </nav>

  <!-- off-canvas menu -->
  <div
    class="fixed inset-0 z-50 md:hidden bg-primary-50 transform transition-transform duration-300"
    :class="isMenuOpen ? 'translate-x-0' : 'translate-x-full'"
  >
    <div class="flex justify-between items-center p-8">
      <Logo />
      <button @click="isMenuOpen = false" class="focus:outline-none">
        <span class="block w-6 h-0.5 bg-primary-900 transform rotate-45 translate-y-0.5"></span>
        <span class="block w-6 h-0.5 bg-primary-900 transform -rotate-45 -translate-y-0"></span>
      </button>
    </div>
    <ul class="flex flex-col items-center gap-y-6 mt-8">
      <li v-for="link in navLinks" :key="link.name">
        <RouterLink
          :to="link.path"
          @click="isMenuOpen = false"
          class="text-primary-900 text-xl font-bold hover:text-primary-500 transition-color"
          >{{ link.name }}</RouterLink
        >
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Logo from './LogoComp.vue'
import { RouterLink } from 'vue-router'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Contact', path: '/contact' },
  { name: 'See venue', path: '/venues' },
]

const isMenuOpen = ref(false)
</script>
