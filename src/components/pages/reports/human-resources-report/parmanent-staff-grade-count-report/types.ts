import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const FilterFormSchema = z.object({
  departmentId: z.object(
    {
      value: z.string(),
      label: z.string(),
    },
    {
      message: "Select a department",
    },
  ),
});

export const FilterFormSchemaValidator = zodResolver(FilterFormSchema);
export type FilterFormValues = z.infer<typeof FilterFormSchema>;
