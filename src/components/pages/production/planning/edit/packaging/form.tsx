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
  materialOptions: Option[];
  directLinkMaterialOptions: Option[];
  defaultValues?: TFieldValues;
}
const PackageForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  materialOptions,
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
            type: InputTypes.SELECT,
            name: "material",
            defaultValue: defaultValues?.material,
            required: true,
            onModal: true,
            placeholder: "Select Material",
            options: materialOptions,
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
            onModal: true,
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
            required: true,
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
          {
            register: register("materialThickness" as Path<TFieldValues>),
            label: "Material Thickness",
            placeholder: "Enter material thickness",
            type: InputTypes.TEXT,

            errors,
          },
          {
            register: register("otherStandards" as Path<TFieldValues>),
            label: "Other Standards",
            placeholder: "Enter other standards",
            type: InputTypes.TEXT,
            errors,
          },
        ]}
      />
    </div>
  );
};

export default PackageForm;
