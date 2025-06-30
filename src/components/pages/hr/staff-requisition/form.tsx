import React from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

import { FormWizard } from "@/components/form-inputs";
import { InputTypes, Option, StaffRequisitionType } from "@/lib";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  designationsOptions: Option[];
  appointmentOptions: Option[];
  defaultValues?: TFieldValues;
  departmentOptions: Option[];
}

export const PositionDetailsForm = <
  TFieldValues extends FieldValues,
  TContext,
>({
  control,
  register,
  errors,
  designationsOptions,
  appointmentOptions,
  defaultValues,
  departmentOptions,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full">
      <p className="font-medium">Position Details</p>
      <FormWizard
        className="w-full space-y-5 mt-5"
        config={[
          {
            register: register("numberOfStaff" as Path<TFieldValues>, {
              valueAsNumber: true,
            }),
            label: "Number of Staff",
            placeholder: "Enter number of staff",
            type: InputTypes.TEXT,
            required: true,
            errors,
          },
          {
            label: "Request Department",
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
            name: "designationId",
            required: true,
            defaultValue: defaultValues?.designationId,
            placeholder: "Select designation",
            options: designationsOptions,
            errors,
          },
          {
            register: register("qualification" as Path<TFieldValues>),
            label: "Qualification",
            placeholder: "Enter qualification",
            type: InputTypes.TEXT,
            required: true,
            errors,
          },
          {
            label: "Appointment Type",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "appointmentType",
            required: true,
            defaultValue: defaultValues?.appointmentId,
            placeholder: "Select appointment type",
            options: appointmentOptions,
            errors,
          },
          {
            label: "Request Urgency",
            control: control as Control,
            type: InputTypes.DATE,
            name: "requestUrgency",
            required: true,
            placeholder: "Select request urgency date",
            errors,
          },
          {
            label: "Justification for Request",
            control: control as Control,
            type: InputTypes.RICHTEXT,
            name: "justification",
            autoFocus: true,
            placeholder: "Enter justification for request",
            suggestions: [],
            errors,
          },
        ]}
      />
    </div>
  );
};

export const BackgroundDetailsForm = <
  TFieldValues extends FieldValues,
  TContext,
>({
  control,
  register,
  errors,
}: Omit<
  Props<TFieldValues, TContext>,
  "designationsOptions" | "appointmentOptions" | "departmentOptions"
>) => {
  return (
    <div className="w-full">
      <p className="font-medium">Background Details</p>
      <FormWizard
        className="w-full space-y-5 mt-5"
        config={[
          {
            label: "Budgeted",
            type: InputTypes.RADIO,
            name: "budgeted",
            options: Object.entries(StaffRequisitionType)
              .filter(([, value]) => typeof value === "number")
              .map(([key, value]) => ({
                label: key, // "Raw" or "Package"
                value: value.toString(), // 0 or 1
              })),
            required: true,
            control: control as Control,
            errors,
          },
          {
            register: register("educationQualification" as Path<TFieldValues>),
            label: "Education Qualification",
            placeholder: "Enter education qualification",
            type: InputTypes.TEXT,
            required: true,
            errors,
          },
          {
            register: register("additionalRequirements" as Path<TFieldValues>),
            label: "Additional Requirements",
            placeholder: "Enter additional requirements",
            type: InputTypes.TEXT,
            required: false,
            errors,
          },
        ]}
      />
    </div>
  );
};
