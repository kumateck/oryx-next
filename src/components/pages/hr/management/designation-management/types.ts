import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const CreateDesignationSchema = z.object({
  name: z.string().min(1, { message: "Designation name is required" }),
  associatedDepartmentId: z.object(
    {
      value: z
        .string()
        .min(1, { message: "Associated Department is required" }),
      label: z.string(),
    },
    {
      message: "Associated Department is required",
    },
  ),
  description: z.string().optional(),
});

export type DesignationRequestDto = z.infer<typeof CreateDesignationSchema>;
export const CreateDesignationValidator = zodResolver(CreateDesignationSchema);
