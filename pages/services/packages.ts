// frontend/services/packages.ts
import axios from "axios";
const API_URL = "http://localhost:8000/admin/packages";

export async function getPackages(token: string) {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function addPackage(token: string, pkg: any) {
  await axios.post(API_URL, pkg, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function updatePackage(token: string, id: number, pkg: any) {
  await axios.put(`${API_URL}/${id}`, pkg, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function deletePackage(token: string, id: number) {
  await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
