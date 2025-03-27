<template>
    <nav
      class="w-full md:w-10/12 flex justify-between items-center bg-primary-50 rounded md:rounded-xl px-8 py-4 shadow-none md:shadow-sm shadow-blue-300"
    >
      <Logo />
  
      <!-- Desktop Navigation Links -->
      <div class="hidden md:flex gap-x-24 items-center">
        <ul v-for="link in navLinks" :key="link.name">
          <li>
            <RouterLink
              :to="link.path"
              class="text-primary-900 text-lg font-bold hover:text-primary-500 transition-color"
              >{{ link.name }}</RouterLink
            >
          </li>
        </ul>
        
        <!-- Watchlist link (shown only when authenticated) -->
        <RouterLink
          v-if="authStore.isAuthenticated"
          to="/watchlist"
          class="text-primary-900 text-lg font-bold hover:text-primary-500 transition-color"
        >
          Watchlist
        </RouterLink>
        
        <div v-if="authStore.isAuthenticated">
          <button
            @click="handleLogout"
            class="px-4 py-2 text-sm btn-secondary rounded-md"
          >
            Logout
          </button>
        </div>
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
  
    <!-- Mobile off-canvas menu -->
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
        
        <!-- Mobile watchlist link (shown only when authenticated) -->
        <li v-if="authStore.isAuthenticated">
          <RouterLink
            to="/watchlist"
            @click="isMenuOpen = false"
            class="text-primary-900 text-xl font-bold hover:text-primary-500 transition-color"
          >
            My Watchlist
          </RouterLink>
        </li>
        
        <li v-if="authStore.isAuthenticated" class="flex flex-col items-center gap-y-4 mt-4">
          <button
            @click="handleLogout"
            class="btn btn-secondary"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '@/stores/auth.store'
  import Logo from './LogoComp.vue'
  
  const authStore = useAuthStore()
  const router = useRouter()
  const isMenuOpen = ref(false)
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' },
    { name: 'Venues', path: '/venues' }
  ]
  
  const handleLogout = () => {
    authStore.logout()
    isMenuOpen.value = false
    router.push('/')
  }
  </script>