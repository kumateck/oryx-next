import { FormWizard } from "@/components/form-inputs";
import { InputTypes } from "@/lib";
import React from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface Props<TFieldValues extends FieldValues> {
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
}
const SampleForm = <TFieldValues extends FieldValues>({
  register,
  errors,
}: Props<TFieldValues>) => {
  return (
    <div>
      <FormWizard
        config={[
          {
            label: "No. of Containers Sampled",
            type: InputTypes.NUMBER,
            register: register("containerSampled" as Path<TFieldValues>, {
              valueAsNumber: true,
            }),
            placeholder: "Enter number",
            errors,
          },
          {
            label: "Sample Quantity",
            type: InputTypes.TEXT,
            register: register("sampledQuantity" as Path<TFieldValues>),
            placeholder: "Enter sample quantity",
            errors,
          },
        ]}
      />
    </div>
  );
};

export default SampleForm;
