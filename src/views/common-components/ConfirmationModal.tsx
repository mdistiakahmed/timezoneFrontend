import Alert, { AlertColor } from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const ConfirmationModal = ({
    title,
    description,
    open,
    onConfirm,
    onCancel,
    children,
    alertSeverity = 'info',
}: ConfirmationModalProps): JSX.Element => {
    return (
        <Dialog
            open={open}
            onClose={onCancel}
            aria-labelledby="confirmation-dialog-title"
            aria-describedby="confirmation-dialog-title"
        >
            <DialogTitle id="confirmation-dialog-title">
                <Alert severity={alertSeverity}>{title}</Alert>
            </DialogTitle>
            <DialogContent>
                <div>
                    {description}
                    {children}
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>Cancel</Button>
                <Button onClick={onConfirm}>Confirm</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationModal;

type ConfirmationModalProps = {
    open: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
    onCancel: () => void;
    children?: JSX.Element;
    alertSeverity?: AlertColor;
};
