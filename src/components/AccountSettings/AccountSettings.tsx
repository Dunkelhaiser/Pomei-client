import { useForm } from "react-hook-form";
import { useContext, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Input from "../Input/Input";
import Styles from "./AccountSettings.module.scss";
import { UserContext } from "../../context/UserContext";
import { AccountForm, schema } from "../../models/schemas/Account";
import { changePassword, deleteAccount, signOut, terminateAllSessions, updateAccount } from "../../api/authApi";
import Button from "../Button/Button";
import Layout from "../Layout/Layout";
import Confirmation from "../Confirmation/Confirmation";
import useModal from "../../hooks/useModal/useModal";
import { ChangePasswordForm, schema as schemaPassword } from "../../models/schemas/ChangePassword";
import PasswordField from "../PasswordField/PasswordField";

const AccountSettings: React.FC = () => {
    const { isShowing, showModal, modalRef, hideModal } = useModal();
    const { setUser, user } = useContext(UserContext);
    const queryClient = useQueryClient();

    const { mutate: signOutHandler } = useMutation({
        mutationFn: () => {
            return toast.promise(signOut(), {
                loading: "Signing out...",
                success: "Signed out successfully",
                error: (err) => err.response?.data.status,
            });
        },
        onSuccess() {
            queryClient.refetchQueries();
            setUser(null);
        },
    });
    const { mutate: terminateAllSessionsHandler } = useMutation({
        mutationFn: () => {
            return toast.promise(terminateAllSessions(), {
                loading: "Terminating sessions...",
                success: "Terminated all sessions successfully",
                error: (err) => err.response?.data.status,
            });
        },
        onSuccess() {
            queryClient.refetchQueries();
            setUser(null);
        },
    });
    const { mutate: deleteAccountHandler } = useMutation({
        mutationFn: () => {
            return toast.promise(deleteAccount(`${user?.id}`), {
                loading: "Deleting account...",
                success: "Account deleted successfully",
                error: (err) => err.response?.data.status,
            });
        },
        onSuccess() {
            setUser(null);
        },
    });
    const { mutate: updateAccountHandler, isLoading: isUpdating } = useMutation({
        mutationFn: (data: AccountForm) => {
            return toast.promise(updateAccount(data, `${user?.id}`), {
                loading: "Updating account...",
                success: (res) => res.status,
                error: (err) => err.response?.data.status,
            });
        },
        onSuccess() {
            queryClient.refetchQueries();
        },
    });
    const { mutate: changePasswordHandler, isLoading: isChangingPassword } = useMutation({
        mutationFn: (data: ChangePasswordForm) => {
            return toast.promise(changePassword(data, `${user?.id}`), {
                loading: "Changing password...",
                success: (res) => res.status,
                error: (err) => err.response?.data.status,
            });
        },
        onSuccess() {
            queryClient.refetchQueries();
        },
    });

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isValid },
    } = useForm<AccountForm>({ resolver: zodResolver(schema), mode: "onBlur" });
    const {
        register: registerPassword,
        handleSubmit: handleSubmitPassword,
        formState: { errors: errorsPassword, isValid: isValidPassword },
    } = useForm<ChangePasswordForm>({ resolver: zodResolver(schemaPassword), mode: "onBlur" });

    useEffect(() => {
        if (user) {
            setValue("username", user.username);
            setValue("email", user.email);
        }
    }, []);

    return (
        <div className={Styles.settings}>
            <h3>Personal Info</h3>
            <form onSubmit={handleSubmit((data) => updateAccountHandler(data))} className={Styles.form}>
                <div className={Styles.input_field}>
                    <Input styleType="line" placeholder="Username" name="username" register={register} errors={errors.username} />
                    <Input styleType="line" placeholder="Email" name="email" register={register} errors={errors.email} />
                </div>
                <Button type="submit" fontSize={1} label="Update" disabled={!isValid || isUpdating} />
            </form>
            <h3>Security</h3>
            <form onSubmit={handleSubmitPassword((data) => changePasswordHandler(data))} className={Styles.form}>
                <PasswordField
                    styleType="line"
                    placeholder="Current Password"
                    name="currentPassword"
                    register={registerPassword}
                    errors={errorsPassword.currentPassword}
                />
                <PasswordField
                    styleType="line"
                    placeholder="New Password"
                    name="newPassword"
                    register={registerPassword}
                    errors={errorsPassword.newPassword}
                />
                <PasswordField
                    styleType="line"
                    placeholder="Confirm New Password"
                    name="confirmNewPassword"
                    register={registerPassword}
                    errors={errorsPassword.confirmNewPassword}
                />
                <Button type="submit" fontSize={1} label="Update" disabled={!isValidPassword || isChangingPassword} />
            </form>
            <h3>Controlls</h3>
            <Layout type="default">
                <Button label="Sign Out" fontSize={1} onClick={signOutHandler} />
                <Button label="Terminate" fontSize={1} onClick={terminateAllSessionsHandler} />
                <Button label="Delete Account" fontSize={1} color="danger" onClick={showModal} />
            </Layout>
            <Confirmation
                show={isShowing}
                modalRef={modalRef}
                close={hideModal}
                message="Are you sure you want to delete your account?"
                onConfirm={deleteAccountHandler}
                option="Delete"
                color="danger"
            />
        </div>
    );
};
export default AccountSettings;
