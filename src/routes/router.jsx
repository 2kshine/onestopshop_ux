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
import UserProfile from '../pages/user-profile';
import UnauthorizedPage from '../pages/unauthorised';
import ResetPassword from '../pages/auth/reset-password';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<></>} />
      <Route path="/user-login" element={<Login />} />
      <Route path="/user-register" element={<Register />} />
      <Route path="/set-password" element={<SetPassword />} />
      <Route path="/verify-emailaddress" element={<EmailVerification />} />
      <Route path="/user-profile" element={<UserProfile />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Route>
  )
);
export default router;
