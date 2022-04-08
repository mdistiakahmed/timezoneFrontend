import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import { AlertSeverity } from '../../../constants/GeneralConstants';
import { useContext, useState } from 'react';
import { AuthService } from '../../../services/AuthService';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../../../hooks/useToken';
import { AuthContext } from '../../../context/AuthContext';

const Signin = () => {
    // alert
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>('');
    // set token upon success
    const { setToken } = useToken();

    const { setTokenContext } = useContext(AuthContext);

    const navigate = useNavigate();
    const authService = new AuthService(navigate);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const inputdata = new FormData(event.currentTarget);
        const email = '' + inputdata.get('email')?.toString();
        const password = '' + inputdata.get('password')?.toString();
        if (email.length === 0 || password.length === 0) {
            setShowAlert(true);
            setAlertMessage('Username or Password can not be empty');
        } else {
            authService
                .signIn({ username: email, password: password })
                .then(async (res) => {
                    setToken(res.token);
                    setTokenContext(res.token);
                    navigate('/');
                })
                .catch((err) => {
                    setShowAlert(true);
                    setAlertMessage('Error: ' + err.status + ' ' + err.message);
                });
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>

                {showAlert && (
                    <Alert severity={AlertSeverity.ERROR}>{alertMessage}</Alert>
                )}

                <Box
                    component="form"
                    noValidate
                    sx={{ mt: 1 }}
                    onSubmit={handleSubmit}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Signin;
