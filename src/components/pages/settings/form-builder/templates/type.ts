import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { QuestionType } from "@/lib";

const CreateTemplateSchema = z.object({
  // formTypeId: z.object({
  //   value: z.string().min(1, "formTypeId is required"),
  //   label: z.string().min(1, "formTypeId is required"),
  //   // required: z.boolean().optional(), // Assuming required can be optional
  // }),
  name: z.string().min(1, "name is required"),
  // sections: z
  //   .array(
  //     z.object({
  //       description: z.string().optional(),
  //       title: z.string().min(1, "title is required"),
  //       formFields: z
  //         .array(
  //           z.object({
  //             questionId: z.string().min(1, "questionId is required"),
  //             required: z.boolean().optional(), // Assuming required can be optional
  //           }),
  //         )
  //         .nonempty("formFields cannot be empty"),
  //     }),
  //   )
  //   .nonempty("sections cannot be empty"),
});
export type TemplateRequestDto = z.infer<typeof CreateTemplateSchema>;
export const CreateTemplateValidator = zodResolver(CreateTemplateSchema);

export interface QuestionsProps {
  questionId: string;
  required?: boolean;
  name: string;
  type: string;
  options: { name: string }[];
}

export interface templateQuestions {
  id: string;
  required?: boolean;
  label: string;
  type: QuestionType;
  options: { name: string }[];
}
