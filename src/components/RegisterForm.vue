<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-slate-800 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold text-center text-slate-100 mb-6">Sign Up</h2>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Name field -->
      <div>
        <label for="name" class="block text-sm font-medium text-slate-300">Name</label>
        <input
          v-model="formData.name"
          type="text"
          id="name"
          required
          class="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-slate-100"
        />
      </div>

      <!-- Email field -->
      <div>
        <label for="email" class="block text-sm font-medium text-slate-300">Email</label>
        <input
          v-model="formData.email"
          type="email"
          id="email"
          required
          class="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-slate-100"
        />
      </div>

      <!-- Password field -->
      <div>
        <label for="password" class="block text-sm font-medium text-slate-300">Password</label>
        <input
          v-model="formData.password"
          type="password"
          id="password"
          required
          minlength="8"
          class="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-slate-100"
        />
      </div>

      <!-- Submit button -->
      <button
        type="submit"
        :disabled="loading"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="loading">Submiting...</span>
        <span v-else>Sign Up</span>
      </button>

      <!-- Toggle to login -->
      <p class="text-center text-sm text-slate-400">
        Already have an account?
        <button
          type="button"
          @click="$emit('toggle-mode')"
          class="text-blue-400 hover:text-blue-300 focus:outline-none"
        >
          Login
        </button>
      </p>

      <!-- Error message -->
      <div v-if="error" class="text-red-400 text-sm text-center">
        {{ error }}
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth.store'
import { useRouter } from 'vue-router'

export default {
  name: 'RegisterForm',
  emits: ['toggle-mode'],
  setup(props, { emit }) {
    const authStore = useAuthStore()
    const router = useRouter()

    const loading = ref(false)
    const error = ref('')

    const formData = ref({
      name: '',
      email: '',
      password: '',
    })

    const handleSubmit = async () => {
      loading.value = true
      error.value = ''

      try {
        const success = await authStore.register(
          formData.value.name,
          formData.value.email,
          formData.value.password
        )
        if (success) {
          const redirect = router.currentRoute.value.query.redirect || '/'
          router.push(redirect)
        }
      } catch (err) {
        error.value = err.message || 'Registration failed'
      } finally {
        loading.value = false
      }
    }

    return {
      loading,
      error,
      formData,
      handleSubmit,
    }
  },
}
</script>