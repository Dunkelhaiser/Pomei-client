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

export const duplicateNote = async (id: string): Promise<{ status: string; note: Note }> => {
    const res = await authApi.post(`notes/duplicate/${id}`);
    return res.data;
};

export const moveToBin = async (id: string): Promise<{ status: string; note: Note }> => {
    const res = await authApi.delete(`notes/move_to_bin/${id}`);
    return res.data;
};

export const archiveNote = async (id: string, archive: "true" | "false"): Promise<{ status: string; note: Note }> => {
    const res = await authApi.put(`notes/archive/${id}?isArchived=${archive}`);
    return res.data;
};

export const pinNote = async (id: string, pin: "true" | "false"): Promise<{ status: string; note: Note }> => {
    const res = await authApi.put(`notes/pin/${id}?isPinned=${pin}`);
    return res.data;
};

export const restoreNote = async (id: string): Promise<{ status: string; note: Note }> => {
    const res = await authApi.put(`notes/restore/${id}`);
    return res.data;
};

export const deleteNote = async (id: string): Promise<{ status: string; note: Note }> => {
    const res = await authApi.delete(`notes/delete/${id}`);
    return res.data;
};

export const loadBin = async (
    page?: number,
    size?: number,
    order?: "asc" | "desc",
    orderBy?: string
): Promise<{ status: string; notes: Note[]; totalNotes: number; totalPages: number }> => {
    const res = await authApi.get(`notes/bin?page=${page}&size=${size}&order=${order}&orderBy=${orderBy}`);
    return res.data;
};

export const emptyBin = async (): Promise<{ status: string }> => {
    const res = await authApi.delete(`notes/empty_bin`);
    return res.data;
};
