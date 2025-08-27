import React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle, // Icon,
} from "@/components/ui";
import { Units, convertToLargestUnit, getSmallestUnit } from "@/lib";
import {
  useGetApiV1MaterialByMaterialIdStockAcrossWarehousesQuery, // useGetApiV1UserAuthenticatedQuery,
} from "@/lib/redux/api/openapi.generated";

import SkeletonLoadingPage from "../skeleton-page-loader";

interface Props {
  materialId: string;
  materialName: string;
  materialCode?: string;
  qtyNeeded?: string;
  isOpen: boolean;
  onClose(): void;
  uomName?: Units;
}
const AllStockByMaterial = ({
  materialCode,
  materialName,
  qtyNeeded,
  materialId,
  isOpen,
  uomName,
  onClose,
}: Props) => {
  const { data, isLoading } =
    useGetApiV1MaterialByMaterialIdStockAcrossWarehousesQuery({
      materialId,
    });

  // const { data: authUser } = useGetApiV1UserAuthenticatedQuery();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            Stock across all warehouses for {materialName} ({materialCode})
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <SkeletonLoadingPage />
        ) : (
          <div className="relative overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
              <caption className="text-semibold caption-top py-5 text-2xl">
                <span>Qty Needed:</span> <span>{qtyNeeded}</span>
              </caption>
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Warehouse
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Stock Available
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <th
                      scope="row"
                      className="flex gap-4 whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {item.warehouse?.name}{" "}
                    </th>
                    <td className="px-6 py-4">
                      {
                        convertToLargestUnit(
                          item.stockQuantity as number,
                          getSmallestUnit(uomName as Units),
                        ).value
                      }
                      {
                        convertToLargestUnit(
                          item.stockQuantity as number,
                          getSmallestUnit(uomName as Units),
                        ).unit
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AllStockByMaterial;
