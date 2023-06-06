import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { z as zod } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Form, { InputSection } from "../../components/Form/Form";
import Layout from "../../components/Layout/Layout";
import { axiosBase } from "../../api/axios";
import Button from "../../components/Button/Button";
import PasswordField from "../../components/PasswordField/PasswordField";

const NewPassword = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const schema = zod
        .object({
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

    type PasswordResetForm = zod.infer<typeof schema>;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PasswordResetForm>({ resolver: zodResolver(schema), mode: "onBlur" });

    const resetPassword = async (data: PasswordResetForm) => {
        try {
            await axiosBase.post(`auth/reset_password/${params.token}`, data);
            navigate("/sign_in");
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data.message);
            }
        }
    };

    useEffect(() => {
        const checkLinkValidity = async () => {
            try {
                await axiosBase.post(`auth/reset_password_check/${params.token}`);
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    if (err.response?.data.message === "Invalid reset password token") {
                        navigate("/reset_password");
                    } else {
                        setError(err.response?.data.message);
                    }
                }
            }
        };
        checkLinkValidity();
    }, []);
    return (
        <Layout type="centered">
            <Form title="Reset Password" onSubmit={handleSubmit(resetPassword)}>
                <InputSection>
                    <PasswordField placeholder="Password" styleType="line" register={register} name="password" errors={errors.password} />
                    <PasswordField
                        placeholder="Confirm Password"
                        styleType="line"
                        register={register}
                        name="confirmPassword"
                        errors={errors.confirmPassword || error}
                    />
                </InputSection>
                <Button label="Reset" type="submit" />
            </Form>
        </Layout>
    );
};
export default NewPassword;
