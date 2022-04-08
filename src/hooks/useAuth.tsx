import { useToken } from './useToken';
import jwt_decode from 'jwt-decode';

export const useAuth = () => {
    const { getToken } = useToken();

    const rawToken = getToken();
    let isAuthenticated = false;
    if (rawToken) {
        const decoded: any = jwt_decode(rawToken);
        if (decoded.exp * 1000 >= new Date().getTime()) {
            isAuthenticated = true;
        }
    }

    return isAuthenticated;
};
