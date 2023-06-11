/* eslint-disable react/jsx-props-no-spreading */
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NotesContext } from "../../context/NotesContext";
import { Note as NoteForm } from "../../models/Note";
import Input from "../../components/Input/Input";
import Layout from "../../components/Layout/Layout";
import Textarea from "../../components/Textarea/Textarea";
import Button from "../../components/Button/Button";
import NoteStyles from "./Note.module.scss";

const Note = () => {
    const params = useParams();
    const navigate = useNavigate();
    const { register, setValue, watch } = useForm<NoteForm>();
    const { getLocalNote, updateLocalNote, deleteLocalNote } = useContext(NotesContext);

    useEffect(() => {
        if (!params.id) {
            throw Error("Note not found");
        }
        const note = getLocalNote(params.id);
        if (!note) {
            throw Error("Note not found");
        }
        setValue("title", note?.title);
        setValue("content", note?.content);
        document.title = `Pomei | ${note?.title || "Untitled"}`;

        return () => {
            document.title = "Pomei";
        };
    }, []);

    // const firstUpdate = useRef(true);
    useEffect(() => {
        // if (firstUpdate.current) {
        //     firstUpdate.current = false;
        //     return;
        // }
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        watch((value) => updateLocalNote({ ...value, id: getLocalNote(params.id!).id, createdAt: getLocalNote(params.id!).createdAt }));
    }, [watch]);

    return (
        <Layout>
            <section className={NoteStyles.header}>
                <Input name="title" fontSize={2.5} fontWeight={700} placeholder="Title" styleType="text" register={register} />
                <Button
                    label="Delete"
                    color="danger"
                    fontSize={1}
                    styleType="text"
                    icon={<FontAwesomeIcon icon={faTrash} />}
                    onClick={() => {
                        if (params.id) {
                            deleteLocalNote(params.id);
                            navigate("/");
                        }
                    }}
                />
            </section>
            <Textarea name="content" placeholder="Enter your note..." register={register} />
        </Layout>
    );
};
export default Note;
