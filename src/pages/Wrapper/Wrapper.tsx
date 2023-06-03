import { Suspense, useContext } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import { UserContext } from "../../context/UserContext";
import { VisitedContext } from "../../context/VisitedContext";
import Loading from "../Loading/Loading";
import Welcome from "../Welcome/Welcome";
import WrapperStyles from "./Wrapper.module.scss";

const Wrapper = () => {
    const { isLoggedIn } = useContext(UserContext);
    const { visitedBefore } = useContext(VisitedContext);
    return (
        <>
            <Sidebar />
            <main className={WrapperStyles.wrapper}>
                <Suspense fallback={<Loading />}>{!visitedBefore && !isLoggedIn ? <Welcome /> : <Outlet />}</Suspense>
            </main>
        </>
    );
};
export default Wrapper;
