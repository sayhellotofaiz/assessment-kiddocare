<template>
  <div class="container mx-auto p-4 max-w-3xl">
    <header class="mb-8 text-center">
      <h1 class="text-3xl font-bold text-primary">Babysitter Reservation</h1>
      <p class="text-muted-foreground">Book a trusted babysitter for your children</p>
    </header>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div>
        <label class="block mb-2">Reservation Date and Time</label>
        <input
          type="datetime-local"
          v-model="datetime"
          :min="minDateTime"
          :max="maxDateTime"
          required
          class="w-full p-2 border rounded"
        />
      </div>

      <div class="space-y-4">
        <h2 class="text-xl font-semibold">Children Details (Max 4 children)</h2>
        <div v-for="(child, index) in children" :key="index" class="space-y-2">
          <div class="flex gap-4">
            <div class="flex-1">
              <label class="block mb-1 text-sm">Full Name</label>
              <input
                v-model="child.name"
                placeholder="Child's name"
                required
                class="flex-1 p-2 border rounded w-full"
              />
            </div>
            <div class="flex-1">
              <label class="block mb-1 text-sm">Date of Birth</label>
              <input
                type="date"
                v-model="child.birthDate"
                required
                class="flex-1 p-2 border rounded w-full"
              />
            </div>
            <button
              type="button"
              @click="removeChild(index)"
              v-if="children.length > 1"
              class="px-3 py-1 bg-red-500 text-white rounded"
            >
              Remove
            </button>
          </div>
        </div>
        <button
          type="button"
          @click="addChild"
          v-if="children.length < 4"
          class="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Child
        </button>
      </div>

      <div>
        <label class="block mb-2">Address</label>
        <textarea
          v-model="address"
          required
          rows="3"
          class="w-full p-2 border rounded"
        ></textarea>
      </div>

      <button type="submit" class="w-full px-4 py-2 bg-green-500 text-white rounded">
        Continue to Summary
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue';
import {useRouter} from 'vue-router';
import {useReservationStore} from '../stores/reservation';
import {addHours, addDays, parseISO, differenceInMonths, differenceInYears} from 'date-fns';
import type {Child} from '../types';

const router = useRouter();
const reservationStore = useReservationStore();

const datetime = ref('');
const children = ref<Child[]>([{name: '', birthDate: ''}]);
const address = ref('');

const minDateTime = computed(() => {
  const date = addHours(new Date(), 6);
  return date.toISOString().slice(0, 16);
});

const maxDateTime = computed(() => {
  const date = addDays(new Date(), 30);
  return date.toISOString().slice(0, 16);
});

function addChild() {
  if (children.value.length < 4) {
    children.value.push({name: '', birthDate: ''});
  }
}

function removeChild(index: number) {
  children.value.splice(index, 1);
}

function validateChildAge(birthDate: string): boolean {
  const today = new Date();
  const birth = parseISO(birthDate);
  const months = differenceInMonths(today, birth);
  const years = differenceInYears(today, birth);

  return months >= 1 && years <= 12;
}

function handleSubmit() {
  // Validate all children ages
  const validAges = children.value.every(child => validateChildAge(child.birthDate));
  if (!validAges) {
    alert('Children must be between 1 month and 12 years old');
    return;
  }

  reservationStore.setReservation({
    datetime: datetime.value,
    children: children.value,
    address: address.value,
  });

  router.push('/summary');
}
</script>
