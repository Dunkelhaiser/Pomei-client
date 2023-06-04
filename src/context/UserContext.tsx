import axios from "axios";
import React, { createContext, useEffect, useMemo, useState } from "react";

interface SignInForm {
    login: string;
    password: string;
}

type SignUpForm = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};

interface User {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    age: number;
    createdAt: string;
    updatedAt: string;
    accessToken: string;
}

type UserContextType = {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    signUp: (data: SignUpForm) => void;
    signIn: (data: SignInForm) => void;
    signOut: () => void;
    isAuthorized: boolean;
};

const iUserContextState = {
    user: null,
    setUser: () => {},
    signUp: () => {},
    signIn: () => {},
    signOut: () => {},
    isAuthorized: false,
};

export const UserContext = createContext<UserContextType>(iUserContextState);

const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const isAuthorized = useMemo(() => !!(user?.id && user?.email && user.username && user.accessToken), [user]);

    const client = axios.create({
        baseURL: `${import.meta.env.VITE_BACKEND_URL}/auth/`,
    });

    const axiosAuth = axios.create({
        baseURL: `${import.meta.env.VITE_BACKEND_URL}/auth/`,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${user?.accessToken}` },
        withCredentials: true,
    });

    const handleRefreshToken = async () => {
        try {
            const { data } = await client.get("refresh_token", { withCredentials: true });
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setUser((prev) => ({ ...prev, accessToken: data.accessToken }));
            return data.accessToken;
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.log(err.response?.data.error);
            }
            return null;
        }
    };

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await handleRefreshToken();
            } catch (err) {
                console.log(err);
            }
        };
        if (!user?.accessToken) verifyRefreshToken();
    }, []);

    useEffect(() => {
        const requestInterceptor = axiosAuth.interceptors.request.use(
            (config) => {
                if (!config.headers.Authorization) {
                    // eslint-disable-next-line no-param-reassign
                    config.headers.Authorization = `Bearer ${user?.accessToken}`;
                }
                return config;
            },
            (err) => Promise.reject(err)
        );

        const responseInterceptor = axiosAuth.interceptors.response.use(
            (response) => response,
            async (err) => {
                const prevRequest = err.config;
                if (err.response?.status === 401 && !prevRequest.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await handleRefreshToken();
                    prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return axiosAuth(prevRequest);
                }
                return Promise.reject(err);
            }
        );

        return () => {
            axiosAuth.interceptors.request.eject(requestInterceptor);
            axiosAuth.interceptors.response.eject(responseInterceptor);
        };
    }, [user, handleRefreshToken]);

    useEffect(() => {
        const controller = new AbortController();
        const fetchUser = async () => {
            try {
                const { data } = await axiosAuth.get("get_auth_user", {
                    signal: controller.signal,
                });
                setUser((prev) => ({ ...prev, ...data.user }));
            } catch (err) {
                console.log(err);
            }
        };
        if (user?.accessToken) fetchUser();
    }, [user?.accessToken]);

    const signUp = async (data: SignUpForm) => {
        try {
            await client.post("sign_up", data);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                throw err.response?.data.error;
            }
        }
    };

    const signIn = async (data: SignInForm) => {
        try {
            const res = await client.post("sign_in", data, { withCredentials: true });
            setUser(res.data);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                throw Error(err.response?.data.error);
            }
        }
    };

    const signOut = async () => {
        try {
            await client.get("sign_out", { withCredentials: true });
            setUser(null);
        } catch (err) {
            setUser(null);
        }
    };

    const values = useMemo(
        () => ({
            user,
            isAuthorized,
            signUp,
            signIn,
            signOut,
            setUser,
        }),
        [user]
    );
    return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
