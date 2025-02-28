import React, { useEffect } from "react";

import { Card, CardTitle } from "@/components/ui";
import { Units, convertToLargestUnit } from "@/lib";
import {
  useGetApiV1ProductionScheduleMaterialStockByProductionScheduleIdAndProductIdQuery,
  useGetApiV1ProductionSchedulePackageMaterialStockByProductionScheduleIdAndProductIdQuery,
} from "@/lib/redux/api/openapi.generated";
import SkeletonLoadingPage from "@/shared/skeleton-page-loader";

import TableForData from "./table";
import { MaterialRequestDto } from "./type";

interface Props {
  productId: string;
  scheduleId: string;
  rawLists: MaterialRequestDto[];
  packageLists: MaterialRequestDto[];
  setRawLists: React.Dispatch<React.SetStateAction<MaterialRequestDto[]>>;
  setPackageLists: React.Dispatch<React.SetStateAction<MaterialRequestDto[]>>;
}
const ProductView = ({
  rawLists,
  packageLists,
  setRawLists,
  setPackageLists,

  productId,
  scheduleId,
}: Props) => {
  const { data: materialStockResponse, isLoading: isLoadingRawStock } =
    useGetApiV1ProductionScheduleMaterialStockByProductionScheduleIdAndProductIdQuery(
      {
        productId,
        productionScheduleId: scheduleId,
      },
    );
  const { data: packageStockResponse, isLoading: isLoadingPackageStock } =
    useGetApiV1ProductionSchedulePackageMaterialStockByProductionScheduleIdAndProductIdQuery(
      {
        productId,
        productionScheduleId: scheduleId,
      },
    );
  //   console.log(data, "data");
  useEffect(() => {
    if (materialStockResponse) {
      const rawOptions = materialStockResponse?.map((item) => {
        const code = item?.material?.code as string;
        const uomName = item?.baseUoM?.symbol as Units;
        const materialName = item?.material?.name as string;
        const qtyNeeded = item?.quantityNeeded as number;
        const qtyNeededConvert = convertToLargestUnit(qtyNeeded, uomName);
        const quantityNeeded = qtyNeededConvert.value;
        const quantityNeededUnit = qtyNeededConvert.unit;
        const quantityNeededFloat = `${parseFloat(quantityNeeded.toString()).toFixed(2)}${quantityNeededUnit}`;

        const qtyOnHand = item?.quantityOnHand as number;
        const qtyOnHandConvert = convertToLargestUnit(qtyOnHand, uomName);
        const quantityOnHand = qtyOnHandConvert.value;
        const quantityOnHandUnit = qtyOnHandConvert.unit;
        const quantityOnHandFloat = `${parseFloat(
          quantityOnHand.toString(),
        ).toFixed(2)}${quantityOnHandUnit}`;

        const totalStock = item?.material?.totalStock as number;
        const totalStockConvert = convertToLargestUnit(totalStock, uomName);
        const totalStockValue = totalStockConvert.value;
        const totalStockUnit = totalStockConvert.unit;
        const totalStockFloat = `${parseFloat(
          totalStockValue.toString(),
        ).toFixed(2)}${totalStockUnit}`;

        const materialId = item?.material?.id as string;

        return {
          code,
          materialName,
          materialId,
          finalQuantityNeeded: quantityNeededFloat,
          finalQuantityOnHand: quantityOnHandFloat,
          finalTotalStock: totalStockFloat,
        };
      }) as MaterialRequestDto[];
      setRawLists(rawOptions);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [materialStockResponse]);
  useEffect(() => {
    if (packageStockResponse) {
      const packOptions = packageStockResponse?.map((item) => {
        const code = item?.material?.code as string;

        const materialName = item?.material?.name as string;

        const qtyNeeded = item?.quantityNeeded as number;

        const quantityNeededFloat = parseFloat(qtyNeeded.toString()).toFixed(2);

        const qtyOnHand = item?.quantityOnHand as number;

        const quantityOnHandFloat = parseFloat(qtyOnHand.toString()).toFixed(2);

        const totalStock = item?.material?.totalStock as number;

        const totalStockFloat = parseFloat(totalStock.toString()).toFixed(2);

        const materialId = item?.material?.id as string;

        return {
          code,
          materialName,
          materialId,
          finalQuantityNeeded: quantityNeededFloat,
          finalQuantityOnHand: quantityOnHandFloat,
          finalTotalStock: totalStockFloat,
        };
      }) as MaterialRequestDto[];
      setPackageLists(packOptions);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [packageStockResponse]);

  return (
    <div className="flex gap-4">
      {isLoadingRawStock ? (
        <SkeletonLoadingPage />
      ) : (
        <Card className="space-y-4 p-5 pb-0">
          <CardTitle>Raw Material</CardTitle>
          <TableForData lists={rawLists} setItemLists={setRawLists} />
        </Card>
      )}
      {isLoadingPackageStock ? (
        <SkeletonLoadingPage />
      ) : (
        <Card className="space-y-4 p-5 pb-0">
          <CardTitle>Packaging Material</CardTitle>
          <TableForData lists={packageLists} setItemLists={setPackageLists} />
        </Card>
      )}
    </div>
  );
};

export default ProductView;
