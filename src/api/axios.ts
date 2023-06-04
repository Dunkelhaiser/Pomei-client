import axios from "axios";

export default axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/auth/`,
});

export const axiosAuth = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/auth/`,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});
