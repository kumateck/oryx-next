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
import { StockRequisitionDto } from "./types";
import { FetchOptionsResult } from "@/components/ui/async-select";
import { Icon } from "@/components/ui";

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
  handleProductChange: (index: number, selected: { value: string }) => void;
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
  fields,
  handleProductChange,
  append,
  remove,
  isLoading,
  fetchDepartments,
}: Props<TFieldValues, TContext>) => {
  const stableAppend = useCallback(append, [append]);
  useEffect(() => {
    if (fields.length > 1) return;
    stableAppend({
      itemId: {
        value: "",
        label: "",
      },
      itemCode: "",
      quantity: 0,
    });
  }, [fields.length, stableAppend]);

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
              label: "Delivery Date",
              name: "deliveryDate",
              placeholder: "Select delivery date",
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
            label: "requisitionDate",
            name: "requisitionDate",
            placeholder: "Select requisition date",
            type: InputTypes.DATE,
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
            name: `departmentId`,
            label: "Requested Department",
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
      <div className="flex w-full justify-between mt-10 items-center">
        <div className="grid w-full grid-cols-4 gap-1 text-white bg-primary-default border-t-3">
          <div className="col-span-2 p-2">Item Name</div>
          <div className="col-span-1 p-2">Item Code</div>
          <div className="col-span-1 p-2">Quantity</div>
        </div>
      </div>
      <div className="space-y-2">
        {fields?.map((item, id) => (
          <div key={id + item.id} className="flex items-center gap-2">
            <div className="grid grid-cols-4 gap-1">
              <div className="col-span-2">
                <FormWizard
                  config={[
                    {
                      control: control as Control,
                      name: `items.${id}.itemId`,
                      label: "",
                      fetchOptions: fetchItems,
                      isLoading: isLoading,
                      onChange: (selected) =>
                        handleProductChange(id, selected as { value: string }),
                      type: InputTypes.ASYNC_SELECT,
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
                    required: true,
                    errors,
                  },
                ]}
              />
              <div className="flex col-span-1 items-center gap-2">
                <FormWizard
                  config={[
                    {
                      register: register(
                        `items.${id}.quantity` as Path<TFieldValues>,
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
                          value: "",
                          label: "",
                        },
                        itemCode: "",
                        quantity: 0,
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

export default StockRequisition;
