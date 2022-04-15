import { useNavigate } from 'react-router-dom';
import { ApiEndpoints } from '../constants/ApiEndpoints';
import { AppReducerActionKind } from '../hooks/useAppReducer';
import { UserDTO, UserSignUpModel } from '../constants/DataModel';
import { useContext } from 'react';
import { ApplicationContext } from '../context/AppContext';

const useAuthService = (dispatch: any) => {
    const { apiHandler } = useContext(ApplicationContext);
    const navigate = useNavigate();

    const signUp = async (data: UserSignUpModel): Promise<any> => {
        return apiHandler
            ._post(ApiEndpoints.auth.signUp, data)
            .then((res: any) => {
                dispatch({
                    type: AppReducerActionKind.SET_TOKEN,
                    payload: res?.token ?? '',
                });
                navigate('/');
            });
    };
    const signIn = async (data: UserDTO): Promise<any> => {
        await apiHandler
            ._post(ApiEndpoints.auth.signIn, data)
            .then((res: any) => {
                dispatch({
                    type: AppReducerActionKind.SET_TOKEN,
                    payload: res?.token ?? '',
                });
                navigate('/');
            });
    };

    return { signUp, signIn };
};

export default useAuthService;
