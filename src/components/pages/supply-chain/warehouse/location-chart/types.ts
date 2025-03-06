import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const LocationChartSchema = z.object({
  rackId: z.object(
    {
      value: z.string().min(1, { message: "Rack is required" }),
      label: z.string(),
    },
    {
      message: "Rack is required",
    },
  ),
});

export type LocationChartDto = z.infer<typeof LocationChartSchema>;
export const CreateShelfValidator = zodResolver(LocationChartSchema);
