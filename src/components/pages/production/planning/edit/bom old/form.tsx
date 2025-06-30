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
  materialTypeOptions: Option[];
  materialOptions: Option[];
  // materialOptions: (
  //   search: string,
  //   page: number,
  // ) => Promise<FetchOptionsResult>;

  uomOptions: Option[];
  defaultValues?: TFieldValues;
}
const BomForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  materialTypeOptions,
  materialOptions,
  defaultValues,
  uomOptions,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full">
      <FormWizard
        className="grid w-full grid-cols-2 gap-6 space-y-0"
        fieldWrapperClassName="flex-grow"
        config={[
          {
            label: "Ingredient Type",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "materialTypeId",
            required: true,
            onModal: true,
            defaultValue: defaultValues?.materialTypeId,
            placeholder: "Ingredient Type",
            options: materialTypeOptions,
            errors,
          },
          {
            label: "Material",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "materialId",
            defaultValue: defaultValues?.materialId,
            required: true,
            onModal: true,
            placeholder: "Select Material",
            options: materialOptions,
            errors,
          },
          {
            label: "Base UOM",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "baseUoMId",
            defaultValue: defaultValues?.baseUoMId,
            required: true,
            onModal: true,
            placeholder: "Select UOM",
            options: uomOptions,
            errors,
          },
          {
            register: register("baseQuantity" as Path<TFieldValues>, {
              valueAsNumber: true,
            }),
            label: "Base Quantity",
            placeholder: "Enter quantity",
            type: InputTypes.NUMBER,

            errors,
          },
          {
            register: register("grade" as Path<TFieldValues>),
            label: "Grade/Purity",
            placeholder: "Enter Grade/Purity",
            type: InputTypes.TEXT,

            errors,
          },
          {
            register: register("casNumber" as Path<TFieldValues>),
            label: "CAS Number",
            placeholder: "Enter CAS Number",
            type: InputTypes.TEXT,

            errors,
          },
          {
            register: register("function" as Path<TFieldValues>),
            label: "Function",
            placeholder: "Enter function",
            type: InputTypes.TEXTAREA,
            errors,
          },
        ]}
      />
    </div>
  );
};

export default BomForm;
