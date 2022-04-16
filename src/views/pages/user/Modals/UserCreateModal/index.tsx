import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { FormInputText } from '../../../../forms/FormInputText';
import Box from '@mui/material/Box';
import FormInputDropdown from '../../../../forms/FormInputDropdown';
import { UserRoleArray } from '../../../../../constants/GeneralConstants';
import useUserUpdateDialogLogic from './useUserCreateModalData';
import Modal from '../../../../common-components/Modal';
import Typography from '@mui/material/Typography';

const UserCreateDialog = ({ isOpen, onCancel }: UserCreateModalProps) => {
    const { handleSubmit, control, onDialogClose, onSubmitDialog } =
        useUserUpdateDialogLogic({
            isOpen,
            onCancel,
        });
    const title = (
        <Typography variant="h6" noWrap>
            Add User
        </Typography>
    );

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
        );
    };

    const actions = () => {
        return (
            <div>
                <Button onClick={onDialogClose}> Cancel </Button>
                <Button onClick={handleSubmit(onSubmitDialog)}>Add</Button>
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

export default UserCreateDialog;

export type UserCreateModalProps = {
    isOpen: boolean;
    onCancel: any;
};
