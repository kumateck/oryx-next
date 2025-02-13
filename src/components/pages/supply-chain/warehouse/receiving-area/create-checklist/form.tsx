"use client";

import React, { useState } from "react";
import {
  Control,
  FieldArrayWithId,
  FieldErrors,
  FieldValues,
  Path,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormRegister,
} from "react-hook-form";

import { FormWizard } from "@/components/form-inputs";
import { Button, Card, CardContent, CardTitle, Icon } from "@/components/ui";
import { InputTypes, Option } from "@/lib";

import TableForData from "./table";
import { ProductRequestDto } from "./type";
import { ChecklistBatchRequestDto } from "./types";

export interface OptionsUpdate extends Option {
  uom: string;
}
interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  productOptions: OptionsUpdate[];
  defaultValues?: TFieldValues;
  fields: FieldArrayWithId<TFieldValues>[];
  remove: UseFieldArrayRemove;
  append: UseFieldArrayAppend<TFieldValues>;
}
const defaultAssociated: ProductRequestDto = {
  productId: { label: "", value: "" },
  quantity: 0,
  uom: "",
};

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  categoryOptions: Option[];
  uomOptions: Option[];
  packingUomOptions: Option[];
  defaultValues?: TFieldValues;
  defaultCategory?: Option;
  defaultUom?: Option;
  defaultPackingUom?: Option;
}
const ChecklistForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  defaultUom,
  defaultPackingUom,
  uomOptions,
  packingUomOptions,
  fields,
  append,
  remove,
}: Props<TFieldValues, TContext>) => {
  const [packageLists, setPackageLists] = useState<ChecklistBatchRequestDto[]>(
    [],
  );
  return (
    <div>
      <Card className="pt-8">
        <CardTitle className="px-8">General Checklist Information</CardTitle>
        <CardContent className="px-8 pt-8">
          <FormWizard
            className="grid w-full grid-cols-2 gap-x-10 gap-y-5 space-y-0"
            fieldWrapperClassName="flex-grow"
            config={[
              {
                label: "Material Name",
                control: control as Control,
                type: InputTypes.SELECT,
                name: "baseUomId",
                required: true,
                onModal: true,
                defaultValue: defaultUom,
                placeholder: "Select Material",
                options: uomOptions,
                errors,
              },
              {
                label: "Supplier Status",
                control: control as Control,
                type: InputTypes.SELECT,
                name: "baseUomId",
                required: true,
                onModal: true,
                defaultValue: defaultUom,
                placeholder: "Select Supplier Status",
                options: uomOptions,
                errors,
              },
              {
                label: "Date",
                control: control as Control,
                type: InputTypes.DATE,
                name: "date",
                required: true,
                disabled: {
                  before: new Date(),
                  after: new Date(2027, 0, 1),
                },
                errors,
              },
              {
                label: "Certificate of Analysis Delivered?",
                control: control as Control,
                type: InputTypes.SELECT,
                name: "baseUomId",
                required: true,
                onModal: true,
                defaultValue: defaultUom,
                placeholder: "Yes",
                options: uomOptions,
                errors,
              },
              {
                register: register("invoiceNumber" as Path<TFieldValues>),
                label: "Invoice Number",
                placeholder: "Enter Invoice number",
                type: InputTypes.TEXT,
                errors,
              },
              {
                label: "Condition of the consignment Carrier",
                control: control as Control,
                type: InputTypes.SELECT,
                name: "baseUomId",
                required: true,
                onModal: true,
                defaultValue: defaultUom,
                placeholder: "Dirty",
                options: uomOptions,
                errors,
              },
              {
                register: register("batchNumber" as Path<TFieldValues>),
                label: "Supplier Name",
                placeholder: "Enter supplier name",
                type: InputTypes.TEXT,
                errors,
              },
              {
                label: "Intactness of containers/bags/shippers",
                control: control as Control,
                type: InputTypes.SELECT,
                name: "basePackingUomId",
                required: true,
                onModal: true,
                defaultValue: defaultPackingUom,
                placeholder: "Yes",
                options: packingUomOptions,
                errors,
              },
              {
                register: register("manufacturerName" as Path<TFieldValues>),
                label: "Manufacturer Name",
                placeholder: "Enter manufacturer name",
                type: InputTypes.TEXT,
                errors,
              },
              {
                label: "Intactness of containers/bags/shippers",
                control: control as Control,
                type: InputTypes.SELECT,
                name: "basePackingUomId",
                required: true,
                onModal: true,
                defaultValue: defaultPackingUom,
                placeholder: "Good",
                options: packingUomOptions,
                errors,
              },
            ]}
          />
        </CardContent>
      </Card>

      {/* BATCHES */}
      <div className="flex justify-between px-2 py-5">
        <span className="font-medium">Batch Information</span>
        <Button
          type="button"
          variant={"ghost"}
          className="bg-neutral-dark text-white"
          onClick={() => append({ ...defaultAssociated } as any)}
        >
          <Icon name="Plus" />
          <span> Add</span>
        </Button>
      </div>

      <div className="max-h-[500px] min-h-[400px] w-full space-y-4 overflow-y-auto">
        {fields.map((field, index) => {
          return (
            <div key={field.id} className="relative">
              <div className="absolute right-2 top-2">
                <Icon
                  onClick={() => remove(index)}
                  name="CircleMinus"
                  className="text-danger-500 h-5 w-5 hover:cursor-pointer"
                />
              </div>

              <Card className="space-y-4 p-5">
                <CardTitle>Batch Information</CardTitle>
                <TableForData
                  lists={packageLists}
                  setItemLists={setPackageLists}
                />
                <div className="grid grid-cols-3 gap-x-12 gap-y-2">
                  <div className="col-span-1 grid grid-cols-2 gap-2 text-sm font-semibold">
                    <span>SR Number</span>
                    <span>Gross Weight</span>
                  </div>
                  <div className="col-span-1 grid grid-cols-2 gap-2 text-sm font-semibold">
                    <span>SR Number</span>
                    <span>Gross Weight</span>
                  </div>
                  <div className="col-span-1 grid grid-cols-2 gap-2 text-sm font-semibold">
                    <span>SR Number</span>
                    <span>Gross Weight</span>
                  </div>
                  {[...Array(18)].map((_, i) => (
                    <FormWizard
                      key={i}
                      className="grid w-full grid-cols-2 gap-2 space-y-0"
                      fieldWrapperClassName="flex-grow"
                      config={[
                        {
                          register: register(
                            "genericName" as Path<TFieldValues>,
                          ),
                          label: "",
                          placeholder: "",
                          type: InputTypes.TEXT,
                          errors,
                        },
                        {
                          register: register(
                            "genericName" as Path<TFieldValues>,
                          ),
                          label: "",
                          placeholder: "",
                          type: InputTypes.TEXT,
                          errors,
                        },
                      ]}
                    />
                  ))}
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChecklistForm;
