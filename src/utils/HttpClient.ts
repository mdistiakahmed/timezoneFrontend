import axios, { AxiosRequestConfig } from 'axios';
import HttpErrorHandler from './HttpErrorHandler';
import HttpHeaders from './HttpHeaders';

const HttpClient = (dispatch: any) => {
    const api = axios.create({
        baseURL: process.env.REACT_APP_SERVER_URL,
    });

    api.interceptors.request.use((config: AxiosRequestConfig) =>
        HttpHeaders(config),
    );

    api.interceptors.response.use(
        (response) => response,
        (error) => {
            HttpErrorHandler(error, dispatch);
            return Promise.reject(error);
        },
    );

    return { api };
};

export default HttpClient;
