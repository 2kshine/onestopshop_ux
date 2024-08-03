import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  TextField,
  CircularProgress,
  Grid,
  Box,
  Typography,
  Paper,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useTheme } from '@mui/material/styles';
import { useFormik } from 'formik';
import Copyright from '../../components/footer/copyright';
import {
  resendEmailVerification,
  verifyEmailAddressToken,
} from '../../axios/axios-requests';
import Alerts from '../../components/alerts/alerts';
import EmailVerificationSchema from '../../validations/schema/email-verification-schema';
import { ENUM_ALERT_TYPE } from '../../enum/enum';
function EmailVerification() {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTime, setAlertTime] = useState('');
  const queryParameters = new URLSearchParams(window.location.search);
  const confirmationToken = queryParameters.get('confirmationToken');

  const handleAlerts = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setAlertTime(new Date().getTime().toString());
  };
  const handleEmailAddressVerification = async () => {
    setTimeout(async () => {
      const verifyEmailAddressTokenResponse = await verifyEmailAddressToken({
        token: confirmationToken,
      });
      if (verifyEmailAddressTokenResponse?.status === 200) {
        window.location.href = `/set-password?token=${verifyEmailAddressTokenResponse.data.token}`;
      }
      setLoading(false);
      if (
        !verifyEmailAddressTokenResponse.status ||
        verifyEmailAddressTokenResponse?.status === 500
      ) {
        handleAlerts(
          ENUM_ALERT_TYPE[0],
          'Something went wrong. Please type in your email address to get a new token or try later.'
        );
      } else {
        if (
          !verifyEmailAddressTokenResponse.status ||
          verifyEmailAddressTokenResponse?.status !== 200
        ) {
          handleAlerts(
            ENUM_ALERT_TYPE[0],
            'Token maybe malformed or has expired.Please type in your email address to get a new token.'
          );
        }
      }
    }, 2000);
  };
  useEffect(() => {
    handleEmailAddressVerification();
  }, []);
  // Initialize formik with initial values
  const formik = useFormik({
    initialValues: {
      email_address: '',
    },
    validationSchema: EmailVerificationSchema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values) => {
      setLoadingButton(true);
      // Resend email verification link
      const resendEmailVerificationResponse =
        await resendEmailVerification(values);
      // console.log(
      //   'resendEmailVerificationResponse',
      //   resendEmailVerificationResponse
      // );
      setTimeout(async () => {
        setLoadingButton(false);

        if (resendEmailVerificationResponse?.status === 202) {
          handleAlerts(
            ENUM_ALERT_TYPE[1],
            'Email resent success! Please check your inbox'
          );
        }
        if (resendEmailVerificationResponse?.status === 200) {
          handleAlerts(
            ENUM_ALERT_TYPE[1],
            'Email has already been verified! You can safely close this tab'
          );
        }
        if (resendEmailVerificationResponse?.status === 404) {
          handleAlerts(ENUM_ALERT_TYPE[0], 'No record found. Please register.');
        }

        if (
          !resendEmailVerificationResponse.status ||
          resendEmailVerificationResponse?.status === 500
        ) {
          handleAlerts(
            ENUM_ALERT_TYPE[0],
            'Something went wrong please try again later'
          );
        }
      }, 2000);
    },
  });

  return (
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
        {loading ? (
          <CircularProgress color="primary" sx={{ mt: 3, mb: 3 }} />
        ) : (
          <>
            <Avatar sx={{ m: 1, bgcolor: theme.palette.success.main }}>
              <HomeIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              One-Stop-Shop
            </Typography>
            <Typography component="h1" variant="h6">
              Send Email Verification Link
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
                variant="outlined"
                required
                fullWidth
                id="email_address"
                label="Email Address"
                name="email_address"
                value={formik.values.email_address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={
                  formik.touched.email_address && formik.errors.email_address
                }
                error={
                  formik.touched.email_address &&
                  Boolean(formik.errors.email_address)
                }
              />
              <br />

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
              >
                {loadingButton ? (
                  <CircularProgress color="primary" sx={{ mt: 3, mb: 3 }} />
                ) : (
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Re-send email verification link
                  </Button>
                )}
              </div>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </>
        )}
      </Paper>
      <Alerts message={alertMessage} type={alertType} id={alertTime} />
    </Grid>
  );
}

export default EmailVerification;
