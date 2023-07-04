import { Link } from "react-router-dom";
import { z as zod } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Layout from "../../components/Layout/Layout";
import Button from "../../components/Button/Button";
import Form, { InputSection } from "../../components/Form/Form";
import Input from "../../components/Input/Input";
import { IResError } from "../../api/response";
import { resetPasswordRequest } from "../../api/authApi";

const PasswordReset = () => {
    const schema = zod.object({
        email: zod.string().nonempty({ message: "Enter your email" }).email({ message: "Enter a valid email" }),
    });

    type PasswordResetForm = zod.infer<typeof schema>;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm<PasswordResetForm>({ resolver: zodResolver(schema), mode: "onBlur" });

    const { mutate, isLoading } = useMutation({
        mutationFn: (data: PasswordResetForm) => resetPasswordRequest(data),
        onSuccess() {
            toast.success("Password reset link sent");
            reset();
        },
        onError(err: IResError) {
            toast.error(err.response?.data.status);
        },
    });

    return (
        <Layout type="centered">
            <Form title="Reset Password" onSubmit={handleSubmit((data) => mutate(data))}>
                <InputSection>
                    <Input placeholder="Email" styleType="line" register={register} name="email" errors={errors.email} />
                </InputSection>
                <Button label="Reset" type="submit" disabled={!isValid || isLoading} />
                <Link to="/sign_in">Remembered password? Sign in now!</Link>
            </Form>
        </Layout>
    );
};
export default PasswordReset;
