import { useContext } from 'react';
import useAuthService from '../../../services/AuthService';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../../../hooks/useToken';
import { ApplicationContext } from '../../../context/AppContext';
import { AppReducerActionKind } from '../../../hooks/useAppReducer';

const useSigninLogic = () => {
    // set token upon success
    const { setToken } = useToken();

    const { dispatch } = useContext(ApplicationContext);

    const navigate = useNavigate();
    const { signIn } = useAuthService(navigate, dispatch);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const inputdata = new FormData(event.currentTarget);
        const email = '' + inputdata.get('email')?.toString();
        const password = '' + inputdata.get('password')?.toString();
        if (email.length === 0 || password.length === 0) {
            dispatch({
                type: AppReducerActionKind.ERROR,
                payload: { msg: 'Username or Password can not be empty' },
            });
        } else {
            signIn({ username: email, password: password }).then(
                async (res) => {
                    setToken(res.token);
                    dispatch({
                        type: AppReducerActionKind.SET_TOKEN,
                        payload: res.token ?? '',
                    });
                    navigate('/');
                },
            );
        }
    };

    return {
        handleSubmit,
    };
};

export default useSigninLogic;
