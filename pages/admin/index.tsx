"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../components/AdminLayout";
import { Bar, Line, Pie } from "react-chartjs-2"; // ✅ replaced Doughnut with Pie
import toast, { Toaster } from "react-hot-toast";
import { getSession } from "next-auth/react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title
);

export default function AdminAnalytics() {
  const [leadStatus, setLeadStatus] = useState<Record<string, number>>({});
  const [conversionRate, setConversionRate] = useState<any>({});
  const [bookingsByEvent, setBookingsByEvent] = useState<Record<string, number>>({});
  const [revenueSummary, setRevenueSummary] = useState<Record<string, number>>({});
  const [leadsTrends, setLeadsTrends] = useState<any[]>([]);
  const [bookingsTrends, setBookingsTrends] = useState<any[]>([]);
  const [totals, setTotals] = useState({
    totalLeads: 0,
    totalBookings: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  // 🔹 Normalization helper
  const cleanLabel = (label: string | null | undefined) => {
    if (!label || label.trim() === "") return "Unknown";
    return label.trim().toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const normalizeKeys = (data: Record<string, number>) => {
    const normalized: Record<string, number> = {};
    for (const [key, value] of Object.entries(data)) {
      const cleanKey = cleanLabel(key);
      normalized[cleanKey] = (normalized[cleanKey] || 0) + Number(value || 0);
    }
    return normalized;
  };

  const fetchAnalytics = async () => {
    try {
      const baseURL = "http://127.0.0.1:8000";
      const [
        statusRes,
        conversionRes,
        bookingsRes,
        revenueRes,
        leadsTrendRes,
        bookingsTrendRes,
      ] = await Promise.all([
        axios.get(`${baseURL}/analytics/leads/status_counts`),
        axios.get(`${baseURL}/analytics/leads/conversion_rate`),
        axios.get(`${baseURL}/analytics/bookings/event_type_counts`),
        axios.get(`${baseURL}/analytics/bookings/revenue_summary`),
        axios.get(`${baseURL}/analytics/leads/trends`),
        axios.get(`${baseURL}/analytics/bookings/trends`),
      ]);

      setLeadStatus(normalizeKeys(statusRes.data || {}));
      setConversionRate(conversionRes.data || {});
      setBookingsByEvent(normalizeKeys(bookingsRes.data || {}));
      setRevenueSummary(normalizeKeys(revenueRes.data || {}));
      setLeadsTrends(leadsTrendRes.data || []);
      setBookingsTrends(bookingsTrendRes.data || []);

      const totalLeads = conversionRes.data?.total_leads || 0;
      const totalBookings = Object.values(bookingsRes.data || {}).reduce(
        (acc: number, val: any) => acc + Number(val || 0),
        0
      );
      const totalRevenue = Object.values(revenueRes.data || {}).reduce(
        (acc: number, val: any) => acc + Number(val || 0),
        0
      );

      setTotals({ totalLeads, totalBookings, totalRevenue });
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to fetch analytics: " + err.message);
    }
  };

  // ✅ Chart Data configs
  const leadStatusData = {
    labels: Object.keys(leadStatus),
    datasets: [
      {
        data: Object.values(leadStatus).map(Number),
        backgroundColor: ["#4ade80", "#facc15", "#3b82f6", "#ef4444", "#a78bfa"],
      },
    ],
  };

  const bookingsEventData = {
    labels: Object.keys(bookingsByEvent),
    datasets: [
      {
        label: "Bookings",
        data: Object.values(bookingsByEvent).map(Number),
        backgroundColor: ["#3b82f6", "#fbbf24", "#10b981", "#f87171", "#8b5cf6"],
      },
    ],
  };

  const revenueData = {
    labels: Object.keys(revenueSummary),
    datasets: [
      {
        data: Object.values(revenueSummary).map(Number),
        backgroundColor: ["#facc15", "#4ade80", "#3b82f6", "#ef4444", "#a78bfa"],
      },
    ],
  };

  const leadsTrendData = {
    labels: leadsTrends.map((d: any) => `Month ${d.month}`),
    datasets: [
      {
        label: "Leads",
        data: leadsTrends.map((d: any) => Number(d.leads)),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const bookingsTrendData = {
    labels: bookingsTrends.map((d: any) => `Month ${d.month}`),
    datasets: [
      {
        label: "Bookings",
        data: bookingsTrends.map((d: any) => Number(d.bookings)),
        borderColor: "#10b981",
        backgroundColor: "rgba(16,185,129,0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const conversionRateData = {
    labels: ["Converted", "Remaining"],
    datasets: [
      {
        data: [
          conversionRate.conversion_rate || 0,
          100 - (conversionRate.conversion_rate || 0),
        ],
        backgroundColor: ["#10b981", "#e5e7eb"],
        borderWidth: 0,
      },
    ],
  };

  // ✅ Shared Pie Options
  const pieOptions = (isRevenue = false) => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 15,
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (ctx: any) {
            const dataset = ctx.dataset;
            const value = dataset.data[ctx.dataIndex];
            const total = dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            if (isRevenue) {
              return `${ctx.label}: ₹${Number(value).toLocaleString()} (${percentage}%)`;
            }
            return `${ctx.label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  });

  return (
    <AdminLayout>
      <Toaster position="top-right" />
      <div className="p-6 space-y-8">
        <h1 className="text-2xl font-bold">Admin Analytics Dashboard</h1>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-blue-100 rounded-2xl shadow text-center">
            <h2 className="text-lg font-semibold text-blue-800">Total Leads</h2>
            <p className="text-2xl font-bold">{totals.totalLeads}</p>
          </div>
          <div className="p-4 bg-green-100 rounded-2xl shadow text-center">
            <h2 className="text-lg font-semibold text-green-800">Total Bookings</h2>
            <p className="text-2xl font-bold">{totals.totalBookings}</p>
          </div>
          <div className="p-4 bg-yellow-100 rounded-2xl shadow text-center">
            <h2 className="text-lg font-semibold text-yellow-800">Total Revenue</h2>
            <p className="text-2xl font-bold">₹{totals.totalRevenue.toLocaleString()}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Lead Status Pie */}
          <div className="p-4 rounded-2xl shadow bg-white">
            <h2 className="font-semibold mb-2">Lead Status</h2>
            <div className="relative h-[400px] w-[400px] mx-auto">
              <Pie data={leadStatusData} options={pieOptions()} />
            </div>
          </div>

          {/* Conversion Rate Pie */}
          <div className="p-4 rounded-2xl shadow bg-white">
            <h2 className="font-semibold mb-2">Conversion Rate</h2>
            <div className="relative h-[400px] w-[400px] mx-auto">
              <Pie data={conversionRateData} options={pieOptions()} />
            </div>
          </div>

          {/* Bookings by Event */}
          <div className="p-4 rounded-2xl shadow bg-white">
            <h2 className="font-semibold mb-2">Bookings by Event</h2>
            <Bar data={bookingsEventData} />
          </div>

          {/* Revenue Pie */}
          <div className="p-4 rounded-2xl shadow bg-white">
            <h2 className="font-semibold mb-2">Revenue Summary</h2>
            <div className="relative h-[400px] w-[400px] mx-auto">
              <Pie data={revenueData} options={pieOptions(true)} />
            </div>
          </div>

          {/* Leads Trends */}
          <div className="p-4 rounded-2xl shadow bg-white">
            <h2 className="font-semibold mb-2">Leads Trends</h2>
            <Line data={leadsTrendData} />
          </div>

          {/* Bookings Trends */}
          <div className="p-4 rounded-2xl shadow bg-white">
            <h2 className="font-semibold mb-2">Bookings Trends</h2>
            <Line data={bookingsTrendData} />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  if (!session) {
    return { redirect: { destination: "/login", permanent: false } };
  }
  return { props: {} };
}
