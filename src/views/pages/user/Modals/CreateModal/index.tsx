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
import useUserUpdateDialogLogic from './useUserCreateDialogLogic';

const UserCreateDialog = ({ isOpen, onCancel }: UserCreateDialogProps) => {
    const { handleSubmit, control, onDialogClose, onSubmitDialog } =
        useUserUpdateDialogLogic({
            isOpen,
            onCancel,
        });

    return (
        <Dialog open={isOpen} onClose={onDialogClose}>
            <DialogTitle>Add User</DialogTitle>
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
                                name="email"
                                control={control}
                                label="Email"
                                required={true}
                                type="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormInputText
                                name="password"
                                control={control}
                                label="Password"
                                type="password"
                                required={true}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormInputDropdown
                                name="role"
                                control={control}
                                label="Role"
                                dropDownOptions={UserRoleArray}
                                isRequired={true}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onDialogClose}> Cancel </Button>
                <Button onClick={handleSubmit(onSubmitDialog)}>Add</Button>
            </DialogActions>
        </Dialog>
    );
};

export default UserCreateDialog;

export type UserCreateDialogProps = {
    isOpen: boolean;
    onCancel: any;
};
