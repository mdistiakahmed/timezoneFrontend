import axios, { AxiosRequestConfig } from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { AppReducerActionKind } from '../hooks/useAppReducer';

const AxiosHandler = (navigate: NavigateFunction, dispatch: any) => {
    const meAxios = axios.create({
        baseURL: process.env.REACT_APP_SERVER_URL
    });
    
    const setHeaders = (config: AxiosRequestConfig): AxiosRequestConfig => {
        if (config.headers === undefined) {
            config.headers = {};
        }
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('AUTH_TOKEN')}`;
        config.headers['Access-Control-Allow-Origin'] = '*';
        config.headers['Accept'] = 'application/json';
        config.headers['Content-Type'] = 'application/json';
        return config;
    }
    
    meAxios.interceptors.request.use((config: AxiosRequestConfig) =>
        setHeaders(config),
    );
    
    meAxios.interceptors.response.use(
        (response) => response,
        (error) => {
            console.log("Error Found: ", error);
            dispatch({ type: AppReducerActionKind.ERROR, payload: error.message ?? 'Unknown Error' });
            return Promise.reject(error);
        },
    );

    return { meAxios };
}



export default AxiosHandler;