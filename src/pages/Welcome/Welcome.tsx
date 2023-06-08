import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Layout from "../../components/Layout/Layout";
import { VisitedContext } from "../../context/VisitedContext";
import WelcomeStyles from "./Welcome.module.scss";

const Welcome = () => {
    const navigate = useNavigate();
    const { setVisited } = useContext(VisitedContext);
    return (
        <Layout type="centered">
            <section className={WelcomeStyles.welcome}>
                <h1 className={WelcomeStyles.title}>Welcome to Pomei!</h1>
                <p className={WelcomeStyles.content}>
                    Sign up to save and access your notes from any device, and enjoy additional features like folders, archive, bin and
                    pinning notes.
                </p>
                <div className={WelcomeStyles.buttons}>
                    <Button
                        label="Skip"
                        color="neutral"
                        styleType="text"
                        onClick={() => {
                            navigate("/home");
                            setVisited();
                        }}
                    />
                    <Button
                        label="Sign Up"
                        onClick={() => {
                            navigate("/sign_in");
                            setVisited();
                        }}
                    />
                </div>
            </section>
        </Layout>
    );
};
export default Welcome;
