import React, { useState, useEffect } from 'react';
import { Avatar, Button, TextField, FormControlLabel, Checkbox, Grid, Box, Typography, Paper, Fade, InputAdornment, IconButton, CircularProgress, Stack, SnackbarContent } from '@mui/material';
import Copyright from '../../components/footer/copyright';
import HomeIcon from '@mui/icons-material/Home';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import LoginSchema from '../../validations/schema/login-schema';
import { loginUser, sendEmailPasswordReset } from '../../axios/axios-requests';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = () => {
  const theme = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const [agreeForm, setAgreeForm] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState('');
  const [resetPassword, setResetPassword] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const [errorValue, setErrorValue] = useState('');
  const images = [
    '/images/login/image1.jpg',
    '/images/login/image2.jpg',
    '/images/login/image3.jpg'
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
    //eslint-disable-next-line
  }, []);
  const navigate = useNavigate();

  const handleAgreeForm = (e) => {
    resetPassword ? <></> : setAgreeForm(e.target.checked)
    ;
  };
  // Password visibility toggle
  const handleClickShowPassword = () => setHidePassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  // Initialize formik with initial values
  const formik = useFormik({
    initialValues: {
      email_address: '',
      password: ''
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setTimeout(async () => {
        setLoading(false);
        const response = await loginUser(values);
        if (response) {
          if (response.data.message.includes('Login Successful.')) {
            localStorage.setItem('accessToken', response.data.token);
            localStorage.setItem('email_address', values.email_address);
            navigate('/user-profile');
          }
        } else {
          setShowError(true);
          setError('Email or password is incorrect. Please try again');
        }
      }, 3000);
    }
  });
  // reset password button
  const handleChange = (e) => {
    setErrorValue('');
    setEmailValue(e.target.value);
  };
  const handlePasswordReset = async () => {
    setLoading2(true);
    setTimeout(async () => {
      const response = await sendEmailPasswordReset({ email_address: emailValue });
      if (response?.status !== 200) {
        setErrorValue('Something went wrong. Please check details and try again later.');
      } else {
        setErrorValue('Email sent successfully. Please check your inbox');
      }
      setLoading2(false);
    }, 3000);
  };
  const handleWeirdError = () => {
    setAgreeForm(false);
    setResetPassword(!resetPassword);
  };
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          position: 'relative',
          backgroundColor: 'whitesmoke',
          overflow: 'hidden' // Hide overflow to prevent background from covering the logo
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
            borderRadius: theme.shape.borderRadius
          }}
        >
          <img src='/images/everestrglogo.png' alt='companyLogo' width='100%' height='100%' />

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
              left: 0
            }}
          />
        </Fade>
      </Grid>

      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >

          <Avatar sx={{ m: 1, bgcolor: theme.palette.success.main }}>
            <HomeIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login User Portal
          </Typography>
          <Box component="form" alignItems={'center'} noValidate sx={{ mt: 1 }} onSubmit={formik.handleSubmit}>
            <TextField
              margin="dense"
              variant='outlined'
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
                formik.touched.email_address && Boolean(formik.errors.email_address)
              }
            />
            <TextField
              margin="dense"
              required
              variant='outlined'
              fullWidth
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Password"
              type={hidePassword ? 'password' : 'text'}
              id="password"
              autoComplete="Use complex password"
              helperText={
                formik.touched.password && formik.errors.password
              }
              error={
                formik.touched.password && Boolean(formik.errors.password)
              }
              InputProps={{
                endAdornment:
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {hidePassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>

              }}

            />
            <FormControlLabel
              onClick={handleAgreeForm}
              control={<Checkbox value="remember" />}
              label="I agree to the terms and conditions"
            />
            <br />
            {showError
              ? (
                <Typography variant="body" color={theme.palette.error.main}>
                  <i>** {error}</i>
                </Typography>
                )
              : <></>}
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
              {loading
                ? (<CircularProgress color='primary' sx={{ mt: 3, mb: 3 }} />)
                : (agreeForm
                    ? (<Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Log Me In
                  </Button>)
                    : (<Button
                    disabled
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Log Me In
                  </Button>))
              }
            </div>
              {resetPassword
                ? (<Stack direction={'column'} paddingTop={'2vh'} spacing={2} alignItems={'center'}>
                <TextField label="Email Address" variant="outlined" onChange={handleChange} fullWidth />
                {errorValue
                  ? <SnackbarContent sx={{ mb: 2 }}
                                message={
                                    `${errorValue}`
                                }/>
                  : <></>}
                {loading2
                  ? (<CircularProgress color='primary' sx={{ mt: 3, mb: 3 }} />)
                  : (<><Button variant="contained" onClick={handlePasswordReset} fullWidth>SEND EMAIL</Button><Button variant="contained" onClick={handleWeirdError} fullWidth>CANCEL</Button></>)}
            </Stack>
                  )
                : (
                    //eslint-disable-next-line
                  <a href='#' onClick={handleWeirdError}>
                    Forgot password?
                  </a>)
              }
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
