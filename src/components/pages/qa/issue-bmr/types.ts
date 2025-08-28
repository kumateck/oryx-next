import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const CreateIssueSchema = z
  .object({
    batchNumber: z.string().min(1, { message: "Batch Number is required" }),
    manufacturingDate: z.date({
      required_error: "Manufacturing Date is required",
    }),
    expiryDate: z.date({ required_error: "Expiry Date is required" }),
    batchQuantity: z.string().optional(),
    uom: z.string().optional(),
    packingId: z.object(
      {
        value: z.string().min(1, { message: "Packing Style is required" }),
        label: z.string(),
      },
      {
        message: "Packing Style is required",
      },
    ),
  })
  .refine((data) => data.expiryDate > data.manufacturingDate, {
    message: "Expiry Date must be after Manufacturing Date",
    path: ["expiryDate"], // Targets expiryDate field
  });

export type IssueRequestDto = z.infer<typeof CreateIssueSchema>;
export const CreateIssueValidator = zodResolver(CreateIssueSchema);
