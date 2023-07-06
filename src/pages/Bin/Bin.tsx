import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import Text from "../../components/Text/Text";
import Layout from "../../components/Layout/Layout";
import { UserContext } from "../../context/UserContext";
import { emptyBin, loadBin } from "../../api/notes";
import Loader from "../../components/Loader/Loader";

const Bin = () => {
    const { isAuthorized } = useContext(UserContext);
    const { data, isLoading, isError } = useQuery({
        queryKey: ["bin"],
        queryFn: () => loadBin(1, 6, "desc", "deletedAt"),
        enabled: isAuthorized,
    });
    const queryClient = useQueryClient();
    const { mutate, isLoading: isEmptying } = useMutation({
        mutationFn: () => {
            return toast.promise(emptyBin(), {
                loading: "Emptying bin...",
                success: (res) => res.status,
                error: (err) => err.response?.data.status,
            });
        },
        onSuccess() {
            queryClient.refetchQueries();
        },
    });
    return (
        <Layout
            title="Bin"
            controls={
                <Button
                    label="Empty Bin"
                    color="danger"
                    fontSize={1}
                    styleType="text"
                    icon={<FontAwesomeIcon icon={faTrash} />}
                    disabled={isEmptying || isLoading || isError || !data?.notes?.length}
                    onClick={mutate}
                />
            }
            type="masonry"
        >
            {isLoading && <Loader />}
            {isError && <Text text="Failed to load bin." type="p" />}
            {!isLoading &&
                !isError &&
                (data?.notes?.length > 0 ? (
                    data?.notes?.map((note) => {
                        return (
                            <Card
                                key={note.id}
                                id={note.id}
                                title={note.title}
                                content={note.content}
                                isPinned={note.isPinned}
                                isArchived={note.isArchived}
                                isDeleted={note.isDeleted}
                                date={note.updatedAt || note.createdAt}
                                rowLimit={6}
                            />
                        );
                    })
                ) : (
                    <Text text="Bin is empty." type="p" />
                ))}
        </Layout>
    );
};
export default Bin;
