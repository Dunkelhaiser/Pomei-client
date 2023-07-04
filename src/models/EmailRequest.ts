import { z as zod } from "zod";

export const schema = zod.object({
    email: zod.string().nonempty({ message: "Enter your email" }).email({ message: "Enter a valid email" }),
});

export type EmailRequestForm = zod.infer<typeof schema>;
