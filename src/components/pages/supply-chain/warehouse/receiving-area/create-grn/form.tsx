import React from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

import { FormWizard } from "@/components/form-inputs";
import { InputTypes } from "@/lib";
import { DistributedRequisitionMaterialDto } from "@/lib/redux/api/openapi.generated";

import { ListsTable } from "@/shared/datatable";
import { getColumns } from "./columns";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  filteredData: DistributedRequisitionMaterialDto[];
}

const GRNForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  filteredData,
}: Props<TFieldValues, TContext>) => {
  const columns = getColumns();

  return (
    <div className="w-full">
      <div className="px-2">
        <FormWizard
          className="grid w-full grid-cols-2 gap-x-10 space-y-0"
          fieldWrapperClassName="flex-grow"
          config={[
            {
              register: register("carrierName" as Path<TFieldValues>),
              label: "Carrier's Name",
              type: InputTypes.TEXT,
              required: true,
              placeholder: "Enter Driver's Name",
              errors,
            },
            {
              register: register("vehicleNumber" as Path<TFieldValues>),
              label: "Vehicle Number",
              placeholder: "Enter Vehicle Number",
              type: InputTypes.TEXT,
              required: true,
              errors,
            },
            {
              register: register("grnNumber" as Path<TFieldValues>),
              label: "GRN Number",
              placeholder: "code",
              type: InputTypes.TEXT,
              required: true,
              readOnly: true,
              errors,
            },
          ]}
        />
        <FormWizard
          className="w-full gap-x-10 space-y-0"
          fieldWrapperClassName="flex-grow"
          config={[
            {
              label: "Description",
              control: control as Control,
              type: InputTypes.RICHTEXT,
              name: "remarks",
              // required: true,
              placeholder: "Enter Remarks",
              errors,
            },
          ]}
        />
      </div>

      <div className="mt-4">
        <ListsTable data={filteredData} columns={columns} />
      </div>
    </div>
  );
};

export default GRNForm;
