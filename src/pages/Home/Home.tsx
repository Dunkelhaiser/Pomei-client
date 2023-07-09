import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useMediaQuery } from "react-responsive";
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
import CreateFolder from "../../components/CreateFolder/CreateFolder";
import useModal from "../../hooks/useModal/useModal";

const Home = () => {
    const { isShowing, showModal, modalRef, hideModal } = useModal();
    const navigate = useNavigate();
    const { isAuthorized } = useContext(UserContext);
    const isLarge = useMediaQuery({ query: "(min-width: 1201px)" });
    const fetchNumber = isLarge ? 5 : 6;

    const {
        data: notes,
        isLoading: isLoadingNotes,
        isError: isErrorNotes,
    } = useQuery({
        queryKey: ["notes_recent", fetchNumber],
        queryFn: () => getNotes(1, fetchNumber, "desc", "updatedAt"),
        enabled: isAuthorized,
    });
    const {
        data: folders,
        isLoading: isLoadingFolders,
        isError: isErrorFolders,
    } = useQuery({
        queryKey: ["folders_recent", fetchNumber],
        queryFn: () => getFolders(1, fetchNumber, "desc", "updatedAt"),
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
                            isPinned={note.isPinned}
                            isArchived={note.isArchived}
                            isDeleted={note.isDeleted}
                            date={note.updatedAt || note.createdAt}
                            rowLimit={6}
                        />
                    ))}
                    {sortedNotesLocal.length < 1 && <Text text="No notes found." type="p" />}
                </section>
            ) : (
                <>
                    <section className={HomeStyles.layout}>
                        {isLoadingNotes && <Loader />}
                        {isErrorNotes && <Text text="Failed to load notes." type="p" />}
                        {!isLoadingNotes &&
                            !isErrorNotes &&
                            (notes?.notes.length > 0 ? (
                                notes?.notes?.map((note) => (
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
                                        rowLimit={6}
                                    />
                                ))
                            ) : (
                                <Text text="No notes found." type="p" />
                            ))}
                    </section>

                    <div className={HomeStyles.heading}>
                        <h2>Latest Folders</h2>
                        <FontAwesomeIcon icon={faPlus} className={HomeStyles.add_icon} onClick={showModal} />
                        <CreateFolder show={isShowing} modalRef={modalRef} close={hideModal} />
                    </div>
                    <section className={HomeStyles.layout}>
                        {isLoadingFolders && isAuthorized && <Loader />}
                        {isErrorFolders && isAuthorized && <Text text="Failed to load folders." type="p" />}
                        {!isLoadingFolders &&
                            !isErrorFolders &&
                            (folders?.folders?.length > 0 ? (
                                folders?.folders?.map((folder) => {
                                    return (
                                        <Folder
                                            key={folder.id}
                                            id={folder.id}
                                            title={folder.title}
                                            color={folder.color}
                                            isPinned={folder.isPinned}
                                        />
                                    );
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
