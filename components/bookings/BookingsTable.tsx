"use client";
import React from "react";
import { Booking } from "@/src/types/booking";

type Props = {
  bookings: Booking[];
  onRefresh: () => void;
  onChangeStatus: (id: number, status: string) => Promise<void>;
  onOpen: (id: number) => void;
};

export default function BookingsTable({ bookings, onRefresh, onChangeStatus, onOpen }: Props) {
  return (
    <div className="overflow-auto bg-white rounded shadow">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">ID</th>
            <th className="p-2 text-left">Customer</th>
            <th className="p-2 text-left">Package</th>
            <th className="p-2 text-left">Date</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length === 0 && (
            <tr><td colSpan={6} className="p-4 text-center">No bookings found</td></tr>
          )}
          {bookings.map((b) => (
            <tr key={b.id} className="border-t">
              <td className="p-2">{b.id}</td>
              <td className="p-2">{b.customer_name ?? b.customer_id}</td>
              <td className="p-2">{b.package_name ?? b.package_id}</td>
              <td className="p-2">{new Date(b.event_date).toLocaleString()}</td>
              <td className="p-2">{b.status}</td>
              <td className="p-2 space-x-2">
                <button onClick={() => onOpen(b.id)} className="px-2 py-1 border rounded text-sm">Open</button>
                {["Pending", "Confirmed", "Completed", "Cancelled"].map((st) => (
                  <button
                    key={st}
                    onClick={() => onChangeStatus(b.id, st)}
                    className="px-2 py-1 text-sm border rounded"
                  >
                    {st}
                  </button>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
