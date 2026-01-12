import axios from "axios";
import { toast } from "react-toastify";


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
// Add JWT token if available
// ===============================
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token") || localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    toast.error("Request error! Please try again.");
    return Promise.reject(error);
  }
);

// ===============================
// Response Interceptor
// Global error handling with toast
// ===============================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      const message =
        error.response.data?.message ||
        error.response.data?.error ||
        "Something went wrong!";

      if (status === 401) {
        toast.error("Unauthorized! Please login again.");
        console.error("Unauthorized! Redirect to login.");
      } else if (status === 403) {
        toast.error("Forbidden! You don't have permission.");
        console.error("Forbidden! No permission.");
      } else {
        toast.error(message);
      }
    } else {
      // network error
      toast.error("Network error! Please check your connection.");
    }

    return Promise.reject(error);
  }
);

export default api;
