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
const IssueForm = <TFieldValues extends FieldValues, TContext>({
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
            register: register("batchNumber" as Path<TFieldValues>),
            label: "Batch Number",
            placeholder: "Enter number",
            type: InputTypes.TEXT,

            required: true,

            errors,
          },
          {
            label: "Manufacturing Date",
            control: control as Control,
            type: InputTypes.DATE,
            name: "manufacturingDate",
            required: true,
            disabled: {
              before: new Date(),
              after: new Date(2027, 0, 1),
            },
            errors,
          },
          {
            label: "Expiry Date",
            control: control as Control,
            type: InputTypes.DATE,
            name: "expiryDate",
            required: true,
            disabled: {
              before: new Date(),
              after: new Date(2027, 0, 1),
            },
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

export default IssueForm;
