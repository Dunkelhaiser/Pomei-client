export interface Note {
    id: string;
    title?: string;
    content?: string;
    createdAt: string;
    updatedAt?: string;
}

export type NoteForm = Omit<Note, "date" | "id">;
