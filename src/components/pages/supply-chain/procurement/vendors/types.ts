import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { CreateSupplierManufacturerRequest } from "@/lib/redux/api/openapi.generated";

const objectSchema = (msg: string) =>
  z.object({
    value: z.string({
      required_error: msg,
      message: msg,
    }),
    label: z.string({
      required_error: msg,
      message: msg,
    }),
  });
const AssociatedManufacturersSchema = z.object({
  material: objectSchema("Material is required"),
  manufacturer: z.array(objectSchema("Manufacturer is required")).optional(),
  defaultManufacturer: objectSchema("Manufacturer is required"),
});
export const CreateVendorSchema = z.object({
  address: z.string().min(1, { message: "Address is required" }),
  name: z.string().min(1, { message: "Name is required" }),
  contactPerson: z.string().min(1, { message: "Contact Person is required" }),
  contactNumber: z.string().min(1, { message: "Contact Number is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  country: objectSchema("Country is required"),
  currency: objectSchema("Currency is required"),
  associatedManufacturers: z.array(AssociatedManufacturersSchema).min(1, {
    message: "Associated Manufacturers is required",
  }),
});

export type VendorRequestDto = z.infer<typeof CreateVendorSchema>;
export const CreateVendorValidator = zodResolver(CreateVendorSchema);

export function mapAssociatedManufacturers(
  data: VendorRequestDto["associatedManufacturers"],
): CreateSupplierManufacturerRequest[] {
  const mappedResults: CreateSupplierManufacturerRequest[] = [];

  data.forEach((item) => {
    // Always use the material value for materialId
    const materialId = item.material.value;

    // Map the defaultManufacturer (if exists) with default: true
    if (item.defaultManufacturer) {
      mappedResults.push({
        materialId,
        manufacturerId: item.defaultManufacturer.value,
        default: true,
      });
    }

    // Map each selected manufacturer with default: false
    if (item.manufacturer && item.manufacturer.length > 0) {
      item.manufacturer.forEach((manu) => {
        mappedResults.push({
          materialId,
          manufacturerId: manu.value,
          default: false,
        });
      });
    }
  });

  return mappedResults;
}
