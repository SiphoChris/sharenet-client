<template>
  <div class="container mx-auto p-6 min-h-screen">
    <h1 class="text-3xl font-bold mb-6 text-center my-8">Event Bookings</h1>

    <div v-if="bookingStore.loading" class="text-center text-gray-500">
      <Loader class="mx-auto my-16" />
    </div>
    <div v-if="bookingStore.error" class="text-center text-red-500">{{ bookingStore.error }}</div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <BookingCard v-for="booking in bookingStore.bookings" :key="booking.id" :booking="booking" />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import BookingCard from './BookingCard.vue'
import { useBookingStore } from '../stores/bookings.store.js'
import Loader from './LoaderComp.vue'

const bookingStore = useBookingStore()

onMounted(() => {
  bookingStore.fetchAllBookings()
})
</script>
