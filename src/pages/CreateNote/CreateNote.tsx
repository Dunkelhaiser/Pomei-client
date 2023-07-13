/* eslint-disable react/jsx-props-no-spreading */
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { NotesContext } from "../../context/NotesContext";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Layout from "../../components/Layout/Layout";
import { Note, NoteForm } from "../../models/Note";
import Styles from "./CreateNote.module.scss";
import { createNote } from "../../api/notes";
import { UserContext } from "../../context/UserContext";
import TextEditor from "../../components/TextEditor/TextEditor";
import Textarea from "../../components/Textarea/Textarea";

const CreateNote = () => {
    const { isAuthorized } = useContext(UserContext);
    const navigate = useNavigate();
    const { createLocalNote } = useContext(NotesContext);
    const { register, handleSubmit, reset } = useForm<NoteForm>();
    const [content, setContent] = useState("");

    const queryClient = useQueryClient();
    const { mutate, isLoading } = useMutation({
        mutationFn: (note: Pick<Note, "title" | "content">) => {
            return toast.promise(createNote(note), {
                loading: "Creating note...",
                success: (res) => res.status,
                error: (err) => err.response?.data.status,
            });
        },
        onSuccess() {
            queryClient.refetchQueries();
        },
    });

    const createNoteHandler = (note: NoteForm) => {
        if (!isAuthorized) {
            createLocalNote({ ...note });
        } else {
            mutate({ ...note, content });
        }
        reset();
        navigate("/notes");
    };

    return (
        <Layout title="Create Note">
            <form onSubmit={handleSubmit(createNoteHandler)} className={Styles.form}>
                <Input name="title" placeholder="Title" styleType="text" register={register} fontSize={1.75} />
                {isAuthorized ? (
                    <TextEditor placeholder="Enter your note..." onChange={setContent} />
                ) : (
                    <Textarea placeholder="Enter your note..." name="content" register={register} />
                )}
                <Button label="Create" type="submit" disabled={isLoading} />
            </form>
        </Layout>
    );
};
export default CreateNote;
