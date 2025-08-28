import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
export enum ProcedureType {
  Role = "Role",
  User = "User",
}

const IdSchema = (msg: string) =>
  z.object(
    {
      value: z.string({
        message: `${msg} is required`,
      }),
      label: z.string(),
    },
    {
      message: `${msg} is required`,
    },
  );

const PersonnelSchema = z.object({
  type: z
    .enum([ProcedureType.Role, ProcedureType.User], {
      required_error: "Type is required",
    })
    .refine(
      (value) => value === ProcedureType.Role || value === ProcedureType.User,
      {
        message: "Type must be either 'Role' or 'User'",
        path: ["type"],
      },
    ),
  userId: IdSchema("User").optional(),
  roleId: IdSchema("Role").optional(),
  productAnalyticalRawDataId: IdSchema("Analytical Raw Data").optional(),
  action: IdSchema("Action"),
});
export const CreateRoutingSchema = z.object({
  estimatedTime: z.string().optional(),
  function: z.string().optional(),
  grade: z.string().optional(),
  isSubstitutable: z.boolean().optional(),
  id: z.string().optional(),
  rowId: z.string(),

  operationId: IdSchema("Operation"),
  // resources: z.array(IdSchema("Resource")).min(1, {
  //   message: "Resource is required",
  // }),
  workCenters: z.array(IdSchema("Work Center")).min(1, {
    message: "Resource is required",
  }),
  personnels: z.array(PersonnelSchema).optional(),
  // responsibleUsers: z.array(IdSchema("User")).optional(),
  // responsibleRoles: z.array(IdSchema("Role")).optional(),
});
export const RoutingFormSchema = z.object({
  items: z.array(CreateRoutingSchema),
});
export type RoutingFormData = z.infer<typeof RoutingFormSchema>;
export type PersonnelType = z.infer<typeof PersonnelSchema>;

export const RoutingFormValidator = zodResolver(RoutingFormSchema);

export type RoutingRequestDto = z.infer<typeof CreateRoutingSchema>;
export const CreateRoutingValidator = zodResolver(CreateRoutingSchema);
