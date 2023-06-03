import axios, { AxiosError } from "axios";
import React, { createContext, useEffect, useMemo, useState } from "react";

interface SignInForm {
    login: string;
    password: string;
}

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
    signIn: (data: SignInForm) => void;
    isLoggedIn: boolean;
};

const iUserContextState = {
    user: null,
    setUser: () => {},
    signIn: () => {},
    isLoggedIn: false,
};

export const UserContext = createContext<UserContextType>(iUserContextState);

const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const isLoggedIn = useMemo(() => !!(user?.id && user?.email && user.username && user.accessToken), [user]);

    const client = axios.create({
        baseURL: `${import.meta.env.VITE_BACKEND_URL}/auth/`,
    });

    useEffect(() => {
        const controller = new AbortController();
        const fetchUser = async () => {
            try {
                const { data } = await client.get("get_auth_user");
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        };
        if (user?.accessToken) fetchUser();
    }, [user?.accessToken]);

    const signIn = async (data: SignInForm) => {
        try {
            const res = await client.post("sign_in", data);
            console.log(res);
        } catch (err) {
            throw Error((err as AxiosError).response?.data.error);
        }
    };

    const values = useMemo(
        () => ({
            user,
            isLoggedIn,
            signIn,
            setUser,
        }),
        [user]
    );
    return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
