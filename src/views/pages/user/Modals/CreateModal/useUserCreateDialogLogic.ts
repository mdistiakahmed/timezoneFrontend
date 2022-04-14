import * as yup from 'yup';
import { AnyObjectSchema } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { UserCreateDialogProps } from '.';
import { useContext } from 'react';
import { UserDataContext } from '../../../../../context/UserDataContext';
import { ApplicationContext } from '../../../../../context/AppContext';
import { AppReducerActionKind } from '../../../../../hooks/useAppReducer';
import { UserRoles } from '../../../../../constants/GeneralConstants';

export interface SinginFormInput {
    email: string;
    password: string;
    role: string;
}

const defaultValues = {
    email: '',
    password: '',
    role: '',
}

const VALIDATION_SCHEMA: AnyObjectSchema = yup.object({
    email: yup.string().email().required('Please enter email'),
    password: yup.string().min(6, 'Minimum 6 Characters'),
    role: yup.string().required('Please select role'),
});

const useUserCreateDialogLogic = ({
    isOpen,
    onCancel,
}: UserCreateDialogProps) => {
    const { handleSubmit, control, reset } = useForm<SinginFormInput>({
        defaultValues: defaultValues,
        resolver: yupResolver(VALIDATION_SCHEMA),
    });
    const { createData } = useContext(UserDataContext);
    const { dispatch } = useContext(ApplicationContext);

    const onSubmitDialog = async (data: SinginFormInput) => {
        if(defaultValues.role === data.role) {
            dispatch({
                type: AppReducerActionKind.ALERT,
                payload: { msg: 'Nothing to update', type: 'warning' },
            });
        } else {
            const isSysAdmin = data.role === UserRoles.ADMIN;
            await createData({username: data.email, password: data.password, sysadmin: isSysAdmin});
            dispatch({
                type: AppReducerActionKind.ALERT,
                payload: { msg: 'User Created', type: 'success' },
            });
        }
        onDialogClose();
    };

    const onDialogClose = () => {
        reset();
        onCancel();
    };

    return {
        handleSubmit,
        control,
        onDialogClose,
        onSubmitDialog,
    };
};

export default useUserCreateDialogLogic;
