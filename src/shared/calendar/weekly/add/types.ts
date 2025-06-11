import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const CreateAssignSchema = z.object({
  employeeIds: z
    .array(
      z.object(
        {
          value: z.string().min(1, { message: "Employee is required" }),
          label: z.string(),
        },
        { required_error: "Employee is required" },
      ),
    )
    .min(1, { message: "At least one employee must be selected" }),
  scheduleCategory: z.object(
    {
      value: z.string().min(1, { message: "Shift Category is required" }),
      label: z.string(),
    },
    { required_error: "Shift Category is required" },
  ),
  type: z.object(
    {
      value: z.string().min(1, { message: "Shift Type is required" }),
      label: z.string(),
    },
    { required_error: "Shift Type is required" },
  ),
});

export type AssignRequestDto = z.infer<typeof CreateAssignSchema>;
export const CreateAssignValidator = zodResolver(CreateAssignSchema);

export type ShiftDefault = {
  schedule: {
    label: string;
    value: string;
  };
  type: {
    label: string;
    value: string;
  };
  scheduleDate: string;
};
