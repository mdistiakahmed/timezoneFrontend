import { AxiosRequestConfig } from 'axios';
import { URLsWithoutAuthorization } from '../constants/ApiEndpoints';

const NeedToken = (requstedUrl: string | undefined): boolean => {
    if (!requstedUrl) {
        return false;
    }
    let isAuthTokenNeeded = true;
    for (let i = 0; i < URLsWithoutAuthorization.length; i++) {
        const urlSuffix = URLsWithoutAuthorization[i];
        if (requstedUrl.endsWith(urlSuffix)) {
            isAuthTokenNeeded = false;
            break;
        }
    }
    return isAuthTokenNeeded;
};
const HttpHeaders = (config: AxiosRequestConfig): AxiosRequestConfig => {
    if (config.headers === undefined) {
        config.headers = {};
    }
    if (NeedToken(config.url)) {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem(
            'AUTH_TOKEN',
        )}`;
    }
    config.headers['Access-Control-Allow-Origin'] = '*';
    config.headers['Accept'] = 'application/json';
    config.headers['Content-Type'] = 'application/json';
    return config;
};

export default HttpHeaders;
