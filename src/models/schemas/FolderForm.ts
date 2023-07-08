import { z as zod } from "zod";

const colorRegex = /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/g;

export const schema = zod.object({
    title: zod.string().nonempty({ message: "Enter the title" }).max(255, { message: "Title must be at maximum 255 characters long" }),
    color: zod.string().regex(colorRegex, { message: "Enter a valid color" }).optional(),
});

export type FolderForm = zod.infer<typeof schema>;
