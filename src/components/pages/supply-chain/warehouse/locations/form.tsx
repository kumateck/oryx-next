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

  warehouseOptions: Option[];

  defaultValues?: TFieldValues;
}
const LocationForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  warehouseOptions,

  defaultValues,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full">
      <FormWizard
        className="grid w-full grid-cols-2 gap-x-10 space-y-0"
        fieldWrapperClassName="flex-grow"
        config={[
          {
            label: "Warehouse Name",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "warehouseId",
            defaultValue: defaultValues?.warehouseId,
            required: true,
            placeholder: "Select warehouse",
            options: warehouseOptions,
            errors,
          },
          {
            register: register("name" as Path<TFieldValues>),
            label: "Name",
            placeholder: "Enter name",
            type: InputTypes.TEXT,

            required: true,

            errors,
          },
          {
            register: register("floorName" as Path<TFieldValues>),
            label: "Floor Name",
            placeholder: "Enter floor name",
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

export default LocationForm;
