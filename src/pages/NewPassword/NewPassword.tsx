import { useParams, useNavigate } from "react-router-dom";
import { z as zod } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import Form, { InputSection } from "../../components/Form/Form";
import Layout from "../../components/Layout/Layout";
import Button from "../../components/Button/Button";
import PasswordField from "../../components/PasswordField/PasswordField";
import { checkPasswordTokenValidity, resetPassword } from "../../api/authApi";
import { IResError } from "../../api/response";

const NewPassword = () => {
    const params = useParams();
    const navigate = useNavigate();
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
        formState: { errors, isValid },
    } = useForm<PasswordResetForm>({ resolver: zodResolver(schema), mode: "onBlur" });

    useQuery({
        queryKey: ["passwordResetToken", params.token],
        queryFn: () => checkPasswordTokenValidity(`${params.token}`),
        retry: false,
        onError(err: IResError) {
            if (err.response?.data.status === "Invalid reset password token") {
                navigate("/reset_password");
            } else {
                toast.error(err.response?.data.status);
            }
        },
    });

    const { mutate, isLoading } = useMutation({
        mutationFn: (data: PasswordResetForm) => resetPassword(`${params.token}`, data),
        onSuccess() {
            navigate("/sign_in");
            toast.success("Password reset successfully");
        },
        onError(err: IResError) {
            toast.error(err.response?.data.status);
        },
    });

    return (
        <Layout type="centered">
            <Form title="Reset Password" onSubmit={handleSubmit((data) => mutate(data))}>
                <InputSection>
                    <PasswordField placeholder="Password" styleType="line" register={register} name="password" errors={errors.password} />
                    <PasswordField
                        placeholder="Confirm Password"
                        styleType="line"
                        register={register}
                        name="confirmPassword"
                        errors={errors.confirmPassword}
                    />
                </InputSection>
                <Button label="Reset" type="submit" disabled={!isValid || isLoading} />
            </Form>
        </Layout>
    );
};
export default NewPassword;
