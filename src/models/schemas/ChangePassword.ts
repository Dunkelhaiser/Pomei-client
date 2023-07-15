import { z as zod } from "zod";

export const schema = zod
    .object({
        currentPassword: zod.string().nonempty({ message: "Enter your password" }),
        newPassword: zod
            .string()
            .nonempty({ message: "Enter new password" })
            .min(6, { message: "Password must be at least 6 characters long" })
            .max(36, { message: "Password must be at maximum 36 characters long" }),
        confirmNewPassword: zod.string().nonempty({ message: "Confirm new password" }),
    })
    .refine((schemaData) => schemaData.newPassword === schemaData.confirmNewPassword, {
        message: "Passwords must match",
        path: ["confirmPassword"],
    });

export type ChangePasswordForm = zod.infer<typeof schema>;
