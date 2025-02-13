import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const createChecklistRequestSchema = z.object({
  code: z.string({ required_error: "Code is required" }).min(1, {
    message: "Code is required",
  }),
  remarks: z.string().optional(),
  scheduledStartTime: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date({
      required_error: "Scheduled Start Date is required",
      invalid_type_error: "Scheduled Start Date must be a valid date",
    }),
  ),
  scheduledEndTime: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date({
      required_error: "Scheduled End Date is required",
      invalid_type_error: "Scheduled End Date must be a valid date",
    }),
  ),
});

export type ChecklistRequestDto = z.infer<typeof createChecklistRequestSchema>;
export const CreateChecklistValidator = zodResolver(
  createChecklistRequestSchema,
);

// ScheduleType?: ScheduleType;
// comments?: string | null;
// items?: CreateScheduleItemRequest[] | null;

export const createRequisitionItemRequestSchema = z.object({
  batchNumber: z.string().optional(),
  numberOfBags: z.string().optional(),
  expriyDate: z.string().optional(),
  manufacturingDate: z.string().optional(),
  retestDate: z.string().optional(),
  batchQuantity: z.string().optional(),
  finalQuantityRequested: z.string().optional(),
  finalTotalStock: z.string().optional(),
  floatedQuantity: z.string().optional(),
  totalStockLabel: z.string().optional(),
  materialId: z.string().min(1, { message: "Material is required" }),
  uomId: z
    .string({ required_error: "UOM is required" })
    .min(1, { message: "UOM is required" }),
  quantityOnHand: z.number().min(1, { message: "Quantity is required" }),
  quantityRequested: z.number().min(1, { message: "Quantity is required" }),
  quantity: z.number().optional(),
  totalStock: z.number().min(1, { message: "Quantity is required" }),
});

export type ChecklistBatchRequestDto = z.infer<
  typeof createRequisitionItemRequestSchema
>;
