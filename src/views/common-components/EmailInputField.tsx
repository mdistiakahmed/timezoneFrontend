import TextField from '@mui/material/TextField';

/*
    if the input field has some value length > 0, this will be validated
*/
const emailValidation = (
    email: string,
    error: string | undefined,
    setError: any,
) => {
    if (
        email.length > 0 &&
        !new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ).test(email)
    ) {
        setError('Enter a valid email address');
    } else {
        setError(undefined);
    }
};

const EmailInputField = ({
    value,
    setValue,
    error,
    setError,
    isDisabled = false,
}: EmailInputFieldProps) => {
    const handleChange = (event: any) => {
        const val = event.target.value;
        setValue(val);
        emailValidation(val, error, setError);
    };

    return (
        <TextField
            error={error !== undefined && error.length > 0}
            helperText={error}
            required
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            value={value}
            onChange={handleChange}
            disabled={isDisabled}
        />
    );
};

export default EmailInputField;

type EmailInputFieldProps = {
    value: string | undefined;
    setValue: (val: string) => void;
    error: string | undefined;
    setError: (val: string) => void;
    isDisabled?: boolean;
};
