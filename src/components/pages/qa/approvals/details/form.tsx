import React from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
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
const ApprovalForm = <TFieldValues extends FieldValues, TContext>({
  control,
  errors,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full">
      <FormWizard
        className="w-full"
        config={[
          {
            label: "Comments",
            control: control as Control,
            type: InputTypes.RICHTEXT,
            name: "comment",
            autoFocus: true,
            placeholder: "Enter Comments",
            suggestions: [],
            errors,
          },
        ]}
      />
    </div>
  );
};

export default ApprovalForm;
