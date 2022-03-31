import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { UserData, UserRoles } from '../pages/User';

const AddUserDialog = ({
  open,
  onCancel,
  onAdd,
  title,
  userData,
  isEdit,
}: AddUserDialogProps): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [currentRole, setCurrentRole] = useState<string>('');

  useEffect(() => {
    setEmail(userData ? userData.email : '');
    setCurrentRole(userData ? userData.role.toLocaleUpperCase() : '');
  }, [userData]);

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="email"
          label="Email"
          type="email"
          fullWidth
          variant="standard"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {!isEdit && (
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
          />
        )}

        <TextField
          id="role"
          select
          label="Role"
          type="number"
          fullWidth
          variant="standard"
          value={currentRole}
          onChange={(e) => setCurrentRole(e.target.value)}
        >
          {Object.keys(UserRoles)
            .filter((key) => isNaN(Number(key)))
            .map((e) => (
              <MenuItem key={e} value={e}>
                {e}
              </MenuItem>
            ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onAdd}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserDialog;

type AddUserDialogProps = {
  open: boolean;
  onCancel: () => void;
  onAdd: () => void;
  title: string;
  userData?: UserData;
  isEdit: boolean;
};
