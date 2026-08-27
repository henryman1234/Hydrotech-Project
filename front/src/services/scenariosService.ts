import apiClient from "../utils/apiClient"


export const scenariosService = {


    fetchSimulatedResultsByHour: async function(hour: number) {
        const res = await apiClient.get(`/api/scenarios/results?hour=${hour}`)
        return res.data
    },

    fetchSimulatedResults: async function () {
        const res = await apiClient.get("/api/scenarios");
        return res.data
    },

    runScenario: async function (data: { diameter?: number, roughness?: number, length?: number }) {

        const res = await apiClient.post(`/api/scenarios/results`,data);
        return res.data;
    }
}