import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import AuthorityService from '../../../services/AuthorityService';
import Alert from '@mui/material/Alert';
import { AlertSeverity } from '../../../constants/GeneralConstants';

const Signup = () => {
  const [submitDisable, setSubmitDisable] = useState(false);
  // store password to match with confirm password
  const [password, setPassword] = useState('');
  //Errors
  const [errors, setErrors] = useState<SignupFormErrors>({});
  // alert
  const [showAlert, setShowAlert] = useState<boolean>(false);

 

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitDisable(true);
    const inputdata = new FormData(event.currentTarget);
    const hasError = AuthorityService.singUpFromSubmitValidate(inputdata,errors);

    if (hasError) {
      setShowAlert(true);
    } else {
      console.log('No error');
      setShowAlert(false);
    }
    setSubmitDisable(false);
  };

  const handleChange = (event: any) => {
    const name = event.target.name;
    const val = event.target.value;
    if (name === 'password') {
      setPassword(val);
    }
    AuthorityService.signupFormValidate(name, val, errors, setErrors, password);
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
          Sign up
        </Typography>
        {showAlert && (
          <Alert severity={AlertSeverity.ERROR}>
            Provide valid information!
          </Alert>
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
            disabled={submitDisable}
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

export type AuthorizationData = {
  email: string;
  password: string;
};

export type SignupFormErrors = {
  emailError?: string;
  passwordError?: string;
  confirmPasswordError?: string;
};

