import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Loading from "../Loading/Loading";
import WrapperStyles from "./Wrapper.module.scss";

const Wrapper = () => {
    return (
        <>
            <Sidebar />
            <main className={WrapperStyles.wrapper}>
                <Suspense fallback={<Loading />}>
                    <Outlet />
                </Suspense>
            </main>
        </>
    );
};
export default Wrapper;
