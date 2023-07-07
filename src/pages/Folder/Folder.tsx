import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import Card from "../../components/Card/Card";
import Layout from "../../components/Layout/Layout";
import Text from "../../components/Text/Text";
import FloatingIcon from "../../components/FloatingIcon/FloatingIcon";
import { UserContext } from "../../context/UserContext";
import Loader from "../../components/Loader/Loader";
import { loadFolder } from "../../api/folders";

const Notes = () => {
    const params = useParams();
    const navigate = useNavigate();
    const { isAuthorized } = useContext(UserContext);
    const { data, isLoading, isError } = useQuery({
        queryKey: ["folder", params.id],
        queryFn: () => loadFolder(`${params.id}`),
        enabled: isAuthorized,
    });
    return (
        <>
            <FloatingIcon icon={faPlus} onClick={() => navigate("/create_note")} />
            <Layout title={data?.folder.title || ""} type={isLoading && isAuthorized ? "centered" : "masonry"}>
                {isLoading && <Loader />}
                {isError && <Text text="Failed to load notes." type="p" />}
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
                                />
                            );
                        })
                    ) : (
                        <Text text="No notes found." type="p" />
                    ))}
            </Layout>
        </>
    );
};
export default Notes;
