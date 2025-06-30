import React from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

import { FormWizard } from "@/components/form-inputs";
import { InputTypes, Option } from "@/lib";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  departmentOptions: Option[];
  employeeOptions: Option[];
  defaultValues?: TFieldValues;
}
const OvertimeForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  defaultValues,
  departmentOptions,
  employeeOptions,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full">
      <FormWizard
        className="w-full space-y-5"
        config={[
          {
            register: register("code" as Path<TFieldValues>),
            label: "Overtime Request ID",
            placeholder: "Overtime request id will be generated",
            type: InputTypes.TEXT,
            readOnly: true,
            required: true,
            description: (
              <span className="text-neutral-seondary text-sm">
                You can’t change the overtime request id
              </span>
            ),
            errors,
          },
          {
            label: "Overtime Date",
            control: control as Control,
            type: InputTypes.DATE,
            name: "overtimeDate",
            required: true,
            placeholder: "Select start date",
            errors,
          },
        ]}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormWizard
          className="w-full space-y-5"
          config={[
            {
              label: "Start Time",
              control: control as Control,
              type: InputTypes.CLOCK,
              name: "startTime",
              required: true,
              placeholder: "Select start time",
              errors,
            },
          ]}
        />
        <FormWizard
          className="w-full space-y-5"
          config={[
            {
              label: "End Time",
              control: control as Control,
              type: InputTypes.CLOCK,
              name: "endTime",
              required: true,
              placeholder: "Select end time",
              errors,
            },
            // {
            //   register: register("name" as Path<TFieldValues>),
            //   label: "Name",
            //   placeholder: "Enter name",
            //   type: InputTypes.TEXT,
            //   required: true,
            //   errors,
            // },
          ]}
        />
      </div>
      <FormWizard
        className="w-full"
        config={[
          {
            label: "Department",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "departmentId",
            required: true,
            defaultValue: defaultValues?.departmentId,
            placeholder: "Select department",
            options: departmentOptions,
            errors,
          },
          {
            label: "Employees",
            control: control as Control,
            type: InputTypes.MULTI,
            name: "employeeIds",
            required: true,
            defaultValue: defaultValues?.employeeIds,
            placeholder: "Select employees",
            options: employeeOptions,
            errors,
          },
          {
            label: "Overtime Justification",
            control: control as Control,
            type: InputTypes.RICHTEXT,
            name: "justification",
            autoFocus: true,
            placeholder: "Enter Overtime Justification",
            suggestions: [],
            errors,
          },
        ]}
      />
    </div>
  );
};

export default OvertimeForm;
