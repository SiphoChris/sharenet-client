import { defineStore } from 'pinia';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_CUSTOM_API_URL;

export const useBookingStore = defineStore('bookings', {
  state: () => ({
    bookings: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchAllBookings() {
      this.loading = true;
      this.error = null;

      try {
        const response = await axios.get(`${apiUrl}/bookings`);
        this.bookings = response.data;
      } catch (error) {
        console.error('Error fetching bookings:', error);
        this.error = 'Failed to load bookings. Please try again.';
      } finally {
        this.loading = false;
      }
    },

    async updateBookingStatus(id, status) {
      try {
        const response = await axios.patch(`${apiUrl}/bookings/${id}`, { status });

        // Update the local state
        const index = this.bookings.findIndex((booking) => booking.id === id);
        if (index !== -1) {
          this.bookings[index] = response.data;
        }
        await this.fetchAllBookings(); //Refetch bookings
        return response.data;
      } catch (error) {
        console.error('Error updating booking status:', error);
        throw error;
      }
    },

    async bookSeat(id, email) {
      try {
        const response = await axios.post(`${apiUrl}/bookings/${id}/book`, { email });

        // Update the local state
        const index = this.bookings.findIndex((booking) => booking.id === id);
        if (index !== -1) {
          this.bookings[index] = response.data.booking;
        }

        return response.data;
      } catch (error) {
        console.error('Error booking seat:', error);
        if (error.response && error.response.data && error.response.data.error) {
          throw new Error(error.response.data.error);
        } else {
          throw new Error('Failed to book seat. Please try again.');
        }
      }
    },
  },
});