import apiClient from "../utils/apiClient"

export const pipeService =  {
    all: async function () {
        const response = await apiClient.get("/api/pipes")
        return response.data
    }
}