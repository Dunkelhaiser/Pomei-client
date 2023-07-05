import { Folder } from "../models/Folder";
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
