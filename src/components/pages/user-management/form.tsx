import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

import { FormWizard } from "@/components/form-inputs";
import { InputTypes, Option } from "@/lib";
import { EmployeeDtoRead } from "@/lib/redux/api/openapi.generated";
import { UserRequestDto } from "./types";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  setValue: UseFormSetValue<UserRequestDto>;
  employees: EmployeeDtoRead[];
  setUser: (user: EmployeeDtoRead | null) => void;
  errors: FieldErrors<TFieldValues>;
  roleOptions: Option[];
  defaultValues?: TFieldValues;
}
const UserForm = <TFieldValues extends FieldValues, TContext>({
  control,
  errors,
  employees,
  register,
  setUser,
  setValue,
  roleOptions,
  defaultValues,
}: Props<TFieldValues, TContext>) => {
  const employeeOptions = employees?.map((item) => {
    return {
      label: item.firstName + " " + item.lastName,
      value: item?.id,
    };
  }) as Option[];
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
            onChange: (value) => {
              const selectedEmployee = employees.find(
                (emp) => emp.id === value?.value,
              );
              if (selectedEmployee) {
                setValue("email", selectedEmployee.email as string);
                setValue(
                  "department",
                  selectedEmployee.department?.name ??
                    "This employee has no department",
                );
                setUser(selectedEmployee);
              }
            },
            options: employeeOptions,
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
