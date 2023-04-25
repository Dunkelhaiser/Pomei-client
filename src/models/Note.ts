export interface Note {
    id: string;
    title?: string;
    content?: string;
    date: string;
}

export type NoteForm = Omit<Note, "date" | "id">;
