import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { UserContext } from "../../context/UserContext";
import Card from "../../components/Card/Card";
import Layout from "../../components/Layout/Layout";
import { loadArchive } from "../../api/notes";
import Loader from "../../components/Loader/Loader";
import Text from "../../components/Text/Text";

const Archive = () => {
    const { isAuthorized } = useContext(UserContext);
    const { data, isLoading, isError } = useQuery({
        queryKey: ["bin"],
        queryFn: () => loadArchive(1, 6, "desc", "updatedAt"),
        enabled: isAuthorized,
    });
    return (
        <Layout title="Archive" type="masonry">
            {isLoading && <Loader />}
            {isError && <Text text="Failed to load archive." type="p" />}
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
                    <Text text="Archive is empty." type="p" />
                ))}
        </Layout>
    );
};
export default Archive;
