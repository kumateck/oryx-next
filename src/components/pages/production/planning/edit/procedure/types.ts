// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// export enum ProcedureType {
//   Role = "Role",
//   User = "User",
// }
// const IdSchema = (msg: string) =>
//   z.object(
//     {
//       value: z.string({
//         message: `${msg} is required`,
//       }),
//       label: z.string(),
//     },
//     {
//       message: `${msg} is required`,
//     },
//   );
// export const CreateRoutingSchema = z
//   .object({
//     estimatedTime: z.string().optional(),
//     id: z.string().optional(),
//     idIndex: z.string().optional(),
//     order: z.number().optional(),
//     type: z
//       .enum([ProcedureType.Role, ProcedureType.User], {
//         required_error: "Type is required",
//       })
//       .refine(
//         (value) => value === ProcedureType.Role || value === ProcedureType.User,
//         {
//           message: "Type must be either 'Role' or 'User'",
//           path: ["type"],
//         },
//       ),
//     operationId: IdSchema("Operation"),
//     resourceIds: z.array(IdSchema("Resource")).min(1, {
//       message: "Resource is required",
//     }),
//     workCenters: z.array(IdSchema("Work Center")).min(1, {
//       message: "Resource is required",
//     }),
//     responsibleUsers: z.array(IdSchema("User")).optional(),
//     responsibleRoles: z.array(IdSchema("Role")).optional(),
//   })
//   .refine(
//     (data) =>
//       data.type === ProcedureType.Role &&
//       Number(data.responsibleRoles?.length) === 0,
//     {
//       message: "Roles are required when type is 'Role'",
//       path: ["responsibleRoles"],
//     },
//   )
//   .refine(
//     (data) =>
//       data.type === ProcedureType.User &&
//       Number(data.responsibleUsers?.length) > 0,
//     {
//       message: "Users are required when type is 'User'",
//       path: ["responsibleUsers"],
//     },
//   );
// export type RoutingRequestDto = z.infer<typeof CreateRoutingSchema>;
// export const CreateRoutingValidator = zodResolver(CreateRoutingSchema);
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

export const CreateRoutingSchema = z
  .object({
    estimatedTime: z.string().optional(),
    id: z.string().optional(),
    idIndex: z.string().optional(),
    order: z.number().optional(),

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
    operationId: IdSchema("Operation"),
    resources: z.array(IdSchema("Resource")).min(1, {
      message: "Resource is required",
    }),
    workCenters: z.array(IdSchema("Work Center")).min(1, {
      message: "Resource is required",
    }),
    responsibleUsers: z.array(IdSchema("User")).optional(),
    responsibleRoles: z.array(IdSchema("Role")).optional(),
  })
  .refine(
    (data) =>
      data.type === ProcedureType.Role
        ? Number(data.responsibleRoles?.length) > 0
        : true,
    {
      message: "Roles are required when type is 'Role'",
      path: ["responsibleRoles"],
    },
  )
  .refine(
    (data) =>
      data.type === ProcedureType.User
        ? Number(data.responsibleUsers?.length) > 0
        : true,
    {
      message: "Users are required when type is 'User'",
      path: ["responsibleUsers"],
    },
  );

export type RoutingRequestDto = z.infer<typeof CreateRoutingSchema>;
export const CreateRoutingValidator = zodResolver(CreateRoutingSchema);
