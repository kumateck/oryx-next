import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

import { FormWizard } from "@/components/form-inputs";
import { InputTypes, Option } from "@/lib";

import { FetchOptionsResult } from "@/components/ui";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;

  errors: FieldErrors<TFieldValues>;
  roleOptions: Option[];
  defaultValues?: TFieldValues;
  isLoading: boolean;
  fetchOptions: (search: string, page: number) => Promise<FetchOptionsResult>;
}
const UserForm = <TFieldValues extends FieldValues, TContext>({
  control,
  errors,
  register,

  roleOptions,
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
            label: "Employee Name",
            control: control as Control,
            type: InputTypes.ASYNC_SELECT,
            name: "employeeId",
            required: true,
            onModal: true,
            defaultValue: defaultValues?.employeeId,
            placeholder: "Select employee",
            fetchOptions: fetchOptions,
            isLoading: isLoading,
            errors,
          },
          {
            label: "Employee Email",
            register: register("email" as Path<TFieldValues>),
            type: InputTypes.TEXT,
            placeholder: "Select employee first",
            readOnly: true,
            errors,
          },
          {
            label: "Employee Department",
            register: register("department" as Path<TFieldValues>),
            type: InputTypes.TEXT,
            readOnly: true,
            placeholder: "Select employee first",
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
