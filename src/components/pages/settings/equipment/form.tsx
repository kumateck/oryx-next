import React from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

import { FormWizard } from "@/components/form-inputs";
import { FetchOptionsResult } from "@/components/ui";
import { EMaterialKind, InputTypes, Option } from "@/lib";

import { IsYesorNo } from "./types";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  uomOptions: Option[];
  defaultValues?: TFieldValues;
  kind?: EMaterialKind;
  isLoading: boolean;
  fetchOptions: (search: string, page: number) => Promise<FetchOptionsResult>;
}
const EquipmentForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  fetchOptions,
  isLoading,
  defaultValues,
  uomOptions,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full space-y-5">
      <FormWizard
        // className="grid w-full grid-cols-2 gap-x-10 gap-y-5 space-y-0"
        // fieldWrapperClassName="flex-grow"
        config={[
          {
            register: register("machineId" as Path<TFieldValues>),
            label: "Machine Id",
            required: true,
            placeholder: "Machine Id",
            type: InputTypes.TEXT,
            errors,
          },
          {
            register: register("name" as Path<TFieldValues>),
            label: "Material Name",
            placeholder: "Enter Name",
            type: InputTypes.TEXT,
            errors,
          },
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
          },
          {
            register: register("capacityQuantity" as Path<TFieldValues>, {
              valueAsNumber: true,
            }),
            label: "Capacity Quantity",
            placeholder: "Enter quantity",
            type: InputTypes.NUMBER,
            errors,
          },
          {
            label: "UOM",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "uoM",
            required: true,
            onModal: true,
            defaultValue: defaultValues?.uoM,
            placeholder: "Select UOM",
            options: uomOptions,
            errors,
          },
          {
            label: "Relevant for Capacity Planning",
            control: control as Control,
            type: InputTypes.RADIO,
            name: "relevanceCheck",
            required: true,
            options: Object.entries(IsYesorNo)
              .filter(([, value]) => typeof value === "number")
              .map(([key, value]) => ({
                label: key,
                value: value.toString(), // 0 or 1
              })),
            errors,
          },
          {
            label: "Department",
            control: control as Control,
            type: InputTypes.ASYNC_SELECT,
            name: "department",
            required: true,
            onModal: true,
            defaultValue: defaultValues?.department,
            placeholder: "Select Department",
            fetchOptions: fetchOptions,
            isLoading: isLoading,
            errors,
          },
          {
            register: register("storageLocation" as Path<TFieldValues>),
            label: "Storage Location",
            placeholder: "Enter Storage Location",
            type: InputTypes.TEXT,
            errors,
          },
        ]}
      />
    </div>
  );
};

export default EquipmentForm;
