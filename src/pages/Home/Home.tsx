import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Card from "../../components/Card/Card";
import Folder from "../../components/Folder/Folder";
import Layout from "../../components/Layout/Layout";
import { NotesContext } from "../../context/NotesContext";
import { UserContext } from "../../context/UserContext";
import HomeStyles from "./Home.module.scss";
import Text from "../../components/Text/Text";
import { getNotes } from "../../api/notes";
import Loader from "../../components/Loader/Loader";
import { getFolders } from "../../api/folders";

const Home = () => {
    const navigate = useNavigate();
    const { isAuthorized } = useContext(UserContext);
    const {
        data: notes,
        isLoading: isLoadingNotes,
        isError: isErrorNotes,
    } = useQuery({
        queryKey: ["notes"],
        queryFn: () => getNotes(1, 6, "desc", "updatedAt"),
        enabled: isAuthorized,
    });
    const {
        data: folders,
        isLoading: isLoadingFolders,
        isError: isErrorFolders,
    } = useQuery({
        queryKey: ["folders"],
        queryFn: () => getFolders(1, 6, "desc", "updatedAt"),
        enabled: isAuthorized,
    });
    const { notes: notesLocal } = useContext(NotesContext);
    const sortedNotesLocal = notesLocal.sort(
        (a, b) => new Date(b.updatedAt || b.createdAt).getTime() - new Date(a.updatedAt || a.createdAt).getTime()
    );
    return (
        <Layout title="Home">
            <div className={HomeStyles.heading}>
                <h2>Latest Notes</h2>
                <FontAwesomeIcon icon={faPlus} className={HomeStyles.add_icon} onClick={() => navigate("/create_note")} />
            </div>
            {!isAuthorized ? (
                <section className={HomeStyles.layout}>
                    {sortedNotesLocal.map((note) => (
                        <Card
                            key={note.id}
                            id={note.id}
                            title={note.title}
                            content={note.content}
                            date={note.updatedAt || note.createdAt}
                            rowLimit={6}
                        />
                    ))}
                    {sortedNotesLocal.length < 1 && <Text text="No notes found." type="p" />}
                </section>
            ) : (
                <>
                    {isLoadingNotes && <Loader />}
                    {isErrorNotes && <Text text="Failed to load notes." type="p" />}
                    {!isLoadingNotes && !isErrorNotes && (
                        <section className={HomeStyles.layout}>
                            {notes?.notes.length > 0 ? (
                                notes?.notes?.map((note) => (
                                    <Card
                                        key={note.id}
                                        id={note.id}
                                        title={note.title}
                                        content={note.content}
                                        date={note.updatedAt || note.createdAt}
                                        rowLimit={6}
                                    />
                                ))
                            ) : (
                                <Text text="No notes found." type="p" />
                            )}
                        </section>
                    )}

                    <div className={HomeStyles.heading}>
                        <h2>Latest Folders</h2>
                        <FontAwesomeIcon icon={faPlus} className={HomeStyles.add_icon} />
                    </div>
                    <section className={HomeStyles.layout}>
                        {isLoadingFolders && isAuthorized && <Loader />}
                        {isErrorFolders && isAuthorized && <Text text="Failed to load folders." type="p" />}
                        {!isLoadingFolders &&
                            !isErrorFolders &&
                            (folders?.folders?.length > 0 ? (
                                folders?.folders?.map((folder) => {
                                    return <Folder key={folder.id} title={folder.title} color={folder.color} />;
                                })
                            ) : (
                                <Text text="No folders found." type="p" />
                            ))}
                    </section>
                </>
            )}
        </Layout>
    );
};
export default Home;
