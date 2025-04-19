import React from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

import { FormWizard } from "@/components/form-inputs";
import { InputTypes, Option } from "@/lib";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  employeeOptions: Option[];
  roleOptions: Option[];

  defaultValues?: TFieldValues;
}
const UserForm = <TFieldValues extends FieldValues, TContext>({
  control,
  errors,
  employeeOptions,
  roleOptions,
  defaultValues,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full">
      <FormWizard
        className="w-full space-y-5"
        config={[
          {
            label: "Employee Name",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "employeeId",
            required: true,
            defaultValue: defaultValues?.employeeId,
            placeholder: "Select employee",
            options: employeeOptions,
            errors,
          },
          {
            label: "Role",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "roleId",
            required: true,
            defaultValue: defaultValues?.roleId,
            placeholder: "Select role",
            options: roleOptions,
            errors,
          },
        ]}
      />
    </div>
  );
};

export default UserForm;
