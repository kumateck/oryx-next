import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const servicesSchema = z
  .object({
    name: z.string().min(1, "Name is required"),

    address: z.string().min(1, "Address is required"),
    phone: z
      .string({ required_error: "Phone number is required" })
      .min(10, "Phone number must be at least 10 digits long"),
    email: z.string().email("Invalid email format"),
    countryId: z.object(
      {
        label: z.string(),
        value: z.string(),
      },
      { message: "Country is required" },
    ),
    currencyId: z.object(
      {
        label: z.string(),
        value: z.string(),
      },
      { message: "Currency is required" },
    ),
    serviceIds: z
      .array(
        z.object(
          {
            label: z.string(),
            value: z.string(),
          },
          { message: "Service is required" },
        ),
      )
      .min(1, "At least one service is required"),
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
export type CreateServicesProviderDto = z.infer<typeof servicesSchema>;
export const CreateServicesProviderValidator = zodResolver(servicesSchema);
