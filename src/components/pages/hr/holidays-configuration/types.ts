import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const HolidaysSchema = z.object({
  name: z.string().min(1, { message: "Holiday name is required" }),
  date: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date({
      required_error: "Holiday date is required",
      invalid_type_error: "Invalid date type",
    }),
  ),
  description: z.string().optional(),
});

export type CreateHolidayDto = z.infer<typeof HolidaysSchema>;
export const CreateHolidayValidator = zodResolver(HolidaysSchema);
