import axios from "axios";
import { useAuthStore } from "@/stores/auth";

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

const api = axios.create({

    baseURL : import.meta.env.VITE_BASE_URL

})

// Add request interceptor
api.interceptors.request.use((config) => {
    const authStore = useAuthStore();
    // Get token directly from the store (or fallback to localStorage)
    const token = authStore.token || localStorage.getItem('auth_token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
    
  }, (error) => {
    return Promise.reject(error);

});

export default api
