import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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

export type UserRequestDto = z.infer<typeof CreateUserSchema>;
export const CreateUserValidator = zodResolver(CreateUserSchema);
