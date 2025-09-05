"use client";
import { useEffect, useState } from "react";
import { getPackages, addPackage, deletePackage, updatePackage } from "@/lib/api";

export default function PackageManager({ token }: { token: string }) {
  const [packages, setPackages] = useState<any[]>([]);
  const [form, setForm] = useState({ name: "", description: "", price: "" });
  const [editing, setEditing] = useState<number | null>(null);

  const fetchPackages = async () => {
    try {
      const data = await getPackages(token);
      setPackages(data);
    } catch (err) {
      console.error("Fetch error", err);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (editing) {
        await updatePackage(token, editing, {
          ...form,
          price: parseInt(form.price),
        });
        setEditing(null);
      } else {
        await addPackage(token, { ...form, price: parseInt(form.price) });
      }
      setForm({ name: "", description: "", price: "" });
      fetchPackages();
    } catch (err) {
      console.error("Submit error", err);
    }
  };

  const handleEdit = (pkg: any) => {
    setForm({
      name: pkg.name,
      description: pkg.description,
      price: pkg.price.toString(),
    });
    setEditing(pkg.id);
  };

  const handleDelete = async (id: number) => {
    await deletePackage(token, id);
    fetchPackages();
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Package Manager</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {editing ? "Update" : "Add"} Package
        </button>
      </form>

      {/* List */}
      <div className="space-y-2">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="p-3 border rounded flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">{pkg.name}</h2>
              <p>{pkg.description}</p>
              <span className="text-sm text-gray-600">₹{pkg.price}</span>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(pkg)}
                className="px-3 py-1 bg-yellow-500 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(pkg.id)}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
