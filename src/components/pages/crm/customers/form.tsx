import React from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

import { FormWizard } from "@/components/form-inputs";
import { InputTypes } from "@/lib";

interface Props<TFieldValues extends FieldValues, TContext> {
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  control?: Control<TFieldValues, TContext>;
}

const CustomerForm = <TFieldValues extends FieldValues, TContext>({
  register,
  errors,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full">
      <FormWizard
        className="w-full space-y-5"
        config={[
          {
            register: register("name" as Path<TFieldValues>),
            label: "Customer Name",
            placeholder: "Enter customer name",
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
            register: register("email" as Path<TFieldValues>),
            label: "Email",
            placeholder: "Enter email",
            type: InputTypes.EMAIL,
            required: true,
            errors,
          },
          {
            register: register("phone" as Path<TFieldValues>),
            label: "Phone Number Nubers",
            placeholder: "Enter phone number",
            type: InputTypes.TEXT,
            required: true,
            errors,
          },
        ]}
      />
    </div>
  );
};

export default CustomerForm;
