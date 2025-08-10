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
import { StockRequisitionDto } from "./types";
import { FetchOptionsResult } from "@/components/ui/async-select";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  fetchItems: (search: string, page: number) => Promise<FetchOptionsResult>;
  fetchDepartments: (
    search: string,
    page: number,
  ) => Promise<FetchOptionsResult>;
  isLoading: boolean;
  loadingDepartments: boolean;
  append: UseFieldArrayAppend<StockRequisitionDto>;
  fields: FieldArrayWithId<StockRequisitionDto>[];
  remove: UseFieldArrayRemove;
}
const StockRequisition = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  loadingDepartments,
  fetchItems,
  isLoading,
  fetchDepartments,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full space-y-4">
      <div className="flex gap-2 w-full items-center justify-center">
        <FormWizard
          fieldWrapperClassName="flex-grow"
          config={[
            {
              register: register("number" as Path<TFieldValues>),
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
              label: "Requisition Date",
              name: "requisitionDate",
              placeholder: "Select requisition date",
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
            name: `departmentId`,
            label: "Department Name",
            fetchOptions: fetchDepartments,
            isLoading: loadingDepartments,
            type: InputTypes.ASYNC_SELECT,
            required: true,
            errors,
          },
        ]}
      />
      <FormWizard
        fieldWrapperClassName="flex-grow"
        config={[
          {
            register: register("justification" as Path<TFieldValues>),
            label: "Justification",
            className: "h-20",
            placeholder: "Enter justification",
            type: InputTypes.TEXTAREA,
            required: true,
            errors,
          },
        ]}
      />
      <FormWizard
        config={[
          {
            control: control as Control,
            name: `items`,
            label: "Item Name",
            fetchOptions: fetchItems,
            isLoading: isLoading,
            type: InputTypes.ASYNC_MULTI,
            required: true,
            errors,
          },
        ]}
      />
      {/* <div className="flex w-full justify-between items-center">
        <h1>Items</h1>
        <Button
          variant={"ghost"}
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
          className="flex items-center justify-center gap-1 w-fit"
        >
          <Icon name="Plus" />
          <span className="text-sm">Add Item</span>
        </Button>
      </div>
      <div className="space-y-4">
        {fields?.map((item, id) => (
          <div key={id + item.id} className="flex items-center gap-2">
            <div className="flex items-center justify-center gap-2 flex-1">
              <FormWizard
                config={[
                  {
                    control: control as Control,
                    name: `items.${id}.itemId`,
                    label: "Item Name",
                    fetchOptions: fetchItems,
                    isLoading: isLoading,
                    type: InputTypes.ASYNC_SELECT,
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
                      {
                        valueAsNumber: true,
                      },
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
                      {
                        valueAsNumber: true,
                      },
                    ),
                    label: "Request Quantity",
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
              className="cursor-pointer h-5 text-red-600 w-4"
            />
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default StockRequisition;
