"use client";

import { useEffect, useState } from "react";
import api from "../../utils/api";
import AdminLayout from "../../components/AdminLayout";
import { getSession } from "next-auth/react";

export type BookingStatus = "New" | "Confirmed" | "Cancelled";

type Booking = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  event_type?: string;
  budget?: string;
  preferred_date?: string;
  status: BookingStatus;
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [form, setForm] = useState<Booking>({
    id: 0,
    name: "",
    email: "",
    phone: "",
    event_type: "",
    budget: "",
    preferred_date: "",
    status: "New",
  });

  const [filters, setFilters] = useState({
    name: "",
    email: "",
    phone: "",
    event_type: "",
    status: "",
    fromDate: "",
    toDate: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchData = async () => {
    const res = await api.get("/api/bookings/");
    setBookings(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await api.put(`/api/bookings/${form.id}`, form);
      } else {
        await api.post("/api/bookings/", form);
      }
      setIsModalOpen(false);
      setIsEditing(false);
      setForm({
        id: 0,
        name: "",
        email: "",
        phone: "",
        event_type: "",
        budget: "",
        preferred_date: "",
        status: "New",
      });
      fetchData();
    } catch (err) {
      console.error("Error saving booking:", err);
    }
  };

  const deleteBooking = async (id: number) => {
    await api.delete(`/api/bookings/${id}`);
    fetchData();
  };

  const editBooking = (booking: Booking) => {
    setForm(booking);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const clearFilters = () => {
    setFilters({
      name: "",
      email: "",
      phone: "",
      event_type: "",
      status: "",
      fromDate: "",
      toDate: "",
    });
  };

  const filteredBookings = bookings.filter((b) => {
    return (
      (!filters.name || b.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (!filters.email || b.email.toLowerCase().includes(filters.email.toLowerCase())) &&
      (!filters.phone || (b.phone && b.phone.includes(filters.phone))) &&
      (!filters.event_type || (b.event_type && b.event_type.toLowerCase().includes(filters.event_type.toLowerCase()))) &&
      (!filters.status || b.status === filters.status) &&
      (!filters.fromDate || new Date(b.preferred_date) >= new Date(filters.fromDate)) &&
      (!filters.toDate || new Date(b.preferred_date) <= new Date(filters.toDate))
    );
  });

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <AdminLayout sidebarOpen={sidebarOpen}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">
          Manage Bookings
        </h1>

        <div className="flex gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="px-4 py-2 border rounded-lg"
          >
            {sidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
          </button>

          <button
            onClick={() => {
              setIsModalOpen(true);
              setIsEditing(false);
            }}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded-xl shadow-lg hover:scale-105 transition"
          >
            + Add Booking
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4 items-center">
        <input
          type="text"
          placeholder="Name"
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          className="p-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Email"
          value={filters.email}
          onChange={(e) => setFilters({ ...filters, email: e.target.value })}
          className="p-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Phone"
          value={filters.phone}
          onChange={(e) => setFilters({ ...filters, phone: e.target.value })}
          className="p-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Event Type"
          value={filters.event_type}
          onChange={(e) => setFilters({ ...filters, event_type: e.target.value })}
          className="p-2 border rounded-lg"
        />
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="p-2 border rounded-lg"
        >
          <option value="">All Status</option>
          <option value="New">New</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <input
          type="date"
          value={filters.fromDate}
          onChange={(e) => setFilters({ ...filters, fromDate: e.target.value })}
          className="p-2 border rounded-lg"
        />
        <input
          type="date"
          value={filters.toDate}
          onChange={(e) => setFilters({ ...filters, toDate: e.target.value })}
          className="p-2 border rounded-lg"
        />
        <button
          onClick={clearFilters}
          className="px-3 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200"
        >
          Clear Filters
        </button>
      </div>

      {/* Table */}
      <table className="w-full bg-white shadow-lg rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white">
            <th className="p-3">ID</th>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Event Type</th>
            <th className="p-3">Budget</th>
            <th className="p-3">Preferred Date</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedBookings.map((b) => (
            <tr key={b.id} className="border-t hover:bg-gray-100">
              <td className="p-3">{b.id}</td>
              <td className="p-3">{b.name}</td>
              <td className="p-3">{b.email}</td>
              <td className="p-3">{b.event_type}</td>
              <td className="p-3">{b.budget}</td>
              <td className="p-3">{b.preferred_date}</td>
              <td className="p-3">{b.status}</td>
              <td className="p-3 flex gap-3">
                <button
                  onClick={() => editBooking(b)}
                  className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteBooking(b.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded-lg ${
              page === currentPage
                ? "bg-gradient-to-r from-purple-600 to-indigo-500 text-white"
                : "border"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-96 rounded-2xl shadow-xl p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">
              {isEditing ? "Edit Booking" : "Add Booking"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full p-2 border rounded-lg"
                required
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-2 border rounded-lg"
                required
              />
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full p-2 border rounded-lg"
              />
              <input
                type="text"
                name="event_type"
                value={form.event_type}
                onChange={handleChange}
                placeholder="Event Type"
                className="w-full p-2 border rounded-lg"
              />
              <input
                type="text"
                name="budget"
                value={form.budget}
                onChange={handleChange}
                placeholder="Budget"
                className="w-full p-2 border rounded-lg"
              />
              <input
                type="date"
                name="preferred_date"
                value={form.preferred_date}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              >
                <option value="New">New</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Cancelled">Cancelled</option>
              </select>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setIsEditing(false);
                    setForm({
                      id: 0,
                      name: "",
                      email: "",
                      phone: "",
                      event_type: "",
                      budget: "",
                      preferred_date: "",
                      status: "New",
                    });
                  }}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded-lg shadow-lg hover:scale-105 transition"
                >
                  {isEditing ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "admin/login",
        permanent: false,
      },
    };
  }

  return { props: {} };
}
