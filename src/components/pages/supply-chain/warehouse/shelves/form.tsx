import React from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

import { FormWizard } from "@/components/form-inputs";
import { InputTypes, Option } from "@/lib";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;

  rackOptions: Option[];

  defaultValues?: TFieldValues;
}
const WarehouseForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  rackOptions,
  defaultValues,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full">
      <FormWizard
        className="grid w-full grid-cols-2 gap-x-10 space-y-0"
        fieldWrapperClassName="flex-grow"
        config={[
          {
            label: "Rack",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "rackId",
            defaultValue: defaultValues?.rackId,
            required: true,
            placeholder: "Select rack",
            options: rackOptions,
            errors,
          },
          {
            register: register("name" as Path<TFieldValues>),
            label: "Name",
            placeholder: "Enter name",
            type: InputTypes.TEXT,

            required: true,

            errors,
          },
          {
            register: register("code" as Path<TFieldValues>),
            label: "Shelf Code",
            placeholder: "Enter code",
            type: InputTypes.TEXT,
            readOnly: true,
            required: true,
            description: (
              <span className="text-sm text-neutral-500">
                You can’t change the shelf code
              </span>
            ),
            errors,
          },

          {
            label: "Description",
            control: control as Control,
            type: InputTypes.RICHTEXT,
            name: "description",
            required: true,
            autoFocus: true,
            placeholder: "Enter Remarks",
            suggestions: [],
            errors,
          },
        ]}
      />
    </div>
  );
};

export default WarehouseForm;
