import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Stack,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Link,
  Grid,
  Box,
  Typography,
  Paper,
  Fade,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useTheme } from '@mui/material/styles';
import { useFormik } from 'formik';
import Copyright from '../../components/footer/copyright';
import {
  registerUser,
  resendEmailVerification,
} from '../../axios/axios-requests';
import RegisterSchema from '../../validations/schema/register-schema';
import Alerts from '../../components/alerts/alerts';

function Register() {
  const theme = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const [agreeForm, setAgreeForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendEmail, setResendEmail] = useState(false);
  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTime, setAlertTime] = useState('');
  const { ENUM_ALERT_TYPE } = process.env;

  const images = [
    '/images/login/image1.jpg',
    '/images/login/image2.jpg',
    '/images/login/image3.jpg',
  ];
  // const queryParameters = new URLSearchParams(window.location.search);
  // const confirmationToken = queryParameters.get('confirmation_token');
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false); // Fade out
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFadeIn(true); // Fade in
      }, 800); // Delay the image change to match the fade-out duration
    }, 10000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);
  // const navigate = useNavigate();
  const handleAgreeForm = (e) => {
    setAgreeForm(e.target.checked);
  };

  const handleAlerts = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setAlertTime(new Date().getTime().toString());
  };
  // Initialize formik with initial values
  const formik = useFormik({
    initialValues: {
      email_address: '',
      username: '',
    },
    validationSchema: RegisterSchema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values) => {
      setLoading(true);
      // Register user
      const registerUserResponse = await registerUser(values);
      console.log('registerUserResponse', registerUserResponse);
      setTimeout(async () => {
        if (registerUserResponse.status !== 201) {
          handleAlerts(
            ENUM_ALERT_TYPE[0],
            'Failed to register the user atm. Please try again later.'
          );
        }
        setLoading(false);
        // navigate('/user-profile');
        setResendEmail(true);
        handleAlerts(
          ENUM_ALERT_TYPE[1],
          'We have sent a link to your email address. Please verify it to continue further.'
        );
        delete values.username;
        localStorage.setItem('user-credentials', JSON.stringify(values));
      }, 2000);
    },
  });

  const resendEmailVerificationLink = async () => {
    // Resend email verification link
    const values = localStorage.getItem('user-credentials');
    console.log(JSON.parse(values));
    const parsedValues = JSON.parse(values);
    const response = await resendEmailVerification(parsedValues);
    if (response?.status === 202) {
      handleAlerts(
        ENUM_ALERT_TYPE[1],
        'Email resent success! Please check your inbox'
      );
    }
    if (response?.status === 200) {
      handleAlerts(
        ENUM_ALERT_TYPE[1],
        'Email has already been verified! You can safely close this tab'
      );
    }
    if (response?.status === 404) {
      handleAlerts(ENUM_ALERT_TYPE[0], 'No record found. Please register.');
    }

    if (!response.status || response?.status === 500) {
      handleAlerts(
        ENUM_ALERT_TYPE[0],
        'Something went wrong please try again later'
      );
    }
  };
  return (
    <Grid
      container
      component="main"
      sx={{
        height: '100vh',
        maxWidth: '100rem',
        width: '100vw',
        margin: '0 auto',
      }}
      elevation={1}
    >
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          position: 'relative',
          backgroundColor: 'whitesmoke',
          overflow: 'hidden', // Hide overflow to prevent background from covering the logo
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            zIndex: 1, // Place the logo on top of the background
            padding: theme.spacing(2),
            borderRadius: theme.shape.borderRadius,
          }}
        >
          <img
            src="/images/everestrglogo.png"
            alt="COMPANY LOGO"
            width="100%"
            height="100%"
          />
        </Box>
        <Fade in={fadeIn} timeout={1000}>
          <img
            src={images[currentImageIndex]}
            alt="Background"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute', // Position the background image
              top: 0,
              left: 0,
            }}
          />
        </Fade>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} square>
        <Box
          sx={{
            mx: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh', // Full viewport height
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: theme.palette.success.main }}>
            <HomeIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            One-Stop-Shop Register
          </Typography>
          {resendEmail ? (
            <Stack
              spacing={2}
              paddingTop={2}
              direction="column"
              alignContent="center"
              justifyContent="center"
              flexWrap="wrap"
            >
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={resendEmailVerificationLink}
              >
                Re-send email verification link
              </Button>
              <Typography variant="body2">
                Feel free to click on the button above to resend the
                verification link.
              </Typography>
            </Stack>
          ) : (
            <Box
              component="form"
              alignItems="center"
              noValidate
              sx={{ mt: 1 }}
              onSubmit={formik.handleSubmit}
            >
              <TextField
                margin="dense"
                required
                variant="outlined"
                fullWidth
                name="username"
                value={formik.values.username}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                label="Username"
                id="username"
                helperText={formik.touched.username && formik.errors.username}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
              />
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
              <FormControlLabel
                onClick={handleAgreeForm}
                control={<Checkbox value="remember" />}
                label="I agree to the terms and conditions"
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
                ) : agreeForm ? (
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Register User
                  </Button>
                ) : (
                  <Button
                    disabled
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Register User
                  </Button>
                )}
              </div>
              <Grid container>
                <Grid item xs>
                  <Link href="./user-login" variant="body2">
                    Login as user?
                  </Link>
                </Grid>
              </Grid>

              <Copyright sx={{ mt: 5 }} />
            </Box>
          )}
          <Alerts message={alertMessage} type={alertType} id={alertTime} />
        </Box>
      </Grid>
    </Grid>
  );
}

export default Register;
