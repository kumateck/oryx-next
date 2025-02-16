"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { Card, CardContent, CardTitle } from "@/components/ui";
import TheAduseiEditorViewer from "@/components/ui/adusei-editor/viewer";
import {
  useGetApiV1ProductionScheduleByScheduleIdQuery,
  useGetApiV1ProductionSchedulePackageMaterialStockByProductIdAndQuantityRequiredQuery,
} from "@/lib/redux/api/openapi.generated";
import ScrollablePageWrapper from "@/shared/page-wrapper";

import TableForData from "./table";
import { MaterialRequestDto } from "./type";

const GRNDetail = () => {
  const { id } = useParams();
  const scheduleId = id as string;
  const { data } = useGetApiV1ProductionScheduleByScheduleIdQuery({
    scheduleId,
  });
  const { data: packageStockResponse } =
    useGetApiV1ProductionSchedulePackageMaterialStockByProductIdAndQuantityRequiredQuery(
      {
        productId: "babf7ef8-0beb-4b74-92c0-6f07b937a931",
        quantityRequired: 5,
      },
    );
  const [packageLists, setPackageLists] = useState<MaterialRequestDto[]>([]);

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
  }, [packageStockResponse, data]);

  return (
    <ScrollablePageWrapper>
      <div className="space-y-3">
        <Card>
          <CardContent className="space-y-4 py-2">
            <div className="flex justify-start gap-4">
              <div className="w-full space-y-2">
                <span className="font-Medium block text-xl text-primary-default">
                  GRN-BWH/RM/25/0001
                </span>
                <div className="grid w-full grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <span className="text-sm font-normal text-neutral-secondary">
                      Carrier Name:{" "}
                    </span>
                    <span className="text-sm font-normal text-neutral-dark">
                      Douglas Boakye
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm font-normal text-neutral-secondary">
                      Vehicle Number:{" "}
                    </span>
                    <span className="text-sm font-normal text-neutral-dark">
                      GE-1238-19
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-sm font-normal text-neutral-secondary">
                      Remarks:{" "}
                    </span>
                    <span className="inline text-sm font-normal text-neutral-dark">
                      <TheAduseiEditorViewer content={data?.remarks ?? ""} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* <DragLists /> */}
        {/* {data?.products && data?.products?.length > 0 && (
          <Products scheduleId={scheduleId} products={data?.products ?? []} />
        )} */}
        <Card className="space-y-4 p-5">
          <CardTitle>GRN/GRA Items</CardTitle>
          <TableForData lists={packageLists} setItemLists={setPackageLists} />
        </Card>
      </div>
    </ScrollablePageWrapper>
  );
};

export default GRNDetail;
