import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .trim()
    .email({ message: "Email must be a valid email" }),
  password: z.string({ required_error: "Enter password" }).min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

export const LoginValidator = zodResolver(LoginSchema);

export type TLogin = z.infer<typeof LoginSchema>;
