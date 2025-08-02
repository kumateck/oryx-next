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

  currencyOptions: Option[];
  servicesOptions: Option[];
}
const VendorForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  countryOptions,
  servicesOptions,
  currencyOptions,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full space-y-4">
      <div className="flex gap-2 w-full items-center justify-center">
        <FormWizard
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
          ]}
        />
        <FormWizard
          fieldWrapperClassName="flex-grow"
          config={[
            {
              register: register("code" as Path<TFieldValues>),
              label: "Code",
              placeholder: "VED-001",
              type: InputTypes.TEXT,
              required: true,
              errors,
            },
          ]}
        />
      </div>
      <FormWizard
        fieldWrapperClassName="flex-grow"
        config={[
          {
            register: register("email" as Path<TFieldValues>),
            label: "Email",
            placeholder: "Enter email",
            type: InputTypes.EMAIL,
            required: true,
            errors,
          },

          {
            register: register("address" as Path<TFieldValues>),
            label: "Address",
            placeholder: "Enter address",
            type: InputTypes.TEXT,
            errors,
          },
        ]}
      />
      <div className="flex gap-2 w-full items-center justify-center">
        <FormWizard
          config={[
            {
              label: "Country",
              className: "w-full",
              control: control as Control,
              type: InputTypes.SELECT,
              name: "country",
              required: true,
              onModal: true,
              placeholder: "Select country",
              options: countryOptions,
              errors,
            },
          ]}
        />
        <FormWizard
          config={[
            {
              label: "Currency",
              control: control as Control,
              type: InputTypes.SELECT,
              name: "currency",
              required: true,
              onModal: true,
              placeholder: "Select currency",
              options: currencyOptions,
              errors,
            },
          ]}
        />
      </div>

      <div className="flex w-full items-center gap-2 justify-center">
        <FormWizard
          fieldWrapperClassName="flex-grow"
          className="w-full"
          config={[
            {
              register: register("contactPerson" as Path<TFieldValues>),
              label: "Contact Person",
              placeholder: "Enter contact person",
              type: InputTypes.TEXT,
              required: true,
              errors,
            },
          ]}
        />
        <FormWizard
          fieldWrapperClassName="flex-grow"
          className="w-full"
          config={[
            {
              register: register("contactNumber" as Path<TFieldValues>),
              label: "Contact Number",
              placeholder: "Enter telephone",
              type: InputTypes.TEXT,
              required: true,
              errors,
            },
          ]}
        />
      </div>

      <FormWizard
        className="w-full"
        config={[
          {
            control: control as Control,
            label: "Services",
            name: "services",
            placeholder: "Enter services",
            options: servicesOptions,
            type: InputTypes.MULTI,
            required: true,
            errors,
          },
        ]}
      />
    </div>
  );
};

export default VendorForm;
