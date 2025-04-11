import { z } from "zod";

const personalInfoSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  dob: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date({
      required_error: "Date of birth is required",
      invalid_type_error: "Date of birth must be a valid date",
    }),
  ),
  gender: z.object(
    {
      value: z.string().min(1, { message: "Gender is required" }),
      label: z.string(),
    },
    {
      message: "Gender is required",
    },
  ),
  address: z.string().min(1, "Residential address is required"),
  dateEmployed: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date({
      required_error: "Date of employment is required",
      invalid_type_error: "Date of employment must be a valid date",
    }),
  ),
  email: z.string().email({ message: "Invalid email address" }),
  contactNumber: z.string().min(10, "Phone number is required"),
  nationality: z.object(
    {
      value: z.string().min(1, { message: "Nationality is required" }),
      label: z.string(),
    },
    {
      message: "Nationality is required",
    },
  ),
  region: z.string().min(1, "State/Region is required"),
  maritalStatus: z.object(
    {
      value: z.string().min(1, { message: "Marital Status is required" }),
      label: z.string(),
    },
    {
      message: "Marital Status is required",
    },
  ),
  religion: z.object(
    {
      value: z.string().min(1, { message: "Religion is required" }),
      label: z.string(),
    },
    {
      message: "Religion is required",
    },
  ),
});

const familyMemberSchema = z.object({
  fullName: z.string().min(5, "Full name is required"),
  contactNumber: z.string().min(10, "Phone number is required"),
  lifeStatus: z.object(
    {
      value: z.string().min(1, { message: "Life Status is required" }),
      label: z.string(),
    },
    {
      message: "Life Status is required",
    },
  ),
  occupation: z.string().min(1, "Occupation is required"),
});

const spouseSchema = z.object({
  fullName: z.string().min(5, "Full name is required").optional(),
  contactNumber: z.string().min(10, "Phone number is required").optional(),
  lifeStatus: z
    .object(
      {
        value: z.string().min(1, { message: "Life Status is required" }),
        label: z.string(),
      },
      {
        message: "Life Status is required",
      },
    )
    .optional(),
  occupation: z.string().min(1, "Occupation is required").optional(),
});

const emergencyContactSchema = z.object({
  fullName: z.string().min(5, "Full name is required"),
  contactNumber: z
    .string()
    .min(10, "Phone number is required")
    .max(10, "Phone number must be 10 digits"),
  address: z.string().min(1, "Residential address is required"),
  relation: z.string().min(1, "Relationship is required"),
});

const familyInfo1Schema = z.object({
  father: familyMemberSchema,
  mother: familyMemberSchema,
  spouse: spouseSchema.optional(),
});

const childrenSchema = z.object({
  fullName: z.string().min(1, "Child's date of birth is required").optional(),
  dob: z
    .preprocess(
      (arg) => (typeof arg === "string" ? new Date(arg) : arg),
      z.date({
        required_error: "Date of birth is required",
        invalid_type_error: "Date of birth must be a valid date",
      }),
    )
    .optional(),
  sex: z.object(
    {
      value: z.string().min(1, { message: "Gender is required" }),
      label: z.string(),
    },
    {
      message: "Gender is required",
    },
  ),
});

const siblingSchema = z.object({
  fullName: z.string().min(1, "Sibling's date of birth is required").optional(),
  contactNumber: z.string().min(10, "Sibling's phone number is required"),
  sex: z.object(
    {
      value: z.string().min(1, { message: "Sibling's gender is required" }),
      label: z.string(),
    },
    {
      message: "Sibling's gender is required",
    },
  ),
});

const educationItemSchema = z.object({
  schoolName: z.string().min(1, "School name is required"),
  startDate: z.date({
    required_error: "Start date is required",
    invalid_type_error: "Invalid start date",
  }),
  endDate: z.date({
    required_error: "End date is required",
    invalid_type_error: "Invalid end date",
  }),
  major: z.string().min(1, "Major is required"),
  qualification: z.string().min(1, "Qualification is required"),
});

const employmentItemSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  position: z.string().min(1, "Position is required"),
  startDate: z.date({
    required_error: "Start date is required",
    invalid_type_error: "Invalid start date",
  }),
  endDate: z.date({
    required_error: "End date is required",
    invalid_type_error: "Invalid end date",
  }),
});

const educationSchema = z.object({
  education: z.array(educationItemSchema).optional(),
});

const employmentSchema = z.object({
  employment: z.array(employmentItemSchema).optional(),
});

const familyInfo2Schema = z.object({
  children: z.array(childrenSchema).optional(),
  siblings: z.array(siblingSchema).optional(), // New siblings field
  emergencyContact: emergencyContactSchema,
  nextOfKin: emergencyContactSchema,
});

const paymentInformationSchema = z.object({
  accountNumber: z.string().min(1, "Account Number is required"),
  ssnitNumber: z.string().min(1, "SSNIT Number is required"),
  ghanaCardNumber: z.string().min(11, "Ghana Card Number is required"),
});

export const fullOnboardingSchema = personalInfoSchema
  .merge(familyInfo1Schema)
  .merge(familyInfo2Schema)
  .merge(educationSchema)
  .merge(employmentSchema)
  .merge(paymentInformationSchema);

export type OnboardingFormValues = z.infer<typeof fullOnboardingSchema>;
export type EmploymentItem = z.infer<typeof employmentItemSchema>;
export type ChildRequestDto = z.infer<typeof childrenSchema>;
export type EducationItem = z.infer<typeof educationItemSchema>;

export const stepSchemas = {
  personalInfo: personalInfoSchema,
  familyInfo1: familyInfo1Schema,
  familyInfo2: familyInfo2Schema,
  education: educationSchema,
  employment: employmentSchema,
  paymentInformation: paymentInformationSchema,
  fullSchema: fullOnboardingSchema,
};
