import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { UserDataContext } from '../../../../../context/UserDataContext';
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

    const onSubmitDialog = async (data: SinginFormInput) => {
        const isSysAdmin = data.role === UserRoles.ADMIN;
        createData({
            username: data.email,
            password: data.password,
            sysadmin: isSysAdmin,
        }).then(() => {
            onDialogClose();
        });
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
