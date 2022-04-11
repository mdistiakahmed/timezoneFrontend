import axios, { AxiosRequestConfig } from 'axios';
import { AppReducerActionKind } from '../hooks/useAppReducer';

const AxiosHandler = (dispatch: any) => {
    const meAxios = axios.create({
        baseURL: process.env.REACT_APP_SERVER_URL
    });
    
    const setHeaders = (config: AxiosRequestConfig): AxiosRequestConfig => {
        if (config.headers === undefined) {
            config.headers = {};
        }
        console.log('I am in set headers...');
        //TODO: make a function for it
        if(!(config.url?.endsWith('signup') || config.url?.endsWith('signin'))){
            console.log('adding auth token........');
            config.headers['Authorization'] = `Bearer ${localStorage.getItem('AUTH_TOKEN')}`;
        }
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
            dispatch({ type: AppReducerActionKind.ERROR, payload: error.message ?? 'Unknown Error' });
            return Promise.reject(error);
        },
    );

    return { meAxios };
}



export default AxiosHandler;