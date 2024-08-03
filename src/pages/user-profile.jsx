import React, { useState, useEffect } from 'react';
import {
  Paper,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SwipeableDrawer,
  Drawer,
  IconButton,
  Typography,
  Button,
  Avatar,
  useMediaQuery,
  Box,
  Divider,
  Stack,
} from '@mui/material';
import theme from '../components/theme/theme';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import PhoneIcon from '@mui/icons-material/Phone';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import UserProfileEdit from '../components/helpers/user-profile-edit';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import NavDrawer from '../components/drawer';
import { useDropzone } from 'react-dropzone';
const UserProfile = () => {
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isXLargeScreen, setIsXLargeScreen] = useState(false);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [isAgentLoggedIn, setIsAgentLoggedIn] = useState(false);
  // const [agent, setAgent] = useState(null);
  // setAgent(null);
  const agent = null;
  console.log(isAgentLoggedIn);
  // drawer for edit profiles
  const handleToggleDrawer = () => {
    setOpen(!open);
  };
  const handleSwipeDrawer = () => {
    setOpen2(!open2);
  };
  useEffect(() => {
    const isLoggedIn = document.cookie.indexOf('user_activity');
    if (isLoggedIn >= 0) {
      setIsAgentLoggedIn(true);
    }
  }, []);
  // Initialise formik with initial values, signupschema validation and handle submit.
  const matches = useMediaQuery('(min-width: 1600px)');
  useEffect(() => {
    alterScreenValue();
    // Remove the event listener when the component unmounts
    window.removeEventListener('resize', alterScreenValue);
  }, []);
  const alterScreenValue = () => {
    if (window.innerWidth < '900') {
      setIsMediumScreen(true);
      setIsLargeScreen(false);
      setIsXLargeScreen(false);
    }
    if (window.innerWidth >= '900' && window.innerWidth < '1600') {
      setIsMediumScreen(false);
      setIsLargeScreen(true);
      setIsXLargeScreen(false);
    }
    if (window.innerWidth >= '1600') {
      setIsMediumScreen(false);
      setIsLargeScreen(false);
      setIsXLargeScreen(true);
    }
  };
  window.addEventListener('resize', alterScreenValue);

  // implement react drop zone
  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];

    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      console.log(formData);
      // const response = await uploadProfilePicture(formData);
      // if (response.status !== 201) {
      //   console.log('Failed to upload profile picture');
      // }
    }
  };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    }, // Specify accepted file types
    multiple: false, // Allow only a single file to be dropped
  });

  // if (error) {
  //   console.log(error);
  // }
  return (
    <>
      <NavDrawer />
      <Box>
        <Grid container component="main">
          <Grid
            item
            xs={isMediumScreen && 12}
            sm={isMediumScreen && 12}
            md={isMediumScreen && 12}
            lg={isLargeScreen && 6}
            xl={isXLargeScreen && 4}
          >
            <Box
              p={3}
              display="flex"
              height="100vh"
              width={
                isXLargeScreen ? '33vw' : isMediumScreen ? '100vw' : '49vw'
              }
            >
              <Stack
                spacing={1}
                direction="column"
                alignItems={'center'}
                sx={{ width: '95%' }}
              >
                <Paper
                  elevation={4}
                  sx={{ opacity: 1, '&:hover': { opacity: 0.2 } }}
                  style={{
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    height: '60vh',
                    width: isMediumScreen ? '70vw' : '49vw',
                    maxWidth: '450px',
                    borderRadius: '20px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%',
                      width: '100%',
                    }}
                  >
                    {agent?.data?.profile_picture ? (
                      <img
                        src={agent?.data?.profile_picture}
                        alt="Logo"
                        style={{
                          width: '100%',
                          height: '100%',
                        }}
                      />
                    ) : (
                      <img
                        src="/images/everestrglogoauth.png"
                        alt="Logo"
                        style={{
                          width: '80%',
                          height: '80%',
                          display: 'block',
                          margin: '0 auto',
                        }}
                      />
                    )}

                    <div
                      {...getRootProps()}
                      style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <input {...getInputProps()} />
                    </div>
                  </div>
                </Paper>
                <Typography
                  variant="h6"
                  style={{
                    marginTop: '25px',
                    maxWidth: '450px',
                    width: isMediumScreen ? '70vw' : '49vw',
                  }}
                >
                  <h1>
                    &ldquo;
                    <i> {agent?.data?.bio} </i>
                    &rdquo;
                  </h1>
                </Typography>
              </Stack>
            </Box>
          </Grid>
          {/* Agent Details */}
          <Grid
            item
            xs={isMediumScreen && 12}
            sm={isMediumScreen && 12}
            md={isMediumScreen && 12}
            lg={isLargeScreen && 6}
            xl={isXLargeScreen && 4}
            sx={{
              borderLeft: '1px solid black',
            }}
          >
            <Box
              p={3}
              display="flex"
              overflow={'hidden'}
              width={
                isXLargeScreen ? '33vw' : isMediumScreen ? '100vw' : '49vw'
              }
              justify={'center'}
            >
              <Stack
                spacing={1}
                direction="column"
                alignItems="center"
                sx={{ width: '95%' }}
              >
                {isLargeScreen ? (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '100%',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="h5" color={theme.palette.primary.main}>
                      {agent?.data?.first_name + ' ' + agent?.data?.last_name}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleToggleDrawer}
                    >
                      Edit Profile
                    </Button>
                  </div>
                ) : (
                  <Typography variant="h5" color={theme.palette.primary.main}>
                    {agent?.data?.first_name + ' ' + agent?.data?.last_name}
                  </Typography>
                )}
                <Box
                  p={'2vh'}
                  sx={{ backgroundColor: 'whitesmoke', borderRadius: '20px' }}
                  display="flex"
                  overflow={'hidden'}
                  width="100%"
                  justifyContent="center"
                >
                  <List>
                    <ListItem>
                      <ListItemAvatar>
                        <Stack
                          spacing={1}
                          direction="row"
                          alignContent={'center'}
                          alignItems={'center'}
                        >
                          <Avatar sx={{ bgcolor: theme.palette.success.main }}>
                            <MarkEmailReadIcon />
                          </Avatar>
                          <Divider orientation="vertical" flexItem />
                          <Typography
                            paddingRight="5px"
                            variant="body2"
                            color="textSecondary"
                          >
                            Email:
                          </Typography>
                        </Stack>
                      </ListItemAvatar>
                      <ListItemText primary={agent?.data?.email_address} />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Stack
                          spacing={1}
                          direction="row"
                          alignContent={'center'}
                          alignItems={'center'}
                        >
                          <Avatar sx={{ bgcolor: theme.palette.success.main }}>
                            <PhoneIcon />
                          </Avatar>
                          <Divider orientation="vertical" flexItem />
                          <Typography
                            paddingRight="5px"
                            variant="body2"
                            color="textSecondary"
                          >
                            Mobile:
                          </Typography>
                        </Stack>
                      </ListItemAvatar>
                      <ListItemText primary={agent?.data?.phone} />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Stack
                          spacing={1}
                          direction="row"
                          alignContent={'center'}
                          alignItems={'center'}
                        >
                          <Avatar sx={{ bgcolor: theme.palette.success.main }}>
                            <CardMembershipIcon />
                          </Avatar>
                          <Divider orientation="vertical" flexItem />
                          <Typography
                            paddingRight="5px"
                            variant="body2"
                            color="textSecondary"
                          >
                            License Number:
                          </Typography>
                        </Stack>
                      </ListItemAvatar>
                      <ListItemText primary={agent?.data?.license_number} />
                    </ListItem>
                    <br />
                    {isMediumScreen && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSwipeDrawer}
                        fullWidth
                      >
                        Edit Profile
                      </Button>
                    )}
                  </List>
                </Box>
              </Stack>
            </Box>
          </Grid>
          {/* Edit Profile Form */}
          {isXLargeScreen && (
            <Grid
              item
              xl={isXLargeScreen && 4}
              sx={{
                borderLeft: '1px solid black',
              }}
            >
              <Box
                p={3}
                display="flex"
                overflow={'hidden'}
                height="100vh"
                width="33vw"
                justifyContent={'center'}
              >
                <Stack
                  spacing={1}
                  direction="column"
                  alignItems="center"
                  sx={{ height: '100vh', width: '95%' }}
                >
                  <UserProfileEdit />
                </Stack>
              </Box>
            </Grid>
          )}
        </Grid>
        <Drawer
          anchor="right"
          variant={'temporary'}
          open={open}
          onClose={handleToggleDrawer}
          sx={{
            borderRadius: 2,
          }}
          elevation={20}
          PaperProps={{
            style: {
              width: matches ? 450 : '33vw',
              border: 'groove',
              borderRadius: '0 10px 10px 0', // Add border radius to the left side of the drawer
            },
          }}
        >
          <IconButton onClick={handleToggleDrawer}>
            <CloseRoundedIcon />
          </IconButton>
          <UserProfileEdit />
        </Drawer>
        {!matches && (
          <SwipeableDrawer
            anchor="bottom"
            open={open2}
            onClose={handleSwipeDrawer}
            onOpen={handleSwipeDrawer}
            swipeAreaWidth={56}
            disableSwipeToOpen={false}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <UserProfileEdit />
          </SwipeableDrawer>
        )}
      </Box>
    </>
  );
};

export default UserProfile;
