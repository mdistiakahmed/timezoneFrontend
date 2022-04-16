import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useContext, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ConfirmationModal from '../../../common-components/ConfirmationModal';
import { UserDataContext } from '../../../../context/UserDataContext';
import UserUpdateDialog from '../Modals/UserUpdateModal';
import { UserData } from '../../../../constants/DataModel';

const UserTableRow = ({ email, role }: UserData): JSX.Element => {
    const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] =
        useState<boolean>(false);
    const { deleteData } = useContext(UserDataContext);

    const onDeleteConfirm = async () => {
        deleteData(email).then(() => setDeleteConfirmationOpen(false));
    };

    return (
        <TableRow
            key={email}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row" align="center">
                {email}
            </TableCell>
            <TableCell align="center">{role}</TableCell>
            <TableCell align="center">
                <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Grid item>
                        <IconButton
                            onClick={() => {
                                setEditDialogOpen(true);
                            }}
                            aria-label="edit"
                        >
                            <EditIcon />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton
                            onClick={() => setDeleteConfirmationOpen(true)}
                            aria-label="delete"
                        >
                            <DeleteForeverIcon sx={{ fill: 'red' }} />
                        </IconButton>
                    </Grid>
                </Grid>
            </TableCell>

            <UserUpdateDialog
                isOpen={editDialogOpen}
                onCancel={() => setEditDialogOpen(false)}
                defaultValues={{ username: email, role: role }}
            />

            <ConfirmationModal
                open={deleteConfirmationOpen}
                title="User Delete confirmation"
                description="Sure want to delete this user? This will delete the user and all the timezones enterd by this user"
                onCancel={() => setDeleteConfirmationOpen(false)}
                onConfirm={onDeleteConfirm}
                alertSeverity="error"
                children={
                    <div>
                        <h3>Email: {email}</h3>
                        <h3>Role: {role}</h3>
                    </div>
                }
            />
        </TableRow>
    );
};

export default UserTableRow;
