import React, { useCallback, useEffect } from "react";
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
import { InputTypes } from "@/lib";
import { FetchOptionsResult, Icon } from "@/components/ui";
import { CreatePurchaseRequisitionDto } from "./types";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  fetcItems: (search: string, page: number) => Promise<FetchOptionsResult>;
  isLoading: boolean;
  handleItemsChange: (index: number, selected: { value: string }) => void;
  append: UseFieldArrayAppend<CreatePurchaseRequisitionDto>;
  fields: FieldArrayWithId<CreatePurchaseRequisitionDto[]>[];
  remove: UseFieldArrayRemove;
}
const PurchaseRequisitionForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  fetcItems,
  isLoading,
  append,
  remove,
  handleItemsChange,
  fields,
}: Props<TFieldValues, TContext>) => {
  const stableAppend = useCallback(append, [append]);
  useEffect(() => {
    if (fields.length > 1) return;
    stableAppend({
      itemId: {
        label: "",
        value: "",
      },
      orderQuantity: 0,
      itemCode: "",
      stockQuantity: 0,
    });
  }, [fields.length, stableAppend]);

  return (
    <div className="w-full space-y-4">
      <div className="flex gap-2 w-full items-center justify-center">
        <FormWizard
          fieldWrapperClassName="flex-grow"
          config={[
            {
              register: register("code" as Path<TFieldValues>),
              label: "Requisition ID",
              placeholder: "Enter requisition ID",
              type: InputTypes.TEXT,
              required: true,
              errors,
            },
          ]}
        />
        <FormWizard
          fieldWrapperClassName="flex-grow"
          config={[
            {
              control: control as Control,
              label: "Date",
              name: "deliveryDate",
              placeholder: "VED-001",
              type: InputTypes.DATE,
              required: true,
              errors,
            },
          ]}
        />
      </div>
      <FormWizard
        fieldWrapperClassName="flex-grow"
        config={[
          {
            register: register("remarks" as Path<TFieldValues>),
            label: "Remarks",
            className: "h-20",
            placeholder: "Enter remarks",
            type: InputTypes.TEXTAREA,
            errors,
          },
        ]}
      />
      <div className="space-y-4">
        <div className="grid grid-cols-5 gap-1 text-white bg-primary-default border-t-3">
          <div className="col-span-2 p-2">Item Name</div>
          <div className="col-span-1 p-2">Item Code</div>
          <div className="col-span-1 p-2">Stock Quantity</div>
          <div className="col-span-1 p-2">Order Quantity</div>
        </div>
        {fields.map((item, id) => (
          <div key={id + item.id} className="flex items-center">
            <div className="grid grid-cols-5 gap-1">
              <div className="col-span-2">
                <FormWizard
                  className="col-span-2"
                  config={[
                    {
                      control: control as Control,
                      name: `items.${id}.itemId`,
                      label: "",
                      fetchOptions: fetcItems,
                      type: InputTypes.ASYNC_SELECT,
                      onChange: (selected) => handleItemsChange(id, selected),
                      isLoading: isLoading,
                      required: true,
                      errors,
                    },
                  ]}
                />
              </div>
              <FormWizard
                className="col-span-1"
                config={[
                  {
                    register: register(
                      `items.${id}.itemCode` as Path<TFieldValues>,
                    ),
                    label: "",
                    readOnly: true,
                    type: InputTypes.TEXT,
                    errors,
                  },
                ]}
              />
              <FormWizard
                className="col-span-1"
                config={[
                  {
                    register: register(
                      `items.${id}.stockQuantity` as Path<TFieldValues>,
                      {
                        valueAsNumber: true,
                      },
                    ),
                    label: "",
                    readOnly: true,
                    type: InputTypes.NUMBER,
                    errors,
                  },
                ]}
              />
              <div className="flex items-center gap-2">
                <FormWizard
                  className="col-span-1 "
                  config={[
                    {
                      register: register(
                        `items.${id}.orderQuantity` as Path<TFieldValues>,
                        {
                          valueAsNumber: true,
                        },
                      ),
                      label: "",
                      type: InputTypes.NUMBER,
                      required: true,
                      errors,
                    },
                  ]}
                />
                {fields.length > 1 && (
                  <Icon
                    name="Trash"
                    onClick={() => remove(id)}
                    className="cursor-pointer text-red-600 w-fit"
                  />
                )}
                {fields[fields.length - 1]?.id === item.id && (
                  <Icon
                    onClick={() =>
                      append({
                        itemId: {
                          label: "",
                          value: "",
                        },
                        orderQuantity: 0,
                        itemCode: "",
                        stockQuantity: 0,
                      })
                    }
                    className="cursor-pointer text-lg"
                    name="Plus"
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchaseRequisitionForm;
