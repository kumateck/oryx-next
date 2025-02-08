import React from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

import { FormWizard } from "@/components/form-inputs";
import { InputTypes, Option } from "@/lib";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  countryOptions: Option[];
  materialOptions: Option[];

  defaultValues?: TFieldValues;
}
const ManufacturerForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  countryOptions,
  materialOptions,
  defaultValues,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full space-y-2">
      <FormWizard
        className="grid w-full grid-cols-2 gap-x-10 gap-y-5 space-y-0"
        fieldWrapperClassName="flex-grow"
        config={[
          {
            register: register("name" as Path<TFieldValues>),
            label: "Name",
            placeholder: "Enter name",
            type: InputTypes.TEXT,

            required: true,

            errors,
          },
          {
            register: register("address" as Path<TFieldValues>),
            label: "Address",
            placeholder: "Enter address",
            type: InputTypes.TEXT,
            required: true,
            errors,
          },
          {
            label: "Country",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "country",
            defaultValue: defaultValues?.country,
            required: true,
            onModal: true,
            placeholder: "Select country",
            options: countryOptions,
            errors,
          },
          {
            label: "Validaty Date",
            control: control as Control,
            type: InputTypes.DATE,
            name: "validityDate",
            required: true,
            errors,
          },
          {
            label: "Materials",
            control: control as Control,
            type: InputTypes.MULTI,
            name: "materials",
            defaultValue: defaultValues?.materials,
            required: true,
            placeholder: "Select materials",
            options: materialOptions,
            errors,
          },
        ]}
      />
    </div>
  );
};

export default ManufacturerForm;
