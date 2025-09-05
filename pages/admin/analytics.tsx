"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../components/AdminLayout";
import toast, { Toaster } from "react-hot-toast";
import { getSession } from "next-auth/react";

export default function AdminDashboard() {
  const [conversionRate, setConversionRate] = useState<any>({});
  const [bookingsByEvent, setBookingsByEvent] = useState<any>({});
  const [revenueSummary, setRevenueSummary] = useState<any>({});
  const [alerts, setAlerts] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const baseURL = "http://127.0.0.1:8000";

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    const newAlerts: string[] = [];

    // Conversion Rate
    try {
      const res = await axios.get(`${baseURL}/analytics/leads/conversion_rate`);
      setConversionRate(res.data);
      if ((res.data.conversion_rate || 0) < 20) newAlerts.push("Conversion rate below 20%");
    } catch (err: any) {
      console.error("Conversion API failed:", err.response?.status);
      toast.error("Failed to load conversion rate");
    }

    // Bookings by Event
    try {
      const res = await axios.get(`${baseURL}/analytics/bookings/event_type_counts`);
      setBookingsByEvent(res.data);
    } catch (err: any) {
      console.error("Bookings Event API failed:", err.response?.status);
      toast.error("Failed to load bookings by event");
    }

    // Revenue Summary
    try {
      const res = await axios.get(`${baseURL}/analytics/bookings/revenue_summary`);
      setRevenueSummary(res.data);
      if ((res.data.total || 0) < 5000) newAlerts.push("Revenue below target");
    } catch (err: any) {
      console.error("Revenue API failed:", err.response?.status);
      toast.error("Failed to load revenue summary");
    }

    setAlerts(newAlerts);
    setLoading(false);
  };

  return (
    <AdminLayout>
      <Toaster position="top-right" />
      <div className="p-6 space-y-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

        {/* Quick Summary Cards */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-6 bg-gradient-to-r from-purple-500 to-violet-700 text-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 text-center">
              <p className="text-sm uppercase font-medium">Total Leads</p>
              <span className="font-bold text-2xl mt-2 block">{conversionRate.total_leads || 0}</span>
            </div>
            <div className="p-6 bg-gradient-to-r from-purple-500 to-violet-700 text-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 text-center">
              <p className="text-sm uppercase font-medium">Converted</p>
              <span className="font-bold text-2xl mt-2 block">{conversionRate.converted || 0}</span>
            </div>
            <div className="p-6 bg-gradient-to-r from-purple-500 to-violet-700 text-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 text-center">
              <p className="text-sm uppercase font-medium">Bookings</p>
              <span className="font-bold text-2xl mt-2 block">
                {Object.values(bookingsByEvent).reduce((a, b) => Number(a) + Number(b), 0)}
              </span>
            </div>
            <div className="p-6 bg-gradient-to-r from-purple-500 to-violet-700 text-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 text-center">
              <p className="text-sm uppercase font-medium">Revenue</p>
              <span className="font-bold text-2xl mt-2 block">${revenueSummary.total || 0}</span>
            </div>
          </div>
        )}

        {/* Alerts */}
        {alerts.length > 0 && (
          <div className="space-y-3 mt-6">
            {alerts.map((alert, idx) => (
              <div
                key={idx}
                className="p-4 bg-gradient-to-r from-red-400 to-red-600 text-white font-medium rounded-lg shadow-md"
              >
                {alert}
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  if (!session) return { redirect: { destination: "admin/login", permanent: false } };
  return { props: {} };
}
