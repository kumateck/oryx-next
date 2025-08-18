import React from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

import { FormWizard } from "@/components/form-inputs";
import { CodeModelTypesOptions, CodeNameTypeOptions, InputTypes } from "@/lib";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  defaultValues?: TFieldValues;
}
const CodeSettingsForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  defaultValues,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full">
      <FormWizard
        className="grid w-full grid-cols-2 gap-6 space-y-0"
        fieldWrapperClassName="flex-grow"
        config={[
          {
            label: "Item Type",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "modelType",
            defaultValue: defaultValues?.modelType,
            required: true,
            onModal: true,
            placeholder: "Select item",
            options: CodeModelTypesOptions,
            errors,
          },
          {
            label: "Naming Type",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "namingType",
            defaultValue: defaultValues?.namingType,
            required: true,
            onModal: true,
            placeholder: "Select name",
            options: CodeNameTypeOptions,
            errors,
          },

          {
            register: register("prefix" as Path<TFieldValues>),
            label: "Prefix",
            placeholder: "Add Prefix",
            type: InputTypes.TEXT,
            errors,
          },

          {
            register: register("minimumNameLength" as Path<TFieldValues>, {
              valueAsNumber: true,
            }),
            label: "Minimum Code Length",
            placeholder: "Add Min",
            type: InputTypes.NUMBER,
            required: true,
            errors,
          },
          {
            register: register("maximumNameLength" as Path<TFieldValues>, {
              valueAsNumber: true,
            }),
            label: "Maximum Code Length",
            placeholder: "Add Max",
            type: InputTypes.NUMBER,
            required: true,
            errors,
          },
        ]}
      />
    </div>
  );
};

export default CodeSettingsForm;
