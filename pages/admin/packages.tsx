"use client";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import AdminLayout from "../../components/AdminLayout";
import { getSession } from "next-auth/react";

export default function PackagesPage() {
  const [packages, setPackages] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    id: null,
    slug: "",
    name: "",
    description: "",
    price: "",
    category: "",
    popular: false,
    is_active: true,
    image_urls: [] as string[],
    inclusions: [] as string[],
    general_info: "",
    reviews: [] as string[],
    image_input: "", // for single URL input
  });

  const fetchData = async () => {
    const res = await api.get("/api/packages/");
    setPackages(res.data);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const addImageUrl = () => {
    if (form.image_input.trim() === "") return;
    setForm({
      ...form,
      image_urls: [...form.image_urls, form.image_input],
      image_input: "",
    });
  };

  const removeImageField = (index: number) => {
    const newImages = form.image_urls.filter((_, i) => i !== index);
    setForm({ ...form, image_urls: newImages });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Send arrays as arrays, no JSON.stringify
      const payload = {
        ...form,
        image_urls: form.image_urls,
        inclusions: form.inclusions,
        reviews: form.reviews,
      };

      if (isEditing && form.id) {
        await api.put(`/api/packages/${form.id}`, payload);
      } else {
        await api.post("/api/packages/", payload);
      }

      setIsModalOpen(false);
      setForm({
        id: null,
        slug: "",
        name: "",
        description: "",
        price: "",
        category: "",
        popular: false,
        is_active: true,
        image_urls: [],
        inclusions: [],
        general_info: "",
        reviews: [],
        image_input: "",
      });
      setIsEditing(false);
      fetchData();
    } catch (err) {
      console.error("Error saving package:", err);
    }
  };

  const deletePkg = async (id: number) => {
    await api.delete(`/api/packages/${id}`);
    fetchData();
  };

  const editPkg = (pkg: any) => {
    setForm({
      ...pkg,
      image_input: "", // reset temporary input
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">
          Manage Packages
        </h1>
        <button
          onClick={() => {
            setIsModalOpen(true);
            setIsEditing(false);
          }}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded-xl shadow-lg hover:scale-105 transition"
        >
          + Add Package
        </button>
      </div>

      {/* Table */}
      <table className="w-full bg-white shadow-lg rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white">
            <th className="p-3">ID</th>
            <th className="p-3">Name</th>
            <th className="p-3">Category</th>
            <th className="p-3">Price</th>
            <th className="p-3">Active</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((pkg) => (
            <tr key={pkg.id} className="border-t hover:bg-gray-100">
              <td className="p-3">{pkg.id}</td>
              <td className="p-3">{pkg.name}</td>
              <td className="p-3">{pkg.category}</td>
              <td className="p-3">₹{pkg.price}</td>
              <td className="p-3">{pkg.is_active ? "✅" : "❌"}</td>
              <td className="p-3 flex gap-3">
                <button
                  onClick={() => editPkg(pkg)}
                  className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deletePkg(pkg.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-96 rounded-2xl shadow-xl p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">
              {isEditing ? "Edit Package" : "Add Package"}
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
                type="text"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                placeholder="Slug"
                className="w-full p-2 border rounded-lg"
                required
              />
              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Category"
                className="w-full p-2 border rounded-lg"
                required
              />
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Price"
                className="w-full p-2 border rounded-lg"
                required
              />
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full p-2 border rounded-lg"
              />
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="popular"
                  checked={form.popular}
                  onChange={handleChange}
                />
                Popular
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="is_active"
                  checked={form.is_active}
                  onChange={handleChange}
                />
                Active
              </label>

              {/* Image URL input */}
              <div>
                <label className="font-medium">Add Image URL</label>
                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    value={form.image_input}
                    onChange={(e) =>
                      setForm({ ...form, image_input: e.target.value })
                    }
                    placeholder="Enter image URL"
                    className="w-full p-2 border rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={addImageUrl}
                    className="px-3 py-2 bg-blue-500 text-white rounded-lg"
                  >
                    Add
                  </button>
                </div>
                {form.image_urls.map((url, idx) => (
                  <div key={idx} className="flex gap-2 items-center my-2">
                    <span className="truncate">{url}</span>
                    <button
                      type="button"
                      onClick={() => removeImageField(idx)}
                      className="px-2 py-1 bg-red-500 text-white rounded-lg"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setForm({
                      id: null,
                      slug: "",
                      name: "",
                      description: "",
                      price: "",
                      category: "",
                      popular: false,
                      is_active: true,
                      image_urls: [],
                      inclusions: [],
                      general_info: "",
                      reviews: [],
                      image_input: "",
                    });
                    setIsEditing(false);
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
        destination: "/admin/login/", // redirect to login if not authenticated
        permanent: false,
      },
    };
  }

  return { props: {} };
}

