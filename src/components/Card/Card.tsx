import { forwardRef, lazy, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Styles from "./Card.module.scss";
import ContextMenu from "../ContextMenu/ContextMenu";
import useToggle from "../../hooks/useToggle/useToggle";
import { UserContext } from "../../context/UserContext";
import { NotesContext } from "../../context/NotesContext";
import { archiveNote, deleteNote, duplicateNote, moveToBin, pinNote, removeFromFolder, restoreNote } from "../../api/notes";
import useModal from "../../hooks/useModal/useModal";
import { handleFocus } from "../../utils/handleFocus/handleFocus";

const AddToFolder = lazy(() => import("../AddToFolder/AddToFolder"));
const Confirmation = lazy(() => import("../Confirmation/Confirmation"));

interface Props {
    id: string;
    title?: string;
    content?: string;
    date: string;
    isPinned: boolean;
    isArchived?: boolean;
    isDeleted: boolean;
    folderId?: string;
    rowLimit?: number | "none";
}

type Ref = HTMLDivElement;

const Card = forwardRef<Ref, Props>(({ title, content, date, rowLimit = 25, id, isPinned, isArchived, isDeleted, folderId }, ref) => {
    const { isAuthorized } = useContext(UserContext);
    const { deleteLocalNote, copyLocalNote } = useContext(NotesContext);
    const [expanded, setExpanded] = useToggle();

    const expand = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();
        setExpanded();
    };

    const navigate = useNavigate();

    const { isShowing, showModal, modalRef, hideModal } = useModal();
    const { isShowing: isConfirming, showModal: showConfirmation, modalRef: confirmationRef, hideModal: hideConfirmation } = useModal();
    const queryClient = useQueryClient();

    const { mutate: duplicateNoteHandler, isLoading: isDuplicatingNote } = useMutation({
        mutationFn: (noteId: string) => {
            return toast.promise(duplicateNote(noteId), {
                loading: "Duplicating note...",
                success: (res) => res.status,
                error: (err) => err.response?.data.status,
            });
        },
        onSuccess() {
            queryClient.refetchQueries();
        },
    });
    const { mutate: moveToBinHandler, isLoading: isMovingToBin } = useMutation({
        mutationFn: (noteId: string) => {
            return toast.promise(moveToBin(noteId), {
                loading: "Moving note to bin...",
                success: (res) => res.status,
                error: (err) => err.response?.data.status,
            });
        },
        onSuccess() {
            queryClient.refetchQueries();
        },
    });
    const { mutate: archiveNoteHandler, isLoading: isArchivingNote } = useMutation({
        mutationFn: (noteId: string) => {
            return toast.promise(archiveNote(noteId, isArchived ? "false" : "true"), {
                loading: "Archiving note...",
                success: (res) => res.status,
                error: (err) => err.response?.data.status,
            });
        },
        onSuccess() {
            queryClient.refetchQueries();
        },
    });
    const { mutate: pinNoteHandler, isLoading: isPinningNote } = useMutation({
        mutationFn: (noteId: string) => {
            return toast.promise(pinNote(noteId, isPinned ? "false" : "true"), {
                loading: "Pinning note...",
                success: (res) => res.status,
                error: (err) => err.response?.data.status,
            });
        },
        onSuccess() {
            queryClient.refetchQueries();
        },
    });
    const { mutate: restoreNoteHandler, isLoading: isRestoringNote } = useMutation({
        mutationFn: (noteId: string) => {
            return toast.promise(restoreNote(noteId), {
                loading: "Restoring note...",
                success: (res) => res.status,
                error: (err) => err.response?.data.status,
            });
        },
        onSuccess() {
            queryClient.refetchQueries();
        },
    });
    const { mutate: deleteNoteHandler, isLoading: isDeletingNote } = useMutation({
        mutationFn: (noteId: string) => {
            return toast.promise(deleteNote(noteId), {
                loading: "Deleting note...",
                success: (res) => res.status,
                error: (err) => err.response?.data.status,
            });
        },
        onSuccess() {
            queryClient.refetchQueries();
        },
    });
    const { mutate: removeFromFolderHandler, isLoading: isRemovingFromFolder } = useMutation({
        mutationFn: (noteId: string) => {
            return toast.promise(removeFromFolder(noteId), {
                loading: "Removing note from folder...",
                success: (res) => res.status,
                error: (err) => err.response?.data.status,
            });
        },
        onSuccess() {
            queryClient.refetchQueries();
        },
    });

    const deletedContextOptions = [
        {
            label: "Restore",
            onClick: () => {
                setExpanded(false);
                return !isRestoringNote && restoreNoteHandler(id);
            },
        },
        {
            label: "Delete forever",
            onClick: () => {
                setExpanded(false);
                showConfirmation();
            },
        },
    ];

    const archivedContextOptions = [
        {
            label: "Unarchive",
            onClick: () => {
                setExpanded(false);
                return !isArchivingNote && archiveNoteHandler(id);
            },
        },
        {
            label: "Delete",
            onClick: () => {
                setExpanded(false);
                return !isMovingToBin && moveToBinHandler(id);
            },
        },
    ];

    const authContextOptions = [
        {
            label: isPinned ? "Unpin" : "Pin",
            onClick: () => {
                setExpanded(false);
                return !isPinningNote && pinNoteHandler(id);
            },
        },
        {
            label: "Duplicate",
            onClick: () => {
                setExpanded(false);
                return !isDuplicatingNote && duplicateNoteHandler(id);
            },
        },
        {
            label: "Archive",
            onClick: () => {
                setExpanded(false);
                return !isArchivingNote && archiveNoteHandler(id);
            },
        },
        {
            label: folderId ? "Remove from folder" : "Add to folder",
            onClick: () => {
                setExpanded(false);
                if (folderId) {
                    return !isRemovingFromFolder && removeFromFolderHandler(id);
                }
                return showModal();
            },
        },
        {
            label: "Move to bin",
            onClick: () => {
                setExpanded(false);
                return !isMovingToBin && moveToBinHandler(id);
            },
        },
    ];

    const localContextOptions = [
        {
            label: "Copy",
            onClick: () => {
                copyLocalNote(id);
                setExpanded(false);
            },
        },
        {
            label: "Delete",
            onClick: () => {
                deleteLocalNote(id);
                setExpanded(false);
            },
        },
    ];

    function removeHTMLTags(htmlString: string) {
        const tempElement = document.createElement("div");
        tempElement.innerHTML = htmlString;

        const paragraphs = tempElement.getElementsByTagName("p");

        const plainTextArray = Array.from(paragraphs).map((p) => p.innerText);

        const plainText = plainTextArray.join(" ");

        const trimmedText = plainText.trim();

        return trimmedText;
    }

    return (
        <div
            onClick={() => navigate(`/note/${id}`)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => handleFocus(e, () => navigate(`/note/${id}`))}
            className={`${Styles.card} ${expanded ? Styles.active : ""}`}
            ref={ref}
        >
            <div className={Styles.heading}>
                <div>
                    <h3>{title || "Untitled"}</h3>
                    {isPinned && <FontAwesomeIcon icon={faThumbtack} className={Styles.pin} />}
                </div>
                <FontAwesomeIcon
                    icon={faEllipsis}
                    className={`${Styles.options} ${expanded ? Styles.active : ""}`}
                    role="button"
                    onClick={expand}
                />
                <ContextMenu
                    classRef={Styles.context_menu}
                    isVisible={expanded}
                    outsideClick={() => setTimeout(() => setExpanded(false), 150)}
                    options={
                        !isAuthorized
                            ? localContextOptions
                            : isDeleted
                            ? deletedContextOptions
                            : isArchived
                            ? archivedContextOptions
                            : authContextOptions
                    }
                />
                {isAuthorized && isDeleted && (
                    <Confirmation
                        show={isConfirming}
                        modalRef={confirmationRef}
                        close={hideConfirmation}
                        message="Are you sure you want to delete this note forever?"
                        onConfirm={() => deleteNoteHandler(id)}
                        option="Delete Forever"
                        color="danger"
                        disabled={isDeletingNote}
                    />
                )}
                {isAuthorized && <AddToFolder show={isShowing} modalRef={modalRef} close={hideModal} noteId={id} />}
            </div>
            {isAuthorized ? (
                <p style={{ WebkitLineClamp: rowLimit }}>{removeHTMLTags(content || "")}</p>
            ) : (
                <p style={{ WebkitLineClamp: rowLimit }}>{content}</p>
            )}

            <span className={Styles.date}>
                {new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
            </span>
        </div>
    );
});
Card.displayName = "Note";
export default Card;
