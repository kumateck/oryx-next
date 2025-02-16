import React, { useEffect, useState } from "react";
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

import TableForData from "./table";

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
  const [packageLists, setPackageLists] = useState<
    DistributedRequisitionMaterialDto[]
  >([]);

  console.log("Data in the form:::", filteredData);
  useEffect(() => {
    if (filteredData?.length) {
      setPackageLists(filteredData);
    }
  }, [filteredData]);

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
              placeholder: "Desmond Kofi Adusei",
              errors,
            },
            {
              register: register("vehicleNumber" as Path<TFieldValues>),
              label: "Vehicle Number",
              placeholder: "GE-1238-19",
              type: InputTypes.TEXT,
              required: true,
              errors,
            },
            {
              register: register("grnNumber" as Path<TFieldValues>),
              label: "GRN Number",
              placeholder: "GRN-BWH-001",
              type: InputTypes.TEXT,
              required: true,
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
              required: true,
              placeholder: "Enter Remarks",
              errors,
            },
          ]}
        />
      </div>

      <div className="mt-4">
        <TableForData lists={packageLists} setItemLists={setPackageLists} />
      </div>
    </div>
  );
};

export default GRNForm;
