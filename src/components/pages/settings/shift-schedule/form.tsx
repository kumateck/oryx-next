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
  startDayOptions: Option[];
  defaultValues?: TFieldValues;
}

const ShiftScheduleForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  frequencyOptions,
  shiftTypesOptions,
  departmentOptions,
  startDayOptions,
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
        ]}
      />

      <div className="w-full my-5 gap-4 grid grid-cols-2">
        <FormWizard
          config={[
            {
              label: "Start Day",
              control: control as Control,
              type: InputTypes.SELECT,
              name: "startDay",
              required: true,
              placeholder: "Select start date",
              options: startDayOptions,
              errors,
            },
          ]}
        />
        <FormWizard
          config={[
            {
              label: "Start time",
              control: control as Control,
              type: InputTypes.CLOCK,
              name: "startTime",
              required: true,
              placeholder: "Select start time",
              errors,
            },
          ]}
        />
      </div>

      <FormWizard
        className="w-full space-y-5"
        config={[
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
