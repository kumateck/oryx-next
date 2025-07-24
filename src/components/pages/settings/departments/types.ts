import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { IsYesorNo } from "@/lib";

export const CreateDepartmentSchema = z.object({
  name: z.string().min(1, { message: "Location Name is required" }),
  code: z.string().min(1, { message: "Code is required" }),
  description: z.string().optional(),
  parentDepartmentId: z.object(
    {
      value: z.string().min(1, { message: "Parent Department is required" }),
      label: z.string(),
    },
    { message: "Parent Department is required" },
  ),
  type: z
    .string()
    .transform((value) => {
      const numValue = Number(value);
      if (isNaN(numValue)) {
        throw new Error("Invalid value for Type ");
      }
      return numValue;
    })
    .refine((value) => value === IsYesorNo.Yes || value === IsYesorNo.No, {
      message: "Type must be either 'Yes' (1) or 'No' (0)",
    }),
});

export type DepartmentRequestDto = z.infer<typeof CreateDepartmentSchema>;
export const CreateDepartmentValidator = zodResolver(CreateDepartmentSchema);
