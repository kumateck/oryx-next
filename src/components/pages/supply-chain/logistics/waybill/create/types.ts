import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const WaybillSchema = z.object({
  invoiceId: z.object(
    {
      value: z.string().min(1, { message: "Invoice is required" }),
      label: z.string(),
    },
    {
      message: "Invoice is required",
    },
  ),
  supplierName: z.string().min(1, { message: "Supplier Name is required" }),
});

export type WaybillRequestDto = z.infer<typeof WaybillSchema>;
export const CreateWaybillValidator = zodResolver(WaybillSchema);

export const createRequisitionItemRequestSchema = z.object({
  code: z.string().optional(),
  materialName: z.string().optional(),
  materialId: z.string().min(1, { message: "Material is required" }),
  uomId: z
    .string({ required_error: "UOM is required" })
    .min(1, { message: "UOM is required" }),
  expectedQuantity: z.number().min(0.1, { message: "Quantity is required" }),
  receivedQuantity: z
    .number()
    .min(0.1, { message: "Received Quantity is required" }),
  reason: z.string().optional(),
  uomName: z.string().optional(),
  costPrice: z.string().optional(),
  manufacturerId: z.string().optional(),
  purchaseOrderId: z.string().optional(),
  purchaseOrderCode: z.string().optional(),
  options: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .optional(),
});

export const itemsRequestSchema = z.array(createRequisitionItemRequestSchema);

export type MaterialRequestDto = z.infer<
  typeof createRequisitionItemRequestSchema
>;
