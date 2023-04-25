import React, { createContext, useMemo, useState } from "react";

interface User {
    loggedIn: null | boolean;
    username: string | null;
}

type UserContextType = {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
};

const iUserContextState = {
    user: { loggedIn: null, username: null },
    setUser: () => {},
};

export const UserContext = createContext<UserContextType>(iUserContextState);

const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User>({ loggedIn: null, username: null });
    const values = useMemo(
        () => ({
            user,
            setUser,
        }),
        [user]
    );
    return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
