import React from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

import { FormWizard } from "@/components/form-inputs";
import { InputTypes, WarehouseType } from "@/lib";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
}
const WarehousesForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full">
      <FormWizard
        className="grid w-full grid-cols-2 gap-x-10 space-y-0"
        fieldWrapperClassName="flex-grow"
        config={[
          {
            label: "Warehouse Type",
            control: control as Control,
            type: InputTypes.RADIO,
            name: "type",
            required: true,
            placeholder: "Select type",
            options: Object.entries(WarehouseType)
              .filter(([, value]) => typeof value === "number")
              .map(([key, value]) => ({
                label: key, // "Raw" or "Package"
                value: value.toString(), // 0 or 1
              })),
            errors,
          },
          {
            register: register("name" as Path<TFieldValues>),
            label: "Warehouse Name",
            placeholder: "Enter name",
            type: InputTypes.TEXT,

            required: true,

            errors,
          },
          {
            register: register("location" as Path<TFieldValues>),
            label: "Warehouse Location",
            placeholder: "Enter location",
            type: InputTypes.TEXT,
            required: true,
            errors,
          },

          {
            label: "Description",
            control: control as Control,
            type: InputTypes.RICHTEXT,
            name: "description",
            required: true,
            autoFocus: true,
            placeholder: "Enter Remarks",
            suggestions: [],
            errors,
          },
        ]}
      />
    </div>
  );
};

export default WarehousesForm;
