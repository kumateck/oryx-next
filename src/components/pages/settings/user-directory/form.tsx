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
const UserForm = <TFieldValues extends FieldValues, TContext>({
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
            label: "Location Name",
            control: control as Control,
            type: InputTypes.ASYNC_SELECT,
            name: "locationId",
            required: true,
            defaultValue: defaultValues?.locationId,
            placeholder: "Select location",
            fetchOptions: fetchOptions,
            isLoading: isLoading,
            errors,
          },
          {
            register: register("name" as Path<TFieldValues>),
            label: "Name",
            placeholder: "Enter name",
            type: InputTypes.TEXT,

            required: true,

            errors,
          },
        ]}
      />
      <FormWizard
        className="w-full"
        config={[
          {
            label: "Description",
            control: control as Control,
            type: InputTypes.RICHTEXT,
            name: "description",
            autoFocus: true,
            placeholder: "Enter Remarks",
            suggestions: [],
            errors,
          },
        ]}
      />
    </div>
  );
};

export default UserForm;
