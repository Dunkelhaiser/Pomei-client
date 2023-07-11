/* eslint-disable react/jsx-props-no-spreading */
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Input from "../Input/Input";
import Modal from "../Modal/Modal";
import Styles from "./EditFolder.module.scss";
import Button from "../Button/Button";
import { FolderForm, schema } from "../../models/schemas/FolderForm";
import { editFolder, loadFolder } from "../../api/folders";

interface Props {
    folderId: string;
    show: boolean;
    modalRef: React.RefObject<HTMLDivElement>;
    close: () => void;
}

const EditFolder: React.FC<Props> = ({ show, modalRef, close, folderId }) => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors, isValid },
    } = useForm<FolderForm>({ resolver: zodResolver(schema), mode: "onBlur", defaultValues: { color: "#56758F" } });

    const queryClient = useQueryClient();

    useQuery({
        queryKey: ["folder", folderId],
        queryFn: () => loadFolder(folderId),
        enabled: show,
        onSuccess(data) {
            setValue("title", data.folder.title);
            setValue("color", data.folder.color);
        },
        onError() {
            toast.error("Error loading folder");
        },
    });

    const { mutate, isLoading } = useMutation({
        mutationFn: (data: FolderForm) => {
            return toast.promise(editFolder(folderId, data), {
                loading: "Updating folder...",
                success: (res) => res.status,
                error: (err) => err.response?.data.status,
            });
        },
        onSuccess() {
            queryClient.refetchQueries();
            close();
            reset();
        },
    });

    return (
        <Modal show={show} modalRef={modalRef}>
            <form className={Styles.layot} onSubmit={handleSubmit((data) => mutate(data))}>
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="color">
                    <FontAwesomeIcon icon={faFolder} color={watch("color")} className={Styles.icon} />
                </label>
                <Input styleType="line" register={register} name="title" errors={errors.title} />
                <input type="color" {...register("color")} name="color" id="color" />
                <Button label="Update Folder" fontSize={1} type="submit" disabled={!isValid || isLoading} />
            </form>
        </Modal>
    );
};
export default EditFolder;
