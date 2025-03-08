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
  categoryOptions: Option[];
  uomOptions: Option[];
  packingUomOptions: Option[];
  equipmentOptions: Option[];
  departmentOptions: Option[];
  defaultCategory?: Option;
  defaultUom?: Option;
  defaultPackingUom?: Option;
  defaultEquipment?: Option;
  defaultDepartment?: Option;
}
const ProductForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  categoryOptions,
  defaultCategory,
  defaultUom,
  defaultPackingUom,
  uomOptions,
  packingUomOptions,
  equipmentOptions,
  defaultEquipment,
  departmentOptions,
  defaultDepartment,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full">
      <FormWizard
        className="grid w-full grid-cols-2 gap-x-10 gap-y-5 space-y-0"
        fieldWrapperClassName="flex-grow"
        config={[
          {
            register: register("name" as Path<TFieldValues>),
            label: "Product Name",
            placeholder: "Enter Product Name",
            type: InputTypes.TEXT,
            errors,
          },
          {
            register: register("code" as Path<TFieldValues>),
            label: "Product Code",
            readOnly: true,
            required: true,
            description: (
              <span className="text-sm text-neutral-500">
                You can’t change the product code
              </span>
            ),
            placeholder: "Code will be generated",
            type: InputTypes.TEXT,
            errors,
          },
          {
            register: register("genericName" as Path<TFieldValues>),
            label: "Generic Name",
            placeholder: "Enter Generic Name",
            type: InputTypes.TEXT,
            errors,
          },
          {
            label: "Category",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "categoryId",
            required: true,
            onModal: true,
            defaultValue: defaultCategory,
            placeholder: "Select Category",
            options: categoryOptions,
            errors,
          },
          {
            label: "Base UOM",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "baseUomId",
            required: true,
            onModal: true,
            defaultValue: defaultUom,
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
            label: "Base Packing UOM",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "basePackingUomId",
            required: true,
            onModal: true,
            defaultValue: defaultPackingUom,
            placeholder: "Select UOM",
            options: packingUomOptions,
            errors,
          },
          {
            register: register("basePackingQuantity" as Path<TFieldValues>, {
              valueAsNumber: true,
            }),
            label: "Base Packing Quantity",
            placeholder: "Enter quantity",
            type: InputTypes.NUMBER,

            errors,
          },
          {
            label: "Equipment",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "equipment",
            required: true,
            defaultValue: defaultEquipment,
            placeholder: "Select Equipment",
            options: equipmentOptions,
            errors,
          },
          {
            register: register("fullBatchSize" as Path<TFieldValues>, {
              valueAsNumber: true,
            }),
            label: "Full Batch Size",
            placeholder: "Enter in Largest Unit",
            type: InputTypes.NUMBER,

            errors,
          },
          {
            label: "Department",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "department",
            required: true,
            defaultValue: defaultDepartment,
            placeholder: "Select Department",
            options: departmentOptions,
            errors,
          },
          {
            register: register("storageCondition" as Path<TFieldValues>),
            label: "Storage Condition",
            placeholder: "Enter condition",
            type: InputTypes.TEXT,
            errors,
          },
          {
            register: register("shelfLife" as Path<TFieldValues>),
            label: "Shelf Life",
            placeholder: "Enter shelf Life",
            type: InputTypes.TEXT,
            errors,
          },
          {
            register: register("packageStyle" as Path<TFieldValues>),
            label: "Pack Style",
            placeholder: "Enter style",
            type: InputTypes.TEXT,
            errors,
          },
          {
            register: register("filledWeight" as Path<TFieldValues>),
            label: "Filled Volume",
            placeholder: "Enter filled volume",
            type: InputTypes.TEXT,
            errors,
          },
          {
            register: register("actionuse" as Path<TFieldValues>),
            label: "Action and Use",
            placeholder: "Enter action and use",
            type: InputTypes.TEXT,
            errors,
          },

          {
            register: register("description" as Path<TFieldValues>),
            label: "Label Claims",
            placeholder: "Enter label claims",
            type: InputTypes.TEXTAREA,
            errors,
          },
        ]}
      />
    </div>
  );
};

export default ProductForm;
