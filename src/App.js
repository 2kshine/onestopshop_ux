import React from 'react';
import { Container } from '@mui/material';
import {
  RouterProvider
} from 'react-router-dom';

import router from './routes/router';
const App = () => {
  return (
    <Container maxWidth='false' disableGutters>
      <RouterProvider router={router} />
    </Container>
  );
};

export default App;
