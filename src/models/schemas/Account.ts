import { z as zod } from "zod";

const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[\w_]+$/;

export const schema = zod.object({
    username: zod
        .string()
        .nonempty({ message: "Enter your username" })
        .regex(usernameRegex, { message: "Username can only contain letters, numbers and underscores" })
        .min(6, { message: "Username must be at least 6 characters long" })
        .max(20, { message: "Username must be at maximum 20 characters long" }),
    email: zod.string().nonempty({ message: "Enter your email" }).email({ message: "Enter a valid email" }),
});

export type AccountForm = zod.infer<typeof schema>;
