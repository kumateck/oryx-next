import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const CreateUserSchema = z.object({
  emplyeeId: z.object(
    {
      value: z.string().min(1, { message: "Employee is required" }),
      label: z.string(),
    },
    {
      message: "Employee is required",
    },
  ),
  roleId: z.object(
    {
      value: z.string().min(1, { message: "Role is required" }),
      label: z.string(),
    },
    {
      message: "Role is required",
    },
  ),
  email: z.string().email().min(1, { message: "Email is required" }),
  department: z.string().min(1, { message: "Email is required" }),
  description: z.string().optional(),
});

export type UserRequestDto = z.infer<typeof CreateUserSchema>;
export const CreateUserValidator = zodResolver(CreateUserSchema);
