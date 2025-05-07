import { useEffect } from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

import { FormWizard } from "@/components/form-inputs";
import {
  COLLECTION_TYPES,
  Gender,
  InputTypes,
  MaritalStatus,
  Option,
  Religions,
} from "@/lib";
import {
  PostApiV1CollectionApiArg,
  usePostApiV1CollectionMutation,
} from "@/lib/redux/api/openapi.generated";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
}

const PersonalInfoStep = <TFieldValues extends FieldValues, TContext>({
  register,
  control,
  errors,
}: Props<TFieldValues, TContext>) => {
  const [loadCollection, { data: collectionResponse }] =
    usePostApiV1CollectionMutation();

  useEffect(() => {
    loadCollection({
      body: [COLLECTION_TYPES.Country],
    } as PostApiV1CollectionApiArg).unwrap();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const countryOptions = collectionResponse?.[COLLECTION_TYPES.Country]?.map(
    (uom) => ({
      label: uom.name,
      value: uom.id,
    }),
  ) as Option[];

  const maritalStatusOptions = Object.entries(MaritalStatus)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key, value]) => ({
      label: key,
      value: String(value),
      // Add original value for easier comparison
      originalValue: value,
    }));

  const religionptions = Object.entries(Religions)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key, value]) => ({
      label: key,
      value: String(value),
    }));

  const genderOptions = Object.entries(Gender)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key, value]) => ({
      label: key,
      value: String(value),
    }));

  return (
    <>
      <FormWizard
        className="grid grid-cols-2 gap-x-10 gap-y-5 space-y-0"
        config={[
          {
            type: InputTypes.IMAGE,
            label: "Passport Size Photo",
            name: `passportPhoto`,
            defaultValue: null,
            control: control as Control,
            errors,
          },
          {
            type: InputTypes.SPACE,
          },
          {
            register: register("firstName" as Path<TFieldValues>),
            label: "First Name",
            placeholder: "Enter your first name",
            type: InputTypes.TEXT,
            required: true,
            errors,
          },
          {
            register: register("lastName" as Path<TFieldValues>),
            label: "Last Name",
            placeholder: "Enter your last name",
            type: InputTypes.TEXT,
            required: true,
            errors,
          },
        ]}
      />

      <FormWizard
        className="grid w-full grid-cols-2 gap-x-10 gap-y-5 space-y-0"
        config={[
          {
            name: "dob",
            label: "Date of Birth",
            placeholder: "Select your Date of Birth",
            type: InputTypes.DATE,
            control: control as Control,
            required: true,
            disabled: {
              // after: new Date(2010, 1, 1),
              after: new Date(
                new Date().setFullYear(new Date().getFullYear() - 16),
              ),
            },
            errors,
          },
          {
            name: "gender",
            label: "Gender",
            type: InputTypes.SELECT,
            control: control as Control,
            placeholder: "Select your gender",
            required: true,
            options: genderOptions,
            errors,
          },
          {
            register: register("address" as Path<TFieldValues>),
            label: "Residential Address",
            required: true,
            placeholder: "Enter your residential address",
            type: InputTypes.TEXT,
            errors,
          },
          {
            name: "dateEmployed",
            label: "Date Employed",
            placeholder: "Select your Date of Employment",
            control: control as Control,
            type: InputTypes.DATE,
            disabled: {
              after: new Date(),
            },
            required: true,
            errors,
          },
          {
            register: register("email" as Path<TFieldValues>),
            label: "Email",
            required: true,
            placeholder: "Enter your Email",
            errors,
            type: InputTypes.EMAIL,
            suffix: "Mail",
          },
          {
            register: register("contactNumber" as Path<TFieldValues>),
            label: "Contact Number",
            type: InputTypes.TEXT,
            placeholder: "Enter your phone number",
            required: true,
            errors,
          },
          {
            name: "nationality",
            label: "Nationality",
            type: InputTypes.SELECT,
            control: control as Control,
            placeholder: "Select your nationality",
            required: true,
            options: countryOptions,
            errors,
          },
          {
            register: register("region" as Path<TFieldValues>),
            label: "State/Region",
            type: InputTypes.TEXT,
            placeholder: "Enter the region",
            required: true,
            errors,
          },
          {
            name: "maritalStatus",
            label: "Marital Status",
            type: InputTypes.SELECT,
            control: control as Control,
            placeholder: "Select your marital status",
            options: maritalStatusOptions,
            required: true,
            errors,
          },
          {
            name: "religion",
            label: "Religion",
            type: InputTypes.SELECT,
            control: control as Control,
            placeholder: "Select your religion",
            options: religionptions,
            required: true,
            errors,
          },
        ]}
      />
    </>
  );
};

export default PersonalInfoStep;
