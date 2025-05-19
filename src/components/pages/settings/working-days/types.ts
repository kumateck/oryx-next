import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const DayEnum = z.union([
  z.literal(0),
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
  z.literal(6),
]);

const CreateWorkDaysSchema = z.object({
  workingDays: z.array(
    z.object({
      day: DayEnum,
      isWorkingDay: z.boolean().default(true),
      startTime: z.string().min(1, { message: "Start time is required" }),
      endTime: z.string().min(1, { message: "End time is required" }),
    }),
  ),
});

export type DaysIndexTypes = z.infer<typeof DayEnum>;
export type WorkDaysDto = z.infer<typeof CreateWorkDaysSchema>;
export const WorkDaysValidator = zodResolver(CreateWorkDaysSchema);

export const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export type DaysOfWeekTypes = (typeof daysOfWeek)[number];
