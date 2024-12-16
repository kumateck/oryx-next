import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const AssociatedManufacturersSchema = z.object({
  material: z.object({
    value: z.string(),
    label: z.string(),
  }),
  manufacturer: z.object({
    value: z.string(),
    label: z.string(),
  }),
});
export const CreateVendorSchema = z.object({
  address: z.string().min(1, { message: "Address is required" }),
  name: z.string().min(1, { message: "Name is required" }),
  contactPerson: z.string().min(1, { message: "Contact Person is required" }),
  contactNumber: z.string().min(1, { message: "Contact Number is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  country: z.object({
    value: z.string(),
    label: z.string(),
  }),
  associatedManufacturers: z.array(AssociatedManufacturersSchema).min(1, {
    message: "Associated Manufacturers is required",
  }),
});

export type VendorRequestDto = z.infer<typeof CreateVendorSchema>;
export const CreateVendorValidator = zodResolver(CreateVendorSchema);
