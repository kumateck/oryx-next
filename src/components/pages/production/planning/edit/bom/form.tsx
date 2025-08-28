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
import { FetchOptionsResult } from "@/components/ui";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  materialTypeOptions: Option[];
  defaultValues?: TFieldValues;
  isLoading: boolean;
  fetchOptions: (search: string, page: number) => Promise<FetchOptionsResult>;
}
const BomForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  materialTypeOptions,
  defaultValues,
  fetchOptions,
  isLoading,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full">
      <FormWizard
        className="grid w-full grid-cols-2 gap-6 space-y-0"
        fieldWrapperClassName="flex-grow"
        config={[
          {
            register: register("order" as Path<TFieldValues>, {
              valueAsNumber: true,
            }),
            label: "Step",
            placeholder: "Enter step",
            type: InputTypes.NUMBER,

            errors,
          },
          {
            label: "Function",
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
            type: InputTypes.ASYNC_SELECT,
            name: "materialId",
            required: true,
            onModal: true,
            defaultValue: defaultValues?.materialId,
            placeholder: "Select material",
            fetchOptions: fetchOptions,
            isLoading: isLoading,
            errors,
          },
          {
            register: register("code" as Path<TFieldValues>),
            label: "Material Code",
            placeholder: "Enter code",
            type: InputTypes.TEXT,
            readOnly: true,
            errors,
          },
          {
            register: register("spec" as Path<TFieldValues>),
            label: "Material Spec Number",
            placeholder: "Enter spec",
            type: InputTypes.TEXT,
            readOnly: true,
            errors,
          },
          {
            register: register("baseUoMId.label" as Path<TFieldValues>),
            label: "Unit of Measure",
            placeholder: "Enter Base UOM",
            type: InputTypes.TEXT,
            readOnly: true,
            errors,
          },
          {
            register: register("baseQuantity" as Path<TFieldValues>, {
              valueAsNumber: true,
            }),
            label: "Quantity per unit",
            placeholder: "Enter quantity",
            type: InputTypes.NUMBER,

            errors,
          },
          {
            register: register("grade" as Path<TFieldValues>),
            label: "Grade/Purity",
            placeholder: "Enter Grade/Purity",
            type: InputTypes.TEXTAREA,

            errors,
          },
        ]}
      />
    </div>
  );
};

export default BomForm;
