import React, { useState, useEffect } from 'react';
import { Avatar, Button, TextField, FormControlLabel, Checkbox, CircularProgress, Link, Grid, Box, Typography, Paper, Fade } from '@mui/material';
import Copyright from '../../components/footer/copyright';
import HomeIcon from '@mui/icons-material/Home';
import { useTheme } from '@mui/material/styles';
import { useFormik } from 'formik';
import { registerUser } from '../../axios/axios-requests';
import RegisterSchema from '../../validations/schema/register-schema';
import { useNavigate } from 'react-router-dom';
import ErrorAlerts from "../../components/alerts/alerts"
const Register = () => {
  const theme = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const [agreeForm, setAgreeForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [error, setError] = useState('');
  const images = [
    '/images/login/image1.jpg',
    '/images/login/image2.jpg',
    '/images/login/image3.jpg'
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
        //eslint-disable-next-line
  }, []);
  // const navigate = useNavigate();
  const handleAgreeForm = (e) => {
    setAgreeForm(e.target.checked);
  };

  // Initialize formik with initial values
  const formik = useFormik({
    initialValues: {
      email_address: '',
      username: ''
    },
    validationSchema: RegisterSchema,
    validateOnBlur:true,
    validateOnChange:false,
    onSubmit: async (values) => {
      console.log(values);
      // setLoading(true);
      // Register email address
      setShowEmailError(true);
      let random = Math.random(0, 10)
      setError(`Failed to register the user atm. Please try again later. ${random}`);
      // const createUser = await registerUser(values);
      // setTimeout(async () => {
      //   // navigate('/user-profile');
      //   // implement redux
      //   if (createUser.data.status !== 201) {
      //     setShowEmailError(true);
      //     setError('Failed to register the user atm. Please try again later.');
      //   }
      //   localStorage.setItem('accessToken', createUser.data.token);
      //   localStorage.setItem('email_address', values.email_address);
      //   setLoading(false);
      // }, 2000);
    }
  });
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
          <img src='/images/everestrglogo.png' alt='COMPANY LOGO' width='100%' height='100%' />

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
            One-Stop-Shop Register
          </Typography>
          <Box component="form" alignItems={'center'} noValidate sx={{ mt: 1 }} onSubmit={formik.handleSubmit}>
          <TextField
              margin="dense"
              required
              variant='outlined'
              fullWidth
              name="username"
              value={formik.values.username}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              label="Username"
              id="username"
              helperText={
                formik.touched.username && formik.errors.username 
              }
              error={
                formik.touched.username 
                &&
                Boolean(formik.errors.username)
              }
            />
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
            <FormControlLabel
              onClick={handleAgreeForm}
              control={<Checkbox value="remember" />}
              label="I agree to the terms and conditions"
            />
            <br />
            {showEmailError
              ? (
                <Typography variant="body" color={theme.palette.error.main}>
                  <i>** {error}</i>
                </Typography>
                )
              : <></>}
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
              {loading
                ? (<CircularProgress color='primary' sx={{ mt: 3, mb: 3 }} />)
                : agreeForm
                  ? (<Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Register User
                    </Button>)
                  : (<Button
                    disabled
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Register User
                    </Button>)
              }
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
          <ErrorAlerts message={error} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Register;
