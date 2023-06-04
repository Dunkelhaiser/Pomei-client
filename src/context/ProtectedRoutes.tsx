import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "./UserContext";

interface Props {
    reverse?: boolean;
}

const ProtectedRoutes: React.FC<Props> = ({ reverse }) => {
    const { isAuthorized } = useContext(UserContext);
    if (reverse) {
        return isAuthorized ? <Navigate to="/" /> : <Outlet />;
    }
    return isAuthorized ? <Outlet /> : <Navigate to="/sign_in" />;
};

export default ProtectedRoutes;
