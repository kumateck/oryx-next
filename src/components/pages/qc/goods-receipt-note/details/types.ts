import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const CreateSampleSchema = z.object({
  materialName: z.string().min(1, "Material name is required"),
  quantity: z.number().min(1, "Quantity must be greater than 0"),
  arNumber: z.string().min(1, "AR number is required"),
  sampleQuantity: z.string().min(1, "Sample quantity must be greater than 0"),
});

export type CreateSampleFormData = z.infer<typeof CreateSampleSchema>;
export const CreateSampleFormResolver = zodResolver(CreateSampleSchema);
