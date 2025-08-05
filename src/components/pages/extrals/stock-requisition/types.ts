import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const objectSchema = z.object({
  itemId: z.object({
    value: z.string({
      required_error: "Item is required",
      message: "Item is required",
    }),
    label: z.string({
      required_error: "Item is required",
      message: "Item is required",
    }),
  }),
  itemCode: z.string().optional(),
  stockQuantity: z.string().optional(),
  orderQuantity: z.number().nonnegative(),
});

export const CreatePurchaseRequisitionSchema = z.object({
  justification: z.string().min(1, { message: "Name is required" }),
  code: z.string().min(1, { message: "Code is required" }),
  deliveryDate: z.date({
    message: "Delivery date is required",
  }),
  items: z.array(objectSchema).min(1, {
    message: "At least one service is required",
  }),
});

export type VendorRequestDto = z.infer<typeof CreatePurchaseRequisitionSchema>;
export const CreateVendorValidator = zodResolver(
  CreatePurchaseRequisitionSchema,
);
