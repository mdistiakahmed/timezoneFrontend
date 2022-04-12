import { useContext, useEffect, useState } from 'react';
import { ApplicationContext } from '../../../context/AppContext';
import { UserDataContext } from '../../../context/UserDataContext';
import { AppReducerActionKind } from '../../../hooks/useAppReducer';
import { SignupFormErrors } from '../signup/useSignupLogic';
import { UpdateUserDialogProps } from './UpdateUserDialog';

const useUpdateUserDialogLogic = ({
    open,
    onCancel,
    userData,
}: UpdateUserDialogProps) => {
    //TODO: instead of two useState , use only one combining the properties
    const [email, setEmail] = useState<string>('');
    const [currentRole, setCurrentRole] = useState<string>('');
    //Errors
    const [errors, setErrors] = useState<SignupFormErrors>({});

    const { updateData } = useContext(UserDataContext);
    const { dispatch } = useContext(ApplicationContext);

    useEffect(() => {
        setEmail(userData ? userData.email : '');
        setCurrentRole(userData ? userData.role.toLocaleUpperCase() : '');
    }, [userData]);

    const handleUpdateAction = async () => {
        if (Object.keys(errors).length) {
            alert('has errors' + errors);
        } else if (currentRole === userData?.role.toLocaleUpperCase()) {
            dispatch({
                type: AppReducerActionKind.ALERT,
                payload: { msg: 'Nothing to update', type: 'warning' },
            });
            onCancel();
        } else {
            updateData(email, currentRole.toLocaleLowerCase());
            dispatch({
                type: AppReducerActionKind.ALERT,
                payload: { msg: 'Update Successfull', type: 'success' },
            });
            onCancel();
        }
    };

    const handleCancelAction = () => {
        setErrors({});
        onCancel();
    };

    return {
        handleCancelAction,
        email,
        setEmail,
        errors,
        setErrors,
        currentRole,
        setCurrentRole,
        handleUpdateAction,
    };
};

export default useUpdateUserDialogLogic;
