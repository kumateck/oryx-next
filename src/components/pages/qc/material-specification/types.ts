import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const MaterialSpecificationReference = {
  BP: 0,
  USP: 1,
  PhInt: 2,
  "In House": 3,
};
export enum MaterialSpecificationReferenceEnum {
  BP = 0,
  USP = 1,
  PhInt = 2,
  "In House" = 3,
}

export const TestType = {
  "Weight Of 20 Tablets": 0,
  "Uniformity Of Weight": 1,
  "Disintegration Time": 2,
  Friability: 3,
  Dissolution: 4,
  Assay: 5,
};
export enum TestTypeEnum {
  "Weight Of 20 Tablets" = 0,
  "Uniformity Of Weight" = 1,
  "Disintegration Time" = 2,
  Friability = 3,
  Dissolution = 4,
  Assay = 5,
}

const specificationSchema = z.object({
  specificationNumber: z.string().min(1, "Specification number is required"),

  revisionNumber: z.string().min(1, "Revision number is required"),
  supersedesNumber: z.string().min(1, "Supersedes number is required"),
  effectiveDate: z.date({
    message: "Effective date must be a valid ISO datetime string",
  }),
  dueDate: z.date({
    message: "Due date must be a valid ISO datetime string",
  }),
  formId: z.object(
    {
      value: z.string(),
      label: z.string(),
    },
    {
      message: "Template is required",
    },
  ),
  userId: z.object(
    {
      value: z.string(),
      label: z.string(),
    },
    {
      message: "Assignee is required",
    },
  ),
  reviewDate: z.date({
    message: "Review date must be a valid ISO datetime string",
  }),
  description: z.string().optional(),
  materialId: z.object(
    {
      value: z.string(),
      label: z.string(),
    },
    {
      message: "Material is required",
    },
  ),
});
export type CreateMaterialSpecificationDto = z.infer<
  typeof specificationSchema
>;
export const CreateMaterialSpecificationValidator =
  zodResolver(specificationSchema);
