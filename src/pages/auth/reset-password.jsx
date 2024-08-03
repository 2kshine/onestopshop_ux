import React, { useState } from 'react';
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Paper,
  CircularProgress,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useTheme } from '@mui/material/styles';
import { useFormik } from 'formik';
import Copyright from '../../components/footer/copyright';
import {
  sendEmailPasswordReset,
  verifyCodePasswordReset,
} from '../../axios/axios-requests';
import {
  ResetPasswordSixDigitSchema,
  ResetPasswordEmailSchema,
} from '../../validations/schema/reset-password-schema';
import Alerts from '../../components/alerts/alerts';
import { ENUM_ALERT_TYPE } from '../../enum/enum';

function ResetPassword() {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTime, setAlertTime] = useState('');
  const [emailAddress, setEmailAddress] = useState(null);

  const passwordResetEmail = async (emailAddressValue) => {
    setLoading(true);
    // Resend email verification link

    setTimeout(async () => {
      const sendEmailPasswordResetResponse = await sendEmailPasswordReset({
        email_address: emailAddressValue,
      });
      // console.log(
      //   'resendEmailVerificationResponse',
      //   sendEmailPasswordResetResponse
      // );
      setLoading(false);
      if (
        !sendEmailPasswordResetResponse.status ||
        sendEmailPasswordResetResponse?.status === 500
      ) {
        handleAlerts(
          ENUM_ALERT_TYPE[0],
          'Something went wrong please try again later'
        );
      } else {
        if (sendEmailPasswordResetResponse?.status !== 500) {
          handleAlerts(
            ENUM_ALERT_TYPE[1],
            'Email sent success! Please check your inbox'
          );
        }
      }
    }, 2000);
  };

  const handleAlerts = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setAlertTime(new Date().getTime().toString());
  };
  // Initialize formik with initial values
  const emailFormik = useFormik({
    initialValues: {
      email_address: '',
    },
    validationSchema: ResetPasswordEmailSchema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values) => {
      setEmailAddress(values.email_address);
      passwordResetEmail(values.email_address);
    },
  });
  const sixDigitCodeFormik = useFormik({
    initialValues: {
      six_digit_code: '',
    },
    validationSchema: ResetPasswordSixDigitSchema,
    validateOnChange: true,
    onSubmit: async (values) => {
      setLoading(true);
      // Resend email verification link
      const verifyCodePasswordResetResponse = await verifyCodePasswordReset({
        email_address: emailAddress,
        six_digit_code: values.six_digit_code,
      });
      // console.log(
      //   'verifyCodePasswordResetResponse',
      //   verifyCodePasswordResetResponse
      // );
      setTimeout(async () => {
        if (
          !verifyCodePasswordResetResponse.status ||
          verifyCodePasswordResetResponse?.status === 500
        ) {
          handleAlerts(
            ENUM_ALERT_TYPE[0],
            'Something went wrong please try again later'
          );
          setLoading(false);
        } else {
          if (verifyCodePasswordResetResponse?.status === 200) {
            window.location.href = `/set-password?token=${verifyCodePasswordResetResponse.data.token}`;
          } else {
            handleAlerts(
              ENUM_ALERT_TYPE[2],
              'The code might be expired or incorrect.'
            );
            setLoading(false);
          }
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
              Enter Six Digit Code
            </Typography>
            {emailAddress ? (
              <Box
                component="form"
                display={'flex'}
                flexDirection={'column'}
                alignItems="center"
                justifyContent={'center'}
                noValidate
                sx={{ mt: 1 }}
                onSubmit={sixDigitCodeFormik.handleSubmit}
                width={'70%'}
              >
                <TextField
                  margin="dense"
                  required
                  variant="outlined"
                  name="six_digit_code"
                  value={sixDigitCodeFormik.values.six_digit_code}
                  onChange={sixDigitCodeFormik.handleChange}
                  onBlur={sixDigitCodeFormik.handleBlur}
                  label="Six Digit Code"
                  type="number"
                  id="six_digit_code"
                  helperText={
                    sixDigitCodeFormik.touched.six_digit_code &&
                    sixDigitCodeFormik.errors.six_digit_code
                  }
                  error={
                    sixDigitCodeFormik.touched.six_digit_code &&
                    Boolean(sixDigitCodeFormik.errors.six_digit_code)
                  }
                />
                <br />
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <Button type="submit" variant="contained">
                    Verify Code
                  </Button>
                  <Button
                    onClick={() => passwordResetEmail(emailAddress)}
                    variant="contained"
                    sx={{ mt: 3, mb: 3 }}
                  >
                    Resend Six-digit Code
                  </Button>
                </div>
              </Box>
            ) : (
              <Box
                component="form"
                display={'flex'}
                flexDirection={'column'}
                alignItems="center"
                justifyContent={'center'}
                noValidate
                sx={{ mt: 1 }}
                onSubmit={emailFormik.handleSubmit}
                width={'70%'}
              >
                <TextField
                  margin="dense"
                  fullWidth
                  required
                  variant="outlined"
                  name="email_address"
                  value={emailFormik.values.email_address}
                  onChange={emailFormik.handleChange}
                  onBlur={emailFormik.handleBlur}
                  label="Enter email address"
                  type="email"
                  id="email_address"
                  helperText={
                    emailFormik.touched.email_address &&
                    emailFormik.errors.email_address
                  }
                  error={
                    emailFormik.touched.email_address &&
                    Boolean(emailFormik.errors.email_address)
                  }
                />
                <Button sx={{ mt: 2 }} type="submit" variant="contained">
                  Next
                </Button>
              </Box>
            )}
            <Copyright sx={{ mt: 5 }} />
            <Alerts message={alertMessage} type={alertType} id={alertTime} />
          </>
        )}
      </Paper>
    </Grid>
  );
}

export default ResetPassword;
