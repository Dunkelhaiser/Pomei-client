import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "./UserContext";

const ProtectedRoutes = () => {
    const { user } = useContext(UserContext);
    const isAuth = user.loggedIn;
    return isAuth ? <Outlet /> : <Navigate to="/sign_in" />;
};

export default ProtectedRoutes;
