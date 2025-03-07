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
import {
  InputTypes,
  Option,
  OptionMap,
  Units,
  convertToLargestUnit,
} from "@/lib";
import { MaterialBatchDto } from "@/lib/redux/api/openapi.generated";

interface FormProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  rackOptions: Option[];
  // shelfOptions: Option[];
  selectedBatch: MaterialBatchDto | null;
  shelfOptionsMap: OptionMap;
  typeValues: Option[];
}

const defaultLocation = {
  quantity: 0,
  shelfId: { value: "", label: "" },
  note: "",
};

const AssignLocationForm = <TFieldValues extends FieldValues>({
  control,
  register,
  errors,
  rackOptions,
  // shelfOptions,
  selectedBatch,
  shelfOptionsMap,
  typeValues,
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
              {selectedBatch?.checklist?.material?.name || "N/A"}
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
              {convertToLargestUnit(
                selectedBatch?.quantityUnassigned as number,
                selectedBatch?.uoM?.symbol as Units,
              ).value +
                "" +
                convertToLargestUnit(
                  selectedBatch?.quantityUnassigned as number,
                  selectedBatch?.uoM?.symbol as Units,
                ).unit || "N/A"}
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

      <div className="mt-4 space-y-4">
        {fields.map((field, index) => {
          const type = typeValues[index];
          const currentShelfOptions = shelfOptionsMap[type?.value] || [];
          return (
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
                    placeholder: "Select Rack",
                    options: rackOptions,
                    errors,
                  },
                  {
                    label: "Shelf",
                    control: control as Control,
                    type: InputTypes.SELECT,
                    name: `locations.${index}.shelfId` as Path<TFieldValues>,
                    required: true,
                    placeholder: "Select Shelf",
                    options: currentShelfOptions,
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
          );
        })}
      </div>
    </div>
  );
};

export default AssignLocationForm;
