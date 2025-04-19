import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const CreateRoleSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export type RoleRequestDto = z.infer<typeof CreateRoleSchema>;
export const CreateRoleValidator = zodResolver(CreateRoleSchema);
