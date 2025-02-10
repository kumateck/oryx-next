import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .trim()
    .email({ message: "Email must be a valid email" }),
});

export const ForgotPasswordValidator = zodResolver(ForgotPasswordSchema);

export type TForgotPassword = z.infer<typeof ForgotPasswordSchema>;
