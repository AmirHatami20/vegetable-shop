import axios from 'axios'
import {BASE_URL} from "./apiPaths.js";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
})

// Request Interceptor
axiosInstance.interceptors.request.use(
    config => {
        const accessToken = localStorage.getItem("token");

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

// Response Interceptor
axiosInstance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            if (error.response.status === 401) {
                console.log("Unauthorized Redirecting to login");

            } else if (error.response.status === 500) {
                console.log("Server Error.Please try again later");

            } else if (error.code === 'ECONNREFUSED') {
                console.log("Request timeout. Please try again later");
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;