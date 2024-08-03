import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Button,
  TextField,
  CircularProgress,
  Link,
  Grid,
  Box,
  Typography,
  Paper,
  Fade,
  InputAdornment,
  IconButton,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useTheme } from '@mui/material/styles';
import { useFormik } from 'formik';
import Copyright from '../../components/footer/copyright';
import { loginUser } from '../../axios/axios-requests';
import LoginSchema from '../../validations/schema/login-schema';
import Alerts from '../../components/alerts/alerts';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ENUM_ALERT_TYPE } from '../../enum/enum';

function Login() {
  const theme = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTime, setAlertTime] = useState('');
  const navigate = useNavigate();
  const images = [
    '/images/login/image1.jpg',
    '/images/login/image2.jpg',
    '/images/login/image3.jpg',
  ];
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

  const handleAlerts = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setAlertTime(new Date().getTime().toString());
  };
  // Initialize formik with initial values
  const formik = useFormik({
    initialValues: {
      login_user: '',
      Password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      setLoading(true);
      // Register user
      const registerUserResponse = await loginUser(values);
      // console.log('registerUserResponse', registerUserResponse);
      setTimeout(async () => {
        setLoading(false);

        if (
          !registerUserResponse.status ||
          registerUserResponse.status === 500
        ) {
          handleAlerts(
            ENUM_ALERT_TYPE[0],
            'Failed to login the user atm. Please try again later.'
          );
        } else {
          if (registerUserResponse.status !== 200) {
            handleAlerts(ENUM_ALERT_TYPE[2], 'Incorrect username or password');
          } else {
            navigate('/user-profile');
          }
        }
      }, 2000);
    },
  });

  // Password visibility toggle
  const handleClickShowPassword = () => setHidePassword((show) => !show);
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
            One-Stop-Shop Login
          </Typography>
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
              name="login_user"
              value={formik.values.login_user}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              label="Username or Email"
              id="login_user"
              helperText={formik.touched.login_user && formik.errors.login_user}
              error={
                formik.touched.login_user && Boolean(formik.errors.login_user)
              }
            />
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
            <br />

            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={6}>
                <Link
                  href="/reset-password"
                  sx={{
                    cursor: 'pointer',
                    width: '100%', // Ensures the text is full width
                  }}
                >
                  Forgot Password?
                </Link>
              </Grid>
              <Grid item xs={12}>
                {loading ? (
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    style={{ height: '100%' }} // Ensures the container occupies full height
                  >
                    <CircularProgress color="primary" sx={{ mt: 3, mb: 3 }} />
                  </Grid>
                ) : (
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 1, mb: 2 }}
                  >
                    Login
                  </Button>
                )}
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs>
                <Link href="./user-register" variant="body2">
                  {"Don't have an account? Register here"}
                </Link>
              </Grid>
            </Grid>

            <Copyright sx={{ mt: 5 }} />
          </Box>
          <Alerts message={alertMessage} type={alertType} id={alertTime} />
        </Box>
      </Grid>
    </Grid>
  );
}

export default Login;
