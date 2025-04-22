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
  absenceTypeOptions: Option[];
  employeeOptions: Option[];
  defaultValues?: TFieldValues;
}

const LeaveRequestForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  absenceTypeOptions,
  employeeOptions,
  defaultValues,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full">
      <FormWizard
        className="w-full space-y-5"
        config={[
          {
            label: "Leave Type",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "leaveTypeId",
            required: true,
            // defaultValue: defaultValues?.departmentIds,
            placeholder: "Select leave type",
            options: absenceTypeOptions,
            errors,
          },
        ]}
      />
      <FormWizard
        className="w-full my-5 gap-4 grid grid-cols-2"
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
          {
            label: "End Date",
            control: control as Control,
            type: InputTypes.DATE,
            name: "endDate",
            required: true,
            placeholder: "Select end date",
            errors,
          },
        ]}
      />
      <FormWizard
        className="w-full space-y-5"
        config={[
          {
            label: "Staff Name",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "employeeId",
            required: true,
            defaultValue: defaultValues?.employeeId,
            placeholder: "Select staff name",
            options: employeeOptions,
            errors,
          },
          {
            register: register("contactPerson" as Path<TFieldValues>),
            label: "Contact Person",
            placeholder: "Enter contact person name",
            type: InputTypes.TEXT,
            required: true,
            errors,
          },
          {
            register: register("contactPersonNumber" as Path<TFieldValues>),
            label: "Contact Person Number",
            placeholder: "Enter contact person number",
            type: InputTypes.TEXT,
            required: true,
            errors,
          },
        ]}
      />
    </div>
  );
};

export default LeaveRequestForm;
