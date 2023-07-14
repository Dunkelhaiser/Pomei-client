import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useInfiniteQuery } from "@tanstack/react-query";
import Card from "../../components/Card/Card";
import Layout from "../../components/Layout/Layout";
import { NotesContext } from "../../context/NotesContext";
import Text from "../../components/Text/Text";
import FloatingIcon from "../../components/FloatingIcon/FloatingIcon";
import { UserContext } from "../../context/UserContext";
import { getNotes } from "../../api/notes";
import Loader from "../../components/Loader/Loader";

const Notes = () => {
    const navigate = useNavigate();
    const { notes } = useContext(NotesContext);
    const { isAuthorized } = useContext(UserContext);
    const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ["notes"],
        queryFn: ({ pageParam = 1 }) => getNotes(pageParam, 30, "desc", "updatedAt"),
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

    return (
        <>
            <FloatingIcon icon={faPlus} onClick={() => navigate("/create_note")} />
            {!isAuthorized ? (
                <Layout title="Notes" type="masonry">
                    {notes?.map((note) => (
                        <Card
                            key={note.id}
                            id={note.id}
                            title={note.title}
                            content={note.content}
                            isPinned={note.isPinned}
                            isArchived={note.isArchived}
                            isDeleted={note.isDeleted}
                            folderId={note.folderId}
                            date={note.updatedAt || note.createdAt}
                        />
                    ))}
                    {notes.length < 1 && <Text text="No notes found." type="p" />}
                </Layout>
            ) : (
                <Layout title="Notes" type={isLoading && isAuthorized ? "centered" : "masonry"}>
                    {isError && <Text text="Failed to load notes." type="p" />}
                    {!isLoading &&
                        !isError &&
                        (notesList && notesList.length > 0 ? (
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
                                            folderId={note.folderId}
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
                                        folderId={note.folderId}
                                        date={note.updatedAt || note.createdAt}
                                    />
                                );
                            })
                        ) : (
                            <Text text="No notes found." type="p" />
                        ))}
                    {isLoading || (isFetchingNextPage && <Loader />)}
                </Layout>
            )}
        </>
    );
};
export default Notes;
