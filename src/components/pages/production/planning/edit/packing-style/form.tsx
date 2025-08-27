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
import { InputTypes, Option } from "@/lib";
import ScrollableWrapper from "@/shared/scroll-wrapper";
import { Button, Icon } from "@/components/ui";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  uomOptions: Option[];
  defaultValues?: TFieldValues;
  fields: FieldArrayWithId<TFieldValues>[];
  remove: UseFieldArrayRemove;
  append: UseFieldArrayAppend<TFieldValues>;
}
const PackingStyleForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  append,
  fields,
  remove,
  uomOptions,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full">
      <FormWizard
        className="grid w-full grid-cols-2 gap-6 space-y-0"
        fieldWrapperClassName="flex-grow"
        config={[
          {
            register: register("name" as Path<TFieldValues>),
            label: "Label",
            placeholder: "Enter label",
            type: InputTypes.TEXT,
            required: true,
            autoFocus: true,
            errors,
          },
          {
            register: register("description" as Path<TFieldValues>),
            label: "Description",
            placeholder: "Enter description",
            type: InputTypes.TEXT,
            required: true,

            errors,
          },
        ]}
      />
      <div className="justify-end flex w-full">
        <Button
          onClick={() => {
            append({
              uomId: {
                label: "",
                value: "",
              },
              quantity: 0,
            } as TFieldValues[keyof TFieldValues]);
          }}
          className="flex items-center gap-1"
          type="button"
          variant={"outline"}
        >
          <Icon name="Plus" />
          <span>Add</span>
        </Button>
      </div>
      <ScrollableWrapper>
        {fields?.map((field, index) => {
          return (
            <div
              className="w-full justify-between space-y-10 flex gap-0.5 items-center"
              key={field.id}
            >
              <div className="w-full ">
                <FormWizard
                  className="grid grid-cols-2 gap-x-5 space-y-0 w-full"
                  fieldWrapperClassName="flex-grow "
                  config={[
                    {
                      label: "Unit of Measurement",
                      control: control as Control,
                      type: InputTypes.SELECT,
                      name: `packingLists.${index}.uomId`,
                      required: true,
                      onModal: true,
                      placeholder: "Select Unit",
                      options: uomOptions,
                      errors,
                    },
                    {
                      register: register(
                        `packingLists.${index}.quantity` as Path<TFieldValues>,
                        {
                          valueAsNumber: true,
                        },
                      ),
                      label: "Unit Quantity",
                      placeholder: "Enter qty",
                      type: InputTypes.NUMBER,
                      required: true,
                      errors,
                    },
                  ]}
                />
              </div>
              <div className="">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => remove(index)}
                  className="rounded-full size-8"
                >
                  <Icon name="Trash2" className="text-danger-default " />
                </Button>
              </div>
            </div>
          );
        })}
      </ScrollableWrapper>
    </div>
  );
};

export default PackingStyleForm;
