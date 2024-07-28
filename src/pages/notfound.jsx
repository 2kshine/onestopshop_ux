import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
const NotFoundPage = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return !loading ? (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div
        style={{
          backgroundImage: "url('/images/errorPic.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '30vh',
          minHeight: '350px',
          maxHeight: '500px',
          maxWidth: '500px',
          minWidth: '450px',
          width: '30vw',
          position: 'relative',
        }}
      />
      <Typography variant="h4" gutterBottom>
        Hmmm....
      </Typography>
      <Typography variant="h5" paragraph>
        Page Not Found.
      </Typography>
    </Box>
  ) : (
    <></>
  );
};

export default NotFoundPage;
