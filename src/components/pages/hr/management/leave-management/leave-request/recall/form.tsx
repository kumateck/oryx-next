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
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  defaultValues?: TFieldValues;
}

const RecallForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  defaultValues,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full">
      <FormWizard
        className="w-full space-y-5"
        config={[
          {
            register: register("name" as Path<TFieldValues>),
            label: "Staff Name",
            placeholder: "Staff name",
            type: InputTypes.TEXT,
            required: true,
            readOnly: true,
            errors,
          },
          {
            label: "Department",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "departmentId",
            required: true,
            defaultValue: defaultValues?.departmentId,
            placeholder: "Staff department",
            options: [],
            readOnly: true,
            errors,
          },
          {
            register: register("staffNumber" as Path<TFieldValues>),
            label: "Staff Number",
            placeholder: "Staff number",
            type: InputTypes.TEXT,
            required: true,
            readOnly: true,
            errors,
          },
          {
            label: "Return Date",
            control: control as Control,
            type: InputTypes.DATE,
            name: "returnDate",
            required: true,
            placeholder: "Select return date",
            errors,
          },
          {
            label: "Justification",
            control: control as Control,
            type: InputTypes.RICHTEXT,
            name: "justification",
            autoFocus: true,
            placeholder: "Enter justification for leave",
            suggestions: [],
            errors,
          },
        ]}
      />
    </div>
  );
};

export default RecallForm;
