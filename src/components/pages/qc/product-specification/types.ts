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

const specificationSchema = z
  .object({
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
    productId: z.object(
      {
        value: z.string(),
        label: z.string(),
      },
      {
        message: "Product is required",
      },
    ),
    assignSpec: z.boolean().default(false),
    formId: z.object(
      {
        value: z.string().min(1, { message: "Form Template is required" }),
        label: z.string(),
      },
      {
        message: "Form Template is required",
      },
    ),
    userId: z
      .object(
        {
          value: z.string().min(1, { message: "User is required" }),
          label: z.string(),
        },
        {
          message: "User is required",
        },
      )
      .optional(),
    description: z.string().optional(),
    dueDate: z
      .date({
        message: "Due date must be a valid ISO datetime string",
      })
      .optional(),
  })
  .refine(
    (data) =>
      !data.assignSpec || (data.userId && data.userId.value.trim() !== ""),
    {
      message: "Responsible Person is required when assigning a specification.",
      path: ["userId"],
    },
  );

// .refine((data) => !data.assignSpec || !!data.dueDate, {
//   message: "Due Date is required when assigning a specification .",
//   path: ["dueDate"],
// });
export type CreateProductSpecificationDto = z.infer<typeof specificationSchema>;
export const CreateProductSpecificationValidator =
  zodResolver(specificationSchema);
