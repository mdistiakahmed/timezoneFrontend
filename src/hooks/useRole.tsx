import { UserRoles } from '../constants/GeneralConstants';
import { useToken } from './useToken';
import jwt_decode from 'jwt-decode';

export const useRole = () => {
  const { getToken } = useToken();

  let userRole = UserRoles.USER;

  const rawToken = getToken();
  if (rawToken) {
    const decoded: any = jwt_decode(rawToken);
    if (decoded.roles === 'ROLE_ADMIN') {
      userRole = UserRoles.USER;
    } else {
      userRole = UserRoles.USER;
    }
  }

  return userRole;
};
