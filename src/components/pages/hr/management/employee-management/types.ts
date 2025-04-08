import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const associateEmployeesRequestSchema = z.object({
  employeeType: z.object(
    {
      value: z.string().min(1, { message: "Employee Type is required" }),
      label: z.string(),
    },
    {
      message: `Employee Type is required`,
    },
  ),
  email: z.string().min(1, { message: "Email is required" }),
});

export const CreateEmployeeSchema = z.object({
  employees: z.array(associateEmployeesRequestSchema),
});

export type EmployeeRequestDto = z.infer<typeof CreateEmployeeSchema>;
export const CreateEmployeeValidator = zodResolver(CreateEmployeeSchema);
export type EmployeeItemDto = z.infer<typeof associateEmployeesRequestSchema>;
