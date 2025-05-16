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
      <div className="grid grid-cols-2 gap-4">
        <FormWizard
          className="w-full space-y-5"
          config={[
            {
              label: "Start Date",
              control: control as Control,
              type: InputTypes.DATE,
              name: "startDate",
              required: true,
              placeholder: "Select start date",
              errors,
            },
          ]}
        />
        <FormWizard
          className="w-full space-y-5"
          config={[
            {
              label: "End Date",
              control: control as Control,
              type: InputTypes.DATE,
              name: "endDate",
              required: true,
              placeholder: "Select end date",
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
            register: register("totalNotExceeded" as Path<TFieldValues>, {
              valueAsNumber: true,
            }),
            label: "Total Overtime To Not Exceeded (Hours)",
            placeholder: "Enter total overtime to not exceeded",
            type: InputTypes.NUMBER,
            required: true,
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
