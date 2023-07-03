import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Button from "../../components/Button/Button";
import Layout from "../../components/Layout/Layout";
import Styles from "./Verification.module.scss";
import { verifyUser } from "../../api/authApi";
import { IError } from "../../api/response";

const Verification = () => {
    const navigate = useNavigate();
    const params = useParams();

    const { mutate, error, data } = useMutation({
        mutationFn: (token: string) => {
            return toast.promise(verifyUser(token), {
                loading: "Verifying account...",
                success: "Account verified successfully",
                error: "Verification failed",
            });
        },
    });

    useEffect(() => {
        mutate(`${params.token}`);
    }, []);

    return (
        <Layout type="centered">
            <h2 className={Styles.title}>{(error as IError)?.response?.data?.message || data?.message}</h2>
            {data?.message === "Account verified successfully" && <Button label="Sign In" onClick={() => navigate("/sign_in")} />}
            {((error as IError)?.response?.data?.message === "Verification has expired" ||
                (error as IError)?.response?.data?.message === "Invalid verification token") && (
                <Button label="Sign Up" onClick={() => navigate("/sign_up")} />
            )}
        </Layout>
    );
};
export default Verification;
