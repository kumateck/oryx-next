import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const CreateExitPassSchema = z.object({
  date: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date({
      required_error: "Start date is required",
      invalid_type_error: "Start date must be a valid date",
    }),
  ),
  timeIn: z.string().min(1, { message: "Time In is required" }),
  timeOut: z.string().min(1, { message: "Time Out is required" }),
  employeeId: z.object(
    {
      value: z.string().min(1, { message: "Staff name is required" }),
      label: z.string(),
    },
    {
      message: "Staff name is required",
    },
  ),
  justification: z
    .string()
    .min(1, { message: "Exit Pass Justification is required" }),
});

export type ExitPassRequestDto = z.infer<typeof CreateExitPassSchema>;
export const CreateExitPassValidator = zodResolver(CreateExitPassSchema);
