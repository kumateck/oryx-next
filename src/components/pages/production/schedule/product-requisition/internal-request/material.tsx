import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { convertToLargestUnit, getSmallestUnit, Units } from "@/lib";

import React from "react";

import { MaterialDepartmentWithWarehouseStockDto } from "@/lib/redux/api/openapi.generated";
interface Props {
  data: MaterialDepartmentWithWarehouseStockDto;
}
const MaterialInfo = ({ data }: Props) => {
  const convertWarehouseStock = convertToLargestUnit(
    data?.warehouseStock ?? 0,
    getSmallestUnit(data?.uoM?.symbol as Units),
  );
  const convertReserved = convertToLargestUnit(
    data?.reservedQuantity ?? 0,
    getSmallestUnit(data?.uoM?.symbol as Units),
  );
  const convertPending = convertToLargestUnit(
    data?.pendingStockTransferQuantity ?? 0,
    getSmallestUnit(data?.uoM?.symbol as Units),
  );
  const convertReOrder = convertToLargestUnit(
    data?.reOrderLevel ?? 0,
    getSmallestUnit(data?.uoM?.symbol as Units),
  );

  const convertMinimum = convertToLargestUnit(
    data?.minimumStockLevel ?? 0,
    getSmallestUnit(data?.uoM?.symbol as Units),
  );

  const convertMaximum = convertToLargestUnit(
    data?.maximumStockLevel ?? 0,
    getSmallestUnit(data?.uoM?.symbol as Units),
  );
  return (
    <Card className="max-w-3xl mx-auto shadow-lg rounded-2xl border border-gray-200">
      <CardHeader className="border-b pb-3 flex gap-12">
        <CardTitle className="flex justify-between gap-4">
          <div className="flex flex-col items-center gap-2">
            <div className="text-xl font-semibold flex items-center gap-2">
              {data?.material?.name}
              <span className="text-sm text-gray-500 font-normal">
                ({data?.material?.code})
              </span>
            </div>
            {/* UOM */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="font-medium">Unit of Measure:</span>{" "}
              {data?.uoM?.name} ({data?.uoM?.symbol})
            </div>
          </div>
          <div className="">
            <p className="text-sm text-gray-500">Department</p>
            <p className="font-medium text-gray-900">
              {data?.department?.name} ({data?.department?.code})
            </p>
            <p className="text-xs text-gray-500">
              {data?.department?.description}
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {/* Stock Info */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-3 rounded-xl">
            <p className="text-sm text-gray-500">Warehouse Stock</p>
            <p className="text-lg font-bold text-gray-900">
              {convertWarehouseStock?.value} {convertWarehouseStock?.unit}
            </p>
          </div>
          <div className="bg-gray-50 p-3 rounded-xl">
            <p className="text-sm text-gray-500">Reserved</p>
            <p className="text-lg font-bold text-gray-900">
              {convertReserved?.value} {convertReserved?.unit}
            </p>
          </div>
          <div className="bg-gray-50 p-3 rounded-xl">
            <p className="text-sm text-gray-500">Pending Transfer</p>
            <p className="text-lg font-bold text-gray-900">
              {convertPending?.value} {convertPending?.unit}{" "}
            </p>
          </div>
        </div>

        {/* Levels */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-green-50 p-3 rounded-xl text-center">
            <p className="text-xs text-gray-600">Reorder Level</p>
            <p className="text-base font-semibold text-green-700">
              {convertReOrder?.value} {convertReOrder?.unit}
            </p>
          </div>
          <div className="bg-yellow-50 p-3 rounded-xl text-center">
            <p className="text-xs text-gray-600">Min Stock</p>
            <p className="text-base font-semibold text-yellow-700">
              {convertMinimum?.value} {convertMinimum?.unit}
            </p>
          </div>
          <div className="bg-blue-50 p-3 rounded-xl text-center">
            <p className="text-xs text-gray-600">Max Stock</p>
            <p className="text-base font-semibold text-blue-700">
              {convertMaximum?.value} {convertMaximum?.unit}
            </p>
          </div>
        </div>

        {/* Department */}
      </CardContent>
    </Card>
  );
};

export default MaterialInfo;
