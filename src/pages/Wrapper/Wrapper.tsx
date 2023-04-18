import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import WrapperStyles from "./Wrapper.module.scss";

const Wrapper = () => {
    return (
        <>
            <Sidebar />
            <main className={WrapperStyles.wrapper}>
                <Suspense fallback={<h1>Loading...</h1>}>
                    <Outlet />
                </Suspense>
            </main>
        </>
    );
};
export default Wrapper;
