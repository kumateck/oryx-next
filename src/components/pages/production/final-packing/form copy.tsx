import React, { useEffect, useState } from "react";
import { z } from "zod";

import { Button, Input } from "@/components/ui";
import { splitWords } from "@/lib";

// 🔹 Mock async function to simulate API call
const fetchMaterials = async () => {
  return new Promise<
    { materialId: string; materialName: string; receivedQuantity: number }[]
  >((resolve) => {
    setTimeout(() => {
      resolve([
        { materialId: "mat-001", materialName: "Steel", receivedQuantity: 50 },
        { materialId: "mat-002", materialName: "Copper", receivedQuantity: 30 },
        {
          materialId: "mat-003",
          materialName: "Aluminum",
          receivedQuantity: 20,
        },
      ]);
    }, 1000);
  });
};

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
const getMaterialSchema = (totalReceivedQuantity: number) =>
  z.object({
    receivedQuantity: z.number().nonnegative(), // Read-only
    subsequentDeliveredQuantity: z.number().nonnegative(),
    totalReceivedQuantity: z.number().nonnegative(), // Auto-calculated
    packedQuantity: z
      .number()
      .min(1, "Packed quantity must be greater than 0")
      .max(
        totalReceivedQuantity,
        "Packed quantity cannot exceed total received quantity",
      ),
    returnedQuantity: z.number().nonnegative(),
    rejectedQuantity: z.number().nonnegative(), // Auto-calculated
    sampledQuantity: z.number().nonnegative(),
    totalAccountedForQuantity: z.number().nonnegative(), // Auto-calculated
    percentageLoss: z.number().nonnegative(), // Auto-calculated
  });

const MaterialForm: React.FC = () => {
  const [materials, setMaterials] = useState<
    { materialId: string; materialName: string; receivedQuantity: number }[]
  >([]);
  const [formData, setFormData] = useState<{
    [key: string]: { [key: string]: number };
  }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // 🔹 Fetch Materials & Initialize State
  useEffect(() => {
    fetchMaterials().then((data) => {
      setMaterials(data);

      // Initialize state
      const initialFormData: { [key: string]: { [key: string]: number } } = {};
      data.forEach((material) => {
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
      setFormData(initialFormData);
    });
  }, []);

  console.log(errors, "errors");

  // 🔹 Handle Input Change
  const handleInputChange = (
    materialId: string,
    field: string,
    value: number,
  ) => {
    setFormData((prev) => {
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

  // 🔹 Validation before submitting
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    materials.forEach((material) => {
      const schema = getMaterialSchema(
        formData[material.materialId].totalReceivedQuantity,
      );
      const result = schema.safeParse(formData[material.materialId]);

      if (!result.success) {
        result.error.issues.forEach((issue) => {
          newErrors[`${material.materialId}-${issue.path[0]}`] = issue.message;
        });
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🔹 Submit Handler
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      console.log("✅ Validated Data:", formData);
    } else {
      console.log("❌ Validation Errors:", errors);
    }
  };

  if (materials.length === 0) {
    return <p>Loading materials...</p>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border bg-white p-6 shadow-lg"
    >
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3 text-left">Field</th>
              {materials.map((material) => (
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
                {materials.map((material) => {
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
                          value={formData[material.materialId]?.[field] || 0}
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
                        {errors[`${material.materialId}-${field}`] && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors[`${material.materialId}-${field}`]}
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

      <Button type="submit" className="mt-6 w-full">
        Submit
      </Button>
    </form>
  );
};

export default MaterialForm;
