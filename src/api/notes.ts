import { Note } from "../models/Note";
import { authApi } from "./authApi";

export const getNotes = async (
    page?: number,
    size?: number,
    order?: "asc" | "desc",
    orderBy?: string
): Promise<{ status: string; notes: Note[]; totalNotes: number; totalPages: number }> => {
    const res = await authApi.get(`notes?page=${page}&size=${size}&order=${order}&orderBy=${orderBy}`);
    return res.data;
};
