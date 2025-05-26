import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const RecallSchema = z.object({
  name: z.string().min(1, { message: "Staff name is required" }),
  staffNumber: z.string().min(1, { message: "Staff number is required" }),
  departmentId: z.object(
    {
      value: z.string().min(1, { message: "Department is required" }),
      label: z.string(),
    },
    {
      message: "Department is required",
    },
  ),
  returnDate: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date({
      required_error: "Return Date is required",
      invalid_type_error: "Return Date must be a valid date",
    }),
  ),
  justification: z.string().optional(),
});

export type RecallRequestDto = z.infer<typeof RecallSchema>;
export const RecallValidator = zodResolver(RecallSchema);
