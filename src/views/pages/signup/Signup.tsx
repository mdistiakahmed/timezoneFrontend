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
import Loader from '../../common-components/Loader';
import useSignupLogic from './useSignupLogic';

const Signup = () => {
    
    const {showLoader, showAlert, alertMessage, handleSubmit, errors, handleChange} = useSignupLogic();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Loader isLoading={showLoader} />

            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                {showAlert && (
                    <Alert severity={AlertSeverity.ERROR}>{alertMessage}</Alert>
                )}

                <Box
                    component="form"
                    noValidate
                    sx={{ mt: 3 }}
                    onSubmit={handleSubmit}
                    id="signupForm"
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                error={
                                    errors.emailError !== undefined &&
                                    errors.emailError.length > 0
                                }
                                helperText={errors.emailError}
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={
                                    errors.passwordError !== undefined &&
                                    errors.passwordError.length > 0
                                }
                                helperText={errors.passwordError}
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={
                                    errors.confirmPasswordError !== undefined &&
                                    errors.confirmPasswordError.length > 0
                                }
                                helperText={errors.confirmPasswordError}
                                required
                                fullWidth
                                name="confirmpassword"
                                label="Confirm Password"
                                type="password"
                                id="confirmpassword"
                                autoComplete="new-password"
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/signin" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Signup;


