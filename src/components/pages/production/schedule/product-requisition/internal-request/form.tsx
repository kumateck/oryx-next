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
import { Button, Icon } from "@/components/ui";
import { InputTypes, Option } from "@/lib";

const defaultSource = {
  quantity: 0,
  department: [{ label: "", value: "" }],
};
interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  departmentOptions: Option[];
  defaultValues?: TFieldValues;
  fields: FieldArrayWithId<TFieldValues>[];
  remove: UseFieldArrayRemove;
  append: UseFieldArrayAppend<TFieldValues>;
  typeValues: Option[];
}
const TransferForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  fields,
  append,
  remove,
  departmentOptions,
  typeValues,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full">
      <div className="flex justify-between px-2 py-5">
        <span className="font-medium">Transfer Source </span>
        <Button type="button" onClick={() => append(defaultSource as any)}>
          Add
        </Button>
      </div>
      <div className="max-h-[500px] min-h-[400px] w-full space-y-4 overflow-y-auto">
        {fields.map((field, index) => {
          return (
            <div key={field.id} className="relative rounded-md border p-2">
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
                      label: "Department",
                      control: control as Control,
                      type: InputTypes.SELECT,
                      name: `source.${index}.department`,
                      required: true,
                      placeholder: "Select Department",
                      options: departmentOptions?.filter(
                        (item2) =>
                          !typeValues?.some(
                            (item1) => item1.value === item2.value,
                          ),
                      ),
                      errors,
                    },
                    {
                      register: register("quantity" as Path<TFieldValues>, {
                        valueAsNumber: true,
                      }),
                      label: "Quantity to Assign",
                      type: InputTypes.NUMBER,
                      required: true,
                      placeholder: "500",
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
