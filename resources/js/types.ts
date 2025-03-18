export interface Child {
  name: string;
  birthDate: string;
}

export interface Reservation {
  datetime: string;
  children: Child[];
  address: string;
  bookingNo?: string;
}
