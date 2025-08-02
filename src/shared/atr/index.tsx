"use client";

import { format } from "date-fns";
import React, { useState } from "react";

import { Button, Icon } from "@/components/ui";
import {
  useGetApiV1ProductByProductIdQuery,
  useGetApiV1ProductionScheduleManufacturingByProductionIdAndProductionScheduleIdQuery,
} from "@/lib/redux/api/openapi.generated";

import { AuditModules } from "@/lib";
import CreateATR from "./create";

interface Props {
  scheduleId: string;
  productId: string;
  // productionActivityStepId: string;
}
function AnalyticalTestRequest({ scheduleId, productId }: Props) {
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

  const payload = {
    batchNumber: bmrResponse?.batchNumber as string,
    manufacturingDate: bmrResponse?.manufacturingDate as string,
    expiryDate: bmrResponse?.expiryDate as string,
    expiryDateName: bmrResponse?.expiryDate
      ? format(bmrResponse?.expiryDate as string, "MMM d, yyyy")
      : "",
    manufacturingDateName: bmrResponse?.expiryDate
      ? format(bmrResponse?.manufacturingDate as string, "MMM d, yyyy")
      : "",
    productName: productResponse?.name as string,
    batchManufacturingRecordId: bmrResponse?.id as string,
  };
  return (
    <div>
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setIsOpen(true);
          }}
          type="button"
          className="flex items-center gap-2"
        >
          <Icon name="Navigation" />
          <span>ATR</span>{" "}
        </Button>
      </div>

      {payload && isOpen && (
        <CreateATR
          productionScheduleId={scheduleId}
          productId={productId}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          defaultValues={payload}
        />
      )}
    </div>
  );
}

export default AnalyticalTestRequest;
