import apiClient from "../utils/apiClient"

export const mainService = {

    linear: async () => {
        const res = await apiClient.get("/api/main/linear");
        return res.data;
    },
    
    details: async (hour:number) => {
        const res = await apiClient.get(`/api/main/get-details?hour=${hour}`);
        return res.data
    },

    demandVsFlowChart: async (hour: number) => {
        const res = await apiClient.get(`/api/main/demand-vs-flow?hour=${hour}`)
        return res.data;
    },

    pressuresChart: async (hour:number) => {
        const res = await apiClient.get(`/api/main/pressures-chart?hour${hour}`);
        return res.data
    },

    pipesData: async (hour:number) => {
        const res = await apiClient.get(`/api/main/pipes-data?hour${hour}`);
        return res.data
    },

    flowData: async (hour:number) => {
        const res = await apiClient.get(`/api/main/flow-data?hour${hour}`);
        return res.data
    }

    
}