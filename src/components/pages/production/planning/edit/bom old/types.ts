import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const CreateBomSchema = z.object({
  casNumber: z.string().optional(),
  function: z.string().optional(),
  grade: z.string().optional(),
  isSubstitutable: z.boolean().optional(),
  id: z.string().optional(),
  idIndex: z.string().optional(),
  materialId: z.object(
    {
      value: z.string().min(1, { message: "Material is required" }),
      label: z.string(),
    },
    {
      message: "Material is required",
    },
  ),
  baseUoMId: z.object(
    {
      value: z.string().min(1, { message: "UOM is required" }),
      label: z.string(),
    },
    {
      message: "UOM is required",
    },
  ),

  baseQuantity: z
    .number({
      required_error: "Quantity is required",
      invalid_type_error: "Quantity must be a number",
    })
    .positive({
      message: "Quantity must be greater than 0",
    }),
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
