import React, {useState, useEffect} from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import { Typography, Slide } from '@mui/material';
import './alerts.css'
export default function ErrorAlerts({message}) {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [alerts, setAlerts] = useState([]);
  useEffect(() => {
    if (message) {
      // Add new alert to the top of the stack
      const newAlert = {
        id: new Date().getTime(), // Unique ID for each alert
        message: message,
      };

      // Add the new alert to the end of the stack
      setAlerts((prevAlerts) => [...prevAlerts, newAlert]);

      // Automatically remove after 10 seconds
      const timer = setTimeout(() => {
        setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== newAlert.id));
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleClose = (id) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
  };

  return (
    <Stack
      sx={{
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        zIndex: 9999, 
        width: '35%',
      }}
      spacing={2}
    >
      {alerts.map((alert) => (
        <Slide direction="left" key={alert.id} in={true} mountOnEnter unmountOnExit>
          <div className="error-alert-slide">
            <Alert
              severity="error"
              variant="filled"
              onClose={() => handleClose(alert.id)}
              sx={{
                width: '100%',
                borderTopLeftRadius: '10px',
                borderBottomLeftRadius: '10px',
                borderTopRightRadius: '2px',
                borderBottomRightRadius: '2px',
              }}
            >
              <Typography variant="body1"><b>Error:</b> {alert.message}</Typography>
            </Alert>
          </div>
        </Slide>
      ))}
    </Stack>
  );
}