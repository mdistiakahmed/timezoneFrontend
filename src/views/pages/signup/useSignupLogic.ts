import { useContext, useEffect, useState } from 'react';
import ValidationService from '../../../services/ValidationService';
import useAuthService from '../../../services/AuthService';
import { useNavigate } from 'react-router-dom';
import { ApplicationContext } from '../../../context/AppContext';


const useSignupLogic = () => {
// store password to match with confirm password
const [password, setPassword] = useState('');
//Errors
const [errors, setErrors] = useState<SignupFormErrors>({});
// alert
const [showAlert, setShowAlert] = useState<boolean>(false);
const [alertMessage, setAlertMessage] = useState<string>('');
// loader
const [showLoader, setShowLoader] = useState<boolean>(false);

const navigate = useNavigate();
const { dispatch } = useContext(ApplicationContext);
const { signUp } = useAuthService(navigate, dispatch);

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const inputdata = new FormData(event.currentTarget);
    const hasError = ValidationService.singUpFromSubmitValidate(
        inputdata,
        errors,
    );
    if (hasError) {
        setShowAlert(true);
        setAlertMessage('Provide valid information!');
    } else {
        //setShowAlert(false);
        //setShowLoader(true);
        const email = '' + inputdata.get('email')?.toString();
        const password = '' + inputdata.get('password')?.toString();
        //TODO: first name, last name
        await signUp({
                firstname: 'a',
                lastname: 'b',
                username: email,
                password: password,
                sysadmin: false,
            })
            .then((res) => {
                navigate('/signin');
            })

    }
};

useEffect(() => {
    // clear memory during exist form this page (component unmount)
    return () => {
        setShowLoader(false);
        setShowAlert(false);
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
    showLoader,
    showAlert,
    alertMessage,
    handleSubmit,
    errors,
    handleChange,
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