import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

const DropdownInputField = ({
    value,
    setValue,
    DropdownOptions,
}: DropdownInputFieldProps) => {
    return (
        <TextField
            id="role"
            select
            label="Role"
            type="number"
            fullWidth
            variant="standard"
            value={value}
            onChange={(e) => setValue(e.target.value)}
        >
            {Object.keys(DropdownOptions)
                .filter((key) => isNaN(Number(key)))
                .map((e) => (
                    <MenuItem key={e} value={e}>
                        {e}
                    </MenuItem>
                ))}
        </TextField>
    );
};

export default DropdownInputField;

type DropdownInputFieldProps = {
    value: string;
    setValue: (val: string) => void;
    DropdownOptions: Object;
};
