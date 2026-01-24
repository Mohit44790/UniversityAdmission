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
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // ❌ YAHAN LOGOUT NAHI KARNA
    // Sirf error forward karo
    return Promise.reject(error);
  }
);


// ===============================
// Response Interceptor
// ===============================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const token = getSessionData("token"); // 🔑 IMPORTANT

    // 🔥 INVALID SESSION (ONLY if token exists)
    if ((status === 401 || status === 403) && token) {
      toast.error("Session expired. Please login again.");

      removeSessionData("token");
      removeSessionData("user");

      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    // 🔥 SERVER DOWN (ONLY if token exists)
    else if (!error.response && token) {
      toast.error("Server down. Please login again.");

      removeSessionData("token");
      removeSessionData("user");

      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    // ❌ OTHER ERRORS
    else if (error.response) {
      toast.error(
        error.response?.data?.message || "Something went wrong!"
      );
    }

    return Promise.reject(error);
  }
);

export default api;
