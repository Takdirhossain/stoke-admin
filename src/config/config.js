import axios from 'axios';
export const API_URL = 'http://127.0.0.1:8000';
// export const API_URL = 'https://sellerscomp-backend.vercel.app';
export const PRODUCT_API = 'http://127.0.0.1:8000';

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

      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default API;
