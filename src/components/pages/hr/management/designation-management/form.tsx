import React from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

import { FormWizard } from "@/components/form-inputs";
import { FetchOptionsResult } from "@/components/ui";
import { InputTypes } from "@/lib";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;

  isLoading: boolean;
  fetchOptions: (search: string, page: number) => Promise<FetchOptionsResult>;

  defaultValues?: TFieldValues;
}
const DesignationForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  isLoading,
  fetchOptions,

  defaultValues,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full">
      <FormWizard
        className="w-full space-y-5"
        config={[
          {
            register: register("name" as Path<TFieldValues>),
            label: "Designation Name",
            placeholder: "Enter designation name",
            type: InputTypes.TEXT,
            required: true,
            errors,
          },
          {
            label: "Associated Department",
            control: control as Control,
            type: InputTypes.ASYNC_SELECT,
            name: "associatedDepartment",
            required: true,
            defaultValue: defaultValues?.locationId,
            placeholder: "Select associated department",
            fetchOptions: fetchOptions,
            isLoading: isLoading,
            errors,
          },
          {
            label: "Description",
            control: control as Control,
            type: InputTypes.RICHTEXT,
            name: "description",
            autoFocus: true,
            placeholder: "Enter description",
            suggestions: [],
            errors,
          },
        ]}
      />
    </div>
  );
};

export default DesignationForm;
