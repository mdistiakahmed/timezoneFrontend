import * as yup from 'yup';
import { AnyObjectSchema } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { UserUpdateDialogProps } from '.';
import { useContext } from 'react';
import { UserDataContext } from '../../../../../context/UserDataContext';
import { ApplicationContext } from '../../../../../context/AppContext';
import { AppReducerActionKind } from '../../../../../hooks/useAppReducer';

export interface SinginFormInput {
    username: string;
    role: string;
}

const VALIDATION_SCHEMA: AnyObjectSchema = yup.object({
    username: yup.string().email().required('Please enter username'),
    role: yup.string().required('Please select role'),
});

const useUserUpdateDialogLogic = ({
    isOpen,
    onCancel,
    defaultValues,
}: UserUpdateDialogProps) => {
    const { handleSubmit, control, reset } = useForm<SinginFormInput>({
        defaultValues: defaultValues,
        resolver: yupResolver(VALIDATION_SCHEMA),
    });
    const { updateData } = useContext(UserDataContext);
    const { dispatch } = useContext(ApplicationContext);

    const onSubmitDialog = async (data: SinginFormInput) => {
        if(defaultValues.role === data.role) {
            dispatch({
                type: AppReducerActionKind.ALERT,
                payload: { msg: 'Nothing to update', type: 'warning' },
            });
        } else {
            await updateData(data.username, data.role?.toLocaleLowerCase());
            dispatch({
                type: AppReducerActionKind.ALERT,
                payload: { msg: 'Update Successfull', type: 'success' },
            });
        }
        onCancel();
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

export default useUserUpdateDialogLogic;
