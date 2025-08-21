import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const createJobRequestSchema = z.object({
  departmentId: z.object({
    label: z.string().min(1, "Department label is required"),
    value: z.string().uuid("Invalid Department ID"),
  }),
  location: z.string().min(1, "Location is required"),
  equipmentId: z.object({
    label: z.string().min(1, "Equipment label is required"),
    value: z.string().uuid("Invalid Equipment ID"),
  }),
  dateOfIssue: z.string().datetime("Invalid date format"),
  descriptionOfWork: z.string().min(1, "Description is required"),
  preferredCompletionDate: z.string().datetime("Invalid date format"),
});

export type CreateJobRequestDto = z.infer<typeof createJobRequestSchema>;
export const CreateJobRequestValidator = zodResolver(createJobRequestSchema);
