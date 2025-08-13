import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const CreateCustomerSchema = z
  .object({
    name: z.string().min(1, { message: "Customer name is required" }),
    address: z.string().min(1, { message: "Address is required" }),
    email: z.string().min(1, { message: "Email is required" }),
    phone: z
      .string({ required_error: "Phone number is required" })
      .min(10, "Phone number must be at least 10 digits long"),
  })
  .refine(
    ({ phone }) => {
      phone = phone.replace(/\D/g, "");
      return phone.length === 10;
    },
    {
      message: "Phone number must be exactly 10 digits",
      path: ["phone"],
    },
  );

export type CustomerRequestDto = z.infer<typeof CreateCustomerSchema>;
export const CreateCustomerValidator = zodResolver(CreateCustomerSchema);
