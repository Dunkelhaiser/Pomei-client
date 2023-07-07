import { Folder } from "../models/Folder";
import { Note } from "../models/Note";
import { authApi } from "./authApi";

export const getFolders = async (
    page?: number,
    size?: number,
    order?: "asc" | "desc",
    orderBy?: string
): Promise<{ status: string; folders: Folder[]; totalFolders: number; totalPages: number }> => {
    const res = await authApi.get(`folders?page=${page}&size=${size}&order=${order}&orderBy=${orderBy}`);
    return res.data;
};

export const loadFolder = async (id: string): Promise<{ status: string; notes: Note[]; folder: Folder }> => {
    const res = await authApi.get(`folders/${id}/notes`);
    return res.data;
};
