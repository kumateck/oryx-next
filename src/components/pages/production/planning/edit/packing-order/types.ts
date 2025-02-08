import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const CreatePackOrderSchema = z.object({
  primaryPackDescription: z
    .string()
    .min(1, {
      message: "Primary Pack is required",
    })
    .refine((pack) => pack.trim() !== "" && pack.trim() !== "<p></p>", {
      message: "Primary Pack is required",
    }),
  secondaryPackDescription: z
    .string()
    .min(1, {
      message: "Secondary Pack is required",
    })
    .refine((pack) => pack.trim() !== "" && pack.trim() !== "<p></p>", {
      message: "Secondary Pack is required",
    }),
  tertiaryPackDescription: z
    .string()
    .min(1, {
      message: "Tertiary Pack is required",
    })
    .refine((pack) => pack.trim() !== "" && pack.trim() !== "<p></p>", {
      message: "Tertiary Pack is required",
    }),
  // packs: z
  //   .array(
  //     z.object({
  //       label: z.string(),
  //       value: z.string(),
  //     }),
  //   )
  //   .min(1, {
  //     message: "At least one pack is required",
  //   }),
});

export type PackOrderRequestDto = z.infer<typeof CreatePackOrderSchema>;
export const CreatePackOrderValidator = zodResolver(CreatePackOrderSchema);
