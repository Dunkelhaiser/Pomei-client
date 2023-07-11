import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Button from "../../components/Button/Button";
import Form, { InputSection } from "../../components/Form/Form";
import Input from "../../components/Input/Input";
import PasswordField from "../../components/PasswordField/PasswordField";
import Layout from "../../components/Layout/Layout";
import { SignInForm, schema } from "../../models/schemas/SignIn";
import { signIn } from "../../api/authApi";

const SignIn = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<SignInForm>({ resolver: zodResolver(schema), mode: "onBlur" });

    const queryClient = useQueryClient();

    const { mutate, isLoading } = useMutation({
        mutationFn: (data: SignInForm) => {
            return toast.promise(signIn(data), {
                loading: "Signing in...",
                success: "Signed in successfully",
                error: (err) => err.response?.data.status,
            });
        },
        onSuccess() {
            navigate(from, { replace: true });
            queryClient.refetchQueries();
        },
    });

    return (
        <Layout type="centered">
            <Form title="Sign In" onSubmit={handleSubmit((data) => mutate(data))}>
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
                <Button label="Sign In" type="submit" disabled={isLoading || !isValid} />
                <Link to="/sign_up">Don&apos;t have an account? Sign up now!</Link>
                <Link to="/reset_password" style={{ fontSize: "0.9rem" }}>
                    Forgot Password
                </Link>
            </Form>
        </Layout>
    );
};
export default SignIn;
