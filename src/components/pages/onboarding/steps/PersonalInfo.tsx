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

  const maritalStatusOptions = Object.values(MaritalStatus).map((status) => ({
    label: status,
    value: status,
  }));

  const religionptions = Object.values(Religions).map((status) => ({
    label: status,
    value: status,
  }));

  const genderOptions = Object.values(Gender).map((status) => ({
    label: status,
    value: status,
  }));

  return (
    <>
      <FormWizard
        className="w-full gap-x-10 gap-y-5 space-y-0"
        config={[
          {
            register: register("fullName" as Path<TFieldValues>),
            label: "Full Name",
            placeholder: "Enter your full name",
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
            errors,
          },
          {
            name: "gender",
            label: "Gender",
            type: InputTypes.SELECT,
            control: control as Control,
            placeholder: "Select your gender",
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
