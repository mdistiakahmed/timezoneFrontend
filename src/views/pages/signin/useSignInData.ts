import { useEffect, useState } from 'react';
import useAuthService from '../../../services/useAuthService';
import * as yup from 'yup';
import { AnyObjectSchema } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

interface SinginFormInput {
    username: string;
    password: string;
}

const defaultValues = {
    username: '',
    password: '',
};

const VALIDATION_SCHEMA: AnyObjectSchema = yup.object({
    username: yup.string().required('Please enter username'),
    password: yup.string().required('Please enter password'),
});

const useSignInData = () => {
    const { handleSubmit, control } = useForm<SinginFormInput>({
        defaultValues: defaultValues,
        resolver: yupResolver(VALIDATION_SCHEMA),
    });

    const [busy, setBusy] = useState<boolean>(false);
    const { signIn } = useAuthService();

    useEffect(() => {
        // clear memory during exist form this page (component unmount)
        return () => {
            setBusy(false);
        };
    }, []);

    const handleSignInFormSubmit = async (data: SinginFormInput) => {
        setBusy(true);
        signIn({ username: data.username, password: data.password }).finally(
            () => {
                setBusy(false);
            },
        );
    };

    return {
        handleSubmit,
        control,
        handleSignInFormSubmit,
        busy,
    };
};

export default useSignInData;
