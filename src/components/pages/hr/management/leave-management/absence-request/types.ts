import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const CreateAbsenceFormSchema = z.object({
  absenceTypeId: z.object(
    {
      value: z.string().min(1, { message: "Absence type is required" }),
      label: z.string(),
    },
    {
      message: "Absence type is required",
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
});

export type AbsenceFormRequestDto = z.infer<typeof CreateAbsenceFormSchema>;
export const CreateAbsenceFormValidator = zodResolver(CreateAbsenceFormSchema);
