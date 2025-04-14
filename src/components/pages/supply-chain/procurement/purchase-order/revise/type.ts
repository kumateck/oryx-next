import { RevisionType } from "@/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
const validEnumValues = Object.values(RevisionType).filter(
  (v) => typeof v === "number",
) as number[];

const typeValidator = z
  .string()
  .transform((value) => {
    const numValue = Number(value);
    if (isNaN(numValue)) {
      throw new Error("Invalid value for Type");
    }
    return numValue;
  })
  .refine((value) => validEnumValues.includes(value), {
    message: "Value must be a valid RevisionType",
  });
export const CreateRevisionSchema = z.object({
  purchaseOrderItemId: z.string().optional(),
  //   currencyId: z.string().optional(),
  idIndex: z.string().optional(),
  material: z.object(
    {
      value: z.string().min(1, { message: "Material is required" }),
      label: z.string(),
    },
    {
      message: "Material is required",
    },
  ),
  currency: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .optional(),
  uoM: z.object(
    {
      value: z.string().min(1, { message: "UOM is required" }),
      label: z.string(),
    },
    {
      message: "UOM is required",
    },
  ),
  type: typeValidator,

  quantity: z
    .number({
      required_error: "Quantity is required",
      invalid_type_error: "Quantity must be a number",
    })
    .positive({
      message: "Quantity must be greater than 0",
    }),
  price: z
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    })
    .positive({
      message: "Price must be greater than 0",
    }),
});

export type RevisionRequestDto = z.infer<typeof CreateRevisionSchema>;
export const CreateRevisionValidator = zodResolver(CreateRevisionSchema);
