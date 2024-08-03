import React, { useEffect, useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  Box,
  Divider,
  IconButton,
  ListItemButton,
  Avatar,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useTheme } from '@mui/material/styles';
import LogoutIcon from '@mui/icons-material/Logout';
import { logoutUser } from '../axios/axios-requests';
import { useNavigate } from 'react-router-dom';

const NavDrawer = () => {
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const agent = null;

  useEffect(() => {}, []);

  const handleToggleDrawer = () => {
    setOpen(!open);
  };
  const handleLogout = async () => {
    const logoutResponse = await logoutUser();
    // console.log('logoutResponse', logoutResponse);
    localStorage.removeItem('token');
    setTimeout(() => {
      if (logoutResponse && logoutResponse.status === 200) {
        localStorage.removeItem('token');
        navigate('/user-login');
      } else {
        document.cookie = `user_activity=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
        navigate('/unauthorized');
      }
    }, 1000);
  };
  return (
    <div style={{ paddingLeft: '2vw' }}>
      {/* Button to open/close the drawer */}
      <IconButton
        onClick={handleToggleDrawer}
        edge="start"
        color="inherit"
        aria-label="menu"
      >
        <MenuRoundedIcon />
      </IconButton>

      {/* Button to open/close the drawer */}
      {/* Backdrop */}
      <Drawer
        anchor="left"
        variant={'temporary'}
        open={open}
        onClose={handleToggleDrawer}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          borderRadius: 2,
        }}
        elevation={20}
        PaperProps={{
          style: {
            width: 470,
            border: 'groove',
            borderRadius: '0 10px 10px 0', // Add border radius to the left side of the drawer
          },
        }}
      >
        <IconButton onClick={handleToggleDrawer}>
          <CloseRoundedIcon />
        </IconButton>
        <Divider sx={{ pt: 2 }} />
        <div style={{ paddingTop: '15px' }} />
        <Stack
          alignItems="center"
          sx={{ alignContent: 'center', pt: 4, pb: 2 }}
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
        >
          <Avatar
            alt="Remy Sharp"
            src={agent?.data?.profile_picture}
            sx={{ width: 100, height: 100 }}
          />
          <Stack
            sx={{ pt: 4, pb: 2 }}
            direction="column"
            divider={
              <Divider
                orientation="horizontal"
                sx={{ width: '50%' }}
                flexItem
              />
            }
            spacing={0}
          >
            <Typography variant="h5" gutterBottom>
              {agent?.data?.first_name + ' ' + agent?.data?.last_name}
            </Typography>
            <p>{agent?.data?.email_address}</p>
          </Stack>
        </Stack>
        <Divider sx={{ pt: 2 }} />
        <div style={{ paddingTop: '15px' }} />
        <Paper
          variant="outlined"
          square
          elevation={0}
          sx={{
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 1,
            borderRadius: 2,
            p: 2,
            minWidth: 300,
          }}
        >
          <List>
            <ListItem>
              <ListItemIcon>
                <ManageAccountsIcon />
              </ListItemIcon>
              <ListItemButton sx={{ borderRadius: 5 }}>Profile</ListItemButton>
            </ListItem>
            <Divider />

            <ListItem>
              <ListItemIcon>
                <AddHomeWorkIcon />
              </ListItemIcon>
              <ListItemButton sx={{ borderRadius: 5 }}>Property</ListItemButton>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemButton onClick={handleLogout} sx={{ borderRadius: 5 }}>
                Logout
              </ListItemButton>
            </ListItem>
            <Divider />
          </List>
        </Paper>

        <Box
          sx={{
            textAlign: 'center',
            padding: theme.spacing(10),
            borderRadius: theme.shape.borderRadius,
            backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent background
            width: '100%',
          }}
        >
          <img src="/images/everestrglogo.png" width="100%" height="100%" />
        </Box>
      </Drawer>
      {/* The actual drawer */}
    </div>
  );
};

export default NavDrawer;
