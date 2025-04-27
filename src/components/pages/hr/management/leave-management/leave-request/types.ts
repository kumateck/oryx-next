import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const CreateLeaveSchema = z.object({
  leaveTypeId: z.object(
    {
      value: z.string().min(1, { message: "Leave type is required" }),
      label: z.string(),
    },
    {
      message: "Leave type is required",
    },
  ),
  startDate: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date({
      required_error: "Start date is required",
      invalid_type_error: "Start date must be a valid date",
    }),
  ),
  endDate: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date({
      required_error: "End date is required",
      invalid_type_error: "End date must be a valid date",
    }),
  ),
  employeeId: z.object(
    {
      value: z.string().min(1, { message: "Staff name is required" }),
      label: z.string(),
    },
    {
      message: "Staff name is required",
    },
  ),
  contactPerson: z.string().min(1, { message: "Contact Person is required" }),
  contactPersonNumber: z
    .string()
    .min(1, { message: "Contact Person's Number is required" }),
});

export type LeaveRequestDto = z.infer<typeof CreateLeaveSchema>;
export const CreateLeaveValidator = zodResolver(CreateLeaveSchema);
