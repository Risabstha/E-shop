import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;
// create an axios instance
const api = axios.create({
  baseURL: baseURL, // your backend base URL
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
});

// Request interceptor: attach token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export default api;