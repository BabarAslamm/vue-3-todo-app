import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

const api = axios.create({

    baseURL : import.meta.env.VITE_BASE_URL

})

// Attach token if it exists
const token = localStorage.getItem('auth_token');
if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default api
