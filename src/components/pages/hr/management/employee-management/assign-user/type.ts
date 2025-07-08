import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export enum EmployeeLevel {
  "Junior Staff" = 0,
  "Senior Staff" = 1,
  "Senior Management" = 2,
}

export const employeeInfoSchema = z.object({
  type: z.string().transform((value) => {
    const numValue = Number(value);
    if (isNaN(numValue)) {
      throw new Error("Invalid value for type");
    }
    return numValue;
  }),
  firstName: z.string().min(1, "Employee name is required"),
  lastName: z.string().min(1, "Employee name is required"),
  email: z.string().email().min(1, "Employee email is required"),
  employeeLevel: z
    .nativeEnum(EmployeeLevel, { message: "Employee level is required" })
    .optional(),
  departmentId: z.object(
    {
      value: z.string().min(1, { message: "Department is required" }),
      label: z.string(),
    },
    { message: "Department is required" },
  ),
  designationId: z.object(
    {
      value: z.string().min(1, { message: "Job title is required" }),
      label: z.string(),
    },
    { message: "Job title is required" },
  ),
  reportingManagerId: z.object(
    {
      value: z.string().min(1, { message: "Reporting manager is required" }),
      label: z.string(),
    },
    { message: "Reporting manager is required" },
  ),
  // startDate: z.preprocess(
  //   (arg) => (typeof arg === "string" ? new Date(arg) : arg),
  //   z.date({
  //     required_error: "Emplyment Start Date is required",
  //     invalid_type_error: "Emplyment Start Date Date must be a valid date",
  //   }),
  // ),
  staffNumber: z.string().min(1, "Staff ID is required"),
});

export type EmployeeInfoRequestDto = z.infer<typeof employeeInfoSchema>;

export const EmployeeInfoValidator = zodResolver(employeeInfoSchema);
