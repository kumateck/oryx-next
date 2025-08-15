import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const ApproveTransferNoteFormSchema = z.object({
  notes: z.string().optional(),
  quantityReceived: z
    .string()
    .min(1, "Quantity must be greater than 0")
    .refine((value) => !isNaN(Number(value)) && Number(value) > 0),
});

export type ApproveTransferNoteFormData = z.infer<
  typeof ApproveTransferNoteFormSchema
>;
export const ApproveTransferNoteFormResolver = zodResolver(
  ApproveTransferNoteFormSchema,
);
