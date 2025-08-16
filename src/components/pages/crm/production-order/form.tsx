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
import { CreateProductionSchemaOrders } from "./types";
import { FormWizard } from "@/components/form-inputs";
import { InputTypes } from "@/lib";
import { Button, FetchOptionsResult, Icon } from "@/components/ui";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  fetchProducts: (search: string, page: number) => Promise<FetchOptionsResult>;
  fetchCustomers: (search: string, page: number) => Promise<FetchOptionsResult>;
  append: UseFieldArrayAppend<CreateProductionSchemaOrders>;
  fields: FieldArrayWithId<CreateProductionSchemaOrders[]>[];
  remove: UseFieldArrayRemove;
  handleProductChange: (index: number, selected: string) => void;
  loadingProducts: boolean;
  loadingCustomers: boolean;
  isLoadingCode: boolean;
}
export const Form = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  loadingProducts,
  loadingCustomers,
  fetchCustomers,
  handleProductChange,
  isLoadingCode,
  fetchProducts,
  append,
  remove,
  fields,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="space-y-4 w-full">
      <FormWizard
        config={[
          {
            name: "customerId",
            control: control as Control,
            label: "Customer",
            placeholder: "Select Customer",
            isLoading: loadingCustomers,
            type: InputTypes.ASYNC_SELECT,
            fetchOptions: fetchCustomers,
            errors,
          },
          {
            label: "Code",
            register: register("code" as Path<TFieldValues>),
            placeholder: isLoadingCode ? "Generating" : "Enter order code",
            type: InputTypes.TEXT,
            errors,
          },
        ]}
      />

      <div className="justify-items-end flex w-full">
        <Button
          onClick={() => {
            append({
              totalOrderQuantity: 0,
              productId: {
                label: "",
                value: "",
              },
              volumePerPiece: 0,
              price: 0,
            });
          }}
          className="flex ml-auto items-center gap-1"
          type="button"
          variant={"outline"}
        >
          <Icon name="Plus" />
          <span>Add</span>
        </Button>
      </div>
      <div>
        {fields.map((field, index) => (
          <div key={field.id} className="relative flex">
            <div className="flex items-center gap-2 mb-2 justify-center mr-10">
              <FormWizard
                config={[
                  {
                    name: `products.${index}.productId`,
                    control: control as Control,
                    label: "Product",
                    onChange: (value) => {
                      handleProductChange(index, value.value);
                    },
                    placeholder: "Select Product",
                    isLoading: loadingProducts,
                    type: InputTypes.ASYNC_SELECT,
                    fetchOptions: fetchProducts,
                    errors,
                  },
                ]}
              />
              <FormWizard
                config={[
                  {
                    register: register(
                      `products.${index}.totalOrderQuantity` as Path<TFieldValues>,
                      { valueAsNumber: true },
                    ),
                    required: true,
                    label: "Order Quantity",
                    type: InputTypes.NUMBER,
                    errors,
                  },
                ]}
              />
              <FormWizard
                config={[
                  {
                    register: register(
                      `products.${index}.volumePerPiece` as Path<TFieldValues>,
                      {
                        valueAsNumber: true,
                      },
                    ),
                    label: "Volume Per Piece",
                    required: true,
                    type: InputTypes.NUMBER,
                    errors,
                  },
                ]}
              />
              <FormWizard
                config={[
                  {
                    register: register(
                      `products.${index}.price` as Path<TFieldValues>,
                      {
                        valueAsNumber: true,
                      },
                    ),
                    readOnly: true,
                    label: "Product Price",
                    type: InputTypes.NUMBER,
                    errors,
                  },
                ]}
              />
            </div>
            <div className="flex items-center absolute right-0 top-6 justify-center">
              <Icon
                name="Trash2"
                className="cursor-pointer size-5 ml-auto text-red-500"
                onClick={() => remove(index)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Form;
