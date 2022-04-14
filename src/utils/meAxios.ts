import axios, { AxiosRequestConfig } from 'axios';
import { AppReducerActionKind } from '../hooks/useAppReducer';

const useAxiosHandler = (dispatch: any, handleError: (error: any) => void) => {
    const meAxios = axios.create({
        baseURL: process.env.REACT_APP_SERVER_URL,
    });

    meAxios.interceptors.request.use((config: AxiosRequestConfig) =>
        setHeaders(config),
    );

    meAxios.interceptors.response.use(
        (response) => response,
        (error) => {
            dispatch({
                type: AppReducerActionKind.ALERT,
                payload: { msg: error.message ?? 'Unknown Error' },
            });
            handleError(error);
            return Promise.reject(error);
        },
    );

    const handleError = (error: any) => {
        let errorMessage = '';
        if (error.response) {
            // The client was given an error response (5xx, 4xx)
            if (error.response.status === 400) {
                errorMessage = 'Bad Request. ' + error.response.data?.msg;
            } else if (error.response.status === 401) {
                errorMessage = 'Unauthorized.' + error.response.data?.msg;
            } else if (error.response.status === 403) {
                errorMessage = 'Access Denied. ' + error.response.data?.msg;
            } else if (error.response.status === 404) {
                errorMessage = 'Page not found. ' + error.response.data?.msg;
            } else if (error.response.status === 409) {
                errorMessage = 'Conflict. ' + error.response.data?.msg;
            } else {
                errorMessage = 'Error... ' + error.message;
            }
        } else if (error.request) {
            // The client never received a response, and the request was never left
            errorMessage = 'Server is not responding, try again';
        } else {
            // Anything else
            errorMessage =
                'Something went wrong. Try agian. Details: ' + error.message;
        }
        dispatch({
            type: AppReducerActionKind.ALERT,
            payload: { msg: errorMessage },
        });
    };

    const setHeaders = (config: AxiosRequestConfig): AxiosRequestConfig => {
        if (config.headers === undefined) {
            config.headers = {};
        }
        //TODO: make a function for it
        if (
            !(config.url?.endsWith('signup') || config.url?.endsWith('signin'))
        ) {
            config.headers['Authorization'] = `Bearer ${localStorage.getItem(
                'AUTH_TOKEN',
            )}`;
        }
        config.headers['Access-Control-Allow-Origin'] = '*';
        config.headers['Accept'] = 'application/json';
        config.headers['Content-Type'] = 'application/json';
        return config;
    };

    return { meAxios };
};

export default AxiosHandler;
