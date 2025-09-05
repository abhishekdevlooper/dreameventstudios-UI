"use client";

import { useState } from "react";
import Papa from "papaparse";
import { saveAs } from "file-saver";

export type LeadStatus = "New" | "Contacted" | "Converted" | "Lost";

export type Lead = {
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

type Props = {
  leads: Lead[];
  onEdit: (lead: Lead) => void;
  onDelete: (id: number) => void;
  refresh: () => void;
};

export default function LeadsTable({ leads, onEdit, onDelete, refresh }: Props) {
  const [sortConfig, setSortConfig] = useState<{ key: keyof Lead; direction: "asc" | "desc" } | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // Sorting
  const handleSort = (key: keyof Lead) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedLeads = [...leads].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;

    let aVal = a[key];
    let bVal = b[key];

    // Numeric sorting for ID
    if (key === "id") {
      return direction === "asc" ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
    }

    // Date sorting
    if (key === "preferred_date" || key === "created_at") {
      const aTime = aVal ? new Date(aVal as string).getTime() : 0;
      const bTime = bVal ? new Date(bVal as string).getTime() : 0;
      return direction === "asc" ? aTime - bTime : bTime - aTime;
    }

    // String sorting
    return direction === "asc"
      ? String(aVal || "").localeCompare(String(bVal || ""), undefined, { sensitivity: "base" })
      : String(bVal || "").localeCompare(String(aVal || ""), undefined, { sensitivity: "base" });
  });

  // Bulk selection
  const toggleSelectAll = () => {
    if (selectedIds.length === sortedLeads.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(sortedLeads.map((l) => l.id));
    }
  };

  const toggleSelectOne = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Export CSV
  const exportCSV = (selectedOnly = false) => {
    const data = selectedOnly
      ? sortedLeads.filter((l) => selectedIds.includes(l.id))
      : sortedLeads;

    if (!data.length) return;

    const csv = Papa.unparse(data, { header: true, skipEmptyLines: true });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, selectedOnly ? "selected_leads.csv" : "all_leads.csv");
  };

  // Delete selected
  const deleteSelected = async () => {
    if (selectedIds.length < 2) return;
    if (!confirm("Delete selected leads?")) return;

    await Promise.all(selectedIds.map((id) => onDelete(id)));
    setSelectedIds([]);
    refresh();
  };

  return (
    <div>
      {/* Bulk Actions */}
      <div className="flex gap-3 mb-3">
        <button
          onClick={() => exportCSV(false)}
          className="px-3 py-2 bg-green-500 text-white rounded-lg"
        >
          Export All
        </button>
        <button
          onClick={() => exportCSV(true)}
          disabled={selectedIds.length < 2}
          className={`px-3 py-2 rounded-lg text-white ${
            selectedIds.length < 2
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          Export Selected
        </button>
        <button
          onClick={deleteSelected}
          disabled={selectedIds.length < 2}
          className={`px-3 py-2 rounded-lg text-white ${
            selectedIds.length < 2
              ? "bg-red-300 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600"
          }`}
        >
          Delete Selected
        </button>
      </div>

      <table className="w-full bg-white shadow-lg rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white">
            <th className="p-3">
              <input
                type="checkbox"
                checked={selectedIds.length === sortedLeads.length && sortedLeads.length > 0}
                onChange={toggleSelectAll}
              />
            </th>
            {["id","name","email","phone","event_type","budget","preferred_date","status","assigned_to"].map((col) => (
              <th
                key={col}
                className="p-3 cursor-pointer select-none"
                onClick={() => handleSort(col as keyof Lead)}
              >
                {col.toUpperCase()}{" "}
                {sortConfig?.key === col ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
              </th>
            ))}
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedLeads.map((lead) => (
            <tr key={lead.id} className="border-t hover:bg-gray-100">
              <td className="p-3">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(lead.id)}
                  onChange={() => toggleSelectOne(lead.id)}
                />
              </td>
              <td className="p-3">{lead.id}</td>
              <td className="p-3">{lead.name}</td>
              <td className="p-3">{lead.email}</td>
              <td className="p-3">{lead.phone || "-"}</td>
              <td className="p-3">{lead.event_type || "-"}</td>
              <td className="p-3">{lead.budget || "-"}</td>
              <td className="p-3">
                {lead.preferred_date ? new Date(lead.preferred_date).toLocaleDateString() : "-"}
              </td>
              <td className="p-3">{lead.status}</td>
              <td className="p-3">{lead.assigned_to || "-"}</td>
              <td className="p-3 flex gap-3">
                <button
                  onClick={() => onEdit(lead)}
                  className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(lead.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
