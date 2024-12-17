import axios from "axios";

export const VITE_API_URL = import.meta.env.VITE_API_URL as string;

const api = axios.create({ baseURL: VITE_API_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token ? JSON.parse(token) : ""}`;
  }
  return config;
});

export default api;
