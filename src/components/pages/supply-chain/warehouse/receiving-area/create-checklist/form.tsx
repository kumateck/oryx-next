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

import AddBatchDialog from "./add-batch";
import TableForData from "./table";
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
  // const [packageLists, setPackageLists] = useState<ChecklistBatchRequestDto[]>(
  //   [],
  // );
  const [showAddDialog, setShowAddDialog] = useState(false);
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
                register: register("materialName" as Path<TFieldValues>),
                label: "Material Name",
                type: InputTypes.TEXT,
                required: true,
                placeholder: "Enter Material Name",
                readOnly: true,
                errors,
              },
              {
                register: register("supplierStatus" as Path<TFieldValues>),
                label: "Supplier Status",
                type: InputTypes.TEXT,
                required: true,
                placeholder: "Enter Supplier Status",
                readOnly: true,
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
                readOnly: true,
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
                readOnly: true,
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
                readOnly: true,
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
          onClick={() => setShowAddDialog(true)}
        >
          <Icon name="Plus" />
          <span> Add</span>
        </Button>
      </div>

      <AddBatchDialog
        isOpen={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        onSave={(data) => {
          append(data as any);
        }}
      />

      <div className="max-h-[500px] min-h-[400px] w-full space-y-4 overflow-y-auto">
        {fields.map((field, index) => {
          const batchData: ChecklistBatchRequestDto = {
            batchNumber: (field as any).batchNumber,
            numberOfBags: (field as any).numberOfContainers, // Ensure this matches your form field name
            expriyDate: (field as any).expiryDate, // Note the typo in the column definition
            manufacturingDate: (field as any).manufacturingDate,
            retestDate: (field as any).retestDate,
            batchQuantity: (field as any).quantityPerContainer,
          };

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
                  lists={[batchData]}
                  // columns={getColumns()}
                  // If your table component needs any additional props
                />
                <div className="grid grid-cols-3 gap-x-12 gap-y-2">
                  {[...Array(18)].map((_, i) => (
                    <div key={i} className="col-span-1 grid grid-cols-2 gap-2">
                      <span>{(field as any)[`srNumber${i}`]}</span>
                      <span>{(field as any)[`grossWeight${i}`]}</span>
                    </div>
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
