import axios from 'axios';
import qs from 'qs';


const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5173'; 

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }),
})
