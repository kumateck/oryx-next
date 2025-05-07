import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { IdSchema } from "@/lib";

export const CreateDesignationSchema = z.object({
  name: z.string().min(1, { message: "Designation name is required" }),
  departmentIds: z
    .array(IdSchema("Department"))
    .min(1, { message: "At least one department must be selected" }),
  description: z.string().optional(),
  maximumLeaveDays: z
    .number({
      required_error: "Maximum Leave Days is required",
      invalid_type_error: "Maximum Leave Days must be a number",
    })
    .positive({
      message: "Maximum Leave Days must be greater than 0",
    }),
});

export type DesignationRequestDto = z.infer<typeof CreateDesignationSchema>;
export const CreateDesignationValidator = zodResolver(CreateDesignationSchema);
