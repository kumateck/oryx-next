import React from "react";
import { Control, FieldErrors, FieldValues } from "react-hook-form";
import { FormWizard } from "@/components/form-inputs";
import { InputTypes } from "@/lib";

interface Props<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
}
export const Form = <TFieldValues extends FieldValues>({
  control,
  // register,
  errors,
}: Props<TFieldValues>) => {
  return (
    <FormWizard
      config={[
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
  );
};

export default Form;
