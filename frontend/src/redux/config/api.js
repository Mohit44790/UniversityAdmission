import axios from "axios";
import { toast } from "react-toastify";
import { getSessionData, removeSessionData } from "../../utils/helpers";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

// ===============================
// Request Interceptor
// ===============================
api.interceptors.request.use(
  (config) => {
    const token = getSessionData("token");

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
    const status = error?.response?.status;

    // 🔥 SESSION INVALID (401 / 403)
    if (status === 401 || status === 403) {
      toast.error("Session expired. Please login again.");

      removeSessionData("token");
      removeSessionData("user");

      // prevent redirect loop
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    // 🔥 SERVER DOWN / NETWORK ERROR
    else if (!error.response) {
      toast.error("Server down. Please login again.");

      removeSessionData("token");
      removeSessionData("user");

      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    // ❌ OTHER ERRORS
    else {
      toast.error(
        error.response?.data?.message || "Something went wrong!"
      );
    }

    return Promise.reject(error);
  }
);

export default api;
