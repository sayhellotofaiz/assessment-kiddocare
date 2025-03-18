import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Reservation } from '../types';

export const useReservationStore = defineStore('reservation', () => {
  const reservation = ref<Reservation>({
    datetime: '',
    children: [],
    address: '',
  });

  function setReservation(data: Reservation) {
    reservation.value = data;
  }

  function setBookingNo(bookingNo: string) {
    reservation.value.bookingNo = bookingNo;
  }

  return {
    reservation,
    setReservation,
    setBookingNo,
  };
});
