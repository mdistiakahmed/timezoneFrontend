import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import { FormInputText } from '../../../../forms/FormInputText';
import Box from '@mui/material/Box';
import FormInputDropdown from '../../../../forms/FormInputDropdown';
import { UserRoleArray } from '../../../../../constants/GeneralConstants';
import useUserUpdateDialogLogic from './useUserUpdateDialogLogic';
import { UserUpdateModalInput } from '../../../../../constants/DataModel';

const UserUpdateDialog = ({
    isOpen,
    onCancel,
    defaultValues,
}: UserUpdateDialogProps) => {
    const { handleSubmit, control, onDialogClose, onSubmitDialog } =
        useUserUpdateDialogLogic({
            isOpen,
            onCancel,
            defaultValues,
        });

    return (
        <Dialog open={isOpen} onClose={onDialogClose}>
            <DialogTitle>Edit User Information</DialogTitle>
            <DialogContent>
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginBottom: 2,
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormInputText
                                name="username"
                                control={control}
                                label="User Name"
                                type="email"
                                disabled={true}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormInputDropdown
                                name="role"
                                control={control}
                                label="Role"
                                dropDownOptions={UserRoleArray}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onDialogClose}> Cancel </Button>
                <Button onClick={handleSubmit(onSubmitDialog)}>Update</Button>
            </DialogActions>
        </Dialog>
    );
};

export default UserUpdateDialog;

export type UserUpdateDialogProps = {
    isOpen: boolean;
    onCancel: any;
    defaultValues: UserUpdateModalInput;
};
