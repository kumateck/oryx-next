import React from "react";

import { Input } from "@/components/ui";
import { splitWords } from "@/lib";
import SkeletonLoadingPage from "@/shared/skeleton-page-loader";

import { MaterialMatrix } from "./type";

// 🔹 Mock async function to simulate API call

// 🔹 Fields for each material column
const fieldNames = [
  "receivedQuantity", // Read-only
  "subsequentDeliveredQuantity",
  "totalReceivedQuantity", // Auto-calculated
  "packedQuantity",
  "returnedQuantity",
  "rejectedQuantity", // Auto-calculated
  "sampledQuantity",
  "totalAccountedForQuantity", // Auto-calculated
  "percentageLoss", // Auto-calculated
];

// 🔹 Zod Schema

interface MaterialFormProps {
  materialMatrix: MaterialMatrix[];
  errors: { [key: string]: string };
  setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  formData: {
    [key: string]: { [key: string]: number | string };
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      [key: string]: { [key: string]: number | string };
    }>
  >;
  isLoading?: boolean;
}
const MaterialForm: React.FC<MaterialFormProps> = (props) => {
  // 🔹 Handle Input Change
  const handleInputChange = (
    materialId: string,
    field: string,
    value: number,
  ) => {
    props.setFormData((prev) => {
      const updatedMaterial = { ...prev[materialId], [field]: value };

      // Auto-update `totalReceivedQuantity`
      if (field === "subsequentDeliveredQuantity") {
        // console.log(updatedMaterial, " updatedMaterial");
        updatedMaterial.totalReceivedQuantity =
          Number(updatedMaterial.receivedQuantity) +
          value +
          Number(updatedMaterial.subsequentDeliveredQuantity);
      }

      // Auto-update `rejectedQuantity`
      updatedMaterial.rejectedQuantity =
        Number(updatedMaterial.totalReceivedQuantity) -
        (Number(updatedMaterial.packedQuantity) +
          Number(updatedMaterial.returnedQuantity) +
          Number(updatedMaterial.sampledQuantity));

      // Auto-update `totalAccountedForQuantity`
      updatedMaterial.totalAccountedForQuantity =
        updatedMaterial.totalReceivedQuantity;

      // Auto-update `percentageLoss`
      updatedMaterial.percentageLoss =
        Number(updatedMaterial.totalAccountedForQuantity) > 0
          ? parseFloat(
              (
                (updatedMaterial.rejectedQuantity /
                  Number(updatedMaterial.totalAccountedForQuantity)) *
                100
              ).toFixed(2),
            )
          : 0;

      return { ...prev, [materialId]: updatedMaterial };
    });
  };

  // 🔹 Select All Text on Focus
  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select();
  };

  // 🔹 Allow Only Arrow Key Navigation for Read-Only Fields
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    isReadOnly: boolean,
  ) => {
    if (isReadOnly && !["ArrowLeft", "ArrowRight", "Tab"].includes(event.key)) {
      event.preventDefault();
    }
  };

  // 🔹 Submit Handler

  if (props.isLoading) {
    return <SkeletonLoadingPage />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-primary-default">
            <th className="p-3 text-left"></th>
            {props.materialMatrix.map((material) => (
              <th
                key={material.materialId}
                className="p-3 text-left text-white"
              >
                <div>{material.materialName}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {fieldNames.map((field) => (
            <tr key={field} className="">
              <td className="bg-white p-3 text-sm font-medium capitalize text-primary-default">
                {splitWords(field)}
              </td>
              {props.materialMatrix.map((material) => {
                const isReadOnly = [
                  "subsequentDeliveredQuantity",
                  "receivedQuantity",
                  "totalReceivedQuantity",
                  "rejectedQuantity",
                  "totalAccountedForQuantity",
                  "percentageLoss",
                ].includes(field);

                return (
                  <td key={material.materialId} className="p-3">
                    <div className="flex flex-col">
                      <Input
                        type="number"
                        value={
                          props.formData[material.materialId]?.[field] || 0
                        }
                        onChange={(e) =>
                          handleInputChange(
                            material.materialId,
                            field,
                            Number(e.target.value),
                          )
                        }
                        onFocus={handleFocus}
                        onKeyDown={(e) => handleKeyDown(e, isReadOnly)}
                        readOnly={isReadOnly}
                      />
                      {props.errors[`${material.materialId}-${field}`] && (
                        <p className="mt-1 text-xs text-red-500">
                          {props.errors[`${material.materialId}-${field}`]}
                        </p>
                      )}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MaterialForm;
