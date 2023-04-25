import React, { createContext, useMemo, useState } from "react";
import { v4 as uuid } from "uuid";
import { NoteForm, Note } from "../models/Note";

interface NotesContextType {
    notes: Note[];
    createLocalNote: (note: NoteForm) => void;
    deleteLocalNote: (id: string) => void;
}

const iNotesContextState = {
    notes: [],
    createLocalNote: () => {},
    deleteLocalNote: () => {},
};

export const NotesContext = createContext<NotesContextType>(iNotesContextState);

const NotesContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [notes, setNotes] = useState<Note[]>(JSON.parse(localStorage.getItem("notes") || "[]"));

    const createLocalNote = (note: NoteForm) => {
        const newNote = {
            ...note,
            date: String(new Date()),
            id: uuid(),
        };
        setNotes([newNote, ...notes]);
        localStorage.setItem("notes", JSON.stringify([newNote, ...notes]));
    };

    const deleteLocalNote = (id: string) => {
        setNotes(notes.filter((note) => note.id !== id));
        localStorage.setItem("notes", JSON.stringify(notes.filter((note) => note.id !== id)));
    };

    const values = useMemo(
        () => ({
            notes,
            createLocalNote,
            deleteLocalNote,
        }),
        [notes]
    );
    return <NotesContext.Provider value={values}>{children}</NotesContext.Provider>;
};

export default NotesContextProvider;
