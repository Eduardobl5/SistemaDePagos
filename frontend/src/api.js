import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // URL base de tu backend
});

// Interceptor para agregar token si lo tienes (opcional)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;