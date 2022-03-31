import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

const AddTimezoneDialog = ({
  open,
  onCancel,
  onAdd,
  title,
}: DialogProps): JSX.Element => {
  return (
    <div>
      <Dialog open={open} onClose={onCancel}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
          />

          <TextField
            autoFocus
            margin="dense"
            id="city"
            label="City"
            type="text"
            fullWidth
            variant="standard"
          />

          <TextField
            autoFocus
            margin="dense"
            id="hourdiff"
            label="Hour Difference"
            type="number"
            fullWidth
            variant="standard"
          />

          <TextField
            autoFocus
            margin="dense"
            id="mindiff"
            label="Minute Difference"
            type="number"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>Cancel</Button>
          <Button onClick={onAdd}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddTimezoneDialog;

type DialogProps = {
  open: boolean;
  onCancel: () => void;
  onAdd: () => void;
  title: string;
};
