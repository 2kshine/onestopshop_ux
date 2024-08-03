import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  InputAdornment,
  IconButton,
  Paper,
  CircularProgress,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useTheme } from '@mui/material/styles';
import { useFormik } from 'formik';
import Copyright from '../../components/footer/copyright';
import {
  setPassword,
  checkPasswordTokenValidity,
} from '../../axios/axios-requests';
import PasswordSchema from '../../validations/schema/password-schema';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Alerts from '../../components/alerts/alerts';
import NotFoundPage from '../notfound';
import { ENUM_ALERT_TYPE } from '../../enum/enum';

function SetPassword() {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTime, setAlertTime] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [hidePasswordConfirm, setHidePasswordConfirm] = useState(true);
  const [renderPage, setRenderPage] = useState(false);

  const checkPasswordPageValidity = async (token) => {
    const checkPasswordTokenValidityResponse = await checkPasswordTokenValidity(
      { token }
    );
    if (checkPasswordTokenValidityResponse?.status === 200) {
      setRenderPage(true);
    }
  };
  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search);
    const passwordPageReload = queryParameters.get('token');
    if (passwordPageReload.split('.').length === 3) {
      checkPasswordPageValidity(passwordPageReload);
    }
  }, []);

  const handleAlerts = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setAlertTime(new Date().getTime().toString());
  };
  // Initialize formik with initial values
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmation_password: '',
    },
    validationSchema: PasswordSchema,
    validateOnChange: true,
    onSubmit: async (values) => {
      setLoading(true);
      // Set user password
      const setPasswordResponse = await setPassword(values);
      setTimeout(async () => {
        setLoading(false);
        // console.log('setPasswordResponse', setPasswordResponse);
        if (setPasswordResponse.status && setPasswordResponse.status === 201) {
          window.location.href = '/user-profile';
        } else {
          handleAlerts(
            ENUM_ALERT_TYPE[0],
            'Something went wrong. Please changing password later.'
          );
        }
      }, 2000);
    },
  });

  // Password visibility toggle
  const handleClickShowPassword = () => setHidePassword((show) => !show);
  const handleClickShowPasswordConfirm = () =>
    setHidePasswordConfirm((show) => !show);

  return renderPage ? (
    <Grid
      container
      component="main"
      sx={{
        height: '100vh',
        width: '100vw',
      }}
    >
      <Paper
        sx={{
          mx: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
          maxWidth: '600px',
          maxHeight: '500px',
          margin: 'auto auto',
          borderRadius: '2%',
        }}
        noValidate
        elevation={3}
      >
        <Avatar sx={{ m: 1, bgcolor: theme.palette.success.main }}>
          <HomeIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          One-Stop-Shop
        </Typography>
        <Typography component="h1" variant="h6">
          Set Password
        </Typography>
        <Box
          component="form"
          alignItems="center"
          noValidate
          sx={{ mt: 1 }}
          onSubmit={formik.handleSubmit}
          width={'70%'}
        >
          <TextField
            margin="dense"
            required
            variant="outlined"
            fullWidth
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="Password"
            type={hidePassword ? 'password' : 'text'}
            id="password"
            autoComplete="Use complex password"
            helperText={formik.touched.password && formik.errors.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {hidePassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="dense"
            required
            variant="outlined"
            fullWidth
            name="confirmation_password"
            value={formik.values.confirmation_password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="confirmation_password"
            type={hidePasswordConfirm ? 'password' : 'text'}
            id="confirmation_password"
            autoComplete="Use complex password"
            helperText={
              formik.touched.confirmation_password &&
              formik.errors.confirmation_password
            }
            error={
              formik.touched.confirmation_password &&
              Boolean(formik.errors.confirmation_password)
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm password visibility"
                    onClick={handleClickShowPasswordConfirm}
                    edge="end"
                  >
                    {hidePasswordConfirm ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <br />

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            {loading ? (
              <CircularProgress color="primary" sx={{ mt: 3, mb: 3 }} />
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Set Password
              </Button>
            )}
          </div>
          <Copyright sx={{ mt: 5 }} />
        </Box>
        <Alerts message={alertMessage} type={alertType} id={alertTime} />
      </Paper>
    </Grid>
  ) : (
    <NotFoundPage />
  );
}

export default SetPassword;
