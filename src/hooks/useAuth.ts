import jwt_decode from 'jwt-decode';

export const useAuth = () => {
    let isAuthenticated = false;
    const rawToken = localStorage.getItem('AUTH_TOKEN');
    if (rawToken) {
        const decoded: any = jwt_decode(rawToken);
        if (decoded.exp * 1000 >= new Date().getTime()) {
            isAuthenticated = true;
        }
    }

    return isAuthenticated;
};
