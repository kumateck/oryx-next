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
import { ChecklistBatchDto } from "./types";

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
  uomOptions: Option[];
  packingUomOptions: Option[];
  checklistBooleanOptions: Option[];
  checklistContainersOptions: Option[];
  consignmentCarrierOptions: Option[];
  defaultValues?: TFieldValues;
  defaultCategory?: Option;
  defaultUom?: Option;
  defaultPackingUom?: Option;
  defaultIntactnessOption?: Option;
}
const ChecklistForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  uomOptions,
  packingUomOptions,
  checklistBooleanOptions,
  checklistContainersOptions,
  consignmentCarrierOptions,
  defaultIntactnessOption,
  fields,
  append,
  remove,
}: Props<TFieldValues, TContext>) => {
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
                register: register("supplierStatus" as Path<TFieldValues>, {
                  valueAsNumber: true,
                }),
                label: "Supplier Status",
                type: InputTypes.NUMBER,
                required: true,
                placeholder: "Enter Supplier Status",
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
                name: "certificateOfAnalysisDelivered",
                required: true,
                onModal: true,
                defaultValue: checklistBooleanOptions?.[1] || null,
                placeholder: "Yes",
                options: checklistBooleanOptions,
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
                name: "conditionOfConsignmentCarrier",
                required: true,
                onModal: true,
                defaultValue: consignmentCarrierOptions?.[0],
                placeholder: "Dirty",
                options: consignmentCarrierOptions,
                errors,
              },
              {
                register: register("supplierName" as Path<TFieldValues>),
                label: "Supplier Name",
                placeholder: "Enter supplier name",
                type: InputTypes.TEXT,
                readOnly: true,
                errors,
              },
              {
                label: "Visible proper labelling of containers/bags/shippers",
                control: control as Control,
                type: InputTypes.SELECT,
                name: "visibleLabelingOfContainers",
                required: true,
                onModal: true,
                defaultValue: checklistBooleanOptions?.[1] || null,
                placeholder: "Yes",
                options: checklistBooleanOptions,
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
                name: "intactnessOfContainers",
                required: true,
                onModal: true,
                defaultValue: defaultIntactnessOption,
                placeholder: "Good",
                options: checklistContainersOptions,
                errors,
              },
            ]}
          />
        </CardContent>
      </Card>

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
        uomOptions={uomOptions}
        packingUomOptions={packingUomOptions}
      />

      <div className="max-h-[500px] min-h-[400px] w-full space-y-4 overflow-y-auto">
        {fields.map((field, index) => {
          const batchData: ChecklistBatchDto = {
            batchNumber: (field as any).batchNumber,
            numberOfContainers: (field as any).numberOfContainers,
            numberOfContainersUom: (field as any).numberOfContainersUom,
            quantityPerContainer: (field as any).quantityPerContainer,
            uom: (field as any).uom,
            expiryDate: (field as any).expiryDate,
            manufacturingDate: (field as any).manufacturingDate,
            retestDate: (field as any).retestDate,
            weights: (field as any).retestDate,
          };

          const weights = (field as any).weights || [];

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
                <TableForData lists={[batchData]} />
                {weights &&
                  weights.some(
                    (w: { srNumber: any; grossWeight: any }) =>
                      w && (w.srNumber || w.grossWeight),
                  ) && (
                    <div className="space-y-4 rounded-lg border bg-gray-50 p-4">
                      <h3 className="text-md border-b pb-2 font-semibold">
                        SR Numbers and Weights
                      </h3>

                      {/* Header row */}
                      <div className="mb-2 grid grid-cols-3 gap-x-12">
                        {[1, 2, 3].map((col) => (
                          <div
                            key={col}
                            className="col-span-1 grid grid-cols-2 gap-2"
                          >
                            <span className="text-sm font-medium text-gray-600">
                              SR Number
                            </span>
                            <span className="text-sm font-medium text-gray-600">
                              Gross Weight
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Data rows */}
                      <div className="grid grid-cols-3 gap-x-12 gap-y-2">
                        {weights.map(
                          (
                            weight: { srNumber: any; grossWeight: any },
                            i: React.Key | null | undefined,
                          ) =>
                            weight &&
                            (weight.srNumber || weight.grossWeight) ? (
                              <div
                                key={i}
                                className="col-span-1 grid grid-cols-2 gap-2"
                              >
                                <span className="rounded border bg-white px-2 py-1 text-sm">
                                  {weight.srNumber || "-"}
                                </span>
                                <span className="rounded border bg-white px-2 py-1 text-sm">
                                  {weight.grossWeight || "-"}
                                </span>
                              </div>
                            ) : null,
                        )}
                      </div>

                      {/* Summary */}
                      <div className="mt-3 text-sm italic text-gray-500">
                        {
                          weights.filter(
                            (w: { srNumber: any; grossWeight: any }) =>
                              w && (w.srNumber || w.grossWeight),
                          ).length
                        }{" "}
                        entries recorded
                      </div>
                    </div>
                  )}
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChecklistForm;
