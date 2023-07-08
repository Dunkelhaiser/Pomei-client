/* eslint-disable react/jsx-props-no-spreading */
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Modal from "../Modal/Modal";
import Styles from "./AddToFolder.module.scss";
import { getFolders } from "../../api/folders";
import Loader from "../Loader/Loader";
import Text from "../Text/Text";
import { addToFolder } from "../../api/notes";

interface Props {
    noteId: string;
    show: boolean;
    modalRef: React.RefObject<HTMLDivElement>;
    close: () => void;
}

const AddToFolder: React.FC<Props> = ({ show, modalRef, close, noteId }) => {
    const queryClient = useQueryClient();

    const {
        data: foldersList,
        isError: isErrorFolders,
        isLoading: isLoadingFolders,
    } = useQuery({
        queryKey: ["add_to_folders"],
        queryFn: () => getFolders(1, 15, "desc", "updatedAt"),
        onError() {
            toast.error("Error loading folder");
        },
    });

    const { mutate, isLoading: isAddingToFolder } = useMutation({
        mutationFn: (folderId: string) => {
            return toast.promise(addToFolder(noteId, folderId), {
                loading: "Adding to folder...",
                success: (res) => res.status,
                error: (err) => err.response?.data.status,
            });
        },
        onSuccess() {
            queryClient.refetchQueries();
            close();
        },
    });

    return (
        <Modal show={show} modalRef={modalRef}>
            <h3>Add to folder</h3>
            {isLoadingFolders && <Loader />}
            {isErrorFolders && <Text text="Failed to load folders." type="p" />}
            {!isErrorFolders && !isErrorFolders && (
                <div className={Styles.folders_list}>
                    {foldersList?.folders.map((folder) => {
                        return (
                            <button
                                key={folder.id}
                                className={Styles.folder_item}
                                onClick={() => mutate(folder.id)}
                                disabled={isAddingToFolder}
                            >
                                <FontAwesomeIcon icon={faFolder} color={folder.color || "#56758F"} />
                                <p>{folder.title}</p>
                            </button>
                        );
                    })}
                </div>
            )}
        </Modal>
    );
};
export default AddToFolder;
