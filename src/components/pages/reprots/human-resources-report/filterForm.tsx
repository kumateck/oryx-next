import { FormWizard } from "@/components/form-inputs";
import { InputTypes } from "@/lib";
import React from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

interface FilterFormProps<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
}
const FilterForm = <TFieldValues extends FieldValues, TContext>({
  control,
  errors,
}: FilterFormProps<TFieldValues, TContext>) => {
  return (
    <div>
      <FormWizard
        className="space-y-4 w-full"
        config={[
          {
            name: "startDate",
            label: "Start Date",
            type: InputTypes.DATE,
            required: true,
            control: control as Control,
            errors,
          },
          {
            name: "endDate",
            label: "End Date",
            type: InputTypes.DATE,
            required: true,
            control: control as Control,
            errors,
          },
        ]}
      />
    </div>
  );
};

export default FilterForm;
