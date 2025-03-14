import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

import { FormWizard } from "@/components/form-inputs";
import { InputTypes } from "@/lib";

import { PackingRequestDto } from "./type";

interface Props {
  register: UseFormRegister<PackingRequestDto>;
  errors: FieldErrors;
  uomName?: string;
}
const YieldPacking = ({ register, errors, uomName }: Props) => {
  return (
    <div>
      <table className="w-full">
        <thead>
          <tr className="bg-primary-default">
            <th className="p-3 text-left text-white">SR Number</th>
            <th className="p-3 text-left text-white">Particulars</th>
            <th className="p-3 text-left text-white">Results/Records</th>
            <th className="p-3 text-left text-white">Unit of Measurement</th>
          </tr>
        </thead>
        <tbody>
          {dataArray.map((item, index) => (
            <tr key={item.id}>
              <td className="p-3">{index + 1}</td>
              <td className="p-3">{item.label}</td>
              <td className="p-3">
                <FormWizard
                  config={[
                    {
                      register: register(item.id as keyof PackingRequestDto, {
                        valueAsNumber: true,
                      }),
                      label: "",
                      placeholder: "Enter number",
                      type: InputTypes.NUMBER,
                      errors,
                    },
                  ]}
                />
              </td>
              <td>{index === 0 && uomName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default YieldPacking;

const dataArray: { id: string; label: string }[] = [
  { id: "batchSize", label: "Batch Size (Theoretical Yield of Batch)" },
  {
    id: "averageVolumeFilledPerBottle",
    label: "Average volume filled per bottle",
  },
  { id: "packSize", label: "Pack size (No. of Bottles per shipper)" },
  { id: "expectedYield", label: "Expected Yield" },
  { id: "yieldTotalQuantityPacked", label: "Total Quantity Packed" },
  {
    id: "qualityControlAnalyticalSample",
    label: "Quality control Analytical Samples",
  },
  { id: "retainedSamples", label: "Retained Samples" },
  { id: "stabilitySamples", label: "Stability/Registration Samples" },
  { id: "totalNumberOfBottles", label: "Total number of bottles" },
  { id: "totalGainOrLoss", label: "Total Loss/ Gain" },
];
