import React, { useEffect, useState } from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

import { FormWizard } from "@/components/form-inputs";
import { InputTypes, Option } from "@/lib";

// import TableForData from "./table";
import { GRNRequestDto } from "./types";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  locationOptions: Option[];
  filteredData: GRNRequestDto[];
}

const GRNForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  locationOptions,
  filteredData, // Only selected rows
}: Props<TFieldValues, TContext>) => {
  const [packageLists, setPackageLists] = useState<GRNRequestDto[]>([]);

  console.log("Data in the form:::", filteredData);
  useEffect(() => {
    if (filteredData?.length) {
      setPackageLists(filteredData); // Only update if filteredData is valid
    }
  }, [filteredData]);
  console.log("Package List Data:::", packageLists);
  return (
    <div className="w-full">
      <FormWizard
        className="grid w-full grid-cols-2 gap-x-10 space-y-0"
        fieldWrapperClassName="flex-grow"
        config={[
          {
            label: "Carrier's Name",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "locationId",
            required: true,
            placeholder: "Desmond Kofi Adusei",
            options: locationOptions,
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
            label: "Description",
            control: control as Control,
            type: InputTypes.RICHTEXT,
            name: "description",
            required: true,
            placeholder: "Enter Remarks",
            errors,
          },
        ]}
      />

      {/* <TableForData lists={packageLists} setItemLists={setPackageLists} /> */}
    </div>
  );
};

export default GRNForm;
