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

export enum TestStageEnum {
  Intermediate = 0,
  Bulk = 1,
  Finished = 2,
}
export const TestStageValues = {
  Intermediate: 0,
  Bulk: 1,
  Finished: 2,
};

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

const testSpecificationSchema = z.object({
  srNumber: z.number().nonnegative().optional(),
  testName: z.object(
    {
      value: z.string().min(1, "Test name is required"),
      label: z.string().min(1, "Test name is required"),
    },
    {
      message: "Test name is required",
    },
  ),
  releaseSpecification: z.string().min(1, "Release specification is required"),
  reference: z.object(
    {
      value: z.string().min(1, "Reference is required"),
      label: z.string().min(1, "Reference is required"),
    },
    {
      message: "Reference is required",
    },
  ),
});

const specificationSchema = z.object({
  specificationNumber: z.string().min(1, "Specification number is required"),
  labelClaim: z.string().min(1, "Label claim is required"),
  shelfLife: z.string().min(1, "Shelf life is required"),
  testStage: z
    .object(
      {
        value: z.string(),
        label: z.string(),
      },
      { message: "Test stage is required" },
    )
    .default({ value: "0", label: "Initial" }),
  revisionNumber: z.string().min(1, "Revision number is required"),
  supersedesNumber: z.string().min(1, "Supersedes number is required"),
  effectiveDate: z.date({
    message: "Effective date must be a valid ISO datetime string",
  }),

  reviewDate: z.date({
    message: "Review date must be a valid ISO datetime string",
  }),
  packingStyle: z.string().optional(),
  testSpecifications: z
    .array(testSpecificationSchema)
    .min(1, "At least one test specification is required"),

  productId: z.object(
    {
      value: z.string(),
      label: z.string(),
    },
    {
      message: "Material is required",
    },
  ),
});
export type CreateProductSpecificationDto = z.infer<typeof specificationSchema>;
export const CreateProductSpecificationValidator =
  zodResolver(specificationSchema);
