import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

const api = axios.create({

    baseURL : import.meta.env.VITE_BASE_URL

})

export default api
