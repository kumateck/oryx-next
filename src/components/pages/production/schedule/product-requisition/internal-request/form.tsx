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
import { ManufacturerMap } from "@/components/pages/supply-chain/procurement/vendors/create";
import { Button, Icon } from "@/components/ui";
import { InputTypes, Option } from "@/lib";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  defaultValues?: TFieldValues;
  fields: FieldArrayWithId<TFieldValues>[];
  remove: UseFieldArrayRemove;
  append: UseFieldArrayAppend<TFieldValues>;
  loading?: boolean;
  departmentOptionsMap: ManufacturerMap;
  typeValues: string[];
}
const TransferForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  fields,
  append,
  remove,
  typeValues,
  loading,
  departmentOptionsMap,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full">
      <div className="flex justify-between px-2 py-5">
        <span className="font-medium">Transfer Source </span>
        <Button
          type="button"
          onClick={() =>
            append({
              id: new Date().toISOString(),
              quantity: 0,
              department: { label: "", value: "" },
            } as any)
          }
        >
          Add
        </Button>
      </div>
      <div className="max-h-[500px] min-h-[400px] w-full space-y-4 overflow-y-auto">
        <FormWizard
          config={[
            {
              register: register("code" as Path<TFieldValues>),
              label: "Stock Transfer Code",
              // readOnly: true,
              required: true,
              suffix: loading ? "LoaderCircle" : "Check",
              suffixClass: loading ? "animate-spin" : "text-green-500",
              description: (
                <span className="text-sm text-neutral-500">
                  You can’t change the ST code
                </span>
              ),
              placeholder: "Code will be generated",
              type: InputTypes.TEXT,
              errors,
            },
          ]}
        />
        {fields.map((field, index) => {
          const listId = typeValues[index];
          const currentDepartmentOptions = departmentOptionsMap[listId] || []; // Get the options for the selected material

          return (
            <div key={field.id} className="relative rounded-2xl border p-2">
              <div className="absolute right-2 top-2">
                <Icon
                  onClick={() => remove(index)}
                  name="CircleMinus"
                  className="text-danger-500 h-5 w-5 hover:cursor-pointer"
                />
              </div>

              <div className="flex w-full gap-2">
                <FormWizard
                  className="grid w-full grid-cols-2 gap-4 space-y-0"
                  fieldWrapperClassName="flex-grow"
                  config={[
                    {
                      register: register(
                        `sources.${index}.quantity` as Path<TFieldValues>,
                        {
                          valueAsNumber: true,
                        },
                      ),
                      label: "Quantity to Request",
                      type: InputTypes.NUMBER,
                      required: true,
                      placeholder: "Enter Quantity",
                      errors,
                    },
                    {
                      label: "Department",
                      control: control as Control,
                      type: InputTypes.SELECT,
                      name: `sources.${index}.department`,
                      required: true,
                      placeholder: "Select Department",
                      // options: departmentOptions?.filter(
                      //   (item2) =>
                      //     !typeValues?.some(
                      //       (item1) => item1.value === item2.value,
                      //     ),
                      // ),
                      options: currentDepartmentOptions as unknown as Option[],
                      errors,
                    },

                    // {
                    //   label: "Manufacturer",
                    //   control: control as Control,
                    //   type: InputTypes.MULTI,
                    //   name: `associatedManufacturers.${index}.manufacturer`,
                    //   required: true,
                    //   placeholder: "Manufacturer",
                    //   options: currentDepartmentOptions, // Dynamically loaded options
                    //   errors,
                    // },
                  ]}
                />
              </div>
            </div>
          );
        })}
        <FormWizard
          className="w-full gap-4 space-y-0"
          fieldWrapperClassName="flex-grow"
          config={[
            {
              label: "Justification",
              control: control as Control<FieldValues>,
              type: InputTypes.RICHTEXT,
              name: "note",
              required: true,
              autoFocus: false,
              placeholder: "Enter Remarks",
              suggestions: [],
              errors,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default TransferForm;
