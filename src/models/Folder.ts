export interface Folder {
    id: string;
    title: string;
    color?: string;
    createdAt: string;
    updatedAt?: string;
}

export type FolderForm = Omit<Folder, "date" | "id">;
