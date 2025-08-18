import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Option } from "@/lib";

const sourcesSchema = z.object({
  quantity: z
    .number({
      required_error: "Quantity is required",
      invalid_type_error: "Quantity must be a number",
    })
    .positive({
      message: "Quantity must be greater than 0",
    }),
  department: z.object(
    { value: z.string(), label: z.string() },
    { message: "Department is required" },
  ),
  id: z.string().optional(),
});

export const CreateTransferSchema = z.object({
  code: z.string({ required_error: "Code is required" }).min(1, {
    message: "Code is required",
  }),
  sources: z.array(sourcesSchema).min(1, {
    message: "Sources are required",
  }),
  reason: z.string().optional(),
});

export type TransferRequestDto = z.infer<typeof CreateTransferSchema>;
export const CreateTransferValidator = zodResolver(CreateTransferSchema);

export type DepartmentMap = {
  [key: string]: Option[];
};
