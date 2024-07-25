import { PrivateAxiosInstance, PublicAxiosInstance, PrivateAxiosInstanceFileUpload } from './axios-instance';
import CommonAxiosError from './axios-error';
import axios from 'axios';
const token = localStorage.getItem('accessToken');
const {REACT_APP_API_URL} = process.env

const AxiosRequest = async (endpoint, requestType, requestNature, values= "" ) => {
  try{
    //Check if the requestNature is Private or Public
    const HEADERS = {
        "Content-Type": "application/json"
    }
    if(requestNature === 'private'){
      HEADERS.Authorization = `Bearer ${token}`
      HEADERS.cookie = document.cookie
    }
    if(requestType === "post"){
      return await axios.post(REACT_APP_API_URL + endpoint, values, {headers:HEADERS});
    }
    return await axios.get(REACT_APP_API_URL + endpoint, {headers:HEADERS})
  }catch(err){
    console.log(err);
    return err
  }
}
//Register a user 
export const registerUser = async (values) => {
  try {
    return await PublicAxiosInstance.post('/auth/register', values);
  } catch (err) {
    console.log(err);
    CommonAxiosError(err);
  }
};

//User login
export const loginUser = async (values) => {
  try {
    return await PublicAxiosInstance.post('/auth/login', values);
  } catch (err) {
    console.log(err);
    CommonAxiosError(err);
  }
};

//Logout User
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
    CommonAxiosError(err);
  }
};

//Update user profiles.
export const updateUserProfile = async (values) => {
  try {
    const response = await PrivateAxiosInstance.patch('/agent/update', values);
    return response;
  } catch (err) {
    console.log(err);
    CommonAxiosError(err);
  }
};

//Send Email Verification during registration
export const sendEmailVerification = async (values) => {
  try {
    const response = await PrivateAxiosInstance.post('/auth/verify-emailaddress', values);
    return response;
  } catch (err) {
    console.log(err);
    CommonAxiosError(err);
  }
};

//Check if email or username is available/valid
export const checkIfEmailOrUserIsAvailable = async (values) => {
  const response = await AxiosRequest('/auth/check-validity/', 'post', 'public', values )
  return response
};

//Send Six Digit password code email.
export const sendEmailPasswordReset = async (values) => {
  try {
    const response = await PublicAxiosInstance.post('/auth/change-password-code', values);
    return response;
  } catch (err) {
    console.log(err);
    CommonAxiosError(err);
  }
};

//Change password action
export const changePassword = async (values) => {
  try {
    const response = await PublicAxiosInstance.post('/auth/change-password', values);
    return response;
  } catch (err) {
    console.log(err);
    CommonAxiosError(err);
  }
};

// Upload profile picture in amazon s3
export const uploadProfilePicture = async (values) => {
  try {
    const response = await PrivateAxiosInstanceFileUpload.post('/google/upload/profile-picture', values);
    if (response) {
      if (response.headers.token) {
        localStorage.setItem('accessToken', response.headers.token);
      }
    }
    return response;
  } catch (err) {
    console.log(err);
    CommonAxiosError(err);
  }
};