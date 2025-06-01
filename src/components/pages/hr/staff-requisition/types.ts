import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const CreateStaffRequisitionSchema = z.object({
  numberOfStaff: z.number().min(1, { message: "Number of staff is required" }),
  designationId: z.object(
    {
      value: z.string().min(1, { message: "Job title is required" }),
      label: z.string(),
    },
    {
      message: "Job title is required",
    },
  ),
  qualification: z.string().min(1, { message: "Qualification is required" }),
  appointmentType: z.object(
    {
      value: z.string().min(1, { message: "Appointment type is required" }),
      label: z.string(),
    },
    {
      message: "Appointment type is required",
    },
  ),
  requestUrgency: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date({
      required_error: "Request urgency is required",
      invalid_type_error: "Request urgency must be a valid date",
    }),
  ),
  justification: z.string().optional(),
  budgeted: z.string().transform((value) => {
    const numValue = Number(value);
    if (isNaN(numValue)) {
      throw new Error("Invalid value for budget type");
    }
    return numValue;
  }),
  educationQualification: z
    .string()
    .min(1, { message: "Education qualification is required" }),
  additionalRequirements: z.string().optional(),
});

export type StaffRequisitionRequestDto = z.infer<
  typeof CreateStaffRequisitionSchema
>;
export const CreateStaffRequisitionValidator = zodResolver(
  CreateStaffRequisitionSchema,
);
