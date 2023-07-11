import { useContext, useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useInView } from "react-intersection-observer";
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
    const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ["folders"],
        queryFn: ({ pageParam = 1 }) => getFolders(pageParam, 15, "desc", "updatedAt"),
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
        threshold: 1,
    });

    useEffect(() => {
        if (entry?.isIntersecting && hasNextPage) fetchNextPage();
    }, [entry]);

    const folders = data?.pages.flatMap((page) => page.folders);

    return (
        <>
            <FloatingIcon icon={faPlus} onClick={showModal} />
            <CreateFolder show={isShowing} modalRef={modalRef} close={hideModal} />
            <Layout title="Folders" type={isLoading && isAuthorized ? "centered" : "grid"}>
                {isError && <Text text="Failed to load notes." type="p" />}
                {!isLoading &&
                    !isError &&
                    (folders && folders.length > 0 ? (
                        folders?.map((folder, i) => {
                            if (i === folders.length - 1) {
                                return (
                                    <Folder
                                        key={folder.id}
                                        id={folder.id}
                                        title={folder.title}
                                        color={folder.color}
                                        isPinned={folder.isPinned}
                                        ref={ref}
                                    />
                                );
                            }
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
                {(isLoading || isFetchingNextPage) && <Loader />}
            </Layout>
        </>
    );
};
export default Folders;
