import { useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { z as zod } from "zod";
import toast from "react-hot-toast";
import Button from "../../components/Button/Button";
import Form, { InputSection } from "../../components/Form/Form";
import Input from "../../components/Input/Input";
import PasswordField from "../../components/PasswordField/PasswordField";
import { UserContext } from "../../context/UserContext";
import Layout from "../../components/Layout/Layout";

const SignIn = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const { signIn } = useContext(UserContext);
    const schema = zod.object({
        login: zod.string().nonempty({ message: "Enter your username or email" }),
        password: zod.string().nonempty({ message: "Enter your password" }),
    });

    type SignInForm = zod.infer<typeof schema>;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInForm>({ resolver: zodResolver(schema), mode: "onBlur" });

    const handleSignIn = async (data: SignInForm) => {
        try {
            await signIn(data);
            navigate(from, { replace: true });
        } catch (err) {
            toast.error((err as Error).message);
        }
    };
    return (
        <Layout type="centered">
            <Form title="Sign In" onSubmit={handleSubmit(handleSignIn)}>
                <InputSection>
                    <Input placeholder="Username/Email" styleType="line" register={register} name="login" errors={errors.login} />
                    <PasswordField
                        placeholder="Password"
                        type="password"
                        styleType="line"
                        register={register}
                        name="password"
                        errors={errors.password}
                    />
                </InputSection>
                <Button label="Sign In" type="submit" />
                <Link to="/sign_up">Don&apos;t have an account? Sign up now!</Link>
                <Link to="/reset_password" style={{ fontSize: "0.9rem" }}>
                    Forgot Password
                </Link>
            </Form>
        </Layout>
    );
};
export default SignIn;
