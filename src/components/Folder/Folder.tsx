import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faFolder, faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Styles from "./Folder.module.scss";
import useToggle from "../../hooks/useToggle/useToggle";
import ContextMenu from "../ContextMenu/ContextMenu";
import { deleteFolder, pinFolder } from "../../api/folders";

interface Props {
    id: string;
    title: string;
    color?: string;
    isPinned: boolean;
}

const Folder: React.FC<Props> = ({ id, title, color, isPinned }) => {
    const [expanded, setExpanded] = useToggle();
    const expand = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        e.stopPropagation();
        setExpanded();
    };
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: deleteFolderHandler, isLoading: isDeletingFolder } = useMutation({
        mutationFn: (folderId: string) => {
            return toast.promise(deleteFolder(folderId), {
                loading: "Deleting folder...",
                success: (res) => res.status,
                error: (err) => err.response?.data.status,
            });
        },
        onSuccess() {
            queryClient.refetchQueries();
        },
    });
    const { mutate: pinFolderHandler, isLoading: isPinningFolder } = useMutation({
        mutationFn: (folderId: string) => {
            return toast.promise(pinFolder(folderId, isPinned ? "false" : "true"), {
                loading: "Pinning folder...",
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
            onClick={() => navigate(`/folder/${id}`)}
            role="button"
            tabIndex={0}
            className={`${Styles.folder} ${expanded ? Styles.active : ""}`}
        >
            <div className={Styles.icon}>
                <FontAwesomeIcon icon={faFolder} color={color || "hsl(208deg 25% 45%)"} className={Styles.folder_icon} />
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
                options={[
                    {
                        label: "Edit",
                        onClick: () => {
                            setExpanded(false);
                        },
                    },
                    {
                        label: isPinned ? "Unpin" : "Pin",
                        onClick: () => {
                            setExpanded(false);
                            return !isPinningFolder && pinFolderHandler(id);
                        },
                    },
                    {
                        label: "Delete",
                        onClick: () => {
                            setExpanded(false);
                            return !isDeletingFolder && deleteFolderHandler(id);
                        },
                    },
                ]}
            />
            <h3>{title}</h3>
        </div>
    );
};
export default Folder;
