import apiClient from "../utils/apiClient"


export  const authService  = {
    login: async function (data: {email: string, password:string}) {
        const response =  await apiClient.post("/api/auth/login", data)
        return response.data
    },
    
    register: async function (data: {email: string, fullName: string, password:string, name:string}) {
        const response = await apiClient.post("/api/auth/register", data)
        return  response.data
    },
    
    me: async function () {
        const response = await apiClient.get("/api/auth/me")
        return  response.data

    },

    logout: async function () {
        const response = await apiClient.post("/api/auth/logout")
        return  response.data

    },
}