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

interface FormProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
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
}: FormProps<TFieldValues>) => {
  // Initialize field array
  return (
    <div className="mt-4 space-y-4">
      <FormWizard
        className="grid w-full gap-4 space-y-0"
        fieldWrapperClassName="flex-grow"
        config={[
          {
            register: register("name" as Path<TFieldValues>),
            label: "Employee Name",
            type: InputTypes.TEXT,
            required: true,
            placeholder: "Enter employee name",
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
            name: `userId` as Path<TFieldValues>,
            required: true,
            placeholder: "Select Reporting Manager",
            options: userOptions,
            errors,
          },
          {
            label: "Employment Start Date",
            control: control as Control,
            type: InputTypes.DATE,
            name: `startDate` as Path<TFieldValues>,
            required: true,
            placeholder: "Select Start Date",
            errors,
          },
          {
            register: register(`staffId` as Path<TFieldValues>),
            label: "Staff ID",
            type: InputTypes.TEXT,
            required: true,
            placeholder: "Enter staff ID",
            errors,
          },
        ]}
      />
    </div>
  );
};

export default AssignUserForm;
