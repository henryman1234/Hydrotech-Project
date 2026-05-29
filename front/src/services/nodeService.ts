import apiClient from "../utils/apiClient"


export const nodeService = {
    
    all: async function () {
        const res = await apiClient.get("/api/nodes")
        return res?.data
    }
}