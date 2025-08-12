import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const atrSchema = z.object({
  numberOfContainers: z
    .number({
      required_error: "No. of Containers Sampled is required",
      invalid_type_error: "No. of Containers Sampled must be a number",
    })
    .positive({
      message: "No. of Containers Sampled must be greater than 0",
    }),
  sampledQuantity: z.string().min(1, "Sample Quantity is required"),
});

export type CreateATRDto = z.infer<typeof atrSchema>;
export const CreateATRValidator = zodResolver(atrSchema);
