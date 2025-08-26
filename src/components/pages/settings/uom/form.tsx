import React from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

import { FormWizard } from "@/components/form-inputs";
import { InputTypes, UomCategoryOptions, UomTypeOptions } from "@/lib";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  defaultValues?: TFieldValues;
}
const UomForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  defaultValues,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full space-y-5">
      <FormWizard
        className="grid w-full grid-cols-2 gap-6 space-y-0"
        fieldWrapperClassName="flex-grow"
        config={[
          {
            label: "Type",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "type",
            defaultValue: defaultValues?.type,
            required: true,
            onModal: true,
            placeholder: "Select type",
            options: UomTypeOptions,
            errors,
          },
          {
            label: "Category",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "category",
            defaultValue: defaultValues?.category,
            required: true,
            onModal: true,
            placeholder: "Select category",
            options: UomCategoryOptions,
            errors,
          },

          {
            register: register("name" as Path<TFieldValues>),
            label: "Name",
            placeholder: "enter name",
            type: InputTypes.TEXT,
            errors,
          },
          {
            register: register("symbol" as Path<TFieldValues>),
            label: "Symbol",
            placeholder: "enter name",
            required: true,
            type: InputTypes.TEXT,
            errors,
          },
        ]}
      />
      <FormWizard
        config={[
          {
            register: register("description" as Path<TFieldValues>),
            label: "Description",
            placeholder: "enter description",
            type: InputTypes.TEXTAREA,
            errors,
          },
        ]}
      />
    </div>
  );
};

export default UomForm;
