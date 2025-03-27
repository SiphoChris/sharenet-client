import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ContactView from '@/views/ContactView.vue'
import VenuesView from '@/views/VenuesView.vue'
import AuthView from '@/views/AuthView.vue'
import WatchlistView from '@/views/WatchListView.vue' // New protected view
import { useAuthStore } from '../stores/auth.store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView
    },
    {
      path: '/venues',
      name: 'venues',
      component: VenuesView
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView,
      props: (route) => ({ mode: route.query.mode || 'login' })
    },
    {
      path: '/watchlist',
      name: 'watchlist',
      component: WatchlistView,
      meta: { requiresAuth: true } // Protected route
    }
  ]
})

// only protects the watchlist route
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'auth', query: { mode: 'login', redirect: to.path } })
  } else {
    next()
  }
})

export default router