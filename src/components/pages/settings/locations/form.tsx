import React from "react";
import { Control, FieldErrors, FieldValues } from "react-hook-form";

import { FormWizard } from "@/components/form-inputs";
import { FetchOptionsResult } from "@/components/ui";
import {
  FloorTypeOptions,
  InputTypes,
  PackLocationOptions,
  RawLocationOptions,
  WarehouseType,
} from "@/lib";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  errors: FieldErrors<TFieldValues>;
  warehouseType?: number;
  defaultValues?: TFieldValues;
  isLoading: boolean;
  fetchOptions: (search: string, page: number) => Promise<FetchOptionsResult>;
}
const LocationForm = <TFieldValues extends FieldValues, TContext>({
  control,
  warehouseType,
  errors,
  isLoading,
  fetchOptions,
  defaultValues,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full space-y-5">
      <FormWizard
        className="grid w-full grid-cols-2 gap-10 space-y-0"
        fieldWrapperClassName="flex-grow"
        config={[
          {
            label: "Warehouse Name",
            control: control as Control,
            type: InputTypes.ASYNC_SELECT,
            name: "warehouseId",
            required: true,
            defaultValue: defaultValues?.warehouseId,
            placeholder: "Select warehouse",
            fetchOptions: fetchOptions,
            isLoading: isLoading,
            errors,
          },
          {
            label: "Location",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "name",
            defaultValue: defaultValues?.name,
            required: true,
            placeholder: "Select name",
            options:
              warehouseType === WarehouseType.RawMaterial
                ? RawLocationOptions
                : PackLocationOptions,
            errors,
          },
        ]}
      />
      <FormWizard
        config={[
          {
            label: "Floor Name",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "floorName",
            defaultValue: defaultValues?.floorName,
            required: true,
            placeholder: "Select floor",
            options: FloorTypeOptions,
            errors,
          },
        ]}
      />
      <FormWizard
        className="w-full"
        config={[
          {
            label: "Description",
            control: control as Control,
            type: InputTypes.RICHTEXT,
            name: "description",
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

export default LocationForm;
