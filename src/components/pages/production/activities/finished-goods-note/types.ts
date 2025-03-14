import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const createFinishedGoodsRequestSchema = z.object({
  productName: z.string().optional(),
  manufacturingDateName: z.string().optional(),
  expiryDateName: z.string().optional(),
  batchNumber: z.string().min(1, { message: "Batch Number is required" }),
  manufacturingDate: z
    .string()
    .min(1, { message: "Manufacturing Date is required" }),
  expiryDate: z.string().min(1, { message: "Expiry Date is required" }),
  quantityPerPack: z
    .string()
    .min(1, { message: "Quantity per pack is required" }),
  totalQuantityTransfer: z
    .string()
    .min(1, { message: "Total quantity is required" }),
  qarNumber: z.string().min(1, { message: "QAR number is required" }),
  packageStyle: z.object(
    {
      value: z.string().min(1, { message: "Pack Style is required" }),
      label: z.string(),
    },
    {
      message: "Pack Style is required",
    },
  ),
  uom: z.object(
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
