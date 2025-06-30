import { IdSchema } from "@/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const CreateShiftTypeSchema = z.object({
  shiftName: z.string().min(1, { message: "Shift name is required" }),
  rotationType: z.object(
    {
      value: z.string().min(1, { message: "Category is required" }),
      label: z.string(),
    },
    { message: "Category is required" },
  ),
  startTime: z.string().min(1, { message: "Start time is required" }),
  endTime: z.string().min(1, { message: "End time is required" }),
  applicableDays: z
    .array(IdSchema("applicableDays"))
    .min(1, { message: "At least one applicable day must be selected" }),
});

export type ShiftTypeRequestDto = z.infer<typeof CreateShiftTypeSchema>;
export const CreateShiftTypeValidator = zodResolver(CreateShiftTypeSchema);
