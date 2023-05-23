import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType, z as zod } from "zod";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import Form, { InputSection } from "../Form/Form";
import Input from "../Input/Input";

interface SignUpForm {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const SignUp: React.FC = () => {
    const schema: ZodType<SignUpForm> = zod
        .object({
            username: zod
                .string()
                .min(6, { message: "Username must be at least 6 characters long" })
                .max(36, { message: "Username must be at maximum 36 characters long" }),
            email: zod.string().email(),
            password: zod
                .string()
                .min(6, { message: "Password must be at least 6 characters long" })
                .max(36, { message: "Password must be at maximum 36 characters long" }),
            confirmPassword: zod.string().min(1, { message: "Confirm your password" }),
        })
        .refine((schemaData) => schemaData.password === schemaData.confirmPassword, {
            message: "Passwords must match",
            path: ["confirmPassword"],
        });
    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState: { errors },
    } = useForm<SignUpForm>({ resolver: zodResolver(schema), mode: "onBlur" });

    const signUp = () => {
        const userData = {
            username: getValues("username"),
            email: getValues("email"),
            password: getValues("password"),
            confirmPassword: getValues("confirmPassword"),
        };
        console.log(userData);
        reset();
    };
    return (
        <Form title="Sign Up" onSubmit={handleSubmit(signUp)}>
            <InputSection>
                <Input placeholder="Username" styleType="line" register={register} name="username" errors={errors.username} />
                <Input placeholder="Email" type="text" styleType="line" register={register} name="email" errors={errors.email} />
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
