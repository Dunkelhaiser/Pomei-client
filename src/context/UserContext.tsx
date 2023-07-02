import React, { createContext, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthUser as User } from "../models/User";
import { fetchUser } from "../api/authApi";

type UserContextType = {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    isAuthorized: boolean;
};

const iUserContextState = {
    user: null,
    setUser: () => {},
    isAuthorized: false,
};

export const UserContext = createContext<UserContextType>(iUserContextState);

const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const isAuthorized = useMemo(() => !!(user?.id && user?.email && user.username), [user]);

    useQuery({
        queryKey: ["user"],
        queryFn: () => fetchUser(),
        onSuccess(userData) {
            setUser(userData.user);
        },
    });

    const values = useMemo(
        () => ({
            user,
            isAuthorized,
            setUser,
        }),
        [user]
    );
    return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
