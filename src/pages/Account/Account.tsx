import { useContext } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAccount, signOut, terminateAllSessions } from "../../api/authApi";
import Button from "../../components/Button/Button";
import Layout from "../../components/Layout/Layout";
import { UserContext } from "../../context/UserContext";

const Account = () => {
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
    return (
        <Layout title="Account" type="default">
            <Button label="Sign Out" onClick={signOutHandler} />
            <Button label="Terminate" onClick={terminateAllSessionsHandler} />
            <Button label="Delete Account" color="danger" onClick={deleteAccountHandler} />
        </Layout>
    );
};
export default Account;
