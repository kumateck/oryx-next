import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const assignLocationSchema = z.object({
  name: z.string().min(1, "Employee name is required"),
  email: z.string().email().min(1, "Employee email is required"),
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
  startDate: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date({
      required_error: "Emplyment Start Date is required",
      invalid_type_error: "Emplyment Start Date Date must be a valid date",
    }),
  ),
  staffId: z.string().min(1, "Staff ID is required"),
});

export type AssignUserRequestDto = z.infer<typeof assignLocationSchema>;

export const AssignLocationValidator = zodResolver(assignLocationSchema);
