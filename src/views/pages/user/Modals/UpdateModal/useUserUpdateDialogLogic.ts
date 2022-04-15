import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { UserUpdateDialogProps } from '.';
import { useContext } from 'react';
import { UserDataContext } from '../../../../../context/UserDataContext';
import { ApplicationContext } from '../../../../../context/AppContext';
import { AppReducerActionKind } from '../../../../../hooks/useAppReducer';
import { UserUpdateModalInput } from '../../../../../constants/DataModel';
import { YUP_USER_UPDATE_VALIDATION_SCHEMA } from './yupUserUpdateModalSchema';

const useUserUpdateDialogLogic = ({
    isOpen,
    onCancel,
    defaultValues,
}: UserUpdateDialogProps) => {
    const { handleSubmit, control, reset } = useForm<UserUpdateModalInput>({
        defaultValues: defaultValues,
        resolver: yupResolver(YUP_USER_UPDATE_VALIDATION_SCHEMA),
    });
    const { updateData } = useContext(UserDataContext);
    const { dispatch } = useContext(ApplicationContext);

    const onSubmitDialog = async (data: UserUpdateModalInput) => {
        if (defaultValues.role === data.role) {
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
