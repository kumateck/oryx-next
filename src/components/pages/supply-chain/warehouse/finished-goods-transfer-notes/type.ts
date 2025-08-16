import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const ApproveTransferNoteFormSchema = z.object({
  notes: z.string().optional(),
  quantityReceived: z
    .number({
      required_error: "Quantity Received is required",
      invalid_type_error: "Quantity Received must be a number",
    })
    .positive({
      message: "Quantity Received must be greater than 0",
    }),
  loose: z.number().optional(),
});

export type ApproveTransferNoteFormData = z.infer<
  typeof ApproveTransferNoteFormSchema
>;
export const ApproveTransferNoteFormResolver = zodResolver(
  ApproveTransferNoteFormSchema,
);
