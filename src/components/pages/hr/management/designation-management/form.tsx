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
  departmentOptions: Option[];
  defaultValues?: TFieldValues;
}

const DesignationForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  departmentOptions,
  defaultValues,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full">
      <FormWizard
        className="w-full space-y-5"
        config={[
          {
            register: register("name" as Path<TFieldValues>),
            label: "Designation Name",
            placeholder: "Enter designation name",
            type: InputTypes.TEXT,
            required: true,
            errors,
          },
          {
            label: "Associated Departments",
            control: control as Control,
            type: InputTypes.MULTI,
            name: "departmentIds",
            required: true,
            defaultValue: defaultValues?.departmentIds,
            placeholder: "Select associated departments",
            options: departmentOptions,
            errors,
          },
          {
            register: register("maximumLeaveDays" as Path<TFieldValues>, {
              valueAsNumber: true,
            }),
            label: "Paid Leave Days Entitlement (Days)",
            placeholder: "Enter in days",
            type: InputTypes.NUMBER,

            errors,
          },
          {
            label: "Description",
            control: control as Control,
            type: InputTypes.RICHTEXT,
            name: "description",
            autoFocus: false,
            placeholder: "Enter description",
            suggestions: [],
            errors,
          },
        ]}
      />
    </div>
  );
};

export default DesignationForm;
