import React from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

import { FormWizard } from "@/components/form-inputs";
import { InputTypes, Option } from "@/lib";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  employeeOptions: Option[];
  defaultValues?: TFieldValues;
}

const ExitPassRequestForm = <TFieldValues extends FieldValues, TContext>({
  control,
  errors,
  employeeOptions,
  defaultValues,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full">
      <FormWizard
        className="w-full space-y-5"
        config={[
          {
            label: "Date",
            control: control as Control,
            type: InputTypes.DATE,
            name: "date",
            required: true,
            placeholder: "Select date",
            errors,
          },
        ]}
      />
      <FormWizard
        className="w-full my-5 gap-4 grid grid-cols-2"
        config={[
          {
            label: "Time In",
            control: control as Control,
            type: InputTypes.TIME,
            name: "timeIn",
            required: true,
            placeholder: "Select time in",
            errors,
          },
          {
            label: "Time Out",
            control: control as Control,
            type: InputTypes.TIME,
            name: "timeOut",
            required: true,
            placeholder: "Select time out",
            errors,
          },
        ]}
      />
      <FormWizard
        className="w-full space-y-5"
        config={[
          {
            label: "Staff Name",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "employeeId",
            required: true,
            defaultValue: defaultValues?.employeeId,
            placeholder: "Select staff name",
            options: employeeOptions,
            errors,
          },
          {
            label: "Exit Pass Justification",
            control: control as Control,
            type: InputTypes.RICHTEXT,
            name: "justification",
            required: true,
            autoFocus: false,
            placeholder: "Enter exit pass justification",
            suggestions: [],
            errors,
          },
        ]}
      />
    </div>
  );
};

export default ExitPassRequestForm;
