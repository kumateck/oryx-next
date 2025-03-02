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

import { ManufacturerMap } from "./create";

const defaultAssociated = {
  material: { label: "", value: "" },
  manufacturer: [{ label: "", value: "" }],
};
interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  countryOptions: Option[];
  currencyOptions: Option[];
  materialOptions: Option[];
  manufacturerOptionsMap: ManufacturerMap;
  defaultValues?: TFieldValues;
  fields: FieldArrayWithId<TFieldValues>[];
  remove: UseFieldArrayRemove;
  append: UseFieldArrayAppend<TFieldValues>;
  typeValues: Option[];
}
const VendorForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  countryOptions,
  currencyOptions,
  defaultValues,
  fields,
  append,
  remove,
  materialOptions,
  manufacturerOptionsMap,
  typeValues,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full">
      <FormWizard
        className="grid w-full grid-cols-2 gap-x-10 gap-y-3 space-y-0"
        fieldWrapperClassName="flex-grow"
        config={[
          {
            register: register("name" as Path<TFieldValues>),
            label: "Name",
            placeholder: "Enter name",

            type: InputTypes.TEXT,

            required: true,

            errors,
          },
          {
            register: register("contactPerson" as Path<TFieldValues>),
            label: "Contact Person",
            placeholder: "Enter contact person",

            type: InputTypes.TEXT,

            required: true,

            errors,
          },
          {
            register: register("email" as Path<TFieldValues>),
            label: "Email",
            placeholder: "Enter email",

            type: InputTypes.EMAIL,

            required: true,

            errors,
          },
          {
            register: register("contactNumber" as Path<TFieldValues>),
            label: "Contact Number",
            placeholder: "Enter telephone",

            type: InputTypes.TEXT,

            required: true,

            errors,
          },
          {
            label: "Country",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "country",
            defaultValue: defaultValues?.country,
            required: true,
            onModal: true,
            placeholder: "Select country",
            options: countryOptions,
            errors,
          },
          {
            label: "Currency",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "currency",
            defaultValue: defaultValues?.currency,
            required: true,
            onModal: true,
            placeholder: "Select currency",
            options: currencyOptions,
            errors,
          },

          {
            register: register("address" as Path<TFieldValues>),
            label: "Address",
            placeholder: "Enter address",
            type: InputTypes.TEXT,
            errors,
          },
        ]}
      />
      <div className="flex justify-between px-2 py-5">
        <span className="font-medium">Associated Manufacturers</span>
        <Button
          type="button"
          onClick={() => append({ ...defaultAssociated } as any)}
        >
          Add
        </Button>
      </div>
      <div className="max-h-[500px] min-h-[400px] w-full space-y-4 overflow-y-auto">
        {fields.map((field, index) => {
          const type = typeValues[index];
          const currentManufacturerOptions =
            manufacturerOptionsMap[type?.value] || []; // Get the options for the selected material
          const defaultMaterial =
            defaultValues?.associatedManufacturers[index]?.material;

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
                      label: "Material",
                      control: control as Control,
                      type: InputTypes.SELECT,
                      name: `associatedManufacturers.${index}.material`,
                      required: true,
                      defaultValue: defaultMaterial,
                      placeholder: "Material",
                      options: materialOptions?.filter(
                        (item2) =>
                          !typeValues?.some(
                            (item1) => item1.value === item2.value,
                          ),
                      ),
                      errors,
                    },
                    {
                      label: "Manufacturer",
                      control: control as Control,
                      type: InputTypes.MULTI,
                      name: `associatedManufacturers.${index}.manufacturer`,
                      required: true,
                      placeholder: "Manufacturer",
                      options: currentManufacturerOptions, // Dynamically loaded options
                      errors,
                    },
                  ]}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VendorForm;
