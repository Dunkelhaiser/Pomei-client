import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z as zod } from "zod";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Button from "../../components/Button/Button";
import Form, { InputSection } from "../../components/Form/Form";
import Input from "../../components/Input/Input";
import PasswordField from "../../components/PasswordField/PasswordField";
import { UserContext } from "../../context/UserContext";
import Layout from "../../components/Layout/Layout";

type ConflictError = {
    username: string;
    email: string;
};

const SignUp = () => {
    const navigate = useNavigate();
    const { signUp } = useContext(UserContext);
    const [error, setError] = useState<ConflictError | null>(null);

    const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[\w_]+$/;

    const schema = zod
        .object({
            username: zod
                .string()
                .nonempty({ message: "Enter your username" })
                .regex(usernameRegex, { message: "Username can only contain letters, numbers and underscores" })
                .min(6, { message: "Username must be at least 6 characters long" })
                .max(20, { message: "Username must be at maximum 20 characters long" }),
            email: zod.string().nonempty({ message: "Enter your email" }).email({ message: "Enter a valid email" }),
            password: zod
                .string()
                .nonempty({ message: "Enter your password" })
                .min(6, { message: "Password must be at least 6 characters long" })
                .max(36, { message: "Password must be at maximum 36 characters long" }),
            confirmPassword: zod.string().nonempty({ message: "Confirm your password" }),
        })
        .refine((schemaData) => schemaData.password === schemaData.confirmPassword, {
            message: "Passwords must match",
            path: ["confirmPassword"],
        });

    type SignUpForm = zod.infer<typeof schema>;

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm<SignUpForm>({ resolver: zodResolver(schema), mode: "onBlur" });

    const handleSignUp = async (userData: SignUpForm) => {
        try {
            await signUp(userData);
            navigate("/sign_in");
            toast.success("Account created successfully");
        } catch (err) {
            setError(err as ConflictError);
        }
    };

    const checkAvailability = async () => {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/sign_up_check`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: getValues("username"), email: getValues("email") }),
        });
        const data = await res.json();
        if (res.ok) {
            setError(null);
        } else {
            setError(data.error);
        }
    };
    return (
        <Layout type="centered">
            <Form title="Sign Up" onSubmit={handleSubmit(handleSignUp)}>
                <InputSection>
                    <Input
                        placeholder="Username"
                        styleType="line"
                        register={register}
                        name="username"
                        errors={errors.username || error?.username}
                        onKeyUp={checkAvailability}
                    />
                    <Input
                        placeholder="Email"
                        type="text"
                        styleType="line"
                        register={register}
                        name="email"
                        errors={errors.email || error?.email}
                        onKeyUp={checkAvailability}
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
                <Button label="Sign Up" type="submit" />
                <Link to="/sign_in">Already have an account? Sign in now!</Link>
            </Form>
        </Layout>
    );
};
export default SignUp;
