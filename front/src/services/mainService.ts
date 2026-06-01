import apiClient from "../utils/apiClient"

export const mainService = {

    linear: async () => {
        const res = await apiClient.get("/api/main/linear");
        return res.data;
    }
}