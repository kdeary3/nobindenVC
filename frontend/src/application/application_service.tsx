import type {Application} from "./application_type";
import axios, {type AxiosResponse} from "axios";

type AxiosGetAllApplications = () => Promise<Application[]>
type AxiosSaveApplication = (application: Application, deck?: File) => Promise<Application>
type AxiosDeleteApplication = (id: number) => Promise<void>
type AxiosUpdateApplication = (id: number, application: Application) => Promise<Application>

export const axiosGetAllApplications: AxiosGetAllApplications = () => {
    return axios
        .get('/api/v1/application')
        .then((response: AxiosResponse<Application[]>) => response.data)
        .catch((error: unknown) => {
            console.error('Failed to get applications:', error)
            throw error
        })
}

export const axiosSubmitApplication: AxiosSaveApplication = async (application, deck) => {
    const formData = new FormData()
    formData.append(
        "application",
        new Blob([JSON.stringify(application)], { type: "application/json" })
    )
    if (deck) {
        formData.append("deck", deck)
    }

    return axios
        .post('/api/v1/application', formData)
        .then((response: AxiosResponse<Application>) => response.data)
        .catch((error: unknown) => {
            console.error('Failed to save application:', error)
            throw error
        })
}

export const axiosDeleteApplication: AxiosDeleteApplication = async (id: number) => {
    return axios
        .delete(`/api/v1/application/${id}`)
        .then((response: AxiosResponse<void>) => response.data)
        .catch((error: unknown) => {
            console.error('Failed to delete application:', error)
            throw error
        })
}

export const axiosUpdateApplication: AxiosUpdateApplication = async (id: number, application: Application) => {
    return axios
        .patch(`/api/v1/application/${id}`, application)
        .then((response: AxiosResponse<Application>) => response.data)
        .catch((error: unknown) => {
            console.error('Failed to update application:', error);
            throw error;
        });
}

export const axiosUpdateApplicationStatus = async (id: number, status: string) => {
    const response = await axios.patch(`/api/v1/application/${id}/status`, { status });
    return response.data;
};