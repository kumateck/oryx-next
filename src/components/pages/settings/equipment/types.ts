import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const CreateEquipmentSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  machineId: z.string().min(1, { message: "Machine No is required" }),

  storageLocation: z.string().optional(),

  isStorage: z
    .string()
    .transform((value) => {
      const numValue = Number(value);
      if (isNaN(numValue)) {
        throw new Error("Invalid value for Storage");
      }
      return numValue;
    })
    .refine((value) => value === IsYesorNo.Yes || value === IsYesorNo.No, {
      message: "Storage must be either 'Yes' (1) or 'No' (0)",
    }),
  relevanceCheck: z
    .string()
    .transform((value) => {
      const numValue = Number(value);
      if (isNaN(numValue)) {
        throw new Error("Invalid value for Relevance Check");
      }
      return numValue;
    })
    .refine((value) => value === IsYesorNo.Yes || value === IsYesorNo.No, {
      message: "Relevance Check must be either 'Yes' (1) or 'No' (0)",
    }),
  capacityQuantity: z
    .number({
      required_error: "Capacity is required",
      invalid_type_error: "Capacity must be a number",
    })
    .positive({
      message: "Capacity must be greater than 0",
    }),
  uoM: z.object(
    {
      value: z.string().min(1, { message: "Unit of Measurement is required" }),
      label: z.string(),
    },
    {
      message: "Unit of Measurement is required",
    },
  ),
  department: z.object(
    {
      value: z.string().min(1, { message: "Department is required" }),
      label: z.string(),
    },
    {
      message: "Department is required",
    },
  ),
});

export type EquipmentRequestDto = z.infer<typeof CreateEquipmentSchema>;
export const CreateEquipmentValidator = zodResolver(CreateEquipmentSchema);

export enum IsYesorNo {
  Yes = 1,
  No = 0,
}
