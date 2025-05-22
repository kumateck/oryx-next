import { IdSchema } from "@/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const CreateOvertimeSchema = z.object({
  overtimeDate: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date({
      required_error: "Overtime Date is required",
      invalid_type_error: "Overtime Date must be a valid date",
    }),
  ),
  startTime: z.string().min(1, { message: "Start Time is required" }),
  endTime: z.string().min(1, { message: "End Time is required" }),
  departmentId: z.object(
    {
      value: z.string().min(1, { message: "Department is required" }),
      label: z.string(),
    },
    {
      message: "Department is required",
    },
  ),
  employeeIds: z
    .array(IdSchema("Employee"))
    .min(1, { message: "At least one employee must be selected" }),
  justification: z.string().optional(),
});

export type OvertimeRequestDto = z.infer<typeof CreateOvertimeSchema>;
export const CreateOvertimeValidator = zodResolver(CreateOvertimeSchema);
