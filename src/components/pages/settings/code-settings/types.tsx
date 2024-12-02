import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const CreateCodeSchema = z.object({
  prefix: z.string({ required_error: "Prefix is required" }).min(1, {
    message: "Prefix is required",
  }),
  modelType: z.object(
    {
      value: z.string().min(1, { message: "Model Type is required" }),
      label: z.string(),
    },
    {
      message: "Model Type is required",
    },
  ),
  namingType: z.object(
    {
      value: z.string().min(1, { message: "Name Type is required" }),
      label: z.string(),
    },
    {
      message: "Name Type is required",
    },
  ),

  minimumNameLength: z
    .number({
      required_error: "Minimum Name Length is required",
    })
    .min(1, {
      message: "Minimum Name Length is required",
    })
    .max(7, {
      message: "Minimum Name Length is required",
    }),
  maximumNameLength: z
    .number()
    .min(3, {
      message: "Maximum Name Length is required",
    })
    .max(15, {
      message: "Maximum Name Length is required",
    }),
});

export type CodeRequestDto = z.infer<typeof CreateCodeSchema>;
export const CreateCodeValidator = zodResolver(CreateCodeSchema);
