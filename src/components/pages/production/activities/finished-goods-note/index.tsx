"use client";

import { format } from "date-fns";
import React, { useState } from "react";

import { Button, Icon } from "@/components/ui";
import {
  useGetApiV1ProductByProductIdQuery,
  useGetApiV1ProductionScheduleFinalPackingByProductionScheduleIdAndProductIdQuery,
  useGetApiV1ProductionScheduleManufacturingByProductionIdAndProductionScheduleIdQuery,
} from "@/lib/redux/api/openapi.generated";

import Create from "./create";
import { FinishedGoodsNoteRequestDto } from "./types";
import { AuditModules } from "@/lib";

interface Props {
  scheduleId: string;
  productId: string;
  productionActivityStepId: string;
}
function FinishedGoodsTransfer({
  scheduleId,
  productId,
  productionActivityStepId,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const { data: productResponse } = useGetApiV1ProductByProductIdQuery({
    productId,
    module: AuditModules.production.name,
    subModule: AuditModules.production.planning,
  });
  const { data: bmrResponse } =
    useGetApiV1ProductionScheduleManufacturingByProductionIdAndProductionScheduleIdQuery(
      {
        productionId: productId,
        productionScheduleId: scheduleId,
        module: AuditModules.production.name,
        subModule: AuditModules.production.bmr,
      },
    );
  const { data: finalPackingResponse } =
    useGetApiV1ProductionScheduleFinalPackingByProductionScheduleIdAndProductIdQuery(
      {
        productionScheduleId: scheduleId,
        productId,
        module: AuditModules.production.name,
        subModule: AuditModules.production.finalPacking,
      },
    );

  const batchManufacturingRecordId = bmrResponse?.id as string;
  const payload: FinishedGoodsNoteRequestDto = {
    batchNumber: bmrResponse?.batchNumber as string,
    manufacturingDate: bmrResponse?.manufacturingDate as string,
    expiryDate: bmrResponse?.expiryDate as string,
    expiryDateName: bmrResponse?.expiryDate
      ? format(bmrResponse?.expiryDate as string, "MMM d, yyyy")
      : "",
    manufacturingDateName: bmrResponse?.expiryDate
      ? format(bmrResponse?.manufacturingDate as string, "MMM d, yyyy")
      : "",
    quantityPerPack:
      finalPackingResponse?.numberOfBottlesPerShipper?.toString() as string,
    productName: productResponse?.name as string,
    qarNumber: "",
    packageStyle: { label: "", value: "" },
    uom: { label: "", value: "" },
    totalQuantityTransfer:
      finalPackingResponse?.totalQuantityPacked?.toString() as string,
  };
  return (
    <div>
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setIsOpen(true);
          }}
          type="button"
          variant={"secondary"}
          className="flex items-center gap-2"
        >
          <Icon name="Plus" className="h-4 w-4" />
          <span>Finished Goods</span>{" "}
        </Button>
      </div>

      {payload && isOpen && (
        <Create
          scheduleId={scheduleId}
          productId={productId}
          batchManufacturingRecordId={batchManufacturingRecordId}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          defaultValues={payload}
          productionActivityStepId={productionActivityStepId}
        />
      )}
    </div>
  );
}

export default FinishedGoodsTransfer;
