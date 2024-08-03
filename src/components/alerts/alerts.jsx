import React, { useState, useMemo } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import { Typography, Slide } from '@mui/material';
import './alerts.css';
import PropTypes from 'prop-types';

const Alerts = ({ id, message, type }) => {
  const theme = useTheme();
  const [alerts, setAlerts] = useState([]);
  // const timeoutsRef = useRef([]); // Ref to store timeout IDs

  // const [timer, setTimer] = useState([]);
  useMemo(() => {
    if (message) {
      // Add new alert to the top of the stack
      const newAlert = {
        id, // Unique ID for each alert
        message,
        type,
      };

      // Add the new alert to the end of the stack
      setAlerts((prevAlerts) => [...prevAlerts, newAlert]);

      // Automatically remove after 10 seconds
      const timer = setTimeout(() => {
        setAlerts((prevAlerts) =>
          prevAlerts.filter((alert) => alert.id !== newAlert.id)
        );
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [id]);

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
        <Slide direction="left" key={alert.id} in mountOnEnter unmountOnExit>
          <div className={`${type.toLowerCase()}-alert-slide`}>
            <Alert
              severity={alert.type.toLowerCase()}
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
              <Typography variant="body1">{alert.message}</Typography>
            </Alert>
          </div>
        </Slide>
      ))}
    </Stack>
  );
};

Alerts.propTypes = {
  id: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['ERROR', 'SUCCESS', 'WARNING']).isRequired,
};

export default Alerts;
