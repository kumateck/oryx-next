import React from "react";
import { Control, FieldErrors, FieldValues } from "react-hook-form";

import { FormWizard } from "@/components/form-inputs";
import { InputTypes, Option } from "@/lib";
import { FetchOptionsResult } from "@/components/ui";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  errors: FieldErrors<TFieldValues>;
  categoryOptions: Option[];
  shiftTypeOptions: Option[];
  defaultValues?: TFieldValues;
  fetchOptions: (search: string, page: number) => Promise<FetchOptionsResult>;
  isLoading: boolean;
}

const AssignForm = <TFieldValues extends FieldValues, TContext>({
  control,
  errors,
  categoryOptions,
  shiftTypeOptions,
  defaultValues,
  fetchOptions,
  isLoading,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full">
      <FormWizard
        className="w-full space-y-5"
        config={[
          {
            label: "ShiftType",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "type",
            required: true,
            defaultValue: defaultValues?.type,
            placeholder: "Select type",
            options: shiftTypeOptions,
            errors,
          },
          {
            label: "Category",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "scheduleCategory",
            required: true,
            defaultValue: defaultValues?.scheduleCategory,
            placeholder: "Select category",
            options: categoryOptions,
            errors,
          },
          {
            label: "Employee(s)",
            control: control as Control,
            type: InputTypes.ASYNC_MULTI,
            name: "employeeIds",
            required: true,
            placeholder: "Select Employee",
            fetchOptions: fetchOptions,
            isLoading: isLoading,
            errors,
          },
        ]}
      />
    </div>
  );
};

export default AssignForm;
