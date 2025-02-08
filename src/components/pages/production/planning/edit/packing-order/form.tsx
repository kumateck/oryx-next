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
const PackOrderForm = <TFieldValues extends FieldValues, TContext>({
  control,
  errors,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full">
      <FormWizard
        config={[
          {
            label: "Primary Pack",
            control: control as Control,
            type: InputTypes.RICHTEXT,
            name: "primaryPackDescription",
            required: true,
            autoFocus: true,
            placeholder: "Primary Pack",
            suggestions: [],
            errors,
          },
          {
            label: "Secondary Pack",
            control: control as Control,
            type: InputTypes.RICHTEXT,
            name: "secondaryPackDescription",
            required: true,
            autoFocus: false,
            placeholder: "Secondary Pack",
            suggestions: [],
            errors,
          },
          {
            label: "Tertiary Pack",
            control: control as Control,
            type: InputTypes.RICHTEXT,
            name: "tertiaryPackDescription",
            required: true,
            autoFocus: false,
            placeholder: "Tertiary Pack",
            suggestions: [],
            errors,
          },
        ]}
      />
    </div>
  );
};

export default PackOrderForm;
