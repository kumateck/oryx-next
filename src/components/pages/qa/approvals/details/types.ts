import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const CreateCommentSchema = z.object({
  comment: z.string().optional(),
});

export type CommentRequestDto = z.infer<typeof CreateCommentSchema>;
export const CreateCommentValidator = zodResolver(CreateCommentSchema);
