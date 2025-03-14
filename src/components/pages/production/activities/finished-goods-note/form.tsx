import React from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

import { FormWizard } from "@/components/form-inputs";
// import { FetchOptionsResult } from "@/components/ui/paginated-select";
import { InputTypes, Option } from "@/lib";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;

  packingUomOptions: Option[];
  packingStyleOptions: Option[];
  defaultValues?: TFieldValues;
}
const Form = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  packingUomOptions,
  packingStyleOptions,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full">
      <FormWizard
        className="grid w-full grid-cols-2 gap-6 space-y-0"
        fieldWrapperClassName="flex-grow"
        config={[
          {
            register: register("productName" as Path<TFieldValues>),
            label: "Product Name",
            placeholder: "Enter Product Name",
            type: InputTypes.TEXT,
            readOnly: true,
            errors,
          },
          {
            register: register("batchNumber" as Path<TFieldValues>),
            label: "Batch Number",
            placeholder: "",
            type: InputTypes.TEXT,

            readOnly: true,
            errors,
          },
          {
            register: register("manufacturingDateName" as Path<TFieldValues>),
            label: "Manufacturing Date",
            placeholder: "Enter Product Name",
            type: InputTypes.TEXT,
            readOnly: true,
            errors,
          },
          {
            register: register("expiryDateName" as Path<TFieldValues>),
            label: "Expiry Date",
            placeholder: "Enter Product Name",
            type: InputTypes.TEXT,
            readOnly: true,
            errors,
          },

          {
            register: register("quantityPerPack" as Path<TFieldValues>),
            label: "Quantity per pack",
            placeholder: "Enter quantity per pack",
            type: InputTypes.TEXT,
            readOnly: true,
            errors,
          },
          {
            label: "Packing Style",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "packageStyle",
            required: true,
            placeholder: "Select Unit of Measure",
            options: packingStyleOptions,
            errors,
          },
          {
            register: register("qarNumber" as Path<TFieldValues>),
            label: "QAR Number",
            placeholder: "Enter QAR number",
            type: InputTypes.TEXT,
            autoFocus: true,
            errors,
          },
          {
            type: InputTypes.SPACE,
          },
          {
            register: register("totalQuantityTransfer" as Path<TFieldValues>),
            label: "Total Transfer Quantity",
            placeholder: "Enter quantity per pack",
            type: InputTypes.TEXT,
            readOnly: true,
            errors,
          },
          {
            label: "Unit of Measure",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "uom",
            required: true,
            placeholder: "Select Unit of Measure",
            options: packingUomOptions,
            errors,
          },
        ]}
      />
    </div>
  );
};

export default Form;
