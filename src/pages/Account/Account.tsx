import { useContext } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut, terminateAllSessions } from "../../api/authApi";
import Button from "../../components/Button/Button";
import Layout from "../../components/Layout/Layout";
import { UserContext } from "../../context/UserContext";

const Account = () => {
    const { setUser } = useContext(UserContext);
    const queryClient = useQueryClient();

    const { mutate: signOutHandler } = useMutation({
        mutationFn: () => signOut(),
        onSuccess() {
            toast.success("Signed out successfully");
            queryClient.refetchQueries();
            setUser(null);
        },
    });
    const { mutate: terminateAllSessionsHandler } = useMutation({
        mutationFn: () => terminateAllSessions(),
        onSuccess() {
            toast.success("Terminated all sessions successfully");
            queryClient.refetchQueries();
            setUser(null);
        },
    });
    return (
        <Layout title="Account">
            <Button label="Sign Out" onClick={signOutHandler} />
            <Button label="Terminate" onClick={terminateAllSessionsHandler} />
        </Layout>
    );
};
export default Account;
