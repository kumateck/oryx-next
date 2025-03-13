import React, { useEffect } from "react";

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
    [key: string]: { [key: string]: number };
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      [key: string]: { [key: string]: number };
    }>
  >;
}
const MaterialForm: React.FC<MaterialFormProps> = (props) => {
  //

  // 🔹 Fetch Materials & Initialize State
  useEffect(() => {
    // Initialize state
    const initialFormData: { [key: string]: { [key: string]: number } } = {};
    props.materialMatrix.forEach((material) => {
      initialFormData[material.materialId] = {
        receivedQuantity: material.receivedQuantity, // Read-only
        subsequentDeliveredQuantity: 0,
        totalReceivedQuantity: material.receivedQuantity, // Initially same as receivedQuantity
        packedQuantity: 1, // Default to 1 since it must be > 0
        returnedQuantity: 0,
        rejectedQuantity: 0,
        sampledQuantity: 0,
        totalAccountedForQuantity: material.receivedQuantity, // Same as totalReceivedQuantity
        percentageLoss: 0,
      };
    });
    props.setFormData(initialFormData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.materialMatrix]);

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
        updatedMaterial.totalReceivedQuantity =
          updatedMaterial.receivedQuantity + value;
      }

      // Auto-update `rejectedQuantity`
      updatedMaterial.rejectedQuantity =
        updatedMaterial.totalReceivedQuantity -
        (updatedMaterial.packedQuantity + updatedMaterial.returnedQuantity);

      // Auto-update `totalAccountedForQuantity`
      updatedMaterial.totalAccountedForQuantity =
        updatedMaterial.totalReceivedQuantity;

      // Auto-update `percentageLoss`
      updatedMaterial.percentageLoss =
        updatedMaterial.totalAccountedForQuantity > 0
          ? parseFloat(
              (
                (updatedMaterial.rejectedQuantity /
                  updatedMaterial.totalAccountedForQuantity) *
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

  if (props.materialMatrix.length === 0) {
    return <SkeletonLoadingPage />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-3 text-left">Field</th>
            {props.materialMatrix.map((material) => (
              <th key={material.materialId} className="border p-3 text-left">
                <div>{material.materialName}</div>
                <div className="text-xs text-gray-500">
                  ID: {material.materialId}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {fieldNames.map((field) => (
            <tr key={field} className="border">
              <td className="border p-3 font-medium capitalize">
                {splitWords(field)}
              </td>
              {props.materialMatrix.map((material) => {
                const isReadOnly = [
                  "receivedQuantity",
                  "totalReceivedQuantity",
                  "rejectedQuantity",
                  "totalAccountedForQuantity",
                  "percentageLoss",
                ].includes(field);

                return (
                  <td key={material.materialId} className="border p-3">
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
