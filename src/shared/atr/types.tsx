import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const atrSchema = z.object({
  filledVolume: z.string().min(1, "Filled Volume is required"),
  stage: z.string().transform((value) => {
    const numValue = Number(value);
    if (isNaN(numValue)) {
      throw new Error("Invalid value for Stage ");
    }
    return numValue;
  }),
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
