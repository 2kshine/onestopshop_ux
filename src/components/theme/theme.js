import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#2E77AF'
    },
    secondary: {
      main: '#F5A623'
    },
    error: {
      main: '#FF4136'
    },
    warning: {
      main: '#FF851B'
    },
    info: {
      main: '#39CCCC'
    },
    success: {
      main: '#2ECC40'
    }
  }
});

export default theme;
