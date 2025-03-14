import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

import { FormWizard } from "@/components/form-inputs";
import { InputTypes } from "@/lib";

import { PackingRequestDto } from "./type";

interface Props {
  register: UseFormRegister<PackingRequestDto>;
  errors: FieldErrors;
}
const PackedForm = ({ register, errors }: Props) => {
  return (
    <div className="max-w-md">
      <FormWizard
        config={dataArray.map((item) => ({
          register: register(item.id as keyof PackingRequestDto, {
            valueAsNumber: true,
          }),
          label: item.label,
          placeholder: "Enter number",
          type: InputTypes.NUMBER,
          errors,
        }))}
      />
    </div>
  );
};

export default PackedForm;

const dataArray = [
  { id: "numberOfBottlesPerShipper", label: "Number of Bottles per Shipper" },
  { id: "nUmberOfFullShipperPacked", label: "Number of Full Shipper packed" },
  { id: "leftOver", label: "Left Over" },
  { id: "totalQuantityPacked", label: "Total Quantity Packed" },
];
