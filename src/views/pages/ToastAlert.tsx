import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import React, { useContext, useEffect, useState } from 'react'
import { ApplicationContext } from '../../context/AppContext';

const ToastAlert = () => {
  const { state } = useContext(ApplicationContext);
  const alert = state.alert;

  const [open, setOpen] = useState(false);
    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string,
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    useEffect(() => {
      if(alert) {
        setOpen(true);
      }
    }, [alert]);
  
  return (
    <div>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleClose}
                    severity='error'
                    sx={{ width: '100%' }}
                    variant="filled"
                >
                    {alert}
                </Alert>
            </Snackbar>
        </div>
  )
}

export default ToastAlert;
