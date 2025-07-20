import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
const FilterFormSchema = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export type FilterFormValues = z.infer<typeof FilterFormSchema>;
export const FilterValidator = zodResolver(FilterFormSchema);
