import React from 'react';
import { Typography, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Copyright = (props) => {
  const theme = useTheme();

  return (
      <Typography variant="body2" color={theme.palette.info.main} align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          OneStopShop
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
  );
};

export default Copyright;
