import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosBase } from "../../api/axios";
import Button from "../../components/Button/Button";
import Layout from "../../components/Layout/Layout";
import Styles from "./Verification.module.scss";

const Verification = () => {
    const [response, setResponse] = useState<string | null>(null);
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        const verify = async () => {
            try {
                const { data } = await axiosBase.get(`auth/verify_user/${params.token}`);
                setResponse(data.message);
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    setResponse(err.response?.data.message);
                } else {
                    setResponse("Something went wrong");
                }
                console.log(err);
            }
        };
        verify();
    }, []);

    return (
        <Layout type="centered">
            <h2 className={Styles.title}>{response}</h2>
            {response === "Account verified successfully" && <Button label="Sign In" onClick={() => navigate("/sign_in")} />}
            {(response === "Verification has expired" || response === "Invalid verification token") && (
                <Button label="Sign Up" onClick={() => navigate("/sign_up")} />
            )}
        </Layout>
    );
};
export default Verification;
