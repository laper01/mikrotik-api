import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" }),
});

const passwordSchema = z.string().min(6);
const confirmPasswordSchema = z.string();

export const changePasswordSchema = z
    .object({
        username: z.string(),
        password: passwordSchema,
        confirmPassword: passwordSchema,
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

const userSchema = z.object({
    auth: z.object({
        token: z.string(),
        type: z.literal("Bearer"),
    }),
    userState: z.object({
        name: z.string(),
        id: z.number(),
        email: z.string().email(),
        email_verified_at: z.string(),
    }),
});

// Type inference
export type userInType = z.infer<typeof userSchema>;

export type LoginFormInputs = z.infer<typeof loginSchema>;

export type changePasswordForm = z.infer<typeof changePasswordSchema>;
