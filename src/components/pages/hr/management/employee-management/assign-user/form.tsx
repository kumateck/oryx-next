import React from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

import { FormWizard } from "@/components/form-inputs";
import { EmployeeType, InputTypes, Option } from "@/lib";
import { EmployeeLevel } from "./type";

interface FormProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  watch: UseFormWatch<TFieldValues>;
  departmentOptions: Option[];
  designationOptions: Option[];
  userOptions: Option[];
  // shelfOptions: Option[];
}

const AssignUserForm = <TFieldValues extends FieldValues>({
  control,
  register,
  errors,
  departmentOptions,
  designationOptions,
  userOptions,
  watch,
}: FormProps<TFieldValues>) => {
  // Initialize field array
  const isPermanent =
    watch("type" as Path<TFieldValues>) === EmployeeType.Permanent.toString();

  return (
    <div className="mt-4 space-y-4">
      <FormWizard
        className="grid w-full gap-4 space-y-0"
        fieldWrapperClassName="flex-grow"
        config={[
          {
            label: "Employee Type",
            control: control as Control,
            type: InputTypes.RADIO,
            name: "type",
            required: true,
            disabled: true,
            placeholder: "Select employee type",
            options: Object.entries(EmployeeType)
              .filter(([, value]) => typeof value === "number")
              .map(([key, value]) => ({
                label: key, // "Raw" or "Package"
                value: value.toString(), // 0 or 1
              })),
            errors,
          },
          {
            register: register("firstName" as Path<TFieldValues>),
            label: "Employee First Name",
            type: InputTypes.TEXT,
            required: true,
            placeholder: "Enter employee first name",
            readOnly: true,
            errors,
          },
          {
            register: register("lastName" as Path<TFieldValues>),
            label: "Employee Last Name",
            type: InputTypes.TEXT,
            required: true,
            placeholder: "Enter employee last name",
            readOnly: true,
            errors,
          },
          {
            register: register("email" as Path<TFieldValues>),
            label: "Email",
            type: InputTypes.TEXT,
            required: true,
            placeholder: "Enter employee email",
            readOnly: true,
            errors,
          },
          {
            label: "Department",
            control: control as Control,
            type: InputTypes.SELECT,
            name: `departmentId` as Path<TFieldValues>,
            required: true,
            placeholder: "Select Department",
            options: departmentOptions,
            errors,
          },
          {
            label: "Job Title",
            control: control as Control,
            type: InputTypes.SELECT,
            name: `designationId` as Path<TFieldValues>,
            required: true,
            placeholder: "Select Job Title",
            options: designationOptions,
            errors,
          },
          {
            label: "Reporting Manager",
            control: control as Control,
            type: InputTypes.SELECT,
            name: `reportingManagerId` as Path<TFieldValues>,
            required: true,
            placeholder: "Select Reporting Manager",
            options: userOptions,
            errors,
          },
          // {
          //   label: "Employment Start Date",
          //   control: control as Control,
          //   type: InputTypes.DATE,
          //   name: `startDate` as Path<TFieldValues>,
          //   required: true,
          //   placeholder: "Select Start Date",
          //   errors,
          // },
          {
            register: register(`staffNumber` as Path<TFieldValues>),
            label: "Staff ID",
            type: InputTypes.TEXT,
            required: true,
            placeholder: "Enter staff ID",
            // readOnly: true,
            errors,
          },
        ]}
      />
      {isPermanent && (
        <FormWizard
          className="grid w-full gap-4 space-y-0"
          config={[
            {
              label: "Employee Level",
              control: control as Control,
              type: InputTypes.SELECT,
              name: "employeeLevel",
              placeholder: "Select employee level",
              required: false,
              options: Object.entries(EmployeeLevel)
                .filter(([, value]) => typeof value === "number")
                .map(([key, value]) => ({
                  label: key, // "Raw" or "Package"
                  value: value.toString(), // 0 or 1
                })),
              errors,
            },
          ]}
        />
      )}
    </div>
  );
};

export default AssignUserForm;
