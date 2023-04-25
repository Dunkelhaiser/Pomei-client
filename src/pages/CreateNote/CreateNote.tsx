/* eslint-disable react/jsx-props-no-spreading */
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { NotesContext } from "../../context/NotesContext";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Layout from "../../components/Layout/Layout";
import Textarea from "../../components/Textarea/Textarea";
import Form from "../../components/Form/Form";
import { NoteForm } from "../../models/Note";

const CreateNote = () => {
    const { createLocalNote } = useContext(NotesContext);
    const { register, handleSubmit, reset } = useForm<NoteForm>();

    const createNoteHandler = (note: NoteForm) => {
        createLocalNote(note);
        reset();
    };

    return (
        <Layout title="Create Note">
            <Form onSubmit={handleSubmit(createNoteHandler)}>
                <Input name="title" placeholder="Title" styleType="text" register={register} />
                <Textarea name="content" rows={15} placeholder="Enter your note..." register={register} />
                <Button label="Create" type="submit" />
            </Form>
        </Layout>
    );
};
export default CreateNote;
