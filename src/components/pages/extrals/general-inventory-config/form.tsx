import { FormWizard } from "@/components/form-inputs";
import { Button, Card, CardContent, CardHeader, Icon } from "@/components/ui";
import { InputTypes, InventoryClassificationEnum, Option } from "@/lib";
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
import { CreateDepartmentDto, CreateInventoryDto } from "./types";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  remove: UseFieldArrayRemove;
  departmentOptions: Option[];
  unitOfMeasureOptions: Option[];
  isLoadingCode?: boolean;
  append: UseFieldArrayAppend<CreateInventoryDto>;
  fields: FieldArrayWithId<CreateDepartmentDto[]>[];
}
const InventoryForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  remove,
  append,
  isLoadingCode = false,
  fields,
  errors,
  departmentOptions,
  unitOfMeasureOptions,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="font-semibold">
          Create General Configuration
        </CardHeader>
        <CardContent>
          <div className="flex justify-start w-full gap-4">
            <FormWizard
              className=""
              config={[
                {
                  label: "Item Name",
                  type: InputTypes.TEXT,
                  placeholder: "Item Name",
                  register: register("materialName" as Path<TFieldValues>),
                  required: true,
                  errors,
                },
                {
                  label: "Item Code",
                  type: InputTypes.TEXT,
                  placeholder: isLoadingCode ? "Generating..." : "Item code",
                  readOnly: true,
                  register: register("code" as Path<TFieldValues>),
                  description: isLoadingCode
                    ? "Generating..."
                    : "Unique code for the item",
                  required: true,
                  errors,
                },

                {
                  label: "Unit of Measure",
                  type: InputTypes.SELECT,
                  placeholder: "Unit of Measure",
                  name: "unitOfMeasureId",
                  required: true,
                  control: control as Control,
                  options: unitOfMeasureOptions,
                  errors,
                },
              ]}
            />
            <div className="w-full">
              <FormWizard
                className=""
                config={[
                  {
                    label: "Item Type",
                    type: InputTypes.SELECT,
                    placeholder: "Item Type",
                    name: "inventoryTypeId",
                    required: true,
                    control: control as Control,
                    options: [],
                    errors,
                  },
                  {
                    label: "Classification",
                    type: InputTypes.SELECT,
                    placeholder: "Classification",
                    name: "classification",
                    required: true,
                    control: control as Control,
                    options: Object.entries(InventoryClassificationEnum)
                      .filter(([key]) => isNaN(Number(key)))
                      .map(([key, value]) => ({
                        label: key,
                        value: String(value),
                      })),
                    errors,
                  },
                ]}
              />
              <div className="mt-10">
                <label htmlFor="isActive">Active</label>
                <FormWizard
                  className="w-full"
                  config={[
                    {
                      label: "Active",
                      type: InputTypes.SWITCH,
                      placeholder: "active",
                      control: control as Control,
                      required: true,
                      name: "isActive",
                      errors,
                    },
                  ]}
                />
              </div>
            </div>
          </div>
          <FormWizard
            className="w-full mt-6"
            config={[
              {
                label: "Description",
                type: InputTypes.TEXTAREA,
                placeholder: "Enter Description",
                register: register("description" as Path<TFieldValues>),
                rows: 4,
                required: true,
                errors,
              },
            ]}
          />
        </CardContent>
      </Card>

      <div className="flex justify-between items-center mt-4">
        <h1>Department Assignment</h1>
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            append({
              departmentId: { value: "", label: "" },
              initialStockQuantity: 0,
              minimumLevel: 0,
              maximumLevel: 0,
              reorderLevel: 0,
            } as CreateDepartmentDto)
          }
        >
          <Icon name="Plus" className="h-4 w-4 mr-2" /> Add
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields?.map((field, index) => (
          <Card key={field.id}>
            <div key={field.id} className="p-4 rounded-md relative space-y-3">
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="absolute top-2 right-2 text-red-500"
                onClick={() => remove(index)}
              >
                <Icon name="Trash" className="h-4 w-4" />
              </Button>
              <FormWizard
                config={[
                  {
                    label: "Department",
                    type: InputTypes.SELECT,
                    control: control as Control,
                    name: `departments.${index}.departmentId`,
                    placeholder: "Select Department",
                    options: departmentOptions,
                    errors,
                  },
                  {
                    label: "Initial Stock Quantity",
                    type: InputTypes.NUMBER,
                    register: register(
                      `departments.${index}.initialStockQuantity` as Path<TFieldValues>,
                    ),
                    placeholder: "Enter Initial Stock Quantity",
                    errors,
                  },
                ]}
              />
              <FormWizard
                className="flex items-center justify-center gap-4 w-full"
                config={[
                  {
                    label: "Minimum Level",
                    type: InputTypes.NUMBER,
                    register: register(
                      `departments.${index}.minimumLevel` as Path<TFieldValues>,
                    ),
                    placeholder: "Enter Minimum Level",
                    errors,
                  },
                  {
                    label: "Reorder Level",
                    type: InputTypes.NUMBER,
                    register: register(
                      `departments.${index}.reorderLevel` as Path<TFieldValues>,
                    ),
                    placeholder: "Enter Reorder Level",
                    errors,
                  },
                  {
                    label: "Maximum Level",
                    type: InputTypes.NUMBER,
                    register: register(
                      `departments.${index}.maximumLevel` as Path<TFieldValues>,
                    ),
                    placeholder: "Maximum Level",
                    errors,
                  },
                ]}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InventoryForm;
