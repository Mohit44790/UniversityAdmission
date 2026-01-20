import axios from "axios";
import { toast } from "react-toastify";
import { getSessionData, removeSessionData } from "../../utils/helpers";

const api = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10000,
});

// ===============================
// Request Interceptor
// ===============================
api.interceptors.request.use(
  (config) => {
    const token = getSessionData("token"); // ✅ ONLY this

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
      const { status, data } = error.response;

      if (status === 401) {
        toast.error("Session expired. Please login again.");
        removeSessionData("token");
        removeSessionData("user");
      } else if (status === 403) {
        toast.error("Access denied.");
      } else {
        toast.error(data?.message || "Something went wrong!");
      }
    } else {
      toast.error("Network error. Please check your connection.");
    }

    return Promise.reject(error);
  }
);

export default api;
