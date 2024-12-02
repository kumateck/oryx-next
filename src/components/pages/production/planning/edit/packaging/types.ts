import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const CreatePackagingSchema = z.object({
  materialThickness: z.string().optional(),
  otherStandards: z.string().optional(),
  id: z.string().optional(),
  materialId: z.object(
    {
      value: z.string().min(1, { message: "Material is required" }),
      label: z.string(),
    },
    {
      message: "Material is required",
    },
  ),

  packageTypeId: z.object(
    {
      value: z.string().min(1, { message: "Package Type is required" }),
      label: z.string(),
    },
    {
      message: "Package Type is required",
    },
  ),
});

export type PackagingRequestDto = z.infer<typeof CreatePackagingSchema>;
export const CreatePackagingValidator = zodResolver(CreatePackagingSchema);
