import { useState } from "react";
import { Link } from "react-router-dom";
import { z as zod } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Form, { InputSection } from "../Form/Form";
import Button from "../Button/Button";
import Input from "../Input/Input";
import client from "../../api/axios";

const PasswordReset: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const schema = zod.object({
        email: zod.string().nonempty({ message: "Enter your email" }).email({ message: "Enter a valid email" }),
    });

    type PasswordResetForm = zod.infer<typeof schema>;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<PasswordResetForm>({ resolver: zodResolver(schema), mode: "onBlur" });

    const resetPasswordRequest = async (data: PasswordResetForm) => {
        try {
            await client.post("reset_password_request", data);
            reset();
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data.message);
            }
        }
    };

    return (
        <Form title="Reset Password" onSubmit={handleSubmit(resetPasswordRequest)}>
            <InputSection>
                <Input placeholder="Email" styleType="line" register={register} name="email" errors={errors.email || error} />
            </InputSection>
            <Button label="Reset" type="submit" />
            <Link to="/sign_in">Remembered password? Sign in now!</Link>
        </Form>
    );
};
export default PasswordReset;
