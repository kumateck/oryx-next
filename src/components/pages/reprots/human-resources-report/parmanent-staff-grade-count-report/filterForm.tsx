import { FormWizard } from "@/components/form-inputs";
import { InputTypes, Option } from "@/lib";
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
  departmentOptions: Option[];
  errors: FieldErrors<TFieldValues>;
}
const GradeCountFilterForm = <TFieldValues extends FieldValues, TContext>({
  control,
  errors,
  departmentOptions,
}: FilterFormProps<TFieldValues, TContext>) => {
  return (
    <div>
      <FormWizard
        className="space-y-4 w-full"
        config={[
          {
            name: "departmentId",
            label: "Department",
            type: InputTypes.SELECT,
            placeholder: "Select Department",
            required: true,
            options: departmentOptions,
            control: control as Control,
            errors,
          },
        ]}
      />
    </div>
  );
};

export default GradeCountFilterForm;
