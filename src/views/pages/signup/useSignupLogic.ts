import { useContext, useEffect, useState } from 'react';
import ValidationService from '../../../services/ValidationService';
import useAuthService from '../../../services/AuthService';
import { useNavigate } from 'react-router-dom';
import { ApplicationContext } from '../../../context/AppContext';
import { AppReducerActionKind } from '../../../hooks/useAppReducer';


const useSignupLogic = () => {
// store password to match with confirm password
const [password, setPassword] = useState('');
//Errors
const [errors, setErrors] = useState<SignupFormErrors>({});
// show busy button
const [busy, setBusy] = useState(false);

const navigate = useNavigate();
const { dispatch } = useContext(ApplicationContext);
const { signUp } = useAuthService(dispatch);

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const inputdata = new FormData(event.currentTarget);
    const hasError = ValidationService.singUpFromSubmitValidate(
        inputdata,
        errors,
    );
    if (hasError) {
        dispatch({
            type: AppReducerActionKind.ALERT,
            payload: { msg: 'Provide valid information!' },
        });
    } else {
        const email = '' + inputdata.get('email')?.toString();
        const password = '' + inputdata.get('password')?.toString();
        setBusy(true);
        signUp({
                username: email,
                password: password,
            })
            .then((res) => {
                dispatch({
                    type: AppReducerActionKind.SET_TOKEN,
                    payload: res.token ?? '',
                });
                navigate('/');
            }).finally(() => {
                setBusy(false);
            })

    }
};

useEffect(() => {
    // clear memory during exist form this page (component unmount)
    return () => {
        setBusy(false);
    };
}, []);

const handleChange = (event: any) => {
    const name = event.target.name;
    const val = event.target.value;
    if (name === 'password') {
        setPassword(val);
    }
    ValidationService.signupFormValidate(
        name,
        val,
        errors,
        setErrors,
        password,
    );
};

return { 
    handleSubmit,
    errors,
    handleChange,
    busy,
 };

}

export type AuthorizationData = {
    email: string;
    password: string;
};

export type SignupFormErrors = {
    emailError?: string;
    passwordError?: string;
    confirmPasswordError?: string;
};

export default useSignupLogic;