import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { FormInputText } from '../../../../forms/FormInputText';
import Box from '@mui/material/Box';
import FormInputDropdown from '../../../../forms/FormInputDropdown';
import { UserRoleArray } from '../../../../../constants/GeneralConstants';
import useUserUpdateDialogLogic from './useUserUpdateModalData';
import { UserUpdateModalInput } from '../../../../../constants/DataModel';
import Modal from '../../../../common-components/Modal';

const UserUpdateDialog = ({
    isOpen,
    onCancel,
    defaultValues,
}: UserUpdateModalProps) => {
    const { handleSubmit, control, onDialogClose, onSubmitDialog } =
        useUserUpdateDialogLogic({
            isOpen,
            onCancel,
            defaultValues,
        });
    const title = 'Edit User Information';

    const body = () => {
        return (
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
        );
    };

    const actions = () => {
        return (
            <div>
                <Button onClick={onDialogClose}> Cancel </Button>
                <Button onClick={handleSubmit(onSubmitDialog)}>Update</Button>
            </div>
        );
    };

    return (
        <Modal
            title={title}
            isOpen={isOpen}
            onClose={onDialogClose}
            body={body()}
            modalActions={actions()}
        />
    );
};

export default UserUpdateDialog;

export type UserUpdateModalProps = {
    isOpen: boolean;
    onCancel: any;
    defaultValues: UserUpdateModalInput;
};
