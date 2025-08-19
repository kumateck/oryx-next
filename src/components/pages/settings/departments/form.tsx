import React from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

import { FormWizard } from "@/components/form-inputs";
import { DepartmentType, InputTypes, Option } from "@/lib";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  departmentOptions: Option[];
}
const DepartmentForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  departmentOptions,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full">
      <FormWizard
        config={[
          {
            register: register("code" as Path<TFieldValues>),
            label: "Department Code",
            placeholder: "Generating code",
            type: InputTypes.TEXT,

            readOnly: true,
            required: true,
            description: (
              <span className="text-sm text-neutral-500">
                You can’t change the department code
              </span>
            ),

            errors,
          },
          {
            label: "Parent Department",
            control: control as unknown as Control,
            type: InputTypes.SELECT,
            name: "parentDepartmentId",
            placeholder: "Select Parent Department",
            options: departmentOptions,
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
          {
            label: "Type",
            control: control as Control,
            type: InputTypes.RADIO,
            name: "type",
            required: true,
            options: Object.entries(DepartmentType)
              .filter(([, value]) => typeof value === "number")
              .map(([key, value]) => ({
                label: key, // "Raw" or "Package"
                value: value.toString(), // 0 or 1
              })),
            errors,
          },
          {
            label: "Description",
            control: control as Control,
            type: InputTypes.RICHTEXT,
            name: "description",
            required: true,
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

export default DepartmentForm;
