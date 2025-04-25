import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Option } from "@/lib";

const IdSchema = z.object({
  value: z.string(),
  label: z.string(),
});

const CreateApprovalStageRequestSchema = z
  .object({
    type: z
      .enum(["Role", "User"], { required_error: "Type is required" }) // Error message for type
      .refine((value) => value === "Role" || value === "User", {
        message: "Type must be either 'Role' or 'User'",
        path: ["type"],
      }),
    userId: IdSchema.optional(),
    // itemType: IdSchema,
    roleId: IdSchema.optional(),
    required: z.boolean().optional(),
    order: IdSchema.optional(),
  })
  .refine((data) => data.type !== "Role" || data.roleId != null, {
    message: "roleId is required when type is 'Role'",
    path: ["roleId"],
  })
  .refine((data) => data.type !== "User" || data.userId != null, {
    message: "userId is required when type is 'User'",
    path: ["userId"],
  });

const RequisitionTypeSchema = z.object({
  label: z.string(),
  value: z.string(),
});

const CreateApprovalRequestSchema = z.object({
  itemType: RequisitionTypeSchema,
  escalationDuration: z.string().min(1, "Escalation Duration is required"),
  approvalStages: z
    .array(CreateApprovalStageRequestSchema)
    .nullable()
    .optional(),
});

// Types from Zod schemas (optional but can help with stricter type checks)

export type ApprovalRequestDto = z.infer<typeof CreateApprovalRequestSchema>;
export const ApprovalValidator = zodResolver(CreateApprovalRequestSchema);

export const ApprovalItemTypes: Option[] = [
  {
    label: "Action",
    value: "0",
  },
  {
    label: "Item",
    value: "1",
  },
  {
    label: "Both",
    value: "2",
  },
];

export enum ApprovalCardMode {
  VIEW,
  EDIT,
  CREATE,
}

export const ActionOrItemText = {
  0: "Action",
  1: "Item",
  2: "Both",
};

interface Tag {
  label: string;
  value: string;
}

interface User {
  value: string;
  label: string;
}
interface ModelType {
  label: string;
  value: string;
}
interface Type {
  label: string;
  value: string;
}

export interface Approvals {
  id: string;
  user: User;
  modelType: ModelType;
  type: Type;
  tags: Tag[];
  mode: ApprovalCardMode;
  errors?: {
    message: string;
    error: string;
  };
}
