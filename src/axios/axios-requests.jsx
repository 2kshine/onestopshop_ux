import axios from 'axios';
import {
  PrivateAxiosInstance,
  PublicAxiosInstance,
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
  values = ''
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
    if (requestType === 'post') {
      const axiosResponse = await axiosInstance.post(endpoint, values, {
        headers: HEADERS,
      });
      console.log(REACT_APP_AUTHORIZATION_NAME);
      console.log(axiosResponse.headers[REACT_APP_AUTHORIZATION_NAME]);
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
  try {
    return await PublicAxiosInstance.post('/auth/login', values);
  } catch (err) {
    console.log(err);
  }
};

// Logout User
export const logoutUser = async () => {
  try {
    const response = await PrivateAxiosInstance.post('/auth/logout');
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
  try {
    return await PublicAxiosInstance.post('/auth/change-password-code', values);
  } catch (err) {
    console.log(err);
  }
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
