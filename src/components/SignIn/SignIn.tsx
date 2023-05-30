import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { z as zod } from "zod";
import Button from "../Button/Button";
import Form, { InputSection } from "../Form/Form";
import Input from "../Input/Input";
import PasswordField from "../PasswordField/PasswordField";

const SignIn: React.FC = () => {
    const schema = zod.object({
        username: zod.string().nonempty({ message: "Enter your username or email" }),
        password: zod.string().nonempty({ message: "Enter your password" }),
    });

    type SignInForm = zod.infer<typeof schema>;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<SignInForm>({ resolver: zodResolver(schema), mode: "onBlur" });

    const signIn = (userData: SignInForm) => {
        console.log(userData);
        reset();
    };
    return (
        <Form title="Sign In" onSubmit={handleSubmit(signIn)}>
            <InputSection>
                <Input placeholder="Username/Email" styleType="line" register={register} name="username" errors={errors.username} />
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
            <Link to="/password_reset" style={{ fontSize: "0.9rem" }}>
                Forgot Password
            </Link>
        </Form>
    );
};
export default SignIn;
