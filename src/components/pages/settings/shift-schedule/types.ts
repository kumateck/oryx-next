import { IdSchema } from "@/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const CreateShiftScheduleSchema = z.object({
  frequency: z.object(
    {
      value: z.string().min(1, { message: "Frequency is required" }),
      label: z.string(),
    },
    {
      message: "Frequency is required",
    },
  ),

  startDate: z.date({ required_error: "Start Date is required" }),

  scheduleName: z.string().min(1, { message: "Schedule name is required" }),
  // startTime: z.string().min(1, { message: "Start time is required" }),
  departmentId: z.object(
    {
      value: z.string().min(1, { message: "Department is required" }),
      label: z.string(),
    },
    {
      message: "Department is required",
    },
  ),
  shiftTypeIds: z
    .array(IdSchema("ShiftType"))
    .min(1, { message: "At least one shift type must be selected" }),
});

export type ShiftScheduleRequestDto = z.infer<typeof CreateShiftScheduleSchema>;
export const CreateShiftScheduleValidator = zodResolver(
  CreateShiftScheduleSchema,
);
