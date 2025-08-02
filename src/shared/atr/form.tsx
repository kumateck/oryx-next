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
  productStateOptions: Option[];
}
const AtrForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  productStateOptions,
}: Props<TFieldValues, TContext>) => {
  return (
    <div>
      <FormWizard
        config={[
          {
            name: `state`,
            label: "Product State",
            type: InputTypes.SELECT,
            placeholder: "Select state",
            control: control as unknown as Control,
            required: true,
            options: productStateOptions,
            errors,
          },
          {
            label: "Filled Volume",
            type: InputTypes.TEXT,
            register: register("filledVolume" as Path<TFieldValues>),
            placeholder: "Enter filled volume",
            errors,
          },
        ]}
      />
    </div>
  );
};

export default AtrForm;
