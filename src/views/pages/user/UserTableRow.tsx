import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { UserData } from './User';
import { useContext, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ConfirmationModal from '../../common-components/ConfirmationModal';
import { UserDataContext } from '../../../context/UserDataContext';
import { ApplicationContext } from '../../../context/AppContext';
import { AppReducerActionKind } from '../../../hooks/useAppReducer';
import UpdateUserDialog from './UpdateUserDialog';

const UserTableRow = ({ email, role }: UserData): JSX.Element => {
    const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] =
        useState<boolean>(false);
    const { deleteData } = useContext(UserDataContext);
    const { dispatch } = useContext(ApplicationContext);

    const onDeleteConfirm = async () => {
        setDeleteConfirmationOpen(false);
        await deleteData(email);
        dispatch({
            type: AppReducerActionKind.ALERT,
            payload: { msg: 'Delete Successfull', type: 'success' },
        });
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
            <UpdateUserDialog
                open={editDialogOpen}
                onCancel={() => setEditDialogOpen(false)}
                userData={{ email: email, role: role }}
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
