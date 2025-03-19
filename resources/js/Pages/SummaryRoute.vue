<template>
  <div class="container mx-auto p-4 max-w-3xl">
    <header class="mb-8 text-center">
      <h1 class="text-3xl font-bold text-primary">Babysitter Reservation</h1>
      <p class="text-muted-foreground">Book a trusted babysitter for your children</p>
    </header>

    <div class="max-w-2xl mx-auto p-6">
      <div class="space-y-6 bg-gray-50 p-6 rounded-lg">
        <div>
          <h2 class="text-xl font-semibold mb-2">Reservation Details</h2>
          <p>Date and Time: {{ new Date(reservationStore.reservation.datetime).toLocaleString('ms') }}</p>
        </div>

        <div>
          <h2 class="text-xl font-semibold mb-2">Children</h2>
          <ul class="list-disc pl-6">
            <li v-for="(child, index) in reservationStore.reservation.children" :key="index">
              {{ child.name }} (Birth Date: {{ new Date(child.birthDate).toLocaleDateString('ms') }})
            </li>
          </ul>
        </div>

        <div>
          <h2 class="text-xl font-semibold mb-2">Address</h2>
          <p>{{ reservationStore.reservation.address }}</p>
        </div>

        <button @click="handleSubmit" class="w-full px-4 py-2 bg-green-500 text-white rounded">
          Confirm Reservation
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useReservationStore } from '../stores/reservation';
import axios from 'axios';

const router = useRouter();
const reservationStore = useReservationStore();

async function handleSubmit() {
  try {
    const response = await axios.post('/api/bookings', {
      booking_details: JSON.stringify(reservationStore.reservation),
    });
    console.log('Booking created:', response.data.id);
    reservationStore.setBookingNo(response.data.id);
    router.push('/confirmation');
  } catch (error) {
    console.error('Error creating booking:', error);
    alert('Failed to submit reservation. Please try again.');
  }
}
</script>
