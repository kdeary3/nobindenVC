import {Application} from "./application_type";
import axios, {AxiosResponse} from "axios";

type AxiosGetAllApplications = () => Promise<Application[]>
type AxiosSaveApplication = (application: Application) => Promise<Application>
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

export const axiosSubmitApplication: AxiosSaveApplication = (application: Application) => {
    return axios
        .post('/api/v1/application', application)
        .then((response: AxiosResponse<Application>) => response.data)
        .catch((error: unknown) => {
            console.error('Failed to save application:', error)
            throw error
        })
}

export const axiosDeleteApplication: AxiosDeleteApplication = (id: number) => {
    return axios
        .delete(`/api/v1/application/${id}`)
        .then((response: AxiosResponse<void>) => response.data)
        .catch((error: unknown) => {
            console.error('Failed to delete application:', error)
            throw error
        })
}

export const axiosUpdateApplication: AxiosUpdateApplication = (id: number, application: Application) => {
    return axios
        .patch(`/api/v1/application/${id}`, application)
        .then((response: AxiosResponse<Application>) => response.data)
        .catch((error: unknown) => {
            console.error('Failed to update application:', error);
            throw error;
        });
}