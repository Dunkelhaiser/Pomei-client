import axios from "axios";
import { SignUpForm } from "../models/schemas/SignUp";
import { SignInForm } from "../models/schemas/SignIn";
import { EmailRequestForm } from "../models/schemas/EmailRequest";
import { NewPasswordForm } from "../models/schemas/NewPassword";

export const authApi = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/`,
    withCredentials: true,
});

authApi.defaults.headers.common["Content-Type"] = "application/json";

export const refreshAccessTokenFn = async () => {
    const res = await authApi.get("auth/refresh_token");
    return res.data;
};

authApi.interceptors.response.use(
    (response) => response,
    async (err) => {
        const originalRequest = err.config;

        // eslint-disable-next-line no-underscore-dangle
        if (err.response?.data.status === "Unauthorized" && !originalRequest._retry) {
            // eslint-disable-next-line no-underscore-dangle
            originalRequest._retry = true;
            const newAccessToken = await refreshAccessTokenFn();
            originalRequest.headers.Authorization = `Bearer ${newAccessToken.accessToken}`;
            return authApi(originalRequest);
        }
        localStorage.removeItem("user");
        return Promise.reject(err);
    }
);

export const signUp = async (data: SignUpForm) => {
    const res = await authApi.post("auth/sign_up", data);
    return res.data;
};

export const signIn = async (data: SignInForm) => {
    const res = await authApi.post("auth/sign_in", data);
    return res.data;
};

export const signOut = async () => {
    const res = await authApi.get("auth/sign_out");
    return res.data;
};

export const terminateAllSessions = async () => {
    const res = await authApi.get("auth/terminate_all_sessions");
    return res.data;
};

export const fetchUser = async () => {
    const res = await authApi.get("auth/get_auth_user");
    return res.data;
};

export const checkAvailability = async (username: string, email: string) => {
    const res = await authApi.post("auth/sign_up_check", { username, email });
    return res.data;
};

export const verifyUser = async (token: string) => {
    const res = await authApi.get(`auth/verify_user/${token}`);
    return res.data;
};

export const resetPasswordRequest = async (data: EmailRequestForm) => {
    const res = await authApi.post("auth/reset_password_request", data);
    return res.data;
};

export const checkPasswordTokenValidity = async (token: string) => {
    const res = await authApi.post(`auth/reset_password_check/${token}`);
    return res.data;
};

export const resetPassword = async (token: string, data: NewPasswordForm) => {
    const res = await authApi.post(`auth/reset_password/${token}`, data);
    return res.data;
};

export const deleteAccount = async (id: string) => {
    const res = await authApi.delete(`auth/delete_account/${id}`);
    return res.data;
};
