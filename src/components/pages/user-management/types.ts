import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const RoleSchema = z.object({
  roleId: z.object(
    {
      value: z.string().min(1, { message: "Role is required" }),
      label: z.string(),
    },
    {
      message: "Role is required",
    },
  ),
});
export const CreateUserSchema = z.object({
  employeeId: z.object(
    {
      value: z.string().min(1, { message: "Employee is required" }),
      label: z.string(),
    },
    {
      message: "Employee is required",
    },
  ),
  email: z.string(),
  department: z.string(),
  roleId: z.object(
    {
      value: z.string().min(1, { message: "Role is required" }),
      label: z.string(),
    },
    {
      message: "Role is required",
    },
  ),
});

export type RoleRequestDto = z.infer<typeof RoleSchema>;
export const RoleValidator = zodResolver(RoleSchema);

export type UserRequestDto = z.infer<typeof CreateUserSchema>;
export const CreateUserValidator = zodResolver(CreateUserSchema);
