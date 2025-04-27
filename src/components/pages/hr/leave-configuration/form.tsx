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
  designationsOptions: Option[];
  defaultValues?: TFieldValues;
}

const LeaveTypeForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  designationsOptions,
  defaultValues,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full">
      <FormWizard
        className="w-full space-y-5"
        config={[
          {
            register: register("name" as Path<TFieldValues>),
            label: "Leave Type",
            placeholder: "Enter leave type",
            type: InputTypes.TEXT,
            required: true,
            errors,
          },
        ]}
      />
      <div className="grid grid-cols-2">
        <div className="flex items-start my-5 gap-2">
          <div className="inline-flex mt-0.5">
            <FormWizard
              config={[
                {
                  type: InputTypes.SWITCH,
                  label: "Paid Leave",
                  placeholder: "Paid Leave",
                  control: control as Control,
                  name: `isPaid`,
                  errors,
                },
              ]}
            />
          </div>
          <span className="text-sm text-gray-500">Paid Leave</span>
        </div>
        <div className="flex items-start my-5 gap-2">
          <div className="inline-flex mt-0.5">
            <FormWizard
              config={[
                {
                  type: InputTypes.SWITCH,
                  label: "Deduct from leave balance",
                  placeholder: "Deduct from leave balance",
                  control: control as Control,
                  name: `deductFromBalance`,
                  errors,
                },
              ]}
            />
          </div>
          <span className="text-sm text-gray-500">
            Deduct from leave balance
          </span>
        </div>
      </div>
      <FormWizard
        className="w-full space-y-5"
        config={[
          {
            register: register("maxDuration" as Path<TFieldValues>, {
              valueAsNumber: true,
            }),
            label: "Leave Max. Duration (Days)",
            placeholder: "Enter Leave Max. Duration (Days)",
            type: InputTypes.TEXT,
            required: true,
            errors,
          },
          {
            label: "Add Designation(s)",
            control: control as Control,
            type: InputTypes.MULTI,
            name: "designationIds",
            required: true,
            defaultValue: defaultValues?.designationList,
            placeholder: "Select designations",
            options: designationsOptions,
            errors,
          },
        ]}
      />
    </div>
  );
};

export default LeaveTypeForm;
