import React from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  // Path,
  UseFormRegister,
} from "react-hook-form";

import { FormInput, FormWizard } from "@/components/form-inputs";
import { InputTypes, Option } from "@/lib";

import { ProcedureType } from "./types";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  operationOptions: Option[];
  workCenterOptions: Option[];
  roleOptions: Option[];
  userOptions: Option[];
  resourceOptions: Option[];
  defaultValues?: TFieldValues;
  selectedType?: ProcedureType;
}
// type InputProps =FormInput<TFieldValues extends FieldValues, TContext>
const ProcedureForm = <TFieldValues extends FieldValues, TContext>({
  control,
  errors,
  operationOptions,
  defaultValues,
  workCenterOptions,
  resourceOptions,
  roleOptions,
  userOptions,
  selectedType,
}: Props<TFieldValues, TContext>) => {
  const roleForm: FormInput<FieldValues, any> = {
    label: "Role",
    control: control as Control,
    type: InputTypes.MULTI,
    name: `responsibleRoles`,
    required: true,
    defaultValue: defaultValues?.responsibleRoles,
    placeholder: "Role",
    options: roleOptions,
    errors,
  };
  const userForm: FormInput<FieldValues, any> = {
    label: "User",
    control: control as Control,
    type: InputTypes.MULTI,
    name: `responsibleUsers`,
    required: true,
    placeholder: "User",
    defaultValue: defaultValues?.responsibleUsers,
    options: userOptions,
    errors,
  };
  const spaceForm: FormInput<FieldValues, any> = {
    type: InputTypes.SPACE,
  };
  const typeSelect =
    selectedType === ProcedureType.Role
      ? roleForm
      : selectedType === ProcedureType.User
        ? userForm
        : spaceForm;
  return (
    <div className="w-full">
      <FormWizard
        className="grid w-full grid-cols-2 gap-6 space-y-0"
        fieldWrapperClassName="flex-grow"
        config={[
          {
            label: "Operation",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "operationId",
            defaultValue: defaultValues?.operationId,
            required: true,
            onModal: true,
            placeholder: "Select Material",
            options: operationOptions,
            errors,
          },
          {
            label: "Work Centers",
            control: control as Control,
            type: InputTypes.MULTI,
            name: "workCenters",
            defaultValue: defaultValues?.workCenters,
            required: true,
            placeholder: "Select work centers",
            options: workCenterOptions,
            errors,
          },
          {
            control: control as Control,
            name: "estimatedTime",
            label: "Estimated Time",
            placeholder: "Select Time",
            type: InputTypes.MOMENT,
            required: true,
            errors,
          },
          {
            label: "Resources",
            control: control as Control,
            type: InputTypes.MULTI,
            name: "resources",
            defaultValue: defaultValues?.resources,
            required: true,
            placeholder: "Select resource",
            options: resourceOptions,
            errors,
          },
          {
            label: "Responsible",
            control: control as Control,
            type: InputTypes.RADIO,
            name: `type`,
            required: true,
            options: [ProcedureType.Role, ProcedureType.User].map((option) => ({
              label: option,
              value: option,
            })),
            errors,
          },
          typeSelect,
        ]}
      />
    </div>
  );
};

export default ProcedureForm;
