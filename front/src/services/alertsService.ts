import apiClient from "../utils/apiClient"

export const alertsServices = {
    all:  async (hour:number) => {
        const res = await apiClient.get("/api/alerts");
        return res.data;
    }
}