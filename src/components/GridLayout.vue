<template>
    <div class="container mx-auto p-6 min-h-screen">
      <h1 class="text-lg md:text-3xl font-bold mb-6 text-center md:my-8">Workshop Bookings</h1>
  
      <div class="mb-4 flex justify-center">
        <button
          @click="filterStatus = 'all'"
          :class="{ 'bg-primary-600 text-white': filterStatus === 'all', 'bg-gray-200 text-gray-700': filterStatus !== 'all' }"
          class="px-4 py-2 rounded-lg hover:cursor-pointer mr-2"
        >
          All
        </button>
        <button
          @click="filterStatus = 'available'"
          :class="{ 'bg-primary-600 text-white': filterStatus === 'available', 'bg-gray-200 text-gray-700': filterStatus !== 'available' }"
          class="px-4 py-2 rounded-lg hover:cursor-pointer mr-2"
        >
          Available
        </button>
        <button
          @click="filterStatus = 'sold out'"
          :class="{ 'bg-primary-600 text-white': filterStatus === 'sold out', 'bg-gray-200 text-gray-700': filterStatus !== 'sold out' }"
          class="px-4 py-2 rounded-lg hover:cursor-pointer"
        >
          Sold Out
        </button>
      </div>
  
      <div v-if="bookingStore.loading" class="text-center text-gray-500">
        <Loader class="mx-auto my-16" />
      </div>
      <div v-if="bookingStore.error" class="text-center text-red-500">{{ bookingStore.error }}</div>
  
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <BookingCard
          v-for="booking in filteredBookings"
          :key="booking.id"
          :booking="booking"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref, computed } from 'vue';
  import BookingCard from './BookingCard.vue';
  import { useBookingStore } from '../stores/bookings.store.js';
  import Loader from './LoaderComp.vue';
  
  const bookingStore = useBookingStore();
  const filterStatus = ref('all');
  
  const filteredBookings = computed(() => {
    if (filterStatus.value === 'all') {
      return bookingStore.bookings;
    } else {
      return bookingStore.bookings.filter((booking) => booking.status === filterStatus.value);
    }
  });
  
  onMounted(() => {
    bookingStore.fetchAllBookings();
  });
  </script>