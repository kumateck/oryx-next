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
}
export const Form = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  loadingProducts,
  loadingCustomers,
  fetchCustomers,
  handleProductChange,
  fetchProducts,
  append,
  remove,
  fields,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="space-y-4">
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
        ]}
      />

      <div className="ml-auto flex w-full">
        <Button
          onClick={() => {
            append({
              price: 0,
              productId: {
                label: "",
                value: "",
              },
              quantity: 0,
            });
          }}
          className="flex items-center gap-1"
          type="button"
          variant={"outline"}
        >
          <Icon name="Plus" />
          <span>Add</span>
        </Button>
      </div>
      <div>
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex items-center gap-2 mb-2 justify-center"
          >
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
                    `products.${index}.quantity` as Path<TFieldValues>,
                    { valueAsNumber: true },
                  ),
                  label: "Quantity",
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
                  label: "Price",
                  type: InputTypes.NUMBER,
                  errors,
                },
              ]}
            />
            <Icon
              name="Trash2"
              className="cursor-pointer size-14 ml-auto text-red-500"
              onClick={() => remove(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Form;
