import axios from "axios";
// import { apiJson, apiGet } from "../../lib/api";

const api = axios.create({
  baseURL: "http://localhost:8000", // FastAPI backend
});

api.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
