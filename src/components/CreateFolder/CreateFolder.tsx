/* eslint-disable react/jsx-props-no-spreading */
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Input from "../Input/Input";
import Modal from "../Modal/Modal";
import Styles from "./CreateFolder.module.scss";
import Button from "../Button/Button";
import { FolderForm, schema } from "../../models/schemas/FolderForm";
import { createFolder } from "../../api/folders";

interface Props {
    show: boolean;
    modalRef: React.RefObject<HTMLDivElement>;
    close: () => void;
}

const CreateFolder: React.FC<Props> = ({ show, modalRef, close }) => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isValid },
    } = useForm<FolderForm>({ resolver: zodResolver(schema), mode: "onBlur", defaultValues: { color: "#56758F" } });

    const queryClient = useQueryClient();

    const { mutate, isLoading } = useMutation({
        mutationFn: (data: FolderForm) => {
            return toast.promise(createFolder(data), {
                loading: "Creating folder...",
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
                <Button label="Create Folder" fontSize={1} type="submit" disabled={!isValid || isLoading} />
            </form>
        </Modal>
    );
};
export default CreateFolder;
