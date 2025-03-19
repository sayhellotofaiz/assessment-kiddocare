<template>
  <div class="container mx-auto p-4 max-w-3xl">
    <header class="mb-8 text-center">
      <h1 class="text-3xl font-bold text-primary">Babysitter Reservation</h1>
      <p class="text-muted-foreground">Book a trusted babysitter for your children</p>
    </header>

    <div class="max-w-2xl mx-auto p-6">
      <div class="space-y-6 bg-gray-50 p-6 rounded-lg">
        <div>
          <h2 class="text-xl font-semibold mb-2">Reservation Confirmed!</h2>
        </div>

        <div class="bg-green-50 p-6 rounded-lg">
          <p class="text-xl mb-2">Your booking number is:</p>
          <p class="text-3xl font-bold text-green-700">{{ reservationStore.reservation.bookingNo }}</p>
        </div>

        <div class="bg-gray-50 p-6 rounded-lg text-left">
          <h2 class="text-xl font-semibold mb-4">Reservation Details</h2>

          <div class="space-y-4">
            <p>
              <strong>Date and Time:</strong>
              {{ new Date(reservationStore.reservation.datetime).toLocaleString('ms') }}
            </p>

            <div>
              <strong>Children:</strong>
              <ul class="list-disc pl-6 mt-2">
                <li v-for="(child, index) in reservationStore.reservation.children" :key="index">
                  {{ child.name }} (Birth Date: {{ new Date(child.birthDate).toLocaleDateString('ms') }})
                </li>
              </ul>
            </div>

            <p>
              <strong>Address:</strong><br>
              {{ reservationStore.reservation.address }}
            </p>
          </div>


        </div>

        <p class="text-gray-600">
          Our customer support team will contact you shortly to confirm your reservation.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useReservationStore } from '../stores/reservation';

const reservationStore = useReservationStore();
</script>
