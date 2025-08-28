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
  isLoading: boolean;
  fetchOptions: (search: string, page: number) => Promise<FetchOptionsResult>;

  directLinkMaterialOptions: Option[];
  defaultValues?: TFieldValues;
}
const PackageForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  fetchOptions,
  isLoading,
  defaultValues,
  directLinkMaterialOptions,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full">
      <FormWizard
        className="grid w-full grid-cols-2 gap-6 space-y-0"
        fieldWrapperClassName="flex-grow"
        config={[
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
            register: register("baseQuantity" as Path<TFieldValues>, {
              valueAsNumber: true,
            }),
            label: "Base Quantity",
            placeholder: "Enter quantity",
            type: InputTypes.NUMBER,

            errors,
          },
          {
            label: "Direct Link Material",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "directLinkMaterial",
            defaultValue: defaultValues?.directLinkMaterial,
            // onModal: true,
            placeholder: "Select Material",
            options: directLinkMaterialOptions,
            errors,
          },
          {
            register: register("unitCapacity" as Path<TFieldValues>, {
              valueAsNumber: true,
            }),
            label: "Unit Capacity",
            placeholder: "Enter capacity",
            type: InputTypes.NUMBER,
            // required: true,
            errors,
          },
          {
            register: register("packingExcessMargin" as Path<TFieldValues>, {
              valueAsNumber: true,
            }),
            label: "Packing Excess",
            placeholder: "Enter number",
            type: InputTypes.NUMBER,
            errors,
          },
          // {
          //   register: register("materialThickness" as Path<TFieldValues>),
          //   label: "Material Thickness",
          //   placeholder: "Enter material thickness",
          //   type: InputTypes.TEXT,

          //   errors,
          // },
          // {
          //   register: register("otherStandards" as Path<TFieldValues>),
          //   label: "Other Standards",
          //   placeholder: "Enter other standards",
          //   type: InputTypes.TEXT,
          //   errors,
          // },
        ]}
      />
    </div>
  );
};

export default PackageForm;
