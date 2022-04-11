import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { UserRoles } from '../../../constants/GeneralConstants';
import DropdownInputField from '../../common-components/DropdownInputField';
import EmailInputField from '../../common-components/EmailInputField';
import { UserData } from './User';
import useUpdateUserDialogLogic from './useUpdateUserDialogLogic';

const UpdateUserDialog = ({
    open,
    onCancel,
    userData,
}: UpdateUserDialogProps): JSX.Element => {
    const {
        handleCancelAction,
        email,
        setEmail,
        errors,
        setErrors,
        currentRole,
        setCurrentRole,
        handleUpdateAction,
    } = useUpdateUserDialogLogic({
        open: open,
        onCancel: onCancel,
        userData: userData,
    });

    return (
        <Dialog open={open} onClose={handleCancelAction}>
            <DialogTitle>Edit User Information</DialogTitle>
            <DialogContent>
                <EmailInputField
                    value={email}
                    setValue={setEmail}
                    error={errors.emailError}
                    setError={(errorMsg) =>
                        setErrors({ ...errors, emailError: errorMsg })
                    }
                />

                <DropdownInputField
                    value={currentRole}
                    setValue={setCurrentRole}
                    DropdownOptions={UserRoles}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancelAction}>Cancel</Button>
                <Button onClick={handleUpdateAction}>Update</Button>
            </DialogActions>
        </Dialog>
    );
};

export default UpdateUserDialog;

export type UpdateUserDialogProps = {
    open: boolean;
    onCancel: () => void;
    userData?: UserData;
};
