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
  defaultValues?: TFieldValues;
}
const Form = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  packingUomOptions,
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
            errors,
          },
          {
            register: register("transferTo" as Path<TFieldValues>),
            label: "Transfer To",
            placeholder: "Enter Destination",
            type: InputTypes.TEXT,
            errors,
          },
          {
            register: register("batchNumber" as Path<TFieldValues>),
            label: "Transfer To",
            placeholder: "Enter Destination",
            type: InputTypes.TEXT,
            errors,
          },
          {
            register: register("qarNumber" as Path<TFieldValues>, {
              valueAsNumber: true,
            }),
            label: "QAR Number",
            placeholder: "Enter QAR number",
            type: InputTypes.NUMBER,
            errors,
          },
          {
            register: register("quantityPerPack" as Path<TFieldValues>, {
              valueAsNumber: true,
            }),
            label: "Quantity per pack",
            placeholder: "Enter quantity per pack",
            type: InputTypes.NUMBER,

            errors,
          },
          {
            label: "Unit of Measure",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "packageStyleId",
            required: true,
            placeholder: "Select Unit of Measure",
            options: packingUomOptions,
            errors,
          },
          {
            register: register("qarNumber" as Path<TFieldValues>, {
              valueAsNumber: true,
            }),
            label: "QAR Number",
            placeholder: "Enter QAR number",
            type: InputTypes.NUMBER,
            errors,
          },
          {
            label: "Unit of Measure",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "uomId",
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
