import apiClient from "../utils/apiClient"

export const simulationService = {
    
    fetchSimulationsByHour: async function (hour: number) {
        const res = await apiClient.get(`/api/simulations?hour=${hour}`);
        return res.data
    }
}