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
  rotationTypeOptions: Option[];
  applicableDaysOptions: Option[];
  startDayOptions: Option[];
  defaultValues?: TFieldValues;
}

const ShiftTypeConfiguration = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  rotationTypeOptions,
  applicableDaysOptions,
  defaultValues,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full">
      <FormWizard
        className="w-full space-y-5"
        config={[
          {
            register: register("shiftName" as Path<TFieldValues>),
            label: "Shift Name",
            placeholder: "Afternoon Shift",
            type: InputTypes.TEXT,
            required: true,
            errors,
          },
          {
            label: "Shift Category",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "rotationType",
            required: true,
            defaultValue: defaultValues?.rotationType,
            placeholder: "Rotational",
            options: rotationTypeOptions,
            errors,
          },
        ]}
      />

      <div className="w-full my-5 gap-4 grid grid-cols-2">
        <FormWizard
          config={[
            {
              label: "Start time",
              control: control as Control,
              type: InputTypes.CLOCK,
              name: "startTime",
              required: true,
              defaultValue: defaultValues?.startTime,
              placeholder: "Select start time",
              // options: startDayOptions,
              errors,
            },
          ]}
        />
        <FormWizard
          config={[
            {
              label: "End time",
              control: control as Control,
              type: InputTypes.CLOCK,
              name: "endTime",
              required: true,
              defaultValue: defaultValues?.endTime,
              placeholder: "Select end time",
              errors,
            },
          ]}
        />
      </div>

      <FormWizard
        className="w-full space-y-5"
        config={[
          {
            label: "Applicable Days",
            control: control as Control,
            type: InputTypes.MULTI,
            name: "applicableDays",
            defaultValue: defaultValues?.applicableDays,
            required: true,
            placeholder: "Select applicable days",
            options: applicableDaysOptions,
            errors,
          },
        ]}
      />
    </div>
  );
};

export default ShiftTypeConfiguration;
