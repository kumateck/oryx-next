"use client";

import React from "react";

import PageWrapper from "@/components/layout/wrapper";
import { convertToLargestUnit, fullname, Units } from "@/lib";
import { useGetApiV1ProductionScheduleActivityOperationGroupedQuery } from "@/lib/redux/api/openapi.generated";
import LeaderBoard from "@/shared/leader-board";
import { Activity } from "@/shared/leader-board/type";

const Activities = () => {
  const { data: currentOperation } =
    useGetApiV1ProductionScheduleActivityOperationGroupedQuery({});

  const currentOperationData = currentOperation ?? [];

  const boardColumns = currentOperationData?.map((item) => {
    return {
      id: item.operation?.id as string,
      name: item.operation?.name as string,
      steps: item?.activities?.map((activity) => {
        const convertUnit = convertToLargestUnit(
          Number(activity.quantity),
          activity?.product?.baseUoM?.symbol as Units,
        );
        return {
          id: activity.id as string,
          activityId: activity?.currentStep?.productionActivity?.id as string,
          productName: activity?.product?.name as string,
          productCode: activity?.product?.code as string,
          scheduleCode: activity?.productionSchedule?.code as string,
          batchNumber: activity?.batchNumber as string,
          createdAt: activity?.createdAt as string,
          batchSize: convertUnit.value + " " + convertUnit.unit,
          images: activity?.currentStep?.responsibleUsers?.map((x) => ({
            name: fullname(
              x?.user?.firstName as string,
              x?.user?.lastName as string,
            ),
            url: x?.user?.avatar,
          })),
        };
      }),
    };
  }) as Activity[];

  return (
    <PageWrapper className="page">
      <LeaderBoard activities={boardColumns} />
    </PageWrapper>
  );
};

export default Activities;
