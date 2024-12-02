import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const CreateBomSchema = z.object({
  casNumber: z.string().optional(),
  function: z.string().optional(),
  grade: z.string().optional(),
  isSubstitutable: z.boolean().optional(),
  id: z.string().optional(),
  componentMaterialId: z.object(
    {
      value: z.string().min(1, { message: "Material is required" }),
      label: z.string(),
    },
    {
      message: "Material is required",
    },
  ),
  // order: z.object(
  //   {
  //     value: z.string().min(1, { message: "order is required" }),
  //     label: z.string(),
  //   },
  //   {
  //     message: "order is required",
  //   },
  // ),
  order: z.number().optional(),
  materialTypeId: z.object(
    {
      value: z.string().min(1, { message: "Material Type is required" }),
      label: z.string(),
    },
    {
      message: "Material Type is required",
    },
  ),
  //   uoMId: z.object(
  //     {
  //       value: z.string().min(1, { message: "Unit of Measurement is required" }),
  //       label: z.string(),
  //     },
  //     {
  //       message: "Unit of Measurement is required",
  //     },
  //   ),
  //   type: z.object(
  //     {
  //       value: z.string().min(1, { message: "Material is required" }),
  //       label: z.string(),
  //     },
  //     {
  //       message: "Material is required",
  //     },
  //   ),
});

export type BomRequestDto = z.infer<typeof CreateBomSchema>;
export const CreateBomValidator = zodResolver(CreateBomSchema);
