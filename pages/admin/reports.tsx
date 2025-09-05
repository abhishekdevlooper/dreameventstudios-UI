// pages/admin/reports.tsx
import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import { getSession } from "next-auth/react";

type Package = {
  id: number;
  name: string;
  category: string;
  price: string;
  popular: boolean;
  is_active: boolean;
  updated_at?: string;
};

export default function Reports() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPackages() {
      try {
        const res = await fetch("http://localhost:8000/api/packages");
        const data = await res.json();
        setPackages(data);
      } catch (err) {
        console.error("Error fetching packages:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPackages();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <p className="text-center text-lg text-gray-600">Loading Reports...</p>
      </AdminLayout>
    );
  }

  // Report stats
  const totalPackages = packages.length;
  const activePackages = packages.filter((p) => p.is_active).length;
  const popularPackages = packages.filter((p) => p.popular).length;
  const estimatedRevenue = packages
    .map((p) => parseFloat(p.price || "0"))
    .reduce((a, b) => a + b, 0);

  // Export to CSV
  const handleExportCSV = () => {
    const header = "ID,Name,Category,Price,Active,Popular\n";
    const rows = packages
      .map(
        (p) =>
          `${p.id},"${p.name}","${p.category}",${p.price},${p.is_active},${p.popular}`
      )
      .join("\n");

    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "packages_report.csv";
    a.click();
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-extrabold mb-6 bg-gradient-to-r from-indigo-500 to-blue-500 text-transparent bg-clip-text">
        Reports
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 rounded-2xl shadow text-white">
          <h2 className="text-xl font-semibold">📦 Total Packages</h2>
          <p className="text-3xl font-bold mt-2">{totalPackages}</p>
        </div>
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 rounded-2xl shadow text-white">
          <h2 className="text-xl font-semibold">✅ Active</h2>
          <p className="text-3xl font-bold mt-2">{activePackages}</p>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-6 rounded-2xl shadow text-white">
          <h2 className="text-xl font-semibold">⭐ Popular</h2>
          <p className="text-3xl font-bold mt-2">{popularPackages}</p>
        </div>
        <div className="bg-gradient-to-r from-pink-600 to-red-600 p-6 rounded-2xl shadow text-white">
          <h2 className="text-xl font-semibold">💰 Revenue (Est)</h2>
          <p className="text-3xl font-bold mt-2">₹{estimatedRevenue}</p>
        </div>
      </div>

      {/* Export & Recent Activity */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">📊 Recent Activity</h2>
          <button
            onClick={handleExportCSV}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            ⬇ Export CSV
          </button>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3">Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Active</th>
              <th className="p-3">Popular</th>
              <th className="p-3">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {packages.slice(0, 10).map((pkg) => (
              <tr key={pkg.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">{pkg.name}</td>
                <td className="p-3">{pkg.category || "—"}</td>
                <td className="p-3">₹{pkg.price}</td>
                <td className="p-3">{pkg.is_active ? "✅" : "❌"}</td>
                <td className="p-3">{pkg.popular ? "⭐" : "—"}</td>
                <td className="p-3">{pkg.updated_at || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
// Protect page with server-side auth
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