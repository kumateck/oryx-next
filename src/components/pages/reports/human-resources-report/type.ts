import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
const FilterFormSchema = z
  .object({
    startDate: z.date().optional(),
    endDate: z.date().optional(),
  })
  .refine((data) => data.startDate || data.endDate, {
    message: "No data was selecte",
    path: ["startDate", "endDate"],
  });

export type FilterFormValues = z.infer<typeof FilterFormSchema>;
export const FilterValidator = zodResolver(FilterFormSchema);
