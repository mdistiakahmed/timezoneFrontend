import { CircularProgress } from '@mui/material';
import CSS from 'csstype';

const divStyles: CSS.Properties = {
    backgroundColor: 'rgba(49, 37, 37, 0.2)',
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: 200000,
};

const Loader = ({ isLoading }: LoaderProps) => {
    if (!isLoading) {
        return null;
    }
    return (
        <div style={divStyles}>
            <CircularProgress
                size={100}
                sx={{ position: 'absolute', top: '40%', left: '40%' }}
            />
        </div>
    );
};

export default Loader;

type LoaderProps = {
    isLoading: boolean;
};
