import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const atrSchema = z.object({
  filledVolume: z.string().min(1, "Filled Volume is required"),
  state: z.object(
    {
      label: z.string(),
      value: z.string(),
    },
    { message: "Product State is required" },
  ),
});

export type CreateATRDto = z.infer<typeof atrSchema>;
export const CreateATRValidator = zodResolver(atrSchema);
