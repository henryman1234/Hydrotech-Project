import apiClient from "../utils/apiClient"


export const diagnosticsService = {

    critics:  async (hour: number) => {
        const res = await apiClient.get(`/api/diagnostics/critics-card?hour=${hour}`)
        return res.data
    },

    lowPressures: async (hour: number) => {
        const res = await apiClient.get(`/api/diagnostics/lowPressures-card?hour=${hour}`)
        return res.data
    },

    lowVelocity: async (hour: number) => {
        const res = await apiClient.get(`/api/diagnostics/lowVelocity-card?hour=${hour}`)
        return res.data
    },

    greatVelocity: async (hour: number) => {
        const res = await apiClient.get(`/api/diagnostics/greatVelocity-card?hour=${hour}`)
        return res.data
    },

    table: async (hour: number) => {
        const res = await apiClient.get(`/api/diagnostics/diagnostics-table?hour=${hour}`)
        return res.data
    }
}