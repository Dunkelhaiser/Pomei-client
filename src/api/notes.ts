import { Note } from "../models/Note";
import { authApi } from "./authApi";

export const getNotes = async (): Promise<{ status: string; notes: Note[] }> => {
    const res = await authApi.get("notes");
    return res.data;
};
