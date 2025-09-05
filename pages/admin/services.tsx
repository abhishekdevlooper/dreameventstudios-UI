import { useEffect, useState } from "react";
import api from "../../utils/api";
import AdminLayout from "../../components/AdminLayout";

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);

  const fetchData = async () => {
    const res = await api.get("api/services/");
    setServices(res.data);
  };

  const deleteSvc = async (id: number) => {
    await api.delete(`/services/${id}`);
    fetchData();
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <AdminLayout>
      <h1 className="text-2xl mb-4">Manage Services</h1>
      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200">
            <th>ID</th>
            <th>Title</th>
            <th>Slug</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {services.map((svc) => (
            <tr key={svc.id} className="border-t">
              <td>{svc.id}</td>
              <td>{svc.title}</td>
              <td>{svc.slug}</td>
              <td>
                <button onClick={() => deleteSvc(svc.id)} className="text-red-600">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}
