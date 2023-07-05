import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import Button from "../../components/Button/Button";
import Form, { InputSection } from "../../components/Form/Form";
import Input from "../../components/Input/Input";
import PasswordField from "../../components/PasswordField/PasswordField";
import Layout from "../../components/Layout/Layout";
import { SignUpForm, schema } from "../../models/schemas/SignUp";
import { checkAvailability, signUp } from "../../api/authApi";
import { IResError } from "../../api/response";

const SignUp = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        getValues,
        setError,
        clearErrors,
        formState: { errors, isValid },
    } = useForm<SignUpForm>({ resolver: zodResolver(schema), mode: "onBlur" });

    const { mutate, isLoading } = useMutation({
        mutationFn: (data: SignUpForm) => {
            return toast.promise(signUp(data), {
                loading: "Signing up...",
                success: "Account created successfully",
                error: "Something went wrong",
            });
        },
        onSuccess() {
            navigate("/sign_in");
        },
        onError(err: IResError) {
            if (axios.isAxiosError(err)) {
                if (err.response?.data.status.username)
                    setError("username", { type: "validate", message: err.response?.data.status.username });
                if (err.response?.data.status.email) setError("email", { type: "validate", message: err.response?.data.status.email });
            } else toast.error("Something went wrong");
        },
    });

    const { mutate: checkAvailabilityHandler } = useMutation({
        mutationFn: () => checkAvailability(getValues("username"), getValues("email")),
        onSuccess() {
            clearErrors("username");
            clearErrors("email");
        },
        onError(err) {
            if (axios.isAxiosError(err)) {
                if (err.response?.data.status.username)
                    setError("username", { type: "validate", message: err.response?.data.status.username });
                if (err.response?.data.status.email) setError("email", { type: "validate", message: err.response?.data.status.email });
            }
        },
    });

    return (
        <Layout type="centered">
            <Form title="Sign Up" onSubmit={handleSubmit((data) => mutate(data))}>
                <InputSection>
                    <Input
                        placeholder="Username"
                        styleType="line"
                        register={register}
                        name="username"
                        errors={errors.username}
                        onKeyUp={() => checkAvailabilityHandler()}
                    />
                    <Input
                        placeholder="Email"
                        type="text"
                        styleType="line"
                        register={register}
                        name="email"
                        errors={errors.email}
                        onKeyUp={() => checkAvailabilityHandler()}
                    />
                    <PasswordField
                        placeholder="Password"
                        type="password"
                        styleType="line"
                        register={register}
                        name="password"
                        errors={errors.password}
                    />
                    <PasswordField
                        placeholder="Confirm Password"
                        type="password"
                        styleType="line"
                        register={register}
                        name="confirmPassword"
                        errors={errors.confirmPassword}
                    />
                </InputSection>
                <Button label="Sign Up" type="submit" disabled={isLoading || !isValid || !!errors.username || !!errors.email} />
                <Link to="/sign_in">Already have an account? Sign in now!</Link>
            </Form>
        </Layout>
    );
};
export default SignUp;
