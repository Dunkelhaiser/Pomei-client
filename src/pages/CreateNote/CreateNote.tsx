/* eslint-disable react/jsx-props-no-spreading */
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { NotesContext } from "../../context/NotesContext";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Layout from "../../components/Layout/Layout";
import Textarea from "../../components/Textarea/Textarea";
import { NoteForm } from "../../models/Note";
import Styles from "./CreateNote.module.scss";

const CreateNote = () => {
    const navigate = useNavigate();
    const { createLocalNote } = useContext(NotesContext);
    const { register, handleSubmit, reset } = useForm<NoteForm>();

    const createNoteHandler = (note: NoteForm) => {
        createLocalNote(note);
        reset();
        navigate("/notes");
    };

    return (
        <Layout title="Create Note">
            <form onSubmit={handleSubmit(createNoteHandler)} className={Styles.form}>
                <Input name="title" placeholder="Title" styleType="text" register={register} />
                <Textarea name="content" rows={15} placeholder="Enter your note..." register={register} />
                <Button label="Create" type="submit" />
            </form>
        </Layout>
    );
};
export default CreateNote;
