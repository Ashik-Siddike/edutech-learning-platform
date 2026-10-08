// Base Axios client configuration for DummyJSON API
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor: useful for attaching tokens or logging
axiosClient.interceptors.request.use(
  (config) => {
    // Example: Can log API request URLs during development
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: centralized error handling
axiosClient.interceptors.response.use(
  (response) => {
    // Return standard response object
    return response;
  },
  (error) => {
    // Format error message clearly for custom hooks and UI
    const formattedError = {
      message:
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred while communicating with DummyJSON API.",
      status: error.response?.status,
    };
    return Promise.reject(formattedError);
  }
);

export default axiosClient;
