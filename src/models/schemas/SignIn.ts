import { z as zod } from "zod";

export const schema = zod.object({
    login: zod.string().nonempty({ message: "Enter your username or email" }),
    password: zod.string().nonempty({ message: "Enter your password" }),
});

export type SignInForm = zod.infer<typeof schema>;
