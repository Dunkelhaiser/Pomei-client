import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { faTrash, faTrashArrowUp } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NotesContext } from "../../context/NotesContext";
import { Note as NoteForm } from "../../models/Note";
import Input from "../../components/Input/Input";
import Layout from "../../components/Layout/Layout";
import Button from "../../components/Button/Button";
import NoteStyles from "./Note.module.scss";
import { UserContext } from "../../context/UserContext";
import { loadNote, moveToBin, restoreNote, updateNote } from "../../api/notes";
import Loader from "../../components/Loader/Loader";
import Text from "../../components/Text/Text";
import { IResError } from "../../api/response";
import TextEditor from "../../components/TextEditor/TextEditor";
import Textarea from "../../components/Textarea/Textarea";

const Note = () => {
    const queryClient = useQueryClient();
    const params = useParams();
    const navigate = useNavigate();
    const { register, setValue, getValues, watch } = useForm<NoteForm>();
    const { getLocalNote, updateLocalNote, deleteLocalNote } = useContext(NotesContext);
    const { isAuthorized } = useContext(UserContext);
    const [noteContent, setNoteContent] = useState("");

    const {
        isLoading,
        isError,
        data: noteData,
    } = useQuery({
        queryKey: ["note", params.id],
        queryFn: () => loadNote(`${params.id}`),
        enabled: isAuthorized,
        onSuccess: (data) => {
            setValue("title", data?.note.title);
            setNoteContent(data?.note.content || "");
            document.title = `Pomei | ${data?.note.title || "Untitled"}`;
        },
    });
    const { mutate } = useMutation({
        mutationFn: ({ title, content }: { title: string; content: string }) => updateNote(`${params.id}`, { title, content }),
        onError(err: IResError) {
            toast.error(err.response?.data.status);
        },
    });

    const { mutate: moveToBinHandler, isLoading: isMovingToBin } = useMutation({
        mutationFn: (noteId: string) => {
            return toast.promise(moveToBin(noteId), {
                loading: "Moving note to bin...",
                success: (res) => res.status,
                error: (err) => err.response?.data.status,
            });
        },
        onSuccess() {
            queryClient.refetchQueries();
        },
    });

    const { mutate: restoreNoteHandler, isLoading: isRestoringNote } = useMutation({
        mutationFn: (noteId: string) => {
            return toast.promise(restoreNote(noteId), {
                loading: "Restoring note...",
                success: (res) => res.status,
                error: (err) => err.response?.data.status,
            });
        },
        onSuccess() {
            queryClient.refetchQueries();
        },
    });

    useEffect(() => {
        if (!isAuthorized) {
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
        }

        return () => {
            document.title = "Pomei";
        };
    }, []);

    useEffect(() => {
        if (!isAuthorized) {
            watch((value) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                updateLocalNote({ ...value, id: getLocalNote(`${params.id}`).id, createdAt: getLocalNote(`${params.id}`).createdAt });
            });
        }
        if (isAuthorized && !noteData?.note.isDeleted) {
            watch((value) => {
                if (isLoading || isError || !value.title || !noteContent) return;
                mutate({ title: value.title || "", content: noteContent || "" });
            });
            if (isLoading || isError || !getValues("title") || !noteContent) return;
            mutate({ title: getValues("title") || "", content: noteContent || "" });
        }
    }, [watch, isLoading, isError, noteContent]);

    return (
        <Layout type={isLoading && isAuthorized ? "centered" : null}>
            {!isAuthorized ? (
                <>
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
                    <Textarea placeholder="Enter your note..." name="content" register={register} />
                </>
            ) : (
                <>
                    {isLoading && <Loader />}
                    {isError && <Text text="Failed to load note." type="p" />}
                    {!isLoading && !isError && (
                        <>
                            <section className={NoteStyles.header}>
                                <Input
                                    name="title"
                                    fontSize={2.5}
                                    fontWeight={700}
                                    placeholder="Title"
                                    styleType="text"
                                    register={register}
                                />
                                {noteData.note.isDeleted ? (
                                    <Button
                                        label="Restore"
                                        color="primary"
                                        fontSize={1}
                                        styleType="text"
                                        icon={<FontAwesomeIcon icon={faTrashArrowUp} />}
                                        onClick={() => {
                                            if (params.id) {
                                                restoreNoteHandler(params.id);
                                                navigate("/");
                                            }
                                        }}
                                        disabled={isRestoringNote || isLoading}
                                    />
                                ) : (
                                    <Button
                                        label="Delete"
                                        color="danger"
                                        fontSize={1}
                                        styleType="text"
                                        icon={<FontAwesomeIcon icon={faTrash} />}
                                        onClick={() => {
                                            if (params.id) {
                                                moveToBinHandler(params.id);
                                                navigate("/");
                                            }
                                        }}
                                        disabled={isMovingToBin || isLoading}
                                    />
                                )}
                            </section>

                            {noteData.note.isDeleted ? (
                                <TextEditor content={noteData.note.content} editable={false} />
                            ) : (
                                <TextEditor content={noteData.note.content} onChange={setNoteContent} placeholder="Enter your note..." />
                            )}
                        </>
                    )}
                </>
            )}
        </Layout>
    );
};
export default Note;
