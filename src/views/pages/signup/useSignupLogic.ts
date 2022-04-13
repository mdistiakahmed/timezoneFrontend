import { useContext, useEffect, useState } from 'react';
import useAuthService from '../../../services/AuthService';
import { ApplicationContext } from '../../../context/AppContext';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { AnyObjectSchema } from 'yup';
import FormValidationConstants from '../../forms/FormValidationConstants';
import { yupResolver } from '@hookform/resolvers/yup';

interface IFormInput {
    email: string;
    password: string;
    confirmPassword: string;
}

const defaultValues = {
    email: '',
    password: '',
    confirmPassword: '',
};

const VALIDATION_SCHEMA: AnyObjectSchema = yup.object({
    email: FormValidationConstants.REQUIRED_VALID_EMAIL,
    password: yup.string().min(6, 'Minimum 6 Characters'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Password does not match'),
});

const useSignupLogic = () => {
    const { handleSubmit, control } = useForm<IFormInput>({
        defaultValues: defaultValues,
        resolver: yupResolver(VALIDATION_SCHEMA),
    });
    const { dispatch } = useContext(ApplicationContext);
    const { signUp } = useAuthService(dispatch);
    // show busy button
    const [busy, setBusy] = useState(false);

    const handleSignUpFormSubmit = async (data: IFormInput) => {
        setBusy(true);
        signUp({
            username: data.email,
            password: data.password,
        }).finally(() => {
            setBusy(false);
        });
    };
    useEffect(() => {
        // clear memory during exist form this page (component unmount)
        return () => {
            setBusy(false);
        };
    }, []);

    return {
        handleSubmit,
        control,
        handleSignUpFormSubmit,
        busy,
    };
};

export default useSignupLogic;
