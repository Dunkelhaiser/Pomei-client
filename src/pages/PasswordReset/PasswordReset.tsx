import { Link } from "react-router-dom";
import { z as zod } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
import { axiosBase } from "../../api/axios";
import Layout from "../../components/Layout/Layout";
import Button from "../../components/Button/Button";
import Form, { InputSection } from "../../components/Form/Form";
import Input from "../../components/Input/Input";

const PasswordReset = () => {
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
            await axiosBase.post("auth/reset_password_request", data);
            toast.success("Password reset link sent");
            reset();
        } catch (err) {
            if (axios.isAxiosError(err)) {
                toast.error(err.response?.data.message);
            }
        }
    };
    return (
        <Layout type="centered">
            <Form title="Reset Password" onSubmit={handleSubmit(resetPasswordRequest)}>
                <InputSection>
                    <Input placeholder="Email" styleType="line" register={register} name="email" errors={errors.email} />
                </InputSection>
                <Button label="Reset" type="submit" />
                <Link to="/sign_in">Remembered password? Sign in now!</Link>
            </Form>
        </Layout>
    );
};
export default PasswordReset;
