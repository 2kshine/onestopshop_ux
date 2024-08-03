import axios from 'axios';
import {
  PrivateAxiosInstance,
  PrivateAxiosInstanceFileUpload,
} from './axios-instance';

const token = localStorage.getItem('token');
const { REACT_APP_API_URL, REACT_APP_AUTHORIZATION_NAME } = process.env;
const axiosInstance = axios.create({
  baseURL: REACT_APP_API_URL,
  timeout: 5000,
  withCredentials: true,
});
const AxiosRequest = async (
  endpoint,
  requestType,
  requestNature,
  values = {}
) => {
  try {
    // Check if the requestNature is Private or Public
    const HEADERS = {
      'Content-Type': 'application/json',
    };
    if (requestNature === 'private') {
      HEADERS[REACT_APP_AUTHORIZATION_NAME] = `Bearer ${token}`;
      HEADERS.cookie = document.cookie;
    }
    console.log('HEADERS', HEADERS);
    if (requestType === 'post') {
      const axiosResponse = await axiosInstance.post(endpoint, values, {
        headers: HEADERS,
      });
      if (axiosResponse.headers[REACT_APP_AUTHORIZATION_NAME]) {
        // For now store the token in local storage
        localStorage.setItem(
          'token',
          axiosResponse.headers[REACT_APP_AUTHORIZATION_NAME]
        );
      }
      return axiosResponse;
    }
    return await axiosInstance.get(endpoint, {
      headers: HEADERS,
    });
  } catch (err) {
    console.log('Error: ', err);
    return err.response ? err.response : err;
  }
};
// Register a user
export const registerUser = async (values) => {
  return await AxiosRequest('/auth/register', 'post', 'public', values);
};

// User login
export const loginUser = async (values) => {
  return await AxiosRequest('/auth/login', 'post', 'public', values);
};

// Logout User
export const logoutUser = async () => {
  return await AxiosRequest('/auth/logout', 'post', 'private');
};

// Update user profiles.
export const updateUserProfile = async (values) => {
  try {
    const response = await PrivateAxiosInstance.patch('/agent/update', values);
    return response;
  } catch (err) {
    console.log(err);
  }
};

// Send Email Verification during registration
export const resendEmailVerification = async (values) => {
  return await AxiosRequest(
    '/auth/resend-email-check',
    'post',
    'public',
    values
  );
};

// Check if email or username is available/valid
export const checkIfEmailOrUserIsAvailable = async (values) => {
  return await AxiosRequest('/auth/check-validity', 'post', 'public', values);
};

// Send Six Digit password code email.
export const sendEmailPasswordReset = async (values) => {
  return await AxiosRequest(
    '/auth/change-password-code',
    'post',
    'public',
    values
  );
};

// Verify Six Digit password code
export const verifyCodePasswordReset = async (values) => {
  return await AxiosRequest('/auth/change-password', 'post', 'public', values);
};

// Change password action
export const setPassword = async (values) => {
  return await AxiosRequest('/auth/set-password', 'post', 'private', values);
};

// Change password action
export const checkPasswordTokenValidity = async (values) => {
  return await AxiosRequest(
    '/auth/check-password-token-validity',
    'post',
    'private',
    values
  );
};

// Verify Email Address Token
export const verifyEmailAddressToken = async (values) => {
  return await AxiosRequest(
    '/auth/verify-emailaddress',
    'post',
    'public',
    values
  );
};

// Upload profile picture in amazon s3
export const uploadProfilePicture = async (values) => {
  try {
    const response = await PrivateAxiosInstanceFileUpload.post(
      '/google/upload/profile-picture',
      values
    );
    if (response) {
      if (response.headers.token) {
        localStorage.setItem('accessToken', response.headers.token);
      }
    }
    return response;
  } catch (err) {
    console.log(err);
  }
};
