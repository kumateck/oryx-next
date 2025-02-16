"use client";

import React from "react";

import PageWrapper from "@/components/layout/wrapper";
import { fullname } from "@/lib";
import { useGetApiV1ProductionScheduleActivityOperationGroupedQuery } from "@/lib/redux/api/openapi.generated";
import LeaderBoard from "@/shared/leader-board";
import { Activity } from "@/shared/leader-board/type";

const Activities = () => {
  const { data: currentOperation } =
    useGetApiV1ProductionScheduleActivityOperationGroupedQuery();

  const currentOperationData = currentOperation ?? [];

  const boardColumns = currentOperationData?.map((item) => {
    return {
      id: item.operation?.id as string,
      name: item.operation?.name as string,
      steps: item?.activities?.map((activity) => {
        return {
          id: activity.id as string,
          activityId: activity?.currentStep?.productionActivity?.id as string,
          productName: activity?.product?.name as string,
          productCode: activity?.product?.code as string,
          scheduleCode: activity?.productionSchedule?.code as string,
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
