import axios from 'axios';
export const API_URL = 'http://localhost:8000';
// export const API_URL = 'https://sellerscomp-backend.vercel.app';
export const PRODUCT_API = 'https://sellerscompaws.com';

const API = axios.create({
  baseURL: API_URL,
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {

      // window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default API;
