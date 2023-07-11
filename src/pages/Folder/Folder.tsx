import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useRef } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
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
    const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ["notes", params.id],
        queryFn: ({ pageParam = 1 }) => loadFolder(`${params.id}`, pageParam, 7, "desc", "updatedAt"),
        getNextPageParam: (lastPage, allPages) => {
            if (allPages.length < lastPage.totalPages) {
                return allPages.length + 1;
            }
            return null;
        },
        enabled: isAuthorized,
    });

    const lastFolderRef = useRef<HTMLDivElement>(null);
    const { ref, entry } = useInView({
        root: lastFolderRef.current,
        threshold: 0,
    });

    useEffect(() => {
        if (entry?.isIntersecting && hasNextPage) fetchNextPage();
    }, [entry]);

    const notesList = data?.pages.flatMap((page) => page.notes);
    const folderData = data?.pages.flatMap((page) => page.folder);

    return (
        <>
            <FloatingIcon icon={faPlus} onClick={() => navigate("/create_note")} />
            <Layout title={(folderData && folderData[0].title) || ""} type={isLoading && isAuthorized ? "centered" : "masonry"}>
                {isError && <Text text="Failed to load folder." type="p" />}
                {!isLoading &&
                    !isError &&
                    (notesList && notesList?.length > 0 ? (
                        notesList?.map((note, i) => {
                            if (i === notesList.length - 1) {
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
                                        ref={ref}
                                    />
                                );
                            }
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
                        <Text text="Folder is empty." type="p" />
                    ))}
                {isLoading || (isFetchingNextPage && <Loader />)}
            </Layout>
        </>
    );
};
export default Notes;
