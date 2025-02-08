import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const QuestRequestSchema = z.object({
  id: z.string().optional(),
  label: z.string().min(1, "Question is required"),
  type: z.string(),
  // required: z.boolean(),
  options: z
    .array(z.object({ name: z.string().min(1, "Option cannot be empty") }))
    .optional(),
});

const QuestionSchema = QuestRequestSchema.superRefine((data, ctx) => {
  const { type, options } = data;

  // Conditional validation: if type is "Multiple Choice" or "Checkboxes", options must be present
  if (
    (type === "multiple_choice" ||
      type === "checkboxes" ||
      type === "dropdown") &&
    (!options || options.length === 0)
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["options"],
      message: "At least one option is required for this question type",
    });
  }

  // If the type is not "Multiple Choice" or "Checkboxes", make sure options are an empty array
  if (
    type !== "multiple_choice" &&
    type !== "checkboxes" &&
    type !== "dropdown"
  ) {
    data.options = [];
  }
});

export type QuestionRequestDto = z.infer<typeof QuestRequestSchema>;
export const CreateQuestionValidator = zodResolver(QuestionSchema);
