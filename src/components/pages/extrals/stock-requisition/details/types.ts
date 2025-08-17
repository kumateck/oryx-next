import z from "zod";

export const IssueFormSchema = z.object({
  requisitionId: z.string(),
  requestedDate: z.string().min(10).max(100),
  expectedDeliveryDate: z.string().min(10).max(100),
  requestedDepartment: z.string(),
  justification: z.string(),
  products: z.array(
    z.object({
      itemName: z.string(),
      ItemCode: z.string(),
      requestedQuantity: z.number().min(1),
      issuedQuantity: z.number().min(1),
    }),
  ),
});

export type IssueFormValues = z.infer<typeof IssueFormSchema>;
