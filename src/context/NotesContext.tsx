import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuid } from "uuid";
import { NoteForm, Note } from "../models/Note";
import { UserContext } from "./UserContext";

interface NotesContextType {
    notes: Note[];
    createLocalNote: (note: NoteForm) => void;
    deleteLocalNote: (id: string) => void;
    getLocalNote: (id: string) => Note;
    updateLocalNote: (note: Note) => void;
    copyLocalNote: (id: string) => void;
    loadNotes: () => void;
}

const iNotesContextState = {
    notes: [],
    createLocalNote: () => {},
    deleteLocalNote: () => {},
    getLocalNote: () => [] as unknown as Note,
    updateLocalNote: () => {},
    copyLocalNote: () => {},
    loadNotes: () => {},
};

export const NotesContext = createContext<NotesContextType>(iNotesContextState);

const NotesContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { axiosAuth, isAuthorized } = useContext(UserContext);
    const [notes, setNotes] = useState<Note[]>(JSON.parse(localStorage.getItem("notes") || "[]"));

    const createLocalNote = (note: NoteForm) => {
        const newNote = {
            ...note,
            createdAt: String(new Date()),
            id: uuid(),
        };
        setNotes([newNote, ...notes]);
        localStorage.setItem("notes", JSON.stringify([newNote, ...notes]));
    };

    const deleteLocalNote = (id: string) => {
        setNotes(notes.filter((note) => note.id !== id));
        localStorage.setItem("notes", JSON.stringify(notes.filter((note) => note.id !== id)));
    };

    const getLocalNote = (id: string) => {
        return notes.filter((note) => note.id === id)[0];
    };

    const updateLocalNote = (note: Note) => {
        const updatedNote = {
            ...note,
            updatedAt: String(new Date()),
        };
        setNotes(notes.map((n) => (n.id === note.id ? updatedNote : n)));
        localStorage.setItem("notes", JSON.stringify(notes.map((n) => (n.id === note.id ? updatedNote : n))));
    };

    const copyLocalNote = (id: string) => {
        const note = getLocalNote(id);
        createLocalNote(note);
    };

    const loadNotes = async () => {
        try {
            const { data } = await axiosAuth.get("/notes");
            setNotes(data.notes);
            console.log(data.notes);
        } catch (err) {
            toast.error("Failed to load notes");
        }
    };

    useEffect(() => {
        if (isAuthorized) {
            loadNotes();
        }
    }, [isAuthorized]);

    const values = useMemo(
        () => ({
            notes,
            createLocalNote,
            deleteLocalNote,
            getLocalNote,
            updateLocalNote,
            copyLocalNote,
            loadNotes,
        }),
        [notes]
    );
    return <NotesContext.Provider value={values}>{children}</NotesContext.Provider>;
};

export default NotesContextProvider;
