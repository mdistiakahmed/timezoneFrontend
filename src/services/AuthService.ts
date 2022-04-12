import { ApiEndpoints } from '../constants/ApiEndpoints';
import { UserDTO, UserSignUpModel } from '../utils/DataModel';
import AxiosHandler from '../utils/meAxios';

const useAuthService = (dispatch: any) => {
    const { meAxios } = AxiosHandler(dispatch);

    const signUp = async (data: UserSignUpModel): Promise<any> => {
        return meAxios
            .post(ApiEndpoints.auth.signUp, data)
            .then((res) => Promise.resolve(res.data));
    };
    const signIn = async (data: UserDTO): Promise<any> => {
        return meAxios
            .post(ApiEndpoints.auth.signIn, data)
            .then((res) => Promise.resolve(res.data));
    };

    return { signUp, signIn };
};

export default useAuthService;
