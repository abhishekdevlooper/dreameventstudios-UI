"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../components/AdminLayout";
import { getSession } from "next-auth/react";
import LeadsTable, { Lead } from "../../components/LeadsTable";
export type LeadStatus = "New" | "Contacted" | "Converted" | "Lost";


type Lead = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  event_type?: string;
  budget?: string;
  preferred_date?: string;
  status: LeadStatus;
  assigned_to?: string;
  created_at: string;
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<Lead>({
    id: 0,
    name: "",
    email: "",
    phone: "",
    event_type: "",
    budget: "",
    preferred_date: "",
    status: "New",
    assigned_to: "",
    created_at: new Date().toISOString(),
  });

  const [filters, setFilters] = useState({
    name: "",
    email: "",
    phone: "",
    event_type: "",
    status: "",
    assigned_to: "",
    fromDate: "",
    toDate: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchLeads = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/leads/");
      setLeads(res.data.items || res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      preferred_date: form.preferred_date ? new Date(form.preferred_date).toISOString() : undefined,
      status: form.status.toLowerCase(),
    };
    try {
      if (isEditing) {
        await axios.put(`http://127.0.0.1:8000/api/leads/${form.id}/`, payload);
      } else {
        await axios.post("http://127.0.0.1:8000/api/leads/", payload);
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
        assigned_to: "",
        created_at: new Date().toISOString(),
      });
      fetchLeads();
    } catch (err) {
      console.error(err);
    }
  };

  const editLead = (lead: Lead) => {
    setForm(lead);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const deleteLead = async (id: number) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/leads/${id}/`);
      fetchLeads();
    } catch (err) {
      console.error(err);
    }
  };

  const clearFilters = () => {
    setFilters({
      name: "",
      email: "",
      phone: "",
      event_type: "",
      status: "",
      assigned_to: "",
      fromDate: "",
      toDate: "",
    });
  };

  const filteredLeads = leads.filter((l) => {
    return (
      (!filters.name || l.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (!filters.email || l.email.toLowerCase().includes(filters.email.toLowerCase())) &&
      (!filters.phone || (l.phone && l.phone.includes(filters.phone))) &&
      (!filters.event_type || (l.event_type && l.event_type.toLowerCase().includes(filters.event_type.toLowerCase()))) &&
      (!filters.status || l.status === filters.status) &&
      (!filters.assigned_to || (l.assigned_to && l.assigned_to.toLowerCase().includes(filters.assigned_to.toLowerCase()))) &&
      (!filters.fromDate || new Date(l.preferred_date || "") >= new Date(filters.fromDate)) &&
      (!filters.toDate || new Date(l.preferred_date || "") <= new Date(filters.toDate))
    );
  });

  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage);
  const paginatedLeads = filteredLeads.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <AdminLayout sidebarOpen={sidebarOpen}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">
          Manage Leads
        </h1>

        <div className="flex gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="px-4 py-2 border rounded-lg"
          >
            {sidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
          </button>

          <button
            onClick={() => { setIsModalOpen(true); setIsEditing(false); }}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded-xl shadow-lg hover:scale-105 transition"
          >
            + Add Lead
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
        <input
          type="text"
          placeholder="Assigned To"
          value={filters.assigned_to}
          onChange={(e) => setFilters({ ...filters, assigned_to: e.target.value })}
          className="p-2 border rounded-lg"
        />
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="p-2 border rounded-lg"
        >
          <option value="">All Status</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Converted">Converted</option>
          <option value="Lost">Lost</option>
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
      <LeadsTable
  leads={paginatedLeads}
  onEdit={editLead}
  onDelete={deleteLead}
  refresh={fetchLeads}
/>



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
              {isEditing ? "Edit Lead" : "Add Lead"}
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
                value={form.preferred_date?.split("T")[0] || ""}
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
                <option value="Contacted">Contacted</option>
                <option value="Converted">Converted</option>
                <option value="Lost">Lost</option>
              </select>
              <input
                type="text"
                name="assigned_to"
                value={form.assigned_to}
                onChange={handleChange}
                placeholder="Assigned To"
                className="w-full p-2 border rounded-lg"
              />

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => { setIsModalOpen(false); setIsEditing(false); }}
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
        destination: "/admin/login/",
        permanent: false,
      },
    };
  }

  return { props: {} };
}
