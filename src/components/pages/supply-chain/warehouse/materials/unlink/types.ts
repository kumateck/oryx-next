import { z } from "zod";

export const createMaterialSchema = z
  .object({
    code: z.string().optional(),
    materialName: z.string().optional(),
    materialId: z.string(),
    reOrderLevel: z.number(),
    minimumStockLevel: z.number(),
    maximumStockLevel: z.number(),
  })
  .refine((data) => data.minimumStockLevel <= data.maximumStockLevel, {
    message:
      "Minimum stock level should not be greater than maximum stock level",
    path: ["minimumStockLevel"], // This will attach the error to minimumStockLevel
  });

export const itemsRequestSchema = z.array(createMaterialSchema);

export type MaterialRequestDto = z.infer<typeof createMaterialSchema>;
