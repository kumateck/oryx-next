"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { Button, Input } from "@/components/ui";

type TableHeader = { label: string; value: string };
type TableData = Record<string, Record<string, number>>;

// Simulated API fetch for column headers
const fetchHeaders = async (): Promise<TableHeader[]> => [
  { label: "Clear 150ml Bottles", value: "clear_150ml_bottles" },
  { label: "Plastic Caps", value: "plastic_caps" },
  { label: "Skillets", value: "skillets" },
];

// Simulated API fetch for row headers
const fetchRowHeaders = async (): Promise<TableHeader[]> => [
  { label: "Received", value: "received" },
  { label: "Subsequent Delivered", value: "subsequent_delivered" },
  { label: "Total Received", value: "total_received" },
  { label: "Packed", value: "packed" },
  { label: "Rejects", value: "rejects" },
  { label: "Total Accounted For", value: "total_accounted_for" },
  { label: "Loss (%)", value: "loss_percentage" },
];

const DynamicEditableTable: React.FC = () => {
  const [headers, setHeaders] = useState<TableHeader[]>([]);
  const [rowHeaders, setRowHeaders] = useState<TableHeader[]>([]);
  const [loading, setLoading] = useState(true);

  const receivedData: Record<string, number> = {
    clear_150ml_bottles: 20300,
    plastic_caps: 20300,
    skillets: 20300,
  };

  useEffect(() => {
    const loadHeaders = async () => {
      const fetchedHeaders = await fetchHeaders();
      const fetchedRowHeaders = await fetchRowHeaders();
      setHeaders(fetchedHeaders);
      setRowHeaders(fetchedRowHeaders);
      setLoading(false);
    };
    loadHeaders();
  }, []);

  // ✅ Fixed Schema: Ensures row 4 is not greater than row 3
  const schema = z.object(
    rowHeaders.reduce(
      (acc, row) => {
        acc[row.value] = z.object(
          headers.reduce(
            (colAcc, col) => {
              colAcc[col.value] =
                row.value === "packed"
                  ? z.coerce
                      .number()
                      .min(
                        1,
                        `${row.label} - ${col.label} must be greater than 0`,
                      )
                      .refine(
                        (value) => {
                          const totalReceived =
                            watchedValues?.total_received?.[col.value] || 0;
                          return value <= totalReceived;
                        },
                        (val) => ({
                          message: `${row.label} - ${col.label} cannot be greater than Total Received (${watchedValues?.total_received?.[col.value] || val})`,
                        }),
                      )
                  : z.coerce
                      .number()
                      .min(
                        0,
                        `${row.label} - ${col.label} must be 0 or greater`,
                      );
              return colAcc;
            },
            {} as Record<string, z.ZodType<any>>,
          ),
        );
        return acc;
      },
      {} as Record<string, z.ZodType<Record<string, number>>>,
    ),
  );

  // React Hook Form setup
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TableData>({
    resolver: zodResolver(schema),
    defaultValues: rowHeaders.reduce(
      (acc, row) => ({
        ...acc,
        [row.value]: headers.reduce(
          (colAcc, col) => ({
            ...colAcc,
            [col.value]:
              row.value === "received" ? (receivedData[col.value] ?? 0) : 0,
          }),
          {} as Record<string, number>,
        ),
      }),
      {} as TableData,
    ),
  });

  const watchedValues = watch();

  // ✅ Fix: Only update values when necessary to prevent infinite loops
  useEffect(() => {
    headers.forEach((col) => {
      const received = Number(watchedValues?.received?.[col.value]) || 0;
      const subsequentDelivered =
        Number(watchedValues?.subsequent_delivered?.[col.value]) || 0;
      const packed = Number(watchedValues?.packed?.[col.value]) || 0;

      const totalReceived = received + subsequentDelivered;
      if (watchedValues?.total_received?.[col.value] !== totalReceived) {
        setValue(`total_received.${col.value}`, totalReceived);
      }

      // Prevent packed from exceeding total received
      if (packed > totalReceived) {
        setValue(`packed.${col.value}`, totalReceived);
      }

      // Auto-calculate row 5 (Rejects) → Total Received - Packed
      const rejects = totalReceived - packed;
      if (watchedValues?.rejects?.[col.value] !== rejects) {
        setValue(`rejects.${col.value}`, rejects);
      }

      if (watchedValues?.total_accounted_for?.[col.value] !== totalReceived) {
        setValue(`total_accounted_for.${col.value}`, totalReceived);
      }

      const lossPercentage =
        totalReceived > 0 ? (rejects / totalReceived) * 100 : 0;
      if (watchedValues?.loss_percentage?.[col.value] !== lossPercentage) {
        setValue(
          `loss_percentage.${col.value}`,
          parseFloat(lossPercentage.toFixed(2)),
        );
      }
    });
  }, [headers, watchedValues, setValue]);

  // Submit Handler
  const onSubmit: SubmitHandler<TableData> = (data) => {
    console.log("Submitted Data:", data);
    alert("Form submitted successfully! Check console for details.");
  };

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h2 className="mb-4 text-xl font-bold">Dynamic Editable Table</h2>

      {loading ? (
        <p>Loading headers...</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Row Header</th>
                {headers.map((header) => (
                  <th key={header.value} className="border p-2">
                    {header.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rowHeaders.map((row) => (
                <tr key={row.value}>
                  <td className="border p-2 font-bold">{row.label}</td>
                  {headers.map((header) => (
                    <td
                      key={`${row.value}-${header.value}`}
                      className="border p-2"
                    >
                      {[
                        "received",
                        "total_received",
                        "total_accounted_for",
                        "loss_percentage",
                        "rejects",
                      ].includes(row.value) ? (
                        <span>
                          {watch(`${row.value}.${header.value}`) || 0}
                        </span>
                      ) : (
                        <Controller
                          name={`${row.value}.${header.value}` as const}
                          control={control}
                          render={({ field }) => (
                            <Input
                              type="number"
                              value={field.value ?? 0}
                              onFocus={(e) => e.target.select()} // ✅ Select all text when clicked
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          )}
                        />
                      )}
                      {errors[row.value]?.[header.value] && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors[row.value]?.[
                            header.value
                          ]?.message?.toString()}
                        </p>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <Button
            type="submit"
            className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
          >
            Submit
          </Button>
        </form>
      )}
    </div>
  );
};

export default DynamicEditableTable;
