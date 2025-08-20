import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { IdSchema } from "@/lib";

export const CreateLeaveTypeSchema = z.object({
  name: z.string().min(1, { message: "Leave type name is required" }),
  isPaid: z.boolean().optional(),
  deductFromBalance: z.boolean().optional(),
  designationIds: z
    .array(IdSchema("Department"))
    .min(1, { message: "At least one department must be selected" }),
  maxDuration: z
    .number({
      required_error: "Maximum Leave Days is required",
      invalid_type_error: "Maximum Leave Days must be a number",
    })
    .positive({
      message: "Maximum Leave Days must be greater than 0",
    }),
});

export type LeaveTypeRequestDto = z.infer<typeof CreateLeaveTypeSchema>;
export const CreateLeaveTypeValidator = zodResolver(CreateLeaveTypeSchema);
