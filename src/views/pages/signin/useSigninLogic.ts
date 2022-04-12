import { useContext, useEffect, useState } from 'react';
import useAuthService from '../../../services/AuthService';
import { useNavigate } from 'react-router-dom';
import { ApplicationContext } from '../../../context/AppContext';
import { AppReducerActionKind } from '../../../hooks/useAppReducer';

const useSigninLogic = () => {
    const [busy, setBusy] = useState<boolean>(false);

    const { dispatch } = useContext(ApplicationContext);

    const navigate = useNavigate();
    const { signIn } = useAuthService(dispatch);

    useEffect(() => {
        // clear memory during exist form this page (component unmount)
        return () => {
            setBusy(false);
        };
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const inputdata = new FormData(event.currentTarget);
        const email = '' + inputdata.get('email')?.toString();
        const password = '' + inputdata.get('password')?.toString();
        if (email.length === 0 || password.length === 0) {
            dispatch({
                type: AppReducerActionKind.ALERT,
                payload: { msg: 'Username or Password can not be empty' },
            });
        } else {
            setBusy(true);
            signIn({ username: email, password: password })
                .then(async (res) => {
                    dispatch({
                        type: AppReducerActionKind.SET_TOKEN,
                        payload: res.token ?? '',
                    });
                    navigate('/');
                })
                .finally(() => {
                    setBusy(false);
                });
        }
    };

    return {
        handleSubmit,
        busy,
    };
};

export default useSigninLogic;
