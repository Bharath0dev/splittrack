import axios from "axios";

// const api = axios.create({
//   // baseURL: "http://localhost:8000",
//   baseURL: window.location.origin,
// });

const API_BASE =
  window.location.hostname === "localhost"
    ? "http://localhost:8000"
    : window.location.origin;

const api = axios.create({
  baseURL: API_BASE,
});

// Attach JWT automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const login = (data) => api.post("/login", data);
export const register = (data) => api.post("/register", data);

export default api;