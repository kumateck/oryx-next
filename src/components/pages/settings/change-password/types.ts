import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const ChangePasswordFormSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters long"),
    confirmNewPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "New password and confirmation do not match",
  });

export type ChangePasswordDto = z.infer<typeof ChangePasswordFormSchema>;
export const ChangePasswordValidator = zodResolver(ChangePasswordFormSchema);
