import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export type Tag = {
  id: string;
  name: string;
};

export const ChangePwdSchema = z
  .object({
    oldPassword: z.string().min(1, { message: "Old Password is required" }),
    newPasswordConfirmation: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
    newPassword: z.string().min(1, { message: "New Password is required" }),
  })
  .refine(
    (data) => {
      if (
        data.oldPassword &&
        data.newPassword &&
        data.newPassword === data.oldPassword
      ) {
        return false;
      }
      return true;
    },
    {
      message: "New password cannot be the same as the old password",
      path: ["newPassword"],
    },
  )
  .refine(
    (data) => {
      if (
        data.newPassword &&
        data.newPasswordConfirmation &&
        data.newPassword !== data.newPasswordConfirmation
      ) {
        return false;
      }
      return true;
    },
    {
      message:
        "Passwords do not match. Please ensure both fields are identical",
      path: ["newPasswordConfirmation"],
    },
  )
  .superRefine(({ newPassword }, checkPassComplexity) => {
    const containsSpecialChar = (ch: string) =>
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~\s])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~\s]{8,}$/.test(
        ch,
      );
    if (!containsSpecialChar(newPassword)) {
      checkPassComplexity.addIssue({
        code: "custom",
        path: ["newPassword"],
        message:
          "Password must contain One Uppercase, One Lowercase, One Number and One Special Case Character.",
      });
    }
  });

export type TChangePwd = z.infer<typeof ChangePwdSchema>;
export const ChangePwdValidator = zodResolver(ChangePwdSchema);
