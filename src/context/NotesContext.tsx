import React, { createContext, useMemo, useState } from "react";
import { v4 as uuid } from "uuid";
import { NoteForm, Note } from "../models/Note";

interface NotesContextType {
    notes: Note[];
    createLocalNote: (note: NoteForm) => void;
}

const iNotesContextState = {
    notes: [],
    createLocalNote: () => {},
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
    const values = useMemo(
        () => ({
            notes,
            createLocalNote,
        }),
        [notes]
    );
    return <NotesContext.Provider value={values}>{children}</NotesContext.Provider>;
};

export default NotesContextProvider;
