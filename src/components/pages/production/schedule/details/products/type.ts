import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// import { RequisitionType } from "@/lib";

export const createRequisitionItemRequestSchema = z.object({
  code: z.string().optional(),
  materialCode: z.string().optional(),
  materialName: z.string().optional(),
  uom: z.string().optional(),
  floatQuantity: z.string().optional(),
  finalQuantityNeeded: z.string().optional(),
  finalQuantityOnHand: z.string().optional(),
  finalQuantityRequested: z.string().optional(),
  finalTotalStock: z.string().optional(),
  floatedQuantity: z.string().optional(),
  totalStockLabel: z.string().optional(),
  materialStatus: z.string().optional(),
  materialId: z.string().min(1, { message: "Material is required" }),
  uomId: z.string().optional(),
  quantityOnHand: z.number().min(1, { message: "Quantity is required" }),
  quantityRequested: z.number().min(1, { message: "Quantity is required" }),
  quantity: z.number().optional(),
  totalStock: z.number().min(1, { message: "Quantity is required" }),
});

export const itemsRequestSchema = z.array(
  z.object({
    materialId: z.string().min(1, { message: "Material is required" }),
    quantity: z.number().min(0.1, { message: "Quantity is required" }),
    uomId: z
      .string({ required_error: "UOM is required" })
      .min(1, { message: "UOM is required" }),
  }),
);

// Define the CreateRequisitionRequest schema
export const createRequisitionRequestSchema = z.object({
  code: z.string({ required_error: "Code is required" }).min(1, {
    message: "Code is required",
  }),
  comments: z.string().optional(),
  items: z.array(createRequisitionItemRequestSchema).optional(),

  expectedDelivery: z.date().optional(),
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

export enum ScheduleProductStatus {
  None,
  Start,
  Purchase,
  Stock,
}
