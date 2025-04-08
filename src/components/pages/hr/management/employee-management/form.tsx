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
import { Button, FetchOptionsResult, Icon } from "@/components/ui";
import { InputTypes, Option } from "@/lib";

import { EmployeeItemDto } from "./types";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  fields: FieldArrayWithId<TFieldValues>[];
  remove: UseFieldArrayRemove;
  append: UseFieldArrayAppend<TFieldValues>;
  isLoading: boolean;
  fetchOptions: (search: string, page: number) => Promise<FetchOptionsResult>;
  defaultValues?: TFieldValues;
  employmeeTypeOptions: Option[];
}

const defaultAssociated: EmployeeItemDto = {
  employeeType: {
    label: "",
    value: "",
  },
  email: "",
};

const RackForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  fields,
  remove,
  append,
  defaultValues,
  employmeeTypeOptions,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full">
      <div className="flex justify-between py-5">
        <span className="text-xl font-medium">Register Employee</span>
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
      {fields.map((field, index) => {
        return (
          <div key={field.id} className="relative">
            <div className="absolute -top-0.5 right-2">
              <Icon
                onClick={() => remove(index)}
                name="CircleMinus"
                className="text-danger-500 h-5 w-5 hover:cursor-pointer"
              />
            </div>

            <FormWizard
              className="grid w-full grid-cols-2 gap-4 space-y-0"
              fieldWrapperClassName="flex-grow"
              config={[
                {
                  label: "Employee Type",
                  control: control as Control,
                  type: InputTypes.SELECT,
                  name: `products.${index}.sizeType`,
                  required: true,
                  placeholder: "Select Employee Type",
                  defaultValue: defaultValues?.products[index]?.sizeType,
                  options: employmeeTypeOptions,
                  errors,
                },
                {
                  register: register(
                    `employees.${index}.email` as Path<TFieldValues>,
                  ),
                  label: "Email",
                  type: InputTypes.TEXT,
                  placeholder: "Enter the employee's email",
                  required: true,
                  errors,
                },
              ]}
            />
          </div>
        );
      })}
    </div>
  );
};

export default RackForm;
