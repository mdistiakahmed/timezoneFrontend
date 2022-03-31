import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { UserData, UserRoles } from '../pages/User';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import AddUserDialog from './AddUserDialog';
import ConfirmationModal from './common/ConfirmationModal';

function createData(email: string, isAdmin: boolean) {
  return { email, isAdmin };
}

const rows = [
  createData('istinishat@gmail.com', true),
  createData('istiak@worksapp.com', true),
  createData('ahmed@tekarsh.com', false),
  createData('user@gmail.com', false),
  createData('test@gmail.com', false),
  createData('istinishat1@gmail.com', true),
  createData('istiak2@worksapp.com', true),
  createData('ahmed2@tekarsh.com', false),
  createData('user2@gmail.com', false),
  createData('test2@gmail.com', false),
];

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'grey',
    color: 'white',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const UserTableRow = ({ email, role }: UserData): JSX.Element => {
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] =
    useState<boolean>(false);
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
        <Grid container spacing={2} alignItems="center" justifyContent="center">
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
      <AddUserDialog
        title="Edit User"
        open={editDialogOpen}
        onCancel={() => setEditDialogOpen(false)}
        onAdd={() => {}}
        userData={{ email: email, role: role }}
        isEdit={true}
      />

      <ConfirmationModal
        open={deleteConfirmationOpen}
        title="User Delete confirmation"
        description="Sure want to delete this user? This will delete the user and all the timezones enterd by this user"
        onCancel={() => setDeleteConfirmationOpen(false)}
        onConfirm={() => {}}
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

const UserTable = () => {
  return (
    <Paper sx={{ mx: '10px', mt: '5px' }}>
      <TableContainer>
        <Table aria-label="user table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Role</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <UserTableRow
                key={row.email}
                email={row.email}
                role={row.isAdmin ? UserRoles.ADMIN : UserRoles.USER}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        rowsPerPageOptions={[]}
        count={100}
        rowsPerPage={5}
        page={1}
        onPageChange={() => {
          console.log('page has been changed....');
        }}
      />
    </Paper>
  );
};

export default UserTable;
