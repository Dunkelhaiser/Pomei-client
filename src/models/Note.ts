export interface Note {
    id: string;
    title?: string;
    content?: string;
    isPinned: boolean;
    isArchived: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt?: string;
}

export type NoteForm = Omit<Note, "date" | "id">;
