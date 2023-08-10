import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faFolder, faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Styles from "./Folder.module.scss";
import useToggle from "../../hooks/useToggle/useToggle";
import ContextMenu from "../ContextMenu/ContextMenu";
import { deleteFolder, pinFolder } from "../../api/folders";
import useModal from "../../hooks/useModal/useModal";
import EditFolder from "../EditFolder/EditFolder";
import Confirmation from "../Confirmation/Confirmation";
import { handleFocus } from "../../utils/handleFocus/handleFocus";

interface Props {
    id: string;
    title: string;
    color?: string;
    isPinned: boolean;
}

type Ref = HTMLDivElement;

const Folder = forwardRef<Ref, Props>(({ id, title, color, isPinned }, ref) => {
    const [expanded, setExpanded] = useToggle();
    const { isShowing, showModal, modalRef, hideModal } = useModal();
    const { isShowing: isConfirming, showModal: showConfirmation, modalRef: confirmationRef, hideModal: hideConfirmation } = useModal();
    const expand = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();
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
            onKeyDown={(e) => handleFocus(e, () => navigate(`/folder/${id}`))}
            className={`${Styles.folder} ${expanded ? Styles.active : ""}`}
            ref={ref}
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
                            showModal();
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
                            showConfirmation();
                        },
                    },
                ]}
            />
            <EditFolder show={isShowing} modalRef={modalRef} close={hideModal} folderId={id} />
            <Confirmation
                show={isConfirming}
                modalRef={confirmationRef}
                close={hideConfirmation}
                message="Are you sure you want to delete this folder?"
                onConfirm={() => deleteFolderHandler(id)}
                option="Delete"
                color="danger"
                disabled={isDeletingFolder}
            />
            <h3>{title}</h3>
        </div>
    );
});
Folder.displayName = "Folder";
export default Folder;
