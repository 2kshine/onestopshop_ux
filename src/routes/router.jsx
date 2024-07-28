import * as React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import Login from '../pages/auth/login';
import Register from '../pages/auth/register';
import SetPassword from '../pages/auth/set-password';
import EmailVerification from '../pages/auth/email-verification';
import Dashboard from '../pages/dashboard';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<></>} />
      <Route path="/user-login" element={<Login />} />
      <Route path="/user-register" element={<Register />} />
      <Route path="/set-password" element={<SetPassword />} />
      <Route path="/verify-emailaddress" element={<EmailVerification />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Route>
  )
);
export default router;
