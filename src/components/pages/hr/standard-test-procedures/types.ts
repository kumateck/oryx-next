import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const StandardTestProcedureSchema = z.object({
  stpNumber: z.string().min(1, { message: "stp numbeer is required" }),
  materialId: z.object(
    {
      value: z.string().min(1, { message: "Meterial is required" }),
      label: z.string(),
    },
    {
      message: "Material is required",
    },
  ),
  description: z.string().optional(),
});

export type CreateStandardTestProcedureDto = z.infer<
  typeof StandardTestProcedureSchema
>;
export const StandardTestProcedureValidator = zodResolver(
  StandardTestProcedureSchema,
);
