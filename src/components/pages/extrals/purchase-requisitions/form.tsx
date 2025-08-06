import React from "react";
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
import { Button, FetchOptionsResult, Icon } from "@/components/ui";
import { VendorRequestDto } from "./types";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  fetcItems: (search: string, page: number) => Promise<FetchOptionsResult>;
  isLoading: boolean;
  append: UseFieldArrayAppend<VendorRequestDto>;
  fields: FieldArrayWithId<VendorRequestDto[]>[];
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
  fields,
}: Props<TFieldValues, TContext>) => {
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
              label: "Code",
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
            control: control as Control,
            name: "justification",
            label: "Justification",
            className: "h-20",
            suggestions: [],
            placeholder: "Enter justification",
            type: InputTypes.RICHTEXT,
            required: true,
            errors,
          },
        ]}
      />
      <div className="flex w-full justify-between items-center">
        <h1>Items</h1>
        <Button
          type="button"
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
          className="flex items-center justify-center gap-2 w-fit"
        >
          <Icon name="Plus" />
          <span>Add Item</span>
        </Button>
      </div>
      <div className="space-y-4">
        {fields.map((item, id) => (
          <div key={id + item.id} className="flex items-center gap-2">
            <div className="flex items-center justify-center gap-2 flex-1">
              <FormWizard
                config={[
                  {
                    control: control as Control,
                    name: `items.${id}.itemId`,
                    label: "Item Name",
                    fetchOptions: fetcItems,
                    type: InputTypes.ASYNC_SELECT,
                    isLoading: isLoading,
                    required: true,
                    errors,
                  },
                ]}
              />
              <FormWizard
                config={[
                  {
                    register: register(
                      `items.${id}.itemCode` as Path<TFieldValues>,
                    ),
                    label: "Item Code",
                    readOnly: true,
                    type: InputTypes.TEXT,
                    required: true,
                    errors,
                  },
                ]}
              />
              <FormWizard
                config={[
                  {
                    register: register(
                      `items.${id}.stockQuantity` as Path<TFieldValues>,
                    ),
                    label: "Stock Quantity",
                    readOnly: true,
                    type: InputTypes.NUMBER,
                    required: true,
                    errors,
                  },
                ]}
              />
              <FormWizard
                config={[
                  {
                    register: register(
                      `items.${id}.orderQuantity` as Path<TFieldValues>,
                    ),
                    label: "Order Quantity",
                    type: InputTypes.NUMBER,
                    required: true,
                    errors,
                  },
                ]}
              />
            </div>
            <Icon
              name="Trash"
              onClick={() => remove(id)}
              className="cursor-pointer text-red-600 w-fit"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchaseRequisitionForm;
