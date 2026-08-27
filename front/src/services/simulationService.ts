import apiClient from "../utils/apiClient"

export const simulationService = {
    
    fetchSimulationsByHour: async function (hour: number) {
        const res = await apiClient.get(`/api/simulations/results?hour=${hour}`);
        return res.data
    },

    fetchSimulatedResults: async function () {
        const res = await apiClient.get("/api/simulations");
        return res.data
    },
}