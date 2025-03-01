import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// import { RequisitionType } from "@/lib";

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

// Define the CreateRequisitionRequest schema
export const createRequisitionRequestSchema = z.object({
  code: z.string({ required_error: "Code is required" }).min(1, {
    message: "Code is required",
  }),
  comments: z.string().nullable().optional(),
  items: z.array(createRequisitionItemRequestSchema).nullable().optional(),
  expectedDelivery: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date({
      required_error: "Expected Delivery Date is required",
      invalid_type_error: "Expected Delivery Date must be a valid date",
    }),
  ),
});

export type RequisitionRequestDto = z.infer<
  typeof createRequisitionRequestSchema
>;

export type MaterialRequestDto = z.infer<
  typeof createRequisitionItemRequestSchema
>;

export const CreateRequisitionValidator = zodResolver(
  createRequisitionRequestSchema,
);

// requisitionType?: RequisitionType;
// comments?: string | null;
// items?: CreateRequisitionItemRequest[] | null;
