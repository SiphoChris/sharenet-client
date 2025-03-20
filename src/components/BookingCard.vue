<!-- <template>
  <div class="border border-gray-300 rounded-lg p-6 shadow-md bg-white">
    <h3 class="text-lg font-bold">{{ booking.name }}</h3>
    <p class="text-gray-600">📅 Date: {{ formatDate(booking.date) }}</p>
    <p class="text-gray-700">
      🎟️ Status:
      <span :class="booking.status === 'available' ? 'text-green-500' : 'text-red-500'">
        {{ booking.status.toUpperCase() }}
      </span>
    </p>

    <div v-if="booking.status === 'available'" class="mt-2">
      <p class="text-gray-700">
        🪑 Available Seats: <span class="font-bold">{{ booking.availableSeats }}</span> /
        {{ booking.totalSeats }}
      </p>
    </div>

    <div v-if="!showConfirmation && booking.status === 'available' && booking.availableSeats > 0">
      <input
        v-model="email"
        type="email"
        placeholder="Enter your email"
        class="w-full mt-3 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
      />

      <button
        @click="confirmBooking"
        :disabled="isProcessing"
        class="w-full mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        {{ isProcessing ? 'Processing...' : 'Book Now' }}
      </button>
    </div>

    <div v-if="showConfirmation" class="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
      <p class="text-green-800 font-medium">Booking confirmed!</p>
      <p class="text-green-700">Your reference code:</p>
      <p class="text-lg font-bold text-green-800 my-2">{{ referenceCode }}</p>
      <p class="text-sm text-green-600">Please save this code for your records.</p>
    </div>

    <p v-if="errorMsg" class="text-red-500 mt-3">{{ errorMsg }}</p>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useBookingStore } from '../stores/bookings.store.js'

export default {
  props: {
    booking: Object,
  },
  setup(props) {
    const bookingStore = useBookingStore()
    const email = ref('')
    const isProcessing = ref(false)
    const errorMsg = ref('')
    const showConfirmation = ref(false)
    const referenceCode = ref('')

    const formatDate = (dateString) => {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    }

    const confirmBooking = async () => {
      if (!email.value.trim()) {
        errorMsg.value = 'Please enter your email.'
        return
      }

      if (!validateEmail(email.value)) {
        errorMsg.value = 'Please enter a valid email address.'
        return
      }

      isProcessing.value = true
      errorMsg.value = ''

      try {
        const result = await bookingStore.bookSeat(props.booking.id, email.value)

        if (result.reference) {
          referenceCode.value = result.reference
          showConfirmation.value = true
        } else {
          throw new Error('Reference code missing from response')
        }
      } catch (error) {
        console.error('Booking failed', error)
        errorMsg.value =
          error.response?.data?.error || 'Failed to book this event. Please try again.'
      } finally {
        isProcessing.value = false
      }
    }

    const validateEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return re.test(email)
    }

    return {
      confirmBooking,
      isProcessing,
      errorMsg,
      email,
      showConfirmation,
      referenceCode,
      formatDate,
    }
  },
}
</script> -->

// frontend/bookingcard.vue

<template>
  <div class="border border-gray-300 rounded-lg p-6 shadow-md bg-white">
    <h3 class="text-lg font-bold">{{ booking.name }}</h3>
    <p class="text-gray-600">📅 Date: {{ formatDate(booking.date) }}</p>
    <p class="text-gray-700">
      🎟️ Status:
      <span :class="booking.status === 'available' ? 'text-green-500' : 'text-red-500'">
        {{ booking.status.toUpperCase() }}
      </span>
    </p>

    <div v-if="booking.status === 'available'" class="mt-2">
      <p class="text-gray-700">
        🪑 Available Seats: <span class="font-bold">{{ booking.availableSeats }}</span> /
        {{ booking.totalSeats }}
      </p>
    </div>

    <div
      v-if="
        !showConfirmation &&
        booking.status === 'available' &&
        booking.availableSeats > 0
      "
    >
      <input
        v-model="email"
        type="email"
        placeholder="Enter your email"
        class="w-full mt-3 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
      />

      <button
        @click="confirmBooking"
        :disabled="isProcessing"
        class="w-full mt-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        <span v-if="isProcessing">Processing...</span>
        <span v-else>Book Now</span>
      </button>
    </div>
    <div v-else-if="booking.status === 'sold out'" class="mt-4 p-4 bg-red-100 border border-red-200 rounded-md">
      <p class="text-red-800 font-medium">This event is sold out.</p>
    </div>

    <div v-if="showConfirmation" class="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
      <p class="text-green-800 font-medium">Booking confirmed!</p>
      <p class="text-green-700">Your reference code:</p>
      <p class="text-lg font-bold text-green-800 my-2">{{ referenceCode }}</p>
      <p class="text-sm text-green-600">Please save this code for your records.</p>
    </div>

    <p v-if="errorMsg" class="text-red-500 mt-3">{{ errorMsg }}</p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useBookingStore } from '../stores/bookings.store.js';

export default {
  props: {
    booking: Object,
  },
  setup(props) {
    const bookingStore = useBookingStore();
    const email = ref('');
    const isProcessing = ref(false);
    const errorMsg = ref('');
    const showConfirmation = ref(false);
    const referenceCode = ref('');

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    };

    const confirmBooking = async () => {
      if (!email.value.trim()) {
        errorMsg.value = 'Please enter your email.';
        return;
      }

      if (!validateEmail(email.value)) {
        errorMsg.value = 'Please enter a valid email address.';
        return;
      }

      isProcessing.value = true;
      errorMsg.value = '';

      try {
        const result = await bookingStore.bookSeat(props.booking.id, email.value);

        if (result.reference) {
          referenceCode.value = result.reference;
          showConfirmation.value = true;
          await bookingStore.fetchAllBookings(); //Refetch bookings
        } else {
          throw new Error('Reference code missing from response');
        }
      } catch (error) {
        console.error('Booking failed', error);
        errorMsg.value =
          error.response?.data?.error || 'Failed to book this event. Please try again.';
      } finally {
        isProcessing.value = false;
      }
    };

    const validateEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    };

    return {
      confirmBooking,
      isProcessing,
      errorMsg,
      email,
      showConfirmation,
      referenceCode,
      formatDate,
    };
  },
};
</script>
