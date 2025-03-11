import React from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

import { FormWizard } from "@/components/form-inputs";
import { Button, Card, CardContent, CardTitle, Icon } from "@/components/ui";
import { InputTypes } from "@/lib";

import TableForData from "./table";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
}

const BillingSheetForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full">
      <div className="px-2">
        <FormWizard
          className="grid w-full grid-cols-2 gap-x-10 space-y-0"
          fieldWrapperClassName="flex-grow"
          config={[
            {
              register: register("billOfLading" as Path<TFieldValues>),
              label: "Bill of Lading",
              type: InputTypes.TEXT,
              required: true,
              placeholder: "Enter Bill of Lading",
              errors,
            },
            {
              register: register("supplierName" as Path<TFieldValues>),
              label: "Supplier Name",
              placeholder: "Enter Supplier Name",
              type: InputTypes.TEXT,
              required: true,
              errors,
            },
            {
              register: register("invoiceNumber" as Path<TFieldValues>),
              label: "Invoice Number",
              placeholder: "Enter Invoice Number",
              type: InputTypes.TEXT,
              required: true,
              errors,
            },
            {
              register: register("invoiceAmount" as Path<TFieldValues>),
              label: "Invoice Amount",
              placeholder: "Enter Invoice Amount",
              type: InputTypes.TEXT,
              required: true,
              errors,
            },
            {
              name: "expectedArrivalDate",
              control: control as Control,
              label: "Expected Arrival Date",
              placeholder: "Enter Expected Arrival Date",
              type: InputTypes.DATE,
              required: true,
              errors,
            },
            {
              register: register("freeTimeDuration" as Path<TFieldValues>),
              label: "Free Time Duration",
              placeholder: "Enter Free Time Duration",
              type: InputTypes.TEXT,
              required: true,
              errors,
            },
            {
              name: "freeTimeExpiryDate",
              control: control as Control,
              label: "Free Time Expiry Date",
              placeholder: "Enter Free Time Expiry Date",
              type: InputTypes.DATE,
              required: true,
              errors,
            },
            {
              name: "demurrageStartDate",
              control: control as Control,
              label: "Demurrage Start Date",
              placeholder: "Enter Demurrage Start Date",
              type: InputTypes.DATE,
              required: true,
              errors,
            },
          ]}
        />
      </div>

      <Card className="mt-6">
        <CardTitle className="p-4">Container Information</CardTitle>
        <CardContent>
          <FormWizard
            className="grid w-full grid-cols-3 gap-x-10 space-y-0"
            fieldWrapperClassName="flex-grow"
            config={[
              {
                register: register("containerSize" as Path<TFieldValues>),
                label: "Container Number/Size",
                type: InputTypes.TEXT,
                required: true,
                placeholder: "Enter Container Number/Size",
                errors,
              },
              {
                register: register("numberOfPackages" as Path<TFieldValues>),
                label: "Number of Packages",
                placeholder: "Enter Number of Packages",
                type: InputTypes.NUMBER,
                required: true,
                errors,
              },
              {
                register: register("uom" as Path<TFieldValues>),
                label: "Unit of Measure",
                placeholder: "Enter Unit of Measure",
                type: InputTypes.TEXT,
                required: true,
                errors,
              },
            ]}
          />

          <div className="mt-4">
            <h3 className="text-lg">Shipment Items</h3>
            <div className="mt-4">
              <TableForData lists={[]} setItemLists={() => {}} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardTitle className="p-4">
          <div className="flex items-center justify-between">
            Charges
            <Button
              type="button"
              variant={"ghost"}
              className="bg-neutral-dark text-white"
              // onClick={() => append(defaultLocation as any)}
            >
              <Icon name="Plus" />
              <span> Add</span>
            </Button>
          </div>
        </CardTitle>
        <CardContent>
          <div className="mt-4">
            <div className="mt-4">
              <TableForData lists={[]} setItemLists={() => {}} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingSheetForm;
