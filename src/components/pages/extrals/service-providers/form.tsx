import { FormWizard } from "@/components/form-inputs";
import { InputTypes, Option } from "@/lib";
import React from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  countryOptions: Option[];
  currencyOptions: Option[];
  serviceOptions: Option[];
}
export const ServiceForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  countryOptions,
  currencyOptions,
  serviceOptions,
  errors,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="space-y-4">
      <FormWizard
        config={[
          {
            label: "Service Provider name",
            type: InputTypes.TEXT,
            placeholder: "Service Provider name",
            register: register("name" as Path<TFieldValues>),
            required: true,
            errors,
          },
          {
            label: "Service Provider email",
            type: InputTypes.TEXT,
            placeholder: "Service Provider email",
            register: register("email" as Path<TFieldValues>),
            required: true,
            errors,
          },

          {
            label: "Service Provider address",
            type: InputTypes.TEXT,
            placeholder: "Service Provider address",
            register: register("address" as Path<TFieldValues>),
            required: true,
            errors,
          },
        ]}
      />
      <div className="w-full flex items-center gap-2">
        <FormWizard
          config={[
            {
              label: "Country",
              type: InputTypes.SELECT,
              placeholder: "Country",
              name: "countryId",
              options: countryOptions,
              control: control as Control,
              required: true,
              errors,
            },
          ]}
        />
        <FormWizard
          config={[
            {
              label: "Phone",
              type: InputTypes.TEXT,
              placeholder: "Phone",
              register: register("phone" as Path<TFieldValues>),
              required: true,
              errors,
            },
          ]}
        />
      </div>
      {/* <div className="w-full flex items-center gap-2">
        <FormWizard
          className=""
          config={[
            {
              label: "Contact person ",
              type: InputTypes.TEXT,
              placeholder: "Contact person name",
              register: register("contactPersonName" as Path<TFieldValues>),
              required: true,
              errors,
            },
          ]}
        />
        <FormWizard
          className=""
          config={[
            {
              label: "Contact person phone",
              type: InputTypes.TEXT,
              placeholder: "Contact person phone",
              register: register("contactPersonPhone" as Path<TFieldValues>),
              required: true,
              errors,
            },
          ]}
        />
      </div> */}
      <FormWizard
        className="w-full"
        config={[
          {
            label: "Currency",
            type: InputTypes.SELECT,
            placeholder: "Currency",
            name: "currencyId",
            options: currencyOptions,
            control: control as Control,
            required: true,
            errors,
          },
          {
            label: "Services",
            type: InputTypes.MULTI,
            placeholder: "Services",
            name: "serviceIds",
            options: serviceOptions,
            control: control as Control,
            required: true,
            errors,
          },
        ]}
      />
    </div>
  );
};
