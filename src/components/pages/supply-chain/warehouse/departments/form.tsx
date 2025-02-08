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
const DepartmentForm = <TFieldValues extends FieldValues, TContext>({
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
            register: register("code" as Path<TFieldValues>),
            label: "Department Code",
            placeholder: "Enter name",
            type: InputTypes.TEXT,

            readOnly: true,
            required: true,
            description: (
              <span className="text-sm text-neutral-500">
                You can’t change the department code
              </span>
            ),

            errors,
          },
          {
            register: register("name" as Path<TFieldValues>),
            label: "Name",
            placeholder: "Ener name",
            type: InputTypes.TEXT,

            required: true,

            errors,
          },
          {
            register: register("address" as Path<TFieldValues>),
            label: "Address",
            placeholder: "Ener address",
            type: InputTypes.TEXT,
            required: true,
            errors,
          },
          {
            label: "Warehouse Selection",
            control: control as Control,
            type: InputTypes.MULTI,
            name: "warehouseIds",
            defaultValue: defaultValues?.warehouseIds,
            required: true,
            placeholder: "Select warehouses",
            options: warehouseOptions,
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

export default DepartmentForm;
