import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { UserDataContext } from '../../../../../context/UserDataContext';
import { ApplicationContext } from '../../../../../context/AppContext';
import { AppReducerActionKind } from '../../../../../hooks/useAppReducer';
import { UserRoles } from '../../../../../constants/GeneralConstants';
import { SinginFormInput } from '../../../../../constants/DataModel';
import { YUP_USER_CREATE_VALIDATION_SCHEMA } from './yupUserCreateValidationSchema';
import { UserCreateModalProps } from '.';

const defaultValues = {
    email: '',
    password: '',
    role: '',
};

const useUserCreateModalData = ({ isOpen, onCancel }: UserCreateModalProps) => {
    const { handleSubmit, control, reset } = useForm<SinginFormInput>({
        defaultValues: defaultValues,
        resolver: yupResolver(YUP_USER_CREATE_VALIDATION_SCHEMA),
    });
    const { createData } = useContext(UserDataContext);
    const { dispatch } = useContext(ApplicationContext);

    const onSubmitDialog = async (data: SinginFormInput) => {
        if (defaultValues.role === data.role) {
            dispatch({
                type: AppReducerActionKind.ALERT,
                payload: { msg: 'Nothing to update', type: 'warning' },
            });
        } else {
            const isSysAdmin = data.role === UserRoles.ADMIN;
            await createData({
                username: data.email,
                password: data.password,
                sysadmin: isSysAdmin,
            });
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

export default useUserCreateModalData;
