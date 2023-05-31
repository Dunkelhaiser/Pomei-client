import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z as zod } from "zod";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import Form, { InputSection } from "../Form/Form";
import Input from "../Input/Input";

type ConflictError = {
    username: string;
    email: string;
};

const SignUp: React.FC = () => {
    const [error, setError] = useState<ConflictError | null>(null);
    const schema = zod
        .object({
            username: zod
                .string()
                .min(6, { message: "Username must be at least 6 characters long" })
                .max(20, { message: "Username must be at maximum 20 characters long" }),
            email: zod.string().email(),
            password: zod
                .string()
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
        reset,
        getValues,
        formState: { errors },
    } = useForm<SignUpForm>({ resolver: zodResolver(schema), mode: "onBlur" });

    const signUp = async (userData: SignUpForm) => {
        const res = await fetch("http://localhost:4000/auth/sign_up", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        const data = await res.json();

        if (res.ok) {
            setError(null);
            reset();
        } else {
            setError(data.error);
        }
    };

    const checkAvailability = async () => {
        const res = await fetch(`http://localhost:4000/auth/sign_up_check`, {
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
        <Form title="Sign Up" onSubmit={handleSubmit(signUp)}>
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
                <Input
                    placeholder="Password"
                    type="password"
                    styleType="line"
                    register={register}
                    name="password"
                    errors={errors.password}
                />
                <Input
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
    );
};
export default SignUp;
