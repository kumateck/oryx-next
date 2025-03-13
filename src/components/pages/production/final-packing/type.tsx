import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const CreateFinishedProductSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(1, {
    message: "Name is required",
  }),
  dosageForm: z.string().optional(),
  strength: z.string().optional(),
  baseUomId: z.object(
    {
      value: z.string().min(1, { message: "Unit of Measurement is required" }),
      label: z.string(),
    },
    {
      message: "Unit of Measurement is required",
    },
  ),
  standardCost: z
    .number({
      required_error: "Cost Price is required",
    })
    .min(1, {
      message: "Cost Price should be greater than 0",
    }),
  sellingPrice: z
    .number({
      required_error: "Selling Price is required",
    })
    .min(1, {
      message: "Selling Price should be greater than 0",
    }),
});
export const CreateProductSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(1, {
    message: "Name is required",
  }),
  code: z
    .string({ required_error: "Code is required" })
    .min(1, {
      message: "Code is required",
    })
    .refine((val) => val !== "undefined", { message: "Invalid code value" }),
  description: z.string().optional(),
  genericName: z.string().optional(),
  storageCondition: z.string().optional(),
  packageStyle: z.string().optional(),
  shelfLife: z.string().optional(),
  actionuse: z.string().optional(),
  filledWeight: z.string().optional(),
  baseUomId: z.object(
    {
      value: z.string().min(1, { message: "Unit of Measurement is required" }),
      label: z.string(),
    },
    {
      message: "Unit of Measurement is required",
    },
  ),
  baseQuantity: z
    .number({
      required_error: "BaseQuantity is required",
      invalid_type_error: "Base Quantity must be a number",
    })
    .positive({
      message: "Base Quantity must be greater than 0",
    }),
  fullBatchSize: z
    .number({
      required_error: "Full Batch Size is required",
      invalid_type_error: "Full Batch Size must be a number",
    })
    .positive({
      message: "Full Batch Size must be greater than 0",
    }),
  basePackingQuantity: z
    .number({
      required_error: "BaseQuantity is required",
      invalid_type_error: "Base Quantity must be a number",
    })
    .positive({
      message: "Base Quantity must be greater than 0",
    }),
  basePackingUomId: z.object(
    {
      value: z.string().min(1, { message: "Unit of Measurement is required" }),
      label: z.string(),
    },
    {
      message: "Unit of Measurement is required",
    },
  ),
  categoryId: z.object(
    {
      value: z.string().min(1, { message: "Category is required" }),
      label: z.string(),
    },
    {
      message: "Category is required",
    },
  ),
  equipment: z.object(
    {
      value: z.string().min(1, { message: "Equipment is required" }),
      label: z.string(),
    },
    {
      message: "Equipment is required",
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
  finishedProducts: z.array(CreateFinishedProductSchema).optional(),
});

export type PackingRequestDto = z.infer<typeof CreateProductSchema>;
export const CreatePackingValidator = zodResolver(CreateProductSchema);

export interface MaterialMatrix {
  materialId: string;
  materialName: string;
  receivedQuantity: number;
}

export const getMaterialSchema = (totalReceivedQuantity: number) =>
  z.object({
    receivedQuantity: z.number().nonnegative(), // Read-only
    subsequentDeliveredQuantity: z.number().nonnegative(),
    totalReceivedQuantity: z.number().nonnegative(), // Auto-calculated
    packedQuantity: z
      .number()
      .min(1, "Packed quantity must be greater than 0")
      .max(
        totalReceivedQuantity,
        "Packed quantity cannot exceed total received quantity",
      ),
    returnedQuantity: z.number().nonnegative(),
    rejectedQuantity: z.number().nonnegative(), // Auto-calculated
    sampledQuantity: z.number().nonnegative(),
    totalAccountedForQuantity: z.number().nonnegative(), // Auto-calculated
    percentageLoss: z.number().nonnegative(), // Auto-calculated
  });
