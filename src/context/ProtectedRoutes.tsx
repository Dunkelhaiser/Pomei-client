import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "./UserContext";

const ProtectedRoutes = () => {
    const { isLoggedIn } = useContext(UserContext);
    const isAuth = isLoggedIn;
    return isAuth ? <Outlet /> : <Navigate to="/sign_in" />;
};

export default ProtectedRoutes;
