import axios from "axios";

// ===============================
// Base Axios instance
// ===============================
const api = axios.create({
  baseURL: "http://localhost:8080", // backend URL
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout (good for slow networks)
});

// ===============================
// Request Interceptor
// Add JWT token if available
// ===============================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // store token in localStorage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ===============================
// Response Interceptor
// Global error handling
// ===============================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle 401, 403 globally
      if (error.response.status === 401) {
        console.error("Unauthorized! Redirect to login.");
      }
      if (error.response.status === 403) {
        console.error("Forbidden! You don't have permission.");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
