"use client";
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
  frequencyOptions: Option[];
  shiftTypesOptions: Option[];
  departmentOptions: Option[];
  defaultValues?: TFieldValues;
}

const ShiftScheduleForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  frequencyOptions,
  shiftTypesOptions,
  departmentOptions,
  defaultValues,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full">
      <FormWizard
        className="w-full space-y-5"
        config={[
          {
            register: register("scheduleName" as Path<TFieldValues>),
            label: "Schedule Name",
            placeholder: "Enter schedule name",
            type: InputTypes.TEXT,
            required: true,
            errors,
          },
          {
            label: "Frequency",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "frequency",
            required: true,
            placeholder: "Select frequency",
            options: frequencyOptions,
            errors,
          },
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
            label: "Shift Types",
            control: control as Control,
            type: InputTypes.MULTI,
            name: "shiftTypeIds",
            defaultValue: defaultValues?.shiftTypeList,
            required: true,
            placeholder: "Select Shift Types",
            options: shiftTypesOptions,
            errors,
          },
          {
            label: "Department",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "departmentId",
            required: true,
            defaultValue: defaultValues?.departmentId,
            placeholder: "Select Department",
            options: departmentOptions,
            errors,
          },
        ]}
      />
    </div>
  );
};

export default ShiftScheduleForm;
