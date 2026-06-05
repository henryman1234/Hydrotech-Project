import apiClient from "../utils/apiClient"

export const mainService = {

    linear: async () => {
        const res = await apiClient.get("/api/main/linear");
        return res.data;
    },
    
    details: async (hour:number) => {
        const res = await apiClient.get(`/api/main/get-details?${hour}`);
        return res.data
    },

    demandVsFlowChart: async (hour: number) => {
        const res = await apiClient.get(`/api/main/demand-vs-flow?${hour}`)
        return res.data;
    } 
}