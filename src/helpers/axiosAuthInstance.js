import axios from "axios";
import { baseUrl } from "../config/baseURL";

// Create instance of axios
const axiosAuthInstance = axios.create({
  baseURL: baseUrl,
  timeout: 60000,
});

// Add a request interceptor: Automatically attach Bearer token if present
axiosAuthInstance.interceptors.request.use(
  async (config) => {
    try {
      const rawToken = localStorage.getItem("token");
      if (rawToken) {
        // Handle both plain string tokens and JSON stringified tokens safely
        const token =
          rawToken.startsWith('"') && rawToken.endsWith('"')
            ? JSON.parse(rawToken)
            : rawToken;

        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      console.warn("Could not parse token from localStorage:", e);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error.response || error.message || error);
  }
);

// Add a response interceptor: Token expiration check & 401 handling
axiosAuthInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error?.config;

    try {
      // Check if JWT token timestamp has expired
      const userInfoStr = localStorage.getItem("userInfo");
      if (userInfoStr) {
        const userInfo = JSON.parse(userInfoStr);
        const isTokenExpired =
          userInfo?.exp && userInfo.exp * 1000 < Date.now();

        if (isTokenExpired && !originalRequest?._retry) {
          if (originalRequest) originalRequest._retry = true;
          localStorage.removeItem("token");
          localStorage.removeItem("userInfo");
          // Safe redirect when in browser environment
          if (typeof window !== "undefined") {
            window.location.href = "/";
          }
        }
      }
    } catch (e) {
      console.warn("Could not check token expiration:", e);
    }

    // Handle 401 Unauthorized from backend
    if (error?.response?.status === 401) {
      if (originalRequest) originalRequest._retry = true;
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      console.log("401 Unauthorized - Cleared session:", error);
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosAuthInstance;
