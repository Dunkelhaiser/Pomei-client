import { Suspense, useContext } from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import { UserContext } from "../../context/UserContext";
import { VisitedContext } from "../../context/VisitedContext";
import Loading from "../Loading/Loading";
import Welcome from "../Welcome/Welcome";
import Styles from "./Wrapper.module.scss";

const Wrapper = () => {
    const { isAuthorized } = useContext(UserContext);
    const { visitedBefore } = useContext(VisitedContext);
    return (
        <>
            <Sidebar />
            <main className={Styles.wrapper}>
                <div className={Styles.toast_container}>
                    <Toaster />
                </div>
                <Suspense fallback={<Loading />}>{!visitedBefore && !isAuthorized ? <Welcome /> : <Outlet />}</Suspense>
            </main>
        </>
    );
};
export default Wrapper;
