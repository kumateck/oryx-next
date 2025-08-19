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

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  uomOptions: Option[];
  defaultValues?: TFieldValues;
  kind?: EMaterialKind;
  currency?: Option;
  isLoading: boolean;
  fetchOptions: (search: string, page: number) => Promise<FetchOptionsResult>;
}
const RevisionForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  fetchOptions,
  isLoading,
  defaultValues,
  uomOptions,
  currency,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full space-y-5">
      <FormWizard
        config={[
          {
            label: "Material",
            control: control as Control,
            type: InputTypes.ASYNC_SELECT,
            name: "material",
            required: true,
            onModal: true,
            defaultValue: defaultValues?.material,
            placeholder: "Select material",
            fetchOptions: fetchOptions,
            isLoading: isLoading,
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
            register: register("quantity" as Path<TFieldValues>, {
              valueAsNumber: true,
            }),
            label: "Quantity",
            placeholder: "Enter quantity",
            type: InputTypes.NUMBER,

            errors,
          },
          {
            register: register("price" as Path<TFieldValues>, {
              valueAsNumber: true,
            }),
            label: "Price",
            placeholder: "Enter price",
            type: InputTypes.NUMBER,
            errors,
            prefixText: currency?.label,
          },
        ]}
      />
    </div>
  );
};

export default RevisionForm;
