import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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

export const CreateVendorSchema = z.object({
  address: z.string().min(1, { message: "Address is required" }),
  name: z.string().min(1, { message: "Name is required" }),
  code: z.string().min(1, { message: "Code is required" }),
  contactPerson: z.string().min(1, { message: "Contact Person is required" }),
  contactNumber: z.string().min(1, { message: "Contact Number is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  country: objectSchema("Country is required"),
  storyType: z.object({
    value: z.string(),
    label: z.string(),
  }),
  currency: objectSchema("Currency is required"),
  services: z.array(objectSchema("Service is required")).min(1, {
    message: "At least one service is required",
  }),
});

export type VendorRequestDto = z.infer<typeof CreateVendorSchema>;
export const CreateVendorValidator = zodResolver(CreateVendorSchema);
