import axios from "axios"


const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "https://hydrotech-project-backend.onrender.com",
    withCredentials: true
})

export default apiClient