import apiClient from "../utils/apiClient"


export const networkService = {
    fetchSimulatedResultsByHour: async function(hour: number) {
        const res = await apiClient.get(`/api/monitoring/results?hour=${hour}`)
        return res.data
    },

    fetchSimulatedResults: async function () {
        const res = await apiClient.get("/api/monitoring");
        return res.data
    }
}