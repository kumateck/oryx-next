import { FormWizard } from "@/components/form-inputs";
import { InputTypes } from "@/lib";
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
  isLoadingCode?: boolean;
}
export const ServiceForm = <TFieldValues extends FieldValues, TContext>({
  control,
  isLoadingCode,
  register,
  errors,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="space-y-4">
      <FormWizard
        className="w-full"
        config={[
          {
            label: "Service Name",
            type: InputTypes.TEXT,
            placeholder: "Service Name",
            register: register("name" as Path<TFieldValues>),
            required: true,
            errors,
          },

          {
            label: "Code",
            type: InputTypes.TEXT,
            placeholder: "Code",
            readOnly: true,
            description: isLoadingCode
              ? "Generating code..."
              : "This code is auto-generated",
            register: register("code" as Path<TFieldValues>),
            required: true,
            errors,
          },
        ]}
      />
      <FormWizard
        className="flex w-full items-center justify-between"
        config={[
          {
            label: "Start Date",
            type: InputTypes.DATE,
            name: "startDate",
            className: "flex-1",
            placeholder: "Start Date",
            control: control as Control,
            required: true,
            errors,
          },
          {
            label: "End Date",
            type: InputTypes.DATE,
            className: "flex-1",
            name: "endDate",
            placeholder: "End Date",
            control: control as Control,
            required: true,
            errors,
          },
        ]}
      />
      <FormWizard
        className="w-full "
        config={[
          {
            label: "Description",
            type: InputTypes.TEXTAREA,
            placeholder: "Description",
            register: register("description" as Path<TFieldValues>),
            required: false,
            errors,
          },
          {
            type: InputTypes.DRAGNDROP,
            label: "Attach Documents",
            name: `attachments`,
            defaultValue: null,
            control: control as Control,
            errors,
          },
        ]}
      />
    </div>
  );
};
