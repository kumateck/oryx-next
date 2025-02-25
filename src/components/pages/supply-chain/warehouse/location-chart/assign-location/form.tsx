import React from "react";
import {
  ArrayPath,
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
  useFieldArray,
} from "react-hook-form";

import { FormWizard } from "@/components/form-inputs";
import { Button, Icon } from "@/components/ui";
import { InputTypes, Option } from "@/lib";

import { BatchColumns } from "../columns";

interface FormProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  rackOptions: Option[];
  shelfOptions: Option[];
  selectedBatch: BatchColumns | null;
}

// Default location object
const defaultLocation = {
  quantity: 0,
  rackId: "",
  shelfId: "",
  note: "",
};

const AssignLocationForm = <TFieldValues extends FieldValues>({
  control,
  register,
  errors,
  rackOptions,
  shelfOptions,
  selectedBatch,
}: FormProps<TFieldValues>) => {
  // Initialize field array
  const { fields, append, remove } = useFieldArray({
    control,
    name: "locations" as ArrayPath<TFieldValues>,
  });
  return (
    <div>
      <div className="mb-5 flex items-center justify-between p-2">
        <div className="grid grid-cols-3 gap-3 border-b pb-3 text-sm">
          <div>
            <span className="block text-gray-500">Material Name</span>
            <span className="block font-bold">
              {selectedBatch?.materialName || "N/A"}
            </span>
          </div>
          <div>
            <span className="block text-gray-500">Batch Number</span>
            <span className="block font-bold">
              {selectedBatch?.batchNumber || "N/A"}
            </span>
          </div>
          <div>
            <span className="block text-gray-500">Remaining Quantity</span>
            <span className="block font-bold">
              {selectedBatch?.totalQuantity || "N/A"}
            </span>
          </div>
        </div>
        <div>
          <Button
            type="button"
            variant={"ghost"}
            className="bg-neutral-dark text-white"
            onClick={() => append(defaultLocation as any)}
          >
            <Icon name="Plus" />
            <span> Add</span>
          </Button>
        </div>
      </div>
      <div>
        <FormWizard
          className="grid w-full grid-cols-3 gap-4 space-y-0"
          fieldWrapperClassName="flex-grow"
          config={[
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
            //   label: "UOM",
            //   type: InputTypes.LABEL,
            //   title: renderUOM(productOptions, index),
            //   className:
            //   "border border-neutral-input rounded-md px-2 py-1 text-sm font-semibold text-neutral-secondary",

            // },
            {
              label: "Rack",
              control: control as Control,
              type: InputTypes.SELECT,
              name: "rackId",
              required: true,
              placeholder: "G32",
              options: rackOptions,
              errors,
            },
            {
              label: "Shelf",
              control: control as Control,
              type: InputTypes.SELECT,
              name: "shelfId",
              required: true,
              placeholder: "A",
              options: shelfOptions,
              errors,
            },
          ]}
        />

        <FormWizard
          className="w-full gap-4 space-y-0"
          fieldWrapperClassName="flex-grow"
          config={[
            {
              label: "Note",
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

      <div className="mt-4 space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="relative rounded-lg border p-4">
            <Icon
              name="CircleMinus"
              className="text-danger-500 absolute right-2 top-2 h-5 w-5 cursor-pointer"
              onClick={() => remove(index)}
            />

            <FormWizard
              className="grid w-full grid-cols-3 gap-4 space-y-0"
              fieldWrapperClassName="flex-grow"
              config={[
                {
                  register: register(
                    `locations.${index}.quantity` as Path<TFieldValues>,
                    {
                      valueAsNumber: true,
                    },
                  ),
                  label: "Quantity to Assign",
                  type: InputTypes.NUMBER,
                  required: true,
                  placeholder: "500",
                  errors,
                },
                {
                  label: "Rack",
                  control: control as Control,
                  type: InputTypes.SELECT,
                  name: `locations.${index}.rackId` as Path<TFieldValues>,
                  required: true,
                  placeholder: "G32",
                  options: rackOptions,
                  errors,
                },
                {
                  label: "Shelf",
                  control: control as Control,
                  type: InputTypes.SELECT,
                  name: `locations.${index}.shelfId` as Path<TFieldValues>,
                  required: true,
                  placeholder: "A",
                  options: rackOptions,
                  errors,
                },
              ]}
            />

            <FormWizard
              className="mt-4 w-full gap-4 space-y-0"
              fieldWrapperClassName="flex-grow"
              config={[
                {
                  label: "Note",
                  control: control as Control,
                  type: InputTypes.RICHTEXT,
                  name: `locations.${index}.note` as Path<TFieldValues>,
                  required: true,
                  autoFocus: false,
                  placeholder: "Enter Remarks",
                  suggestions: [],
                  errors,
                },
              ]}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignLocationForm;
