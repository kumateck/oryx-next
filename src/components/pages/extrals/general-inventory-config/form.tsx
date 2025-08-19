import { FormWizard } from "@/components/form-inputs";
import { Card, CardContent, CardHeader } from "@/components/ui";
import {
  InputTypes,
  InventoryClassificationEnum,
  Option,
  splitWords,
} from "@/lib";
import React from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  unitOfMeasureOptions: Option[];
  isLoadingCode?: boolean;
}
const InventoryForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  unitOfMeasureOptions,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="font-semibold">
          Create General Configuration
        </CardHeader>
        <CardContent>
          <div className="flex justify-start w-full gap-4">
            <FormWizard
              className=""
              config={[
                {
                  label: "Item Name",
                  type: InputTypes.TEXT,
                  placeholder: "Item Name",
                  register: register("materialName" as Path<TFieldValues>),
                  required: true,
                  errors,
                },
                {
                  label: "Item Code",
                  type: InputTypes.TEXT,
                  placeholder: "Item code",
                  register: register("code" as Path<TFieldValues>),
                  required: true,
                  errors,
                },
                {
                  label: "Unit of Measure",
                  type: InputTypes.SELECT,
                  placeholder: "Unit of Measure",
                  name: "unitOfMeasureId",
                  required: true,
                  control: control as Control,
                  options: unitOfMeasureOptions,
                  errors,
                },
                {
                  label: "Maximum Level",
                  type: InputTypes.NUMBER,
                  placeholder: "Maximum Level",
                  required: true,
                  register: register("maximumLevel" as Path<TFieldValues>, {
                    valueAsNumber: true,
                  }),
                  errors,
                },
                {
                  label: "Minimum Level",
                  type: InputTypes.NUMBER,
                  placeholder: "Minimum Level",
                  required: true,
                  register: register("minimumLevel" as Path<TFieldValues>, {
                    valueAsNumber: true,
                  }),
                  errors,
                },
              ]}
            />
            <div className="w-full">
              <FormWizard
                className=""
                config={[
                  {
                    label: "Store Type",
                    type: InputTypes.TEXT,
                    placeholder: "Store Type",
                    register: register("storeType" as Path<TFieldValues>),
                    required: true,
                    readOnly: true,
                    errors,
                  },
                  {
                    label: "Category",
                    type: InputTypes.TEXT,
                    placeholder: "Category(Optional)",
                    register: register("category" as Path<TFieldValues>),
                    errors,
                  },
                  {
                    label: "Classification",
                    type: InputTypes.SELECT,
                    placeholder: "Classification",
                    name: "classification",
                    required: true,
                    control: control as Control,
                    options: Object.entries(InventoryClassificationEnum)
                      .filter(([key]) => isNaN(Number(key)))
                      .map(([key, value]) => ({
                        label: splitWords(key),
                        value: String(value),
                      })),
                    errors,
                  },
                  {
                    label: "Description",
                    type: InputTypes.TEXTAREA,
                    placeholder: "Enter Description",
                    register: register("description" as Path<TFieldValues>),
                    rows: 4,
                    required: true,
                    errors,
                  },
                  {
                    label: "Reorder Level",
                    type: InputTypes.NUMBER,
                    placeholder: "Reorder Level",
                    required: true,
                    register: register("reorderLevel" as Path<TFieldValues>, {
                      valueAsNumber: true,
                    }),
                    errors,
                  },
                ]}
              />
              <div className="space-y-1">
                <label htmlFor="isActive">Batch Number</label>
                <div className="flex w-fit items-center justify-center gap-2">
                  <FormWizard
                    config={[
                      {
                        label: "Active",
                        type: InputTypes.SWITCH,
                        placeholder: "active",
                        control: control as Control,

                        required: true,
                        name: "isActive",
                        errors,
                      },
                    ]}
                  />
                  <span className="-mt-2">Required</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <FormWizard
        config={[
          {
            type: InputTypes.DRAGNDROP,
            label: "",
            name: `attachments`,
            defaultValue: null,
            control: control as Control,
            errors,
          },
        ]}
      />
    </div>
  );
};

export default InventoryForm;
