import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const createFinishedGoodsRequestSchema = z.object({
  productName: z.string().min(1, { message: "Product Name is required" }),
  toWarehouseId: z
    .string()
    .min(1, { message: "Destination Warehouse is required" }),
  batchNumber: z.string().min(1, { message: "Batch Number is required" }),
  manufacturingDate: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date({
      required_error: "Manufacturing date is required",
      invalid_type_error: "Manufacturing date must be a valid date",
    }),
  ),
  expiryDate: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date({
      required_error: "Expiry date is required",
      invalid_type_error: "Expiry date must be a valid date",
    }),
  ),
  quantityPerPack: z
    .number()
    .min(1, { message: "Quantity per pack is required" }),
  qarNumber: z.number().min(1, { message: "QAR number is required" }),
  packageStyleId: z.object(
    {
      value: z.string().min(1, { message: "Unit of Measurement is required" }),
      label: z.string(),
    },
    {
      message: "Unit of Measurement is required",
    },
  ),
  uomId: z.object(
    {
      value: z.string().min(1, { message: "Unit of Measurement is required" }),
      label: z.string(),
    },
    {
      message: "Unit of Measurement is required",
    },
  ),
});

export type FinishedGoodsNoteRequestDto = z.infer<
  typeof createFinishedGoodsRequestSchema
>;
export const CreateFinishedGoodsNoteValidator = zodResolver(
  createFinishedGoodsRequestSchema,
);
