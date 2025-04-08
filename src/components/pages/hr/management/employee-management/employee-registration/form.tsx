import React from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

import { FormWizard } from "@/components/form-inputs";
import { InputTypes, IsYesorNo, Option, OptionMap } from "@/lib";
import { EmployeeDto } from "@/lib/redux/api/openapi.generated";

interface FormProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  rackOptions: Option[];
  selectedEmployee: EmployeeDto | null;
  shelfOptionsMap: OptionMap;
  typeValues: Option[];
}

const AssignLocationForm = <TFieldValues extends FieldValues>({
  control,
  register,
  errors,
  rackOptions,
  // shelfOptions,
  selectedEmployee,
}: FormProps<TFieldValues>) => {
  return (
    <div>
      <div className="mt-4 space-y-4">
        <FormWizard
          className="grid w-full grid-cols-3 gap-4 space-y-0"
          fieldWrapperClassName="flex-grow"
          config={[
            {
              label: "Storage",
              control: control as Control,
              type: InputTypes.RADIO,
              name: "isStorage",
              required: true,
              options: Object.entries(IsYesorNo)
                .filter(([, value]) => typeof value === "number")
                .map(([key, value]) => ({
                  label: key, // "Raw" or "Package"
                  value: value.toString(), // 0 or 1
                })),
              errors,
              // defaultValue: selectedEmployee?.isStorage
            },
            {
              register: register(`employeeName` as Path<TFieldValues>),
              label: "Employee Name",
              type: InputTypes.TEXT,
              required: true,
              placeholder: "Enter the employee name",
              errors,
            },
            {
              register: register(`employeeEmail` as Path<TFieldValues>),
              label: "Employee Email",
              type: InputTypes.TEXT,
              required: true,
              placeholder: "Enter the employee email",
              errors,
            },
            {
              label: "Department",
              control: control as Control,
              type: InputTypes.SELECT,
              name: `department` as Path<TFieldValues>,
              required: true,
              placeholder: "Select Department",
              options: rackOptions,
              defaultValue: selectedEmployee?.user?.department
                ? {
                    label: selectedEmployee.user.department.toString(),
                    value: selectedEmployee.user.department.toString(),
                  }
                : undefined,
              errors,
            },
            {
              label: "Job Title",
              control: control as Control,
              type: InputTypes.SELECT,
              name: `jobTitle` as Path<TFieldValues>,
              required: true,
              placeholder: "Select job title",
              options: rackOptions,
              errors,
            },
            {
              label: "Reporting Manager",
              control: control as Control,
              type: InputTypes.SELECT,
              name: `reportingManager` as Path<TFieldValues>,
              required: true,
              placeholder: "Select reporting manager",
              options: rackOptions,
              errors,
            },
            {
              label: "Employment Start Date",
              control: control as Control,
              type: InputTypes.DATE,
              name: `employmentStartDate` as Path<TFieldValues>,
              required: true,
              placeholder: "Select employment start date",
              errors,
            },
            {
              register: register(`locations` as Path<TFieldValues>, {
                valueAsNumber: true,
              }),
              label: "Quantity to Assign",
              type: InputTypes.NUMBER,
              required: true,
              placeholder: "500",
              errors,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default AssignLocationForm;
