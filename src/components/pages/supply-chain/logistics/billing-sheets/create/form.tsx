import React, { Dispatch, SetStateAction } from "react";
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
import { ChargesRequestDto, MaterialRequestDto } from "./types";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  remove: UseFieldArrayRemove;
  fields: FieldArrayWithId<TFieldValues>[];
  append: UseFieldArrayAppend<TFieldValues>;
  invoiceOptions: Option[];
  packingUomOptions: Option[];
  supplierOptions: Option[];
  materialLists: MaterialRequestDto[];
  setMaterialLists: Dispatch<SetStateAction<MaterialRequestDto[]>>;
}

const defaultCharges: ChargesRequestDto = {
  description: "",
  cost: "",
};

const BillingSheetForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  remove,
  fields,
  append,
  invoiceOptions,
  packingUomOptions,
  supplierOptions,
  materialLists,
  setMaterialLists,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full">
      <div className="px-2">
        <FormWizard
          className="grid w-full grid-cols-2 gap-x-10 space-y-0"
          fieldWrapperClassName="flex-grow"
          config={[
            {
              register: register("code" as Path<TFieldValues>),
              label: "Billing Sheet Code",
              placeholder: "Code will be generated",
              type: InputTypes.TEXT,
              readOnly: true,
              required: true,
              description: (
                <span className="text-neutral-seondary text-sm">
                  You can’t change the waybill code
                </span>
              ),
              errors,
            },
            {
              register: register("billOfLading" as Path<TFieldValues>),
              label: "Bill of Lading",
              type: InputTypes.TEXT,
              required: true,
              placeholder: "Enter Bill of Lading",
              errors,
            },
            {
              label: "Supplier",
              control: control as Control,
              type: InputTypes.SELECT,
              name: "supplierId",
              required: true,
              placeholder: "Select Supplier",
              options: supplierOptions,
              errors,
            },
            {
              label: "Invoice Number",
              control: control as Control,
              type: InputTypes.SELECT,
              name: "invoiceId",
              required: true,
              placeholder: "Select Invoice Number",
              options: invoiceOptions,
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
              type: InputTypes.TEXT,
              required: true,
              placeholder: "Enter Free Time Duration",
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
                label: "Unit of Measure",
                control: control as Control,
                type: InputTypes.SELECT,
                name: "uom",
                required: true,
                placeholder: "Select Unit of Measure",
                options: packingUomOptions,
                errors,
              },
            ]}
          />

          <div className="mt-4">
            <h3 className="text-lg">Shipment Items</h3>
            <div className="mt-4">
              <TableForData
                lists={materialLists}
                // Remove setItemLists if not used for editing
                setItemLists={setMaterialLists}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="my-6">
        <CardTitle className="p-4">
          <div className="flex items-center justify-between">
            Charges
            <Button
              type="button"
              variant={"ghost"}
              className="bg-neutral-dark text-white"
              onClick={() => append(defaultCharges as any)}
            >
              <Icon name="Plus" />
              <span> Add</span>
            </Button>
          </div>
        </CardTitle>
        <CardContent>
          <div className="mt-4">
            <div className="mt-4">
              {fields.map((field, index) => {
                return (
                  <div key={field.id} className="relative">
                    <div className="absolute right-2 top-0">
                      <Icon
                        onClick={() => remove(index)}
                        name="CircleMinus"
                        className="text-danger-500 h-5 w-5 hover:cursor-pointer"
                      />
                    </div>
                    <FormWizard
                      className="grid w-full grid-cols-2 gap-x-10 space-y-0 pt-4"
                      fieldWrapperClassName="flex-grow"
                      config={[
                        {
                          register: register(
                            `charges.${index}.description` as Path<TFieldValues>,
                          ),
                          label: "Description",
                          type: InputTypes.TEXT,
                          required: true,
                          placeholder: "Enter description",
                          errors,
                        },
                        {
                          register: register(
                            `charges.${index}.cost` as Path<TFieldValues>,
                          ),
                          label: "Cost",
                          placeholder: "Enter Cost",
                          type: InputTypes.TEXT,
                          required: true,
                          errors,
                        },
                      ]}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="my-5 py-4">
          <FormWizard
            config={[
              {
                type: InputTypes.DRAGNDROP,
                label: "Attach Documents",
                name: `attachments`,
                defaultValue: null,
                control: control as Control,
                errors,
              },
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingSheetForm;
