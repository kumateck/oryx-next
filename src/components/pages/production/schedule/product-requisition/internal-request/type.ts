import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Option, objectSchema } from "@/lib";

const sourcesSchema = z.object({
  //   material: objectSchema("Material is required"),
  quantity: z
    .number({
      required_error: "Quantity is required",
      invalid_type_error: "Quantity must be a number",
    })
    .positive({
      message: "Quantity must be greater than 0",
    }),
  department: objectSchema("Department is required"),
});

export const CreateTransferSchema = z.object({
  sources: z.array(sourcesSchema).min(1, {
    message: "Sources are required",
  }),
  description: z.string().optional(),
});

export type TransferRequestDto = z.infer<typeof CreateTransferSchema>;
export const CreateTransferValidator = zodResolver(CreateTransferSchema);

export type DepartmentMap = {
  [key: string]: Option[];
};
