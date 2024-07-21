import axios from 'axios';
const {REACT_APP_API_URL} = process.env
const token = localStorage.getItem('accessToken');
const cookie = document.cookie;

export const PublicAxiosInstance = axios.create({
  baseURL: REACT_APP_API_URL,
  timeout: 5000,
  withCredentials: true
});
export const PrivateAxiosInstance = axios.create({
  baseURL: REACT_APP_API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    cookie
  },
  timeout: 5000,
  withCredentials: true
});
export const PrivateAxiosInstanceFileUpload = axios.create({
  baseURL: REACT_APP_API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data',
    cookie
  },
  timeout: 5000,
  withCredentials: true
});
