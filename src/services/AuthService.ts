import { useNavigate } from 'react-router-dom';
import { ApiEndpoints } from '../constants/ApiEndpoints';
import { AppReducerActionKind } from '../hooks/useAppReducer';
import { UserDTO, UserSignUpModel } from '../utils/DataModel';
import AxiosHandler from '../utils/meAxios';

const useAuthService = (dispatch: any) => {
    const { meAxios } = AxiosHandler(dispatch);
    const navigate = useNavigate();

    const signUp = async (data: UserSignUpModel): Promise<any> => {
        return meAxios
            .post(ApiEndpoints.auth.signUp, data)
            .then((res) => {
                dispatch({
                    type: AppReducerActionKind.SET_TOKEN,
                    payload: res.data?.token ?? '',
                });
                navigate('/');
            });
    };
    const signIn = async (data: UserDTO): Promise<any> => {
        return meAxios
            .post(ApiEndpoints.auth.signIn, data)
            .then((res) => Promise.resolve(res.data));
    };

    return { signUp, signIn };
};

export default useAuthService;
