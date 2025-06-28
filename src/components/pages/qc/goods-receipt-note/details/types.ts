import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const CreateSampleSchema = z.object({
  materialName: z.string(),
  quantity: z.string().optional(),
  batchNumber: z.string().optional(),
  arNumber: z.string(),
  baseUnit: z.string().optional(),
  sampleQuantity: z.string().min(1, "Sample quantity must be greater than 0"),
});

export type CreateSampleFormData = z.infer<typeof CreateSampleSchema>;
export const CreateSampleFormResolver = zodResolver(CreateSampleSchema);
