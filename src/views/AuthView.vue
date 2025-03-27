<template>
  <div class="pb-8 flex items-center justify-center bg-primary-50">
    <LoginForm 
      v-if="currentMode === 'login'" 
      @toggle-mode="currentMode = 'register'" 
    />
    <RegisterForm 
      v-else 
      @toggle-mode="currentMode = 'login'" 
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import LoginForm from '@/components/LoginForm.vue'
import RegisterForm from '@/components/RegisterForm.vue'

const props = defineProps({
  mode: {
    type: String,
    default: 'login',
    validator: (value) => ['login', 'register'].includes(value),
  },
})

const currentMode = ref(props.mode)

watch(() => props.mode, (newMode) => {
  currentMode.value = newMode
})
</script>