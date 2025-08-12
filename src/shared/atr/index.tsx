"use client";

import { format } from "date-fns";
import React, { useState } from "react";

import { Button, Icon } from "@/components/ui";
import {
  useGetApiV1ProductByProductIdQuery,
  useGetApiV1ProductionScheduleManufacturingByProductionIdAndProductionScheduleIdQuery,
  useGetApiV1QaAnalyticalTestsActivityStepByActivityStepIdQuery,
} from "@/lib/redux/api/openapi.generated";

import { AnalyticalTestRequestStatus, AuditModules, cn } from "@/lib";
import CreateATR from "./create";

interface Props {
  scheduleId: string;
  productId: string;
  productionActivityStepId: string;
}
function AnalyticalTestRequest({
  scheduleId,
  productId,
  productionActivityStepId,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const { data: activityATRData } =
    useGetApiV1QaAnalyticalTestsActivityStepByActivityStepIdQuery({
      activityStepId: productionActivityStepId,
    });
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
        {!activityATRData ? (
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
        ) : (
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <span className="text-gray-500">ATR:</span>
            <span
              className={cn("px-2 py-1 rounded-2xl text-xs font-semibold", {
                "bg-gray-100 text-gray-800":
                  activityATRData.status === AnalyticalTestRequestStatus.New,
                "bg-yellow-100 text-yellow-800":
                  activityATRData.status ===
                  AnalyticalTestRequestStatus.Sampled,
                "bg-blue-100 text-blue-800":
                  activityATRData.status ===
                  AnalyticalTestRequestStatus.Acknowledged,
                "bg-red-100 text-red-800":
                  activityATRData.status ===
                  AnalyticalTestRequestStatus.Testing,
                "bg-green-100 text-green-800":
                  activityATRData.status ===
                  AnalyticalTestRequestStatus.Released,
              })}
            >
              {AnalyticalTestRequestStatus[Number(activityATRData.status)]}
            </span>
          </div>
        )}
      </div>

      {payload && isOpen && (
        <CreateATR
          productionScheduleId={scheduleId}
          productId={productId}
          productionActivityStepId={productionActivityStepId}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          defaultValues={payload}
        />
      )}
    </div>
  );
}

export default AnalyticalTestRequest;
