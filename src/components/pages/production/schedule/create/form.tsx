import React from "react";
import {
  Control,
  FieldArrayWithId,
  FieldErrors,
  FieldValues,
  Path,
  UseFieldArrayAppend,
  UseFieldArrayRemove, // Path,
  UseFormRegister,
} from "react-hook-form";

import { FormWizard } from "@/components/form-inputs";
import {
  Button,
  Card,
  CardContent,
  FetchOptionsResult,
  Icon,
} from "@/components/ui";
import { InputTypes, Option, batchSizeTypeOptions } from "@/lib";

import { ProductRequestDto } from "./type";

export interface OptionsUpdate extends Option {
  uom: string;
}
interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  // productOptions: OptionsUpdate[];
  defaultValues?: TFieldValues;
  fields: FieldArrayWithId<TFieldValues>[];
  remove: UseFieldArrayRemove;
  append: UseFieldArrayAppend<TFieldValues>;
  associateProducts: ProductRequestDto[];
  isLoading: boolean;
  fetchOptions: (search: string, page: number) => Promise<FetchOptionsResult>;
}
const defaultAssociated: ProductRequestDto = {
  productId: { label: "", value: "" },
  sizeType: { label: "", value: "" },

  // quantity: 0,
  // uom: "",
};
const ScheduleForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  defaultValues,
  fields,
  append,
  remove,
  // productOptions,
  // associateProducts,
  isLoading,
  fetchOptions,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full">
      <Card className="p-5">
        <CardContent>
          <div className="grid w-full grid-cols-2 gap-6 space-y-0">
            <div>
              <FormWizard
                config={[
                  {
                    register: register("code" as Path<TFieldValues>),
                    label: "Schedule Code",
                    readOnly: true,
                    required: true,
                    description: (
                      <span className="text-sm text-neutral-500">
                        You can’t change the schedule code
                      </span>
                    ),
                    placeholder: "Code will be generated",
                    type: InputTypes.TEXT,
                    errors,
                  },
                  {
                    type: InputTypes.SPACE,
                  },
                  {
                    label: "Start Date",
                    control: control as Control,
                    type: InputTypes.DATE,
                    name: "scheduledStartTime",
                    required: true,
                    disabled: {
                      before: new Date(),
                      after: new Date(2027, 0, 1),
                    },
                    errors,
                  },
                  {
                    label: "End Date",
                    control: control as Control,
                    type: InputTypes.DATE,
                    name: "scheduledEndTime",
                    required: true,
                    errors,
                  },
                ]}
              />
            </div>
            <div>
              <FormWizard
                config={[
                  {
                    label: "Remarks",
                    control: control as Control,
                    type: InputTypes.RICHTEXT,
                    name: "remarks",
                    autoFocus: false,
                    placeholder: "Enter remarks for schedule",
                    suggestions: [],
                    errors,
                  },
                ]}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-between px-2 py-5">
        <span className="font-medium">Add Product to schedule</span>
        <Button
          type="button"
          variant={"ghost"}
          className="bg-neutral-dark text-white"
          onClick={() => append({ ...defaultAssociated } as any)}
        >
          <Icon name="Plus" />
          <span> Add</span>
        </Button>
      </div>

      <div className="max-h-[500px] min-h-[400px] w-full space-y-4 overflow-y-auto">
        {fields.map((field, index) => {
          return (
            <div key={field.id} className="relative">
              <div className="absolute right-2 top-2">
                <Icon
                  onClick={() => remove(index)}
                  name="CircleMinus"
                  className="text-danger-500 h-5 w-5 hover:cursor-pointer"
                />
              </div>
              <Card>
                <CardContent className="py-5">
                  <FormWizard
                    className="grid w-full grid-cols-3 gap-4 space-y-0"
                    fieldWrapperClassName="flex-grow"
                    config={[
                      {
                        label: "Product",
                        control: control as Control,
                        type: InputTypes.ASYNC_SELECT,
                        name: `products.${index}.productId`,
                        required: true,
                        defaultValue: defaultValues?.department,
                        placeholder: "Select Product",
                        fetchOptions: fetchOptions,
                        isLoading: isLoading,
                        errors,
                      },
                      // {
                      //   label: "Product",
                      //   control: control as Control,
                      //   type: InputTypes.SELECT,
                      //   name: `products.${index}.productId`,
                      //   required: true,
                      //   placeholder: "Product",
                      //   defaultValue: defaultValues?.products[index]?.productId,
                      //   options: productOptions?.filter(
                      //     (item2) =>
                      //       !associateProducts?.some(
                      //         (item1) => item1.productId.value === item2.value,
                      //       ),
                      //   ),
                      //   errors,
                      // },
                      {
                        label: "Batch Size Type",
                        control: control as Control,
                        type: InputTypes.SELECT,
                        name: `products.${index}.sizeType`,
                        required: true,
                        placeholder: "Size Type",
                        defaultValue: defaultValues?.products[index]?.sizeType,
                        options: batchSizeTypeOptions,
                        errors,
                      },
                      // {
                      //   label: "Quantity",
                      //   register: register(
                      //     `products.${index}.quantity` as Path<TFieldValues>,
                      //     {
                      //       valueAsNumber: true,
                      //     },
                      //   ),
                      //   type: InputTypes.NUMBER,
                      //   required: true,
                      //   placeholder: "Quantity",
                      //   errors,
                      // },
                      // {
                      //   label: "UOM",
                      //   type: InputTypes.LABEL,
                      //   title: renderUOM(productOptions, index),
                      //   className:
                      //     "border border-neutral-input rounded-md px-2 py-1 text-sm font-semibold text-neutral-secondary",
                      // },
                    ]}
                  />
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScheduleForm;
