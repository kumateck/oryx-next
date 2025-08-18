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
  stockQuantity: z.number().nonnegative(),
  orderQuantity: z.number().nonnegative(),
});

export const CreatePurchaseRequisitionSchema = z.object({
  remarks: z.string().min(1, { message: "Remarks are required" }),
  code: z.string().min(1, { message: "Code is required" }),
  deliveryDate: z.date({
    message: "Delivery date is required",
  }),
  items: z
    .array(objectSchema)
    .min(1, {
      message: "At least one service is required",
    })
    .default([
      {
        itemId: {
          value: "",
          label: "",
        },
        itemCode: "",
        stockQuantity: 0,
        orderQuantity: 0,
      },
    ]),
});

export type CreatePurchaseRequisitionDto = z.infer<
  typeof CreatePurchaseRequisitionSchema
>;
export const CreatePurchaseRequisitionValidator = zodResolver(
  CreatePurchaseRequisitionSchema,
);
