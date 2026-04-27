import axios, {type AxiosResponse} from 'axios'
import type {Startup} from './startup_type'

type GetStartups = () => Promise<Startup[]>
type AxiosGetStartups = () => Promise<Startup[]>
type AxiosSaveStartup = (startup: Startup) => Promise<Startup>
type AxiosDeleteStartup = (id: number) => Promise<void>

export const getAllStartups: GetStartups = async () => {
    return fetch('api/v1/startup', {method: 'GET'})
        .then( (response) => {
            return response.json()
        })
}

export const axiosGetAllStartups: AxiosGetStartups = async () => {
    return axios
        .get('api/v1/startup')
        .then((response: AxiosResponse<Startup[]>)=> response.data)
}

export const axiosSaveStartup: AxiosSaveStartup = (startup: Startup) => {
    return axios
        .post('api/v1/startup', startup)
        .then((response: AxiosResponse<Startup>) => response.data)
        .catch((error: unknown) => {
            console.error('Failed to save startup:', error);
            throw error;
        });
}

export const axiosDeleteStartup: AxiosDeleteStartup = (id: number) => {
    return axios
        .delete('api/v1/startup/' + id)
        .then((response: AxiosResponse<void>) => response.data)
        .catch((error: unknown) => {
            console.error('Failed to delete startup:', error);
            throw error;
        });
}
