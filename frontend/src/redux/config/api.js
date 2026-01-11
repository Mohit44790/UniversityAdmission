import axios from "axios";

// ===============================
// Base Axios instance
// ===============================
const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10s timeout for slow networks
});

// ===============================
// Request Interceptor
// ===============================
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token") || localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ===============================
// Response Interceptor
// ===============================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.error("Unauthorized! Redirect to login.");
      }
      if (error.response.status === 403) {
        console.error("Forbidden! No permission.");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
