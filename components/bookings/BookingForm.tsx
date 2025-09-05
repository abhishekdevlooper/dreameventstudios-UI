"use client";
import React, { useState, useEffect } from "react";
import { apiJson, apiGet } from "@/src/lib/api";
import { Booking } from "@/src/types/booking";

type Props = {
  initial?: Partial<Booking>;
  onSaved: () => void;
};

export default function BookingForm({ initial = {}, onSaved }: Props) {
  const [form, setForm] = useState({
    customer_id: initial.customer_id ?? "",
    package_id: initial.package_id ?? "",
    event_date: initial.event_date ? initial.event_date.slice(0, 16) : "", // for datetime-local
    status: initial.status ?? "Pending",
  });
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState<any[]>([]);
  const [packages, setPackages] = useState<any[]>([]);

  useEffect(() => {
    // fetch minimal lists for selects
    apiGet("/leads/?limit=100").then((r) => setLeads(r.items ?? r)); // adapt to your endpoint
    apiGet("/packages/?limit=100").then((r) => setPackages(r.items ?? r));
  }, []);

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        event_date: new Date(form.event_date).toISOString(),
        customer_id: Number(form.customer_id),
        package_id: Number(form.package_id),
      };
      if ((initial as any).id) {
        await apiJson(`/bookings/${(initial as any).id}`, "PUT", { status: payload.status });
      } else {
        await apiJson("/bookings/", "POST", payload);
      }
      onSaved();
    } catch (err) {
      alert(String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4 p-4 border rounded bg-white">
      <div>
        <label className="block text-sm">Customer</label>
        <select name="customer_id" value={form.customer_id} onChange={change} required className="w-full p-2 border rounded">
          <option value="">Select customer</option>
          {leads.map((l: any) => <option key={l.id} value={l.id}>{l.name ?? l.email ?? `Lead ${l.id}`}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-sm">Package</label>
        <select name="package_id" value={form.package_id} onChange={change} required className="w-full p-2 border rounded">
          <option value="">Select package</option>
          {packages.map((p: any) => <option key={p.id} value={p.id}>{p.name ?? `Package ${p.id}`}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-sm">Event date & time</label>
        <input name="event_date" type="datetime-local" value={form.event_date} onChange={change} required className="w-full p-2 border rounded" />
      </div>

      <div>
        <label className="block text-sm">Status</label>
        <select name="status" value={form.status} onChange={change} className="w-full p-2 border rounded">
          <option>Pending</option>
          <option>Confirmed</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>
      </div>

      <div className="flex gap-2">
        <button type="submit" disabled={loading} className="px-4 py-2 bg-purple-600 text-white rounded">
          {loading ? "Saving..." : "Save Booking"}
        </button>
      </div>
    </form>
  );
}
