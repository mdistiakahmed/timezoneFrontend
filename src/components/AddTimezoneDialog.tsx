import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { TimeZoneData } from './AllTimezones';

const AddTimezoneDialog = ({
  open,
  onCancel,
  onAdd,
  title,
  timezoneData
}: DialogProps): JSX.Element => {

  const [name, setName] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [hourDiff, setHourDiff] = useState<number>(0);
  const [minDiff, setMinDiff] = useState<number>(0);

  useEffect(() => {
    setName(timezoneData ? timezoneData.name : '');
    setCity(timezoneData ? timezoneData.city : '');
    setHourDiff(timezoneData ? timezoneData.hourdiff : 0);
    setMinDiff(timezoneData ? timezoneData.mindiff : 0);
  }, [timezoneData]);


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
            value={name}
            onChange={(e)=> setName(e.target.value)}
          />

          <TextField
            margin="dense"
            id="city"
            label="City"
            type="text"
            fullWidth
            variant="standard"
            value={city}
            onChange={(e)=> setCity(e.target.value)}
          />

          <TextField
            margin="dense"
            id="hourdiff"
            label="Hour Difference"
            type="number"
            fullWidth
            variant="standard"
            value={hourDiff}
            onChange={(e)=> setHourDiff(parseInt(e.target.value))}
          />

          <TextField
            margin="dense"
            id="mindiff"
            label="Minute Difference"
            type="number"
            fullWidth
            variant="standard"
            value={minDiff}
            onChange={(e)=> setMinDiff(parseInt(e.target.value))}
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
  timezoneData?: TimeZoneData
};
