// src/types/booking.ts
export type BookingStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled";

export interface Booking {
  id: number;
  customer_id: number;
  package_id: number;
  event_date: string; // ISO string
  status: BookingStatus;
  // optional joined fields (if backend expands)
  customer_name?: string;
  package_name?: string;
}
