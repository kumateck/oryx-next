import React from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

import { FormWizard } from "@/components/form-inputs";
import { InputTypes } from "@/lib";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  defaultValues?: TFieldValues;
}
const IssueForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,

  // defaultValues,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full">
      <FormWizard
        className="grid w-full grid-cols-2 gap-x-10 gap-y-4 space-y-0"
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
            type: InputTypes.SPACE,
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
            register: register("batchQuantity" as Path<TFieldValues>),
            label: "Batch Size",
            placeholder: "Enter number",
            type: InputTypes.TEXT,
            readOnly: true,
            errors,
          },
          {
            register: register("uom" as Path<TFieldValues>),
            label: "Unit of Measurement",
            placeholder: "Select UOM",
            type: InputTypes.TEXT,
            readOnly: true,
            errors,
          },
        ]}
      />
    </div>
  );
};

export default IssueForm;
