import { z } from "zod";

const BaseFormSchema = z.object({
    email: z.string().email({ message: "Please enter a vaild email." })
        .trim(),
    password: z.string()
        .min(8, {message: "Be atleast 8 characters long."})
        .regex(/[a-zA-Z]/, { message: "Contain atleast 1 letter." })
        .regex(/[0-9]/, { message: "Contain atleast 1 number." })
        .regex(/[^a-zA-Z0-9]/, { message: "Contain atleast 1 special character." })
        .trim()
});

export const SignUpFormSchema = BaseFormSchema.extend({
    username: z
        .string()
        .min(4, { message: "Username must be atleast 4 characters long." })
        .trim(),
    fullname: z.string()
        .min(5, { message: "Fullname must be atleast 5 characters long." })
        .trim()
});

export const SignInFormSchema = BaseFormSchema.extend({
    username: z.string().optional(),
    fullname: z.string().optional()
});
