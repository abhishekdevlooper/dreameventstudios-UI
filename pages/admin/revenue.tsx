"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import AdminLayout from "../../components/AdminLayout";
import { getSession } from "next-auth/react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

export default function RevenuePage() {
  const [summary, setSummary] = useState<any>({});
  const searchParams = useSearchParams();
  const fromDashboard = searchParams.get("from") === "dashboard";

  useEffect(() => {
    fetchRevenue();
  }, []);

  const fetchRevenue = async () => {
    const baseURL = "http://127.0.0.1:8000";
    let url = `${baseURL}/analytics/bookings/revenue_summary`;

    if (fromDashboard) {
      url += "?filter=current_year";
    }

    const res = await axios.get(url);

    // 🔹 Normalize keys (capitalize first letter, merge duplicates)
    const normalized: any = {};
    for (const [key, value] of Object.entries(res.data)) {
      const formattedKey =
        key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
      normalized[formattedKey] = (normalized[formattedKey] || 0) + Number(value);
    }

    setSummary(normalized);
  };

  const sortedSummary = Object.entries(summary).sort(
    (a: any, b: any) => b[1] - a[1]
  );

  const totalRevenue = sortedSummary.reduce((acc, [, val]: any) => acc + val, 0);

  // 🎨 Chart data
  const chartLabels = sortedSummary.map(([category]) => category);
  const chartValues = sortedSummary.map(([, value]) => value);

  const colors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#8DD17E",
  ];

  const pieData = {
    labels: chartLabels,
    datasets: [
      {
        data: chartValues,
        backgroundColor: colors,
        borderWidth: 2,
      },
    ],
  };

  const barData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Revenue (₹)",
        data: chartValues,
        backgroundColor: colors,
      },
    ],
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-violet-600 text-transparent bg-clip-text">
          Revenue Dashboard
        </h1>
        {fromDashboard && (
          <p className="text-sm text-gray-600 mt-1">
            Showing current year revenue summary (from dashboard quick link)
          </p>
        )}

        {/* Single Section with Gradient Background */}
        <div className="mt-6 p-6 rounded-2xl shadow-lg bg-gradient-to-r from-purple-50 to-violet-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Revenue List */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-violet-700">
                Category-wise Revenue
              </h2>
              <ul className="space-y-3">
                {sortedSummary.map(([category, value]: any) => (
                  <li
                    key={category}
                    className="p-3 rounded-lg shadow bg-white flex justify-between items-center hover:scale-[1.02] transition-transform"
                  >
                    <span className="font-medium">{category}</span>
                    <span className="font-bold text-violet-700">
                      ₹{value.toLocaleString("en-IN")}
                    </span>
                  </li>
                ))}
                <li className="p-3 rounded-lg shadow bg-gradient-to-r from-violet-500 to-purple-600 text-white flex justify-between items-center">
                  <span className="font-medium">Total</span>
                  <span className="font-bold">
                    ₹{totalRevenue.toLocaleString("en-IN")}
                  </span>
                </li>
              </ul>
            </div>

            {/* Charts */}
            <div className="flex flex-col gap-6">
              <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-md font-semibold mb-2">Revenue Split (Pie)</h2>
                <Pie data={pieData} />
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-md font-semibold mb-2">Revenue by Category (Bar)</h2>
                <Bar data={barData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/admin/login/", // redirect to login if not authenticated
        permanent: false,
      },
    };
  }

  return { props: {} };
}