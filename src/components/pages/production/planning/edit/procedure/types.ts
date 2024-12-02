import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const CreateRoutingSchema = z.object({
  estimatedTime: z.string().optional(),
  id: z.string().optional(),
  order: z.number().optional(),
  resourceIds: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      }),
    )
    .min(1, {
      message: "Resource is required",
    }),

  operationId: z.object(
    {
      value: z.string().min(1, { message: "Material is required" }),
      label: z.string(),
    },
    {
      message: "Material is required",
    },
  ),

  workCenterId: z.object(
    {
      value: z.string().min(1, { message: "Package Type is required" }),
      label: z.string(),
    },
    {
      message: "Package Type is required",
    },
  ),
});

export type RoutingRequestDto = z.infer<typeof CreateRoutingSchema>;
export const CreateRoutingValidator = zodResolver(CreateRoutingSchema);
