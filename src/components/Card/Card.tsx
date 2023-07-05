import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Styles from "./Card.module.scss";
import ContextMenu from "../ContextMenu/ContextMenu";
import useToggle from "../../hooks/useToggle/useToggle";
import { UserContext } from "../../context/UserContext";
import { NotesContext } from "../../context/NotesContext";
import { handleFocus } from "../../utils/handleFocus/handleFocus";
import { archiveNote, duplicateNote, moveToBin, pinNote } from "../../api/notes";

interface Props {
    title?: string;
    content?: string;
    date: string;
    id: string;
    rowLimit?: number | "none";
}

const Card: React.FC<Props> = ({ title, content, date, rowLimit = 25, id }) => {
    const { isAuthorized } = useContext(UserContext);
    const { deleteLocalNote, copyLocalNote } = useContext(NotesContext);
    const [expanded, setExpanded] = useToggle();
    const navigate = useNavigate();

    const expand = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        e.stopPropagation();
        setExpanded();
    };

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
            return toast.promise(archiveNote(noteId, "true"), {
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
            return toast.promise(pinNote(noteId, "true"), {
                loading: "Pinning note...",
                success: (res) => res.status,
                error: (err) => err.response?.data.status,
            });
        },
        onSuccess() {
            queryClient.refetchQueries();
        },
    });

    return (
        <div
            onClick={() => navigate(`/note/${id}`)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => handleFocus(e, () => navigate(`/note/${id}`))}
            className={`${Styles.card} ${expanded ? Styles.active : ""}`}
        >
            <div className={Styles.heading}>
                <h3>{title || "Untitled"}</h3>
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
                        isAuthorized
                            ? [
                                  {
                                      label: "Pin",
                                      onClick: () => {
                                          setExpanded(false);
                                          return !isPinningNote && pinNoteHandler(id);
                                      },
                                  },
                                  {
                                      label: "Copy",
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
                                      label: "Delete",
                                      onClick: () => {
                                          setExpanded(false);
                                          return !isMovingToBin && moveToBinHandler(id);
                                      },
                                  },
                              ]
                            : [
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
                              ]
                    }
                />
            </div>
            <p style={{ WebkitLineClamp: rowLimit }}>{content}</p>

            <span className={Styles.date}>
                {new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
            </span>
        </div>
    );
};
export default Card;
