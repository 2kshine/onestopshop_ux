import * as React from 'react';
import {
  createBrowserRouter, createRoutesFromElements, Route
} from 'react-router-dom';
import Login from '../pages/auth/login';
import Register from '../pages/auth/register';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<></>} />
      <Route path='/user-login' element={<Login />} />
      <Route path='/user-register' element={<Register />} />
    </Route>

  )
);
export default router;
