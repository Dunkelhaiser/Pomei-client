import { Folder } from "../models/Folder";
import { authApi } from "./authApi";

export const getFolders = async (): Promise<{ status: string; folders: Folder[] }> => {
    const res = await authApi.get("folders");
    return res.data;
};
