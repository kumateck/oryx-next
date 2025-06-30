import React from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  // Path,
  UseFormRegister,
} from "react-hook-form";

import { FormWizard } from "@/components/form-inputs";
import { InputTypes, Option } from "@/lib";

import { ProcedureType } from "./types";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  operationOptions: Option[];
  workCenterOptions: Option[];
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
}: Props<TFieldValues, TContext>) => {
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
        ]}
      />
    </div>
  );
};

export default ProcedureForm;
