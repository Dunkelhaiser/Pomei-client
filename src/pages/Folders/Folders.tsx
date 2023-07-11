import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Folder from "../../components/Folder/Folder";
import Layout from "../../components/Layout/Layout";
import FloatingIcon from "../../components/FloatingIcon/FloatingIcon";
import { getFolders } from "../../api/folders";
import { UserContext } from "../../context/UserContext";
import Loader from "../../components/Loader/Loader";
import Text from "../../components/Text/Text";
import CreateFolder from "../../components/CreateFolder/CreateFolder";
import useModal from "../../hooks/useModal/useModal";

const Folders = () => {
    const { isShowing, showModal, modalRef, hideModal } = useModal();
    const { isAuthorized } = useContext(UserContext);
    const { data, isLoading, isError } = useQuery({
        queryKey: ["folders"],
        queryFn: () => getFolders(1, 15, "desc", "updatedAt"),
        enabled: isAuthorized,
    });
    return (
        <>
            <FloatingIcon icon={faPlus} onClick={showModal} />
            <CreateFolder show={isShowing} modalRef={modalRef} close={hideModal} />
            <Layout title="Folders" type={isLoading && isAuthorized ? "centered" : "grid"}>
                {isLoading && <Loader />}
                {isError && <Text text="Failed to load notes." type="p" />}
                {!isLoading &&
                    !isError &&
                    (data?.folders?.length > 0 ? (
                        data?.folders?.map((folder) => {
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
                        <Text text="No notes found." type="p" />
                    ))}
            </Layout>
        </>
    );
};
export default Folders;
