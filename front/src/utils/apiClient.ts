import axios from "axios"


const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "https://hydrotech-backend-no5n.onrender.com",
    withCredentials: true
})


export default apiClient