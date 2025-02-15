"use client";

import { useParams } from "next/navigation";
import React from "react";

import { TimelineLayout } from "@/components/ui/timeline";
import { TimelineItemProps } from "@/components/ui/timeline/type";
import { ActivityStepStatus, fullname } from "@/lib";
import { useGetApiV1ProductionScheduleActivityByProductionActivityIdQuery } from "@/lib/redux/api/openapi.generated";
import ScrollablePageWrapper from "@/shared/page-wrapper";

const Board = () => {
  const { id } = useParams();
  const activityId = id as string;
  const { data } =
    useGetApiV1ProductionScheduleActivityByProductionActivityIdQuery({
      productionActivityId: activityId,
    });

  const steps = data?.steps;

  const activities = steps?.map((step) => ({
    id: step.id as string,
    title: step.operation?.name as string,
    status:
      step.id === data?.currentStep?.id
        ? ActivityStepStatus.Active
        : step.status,
    description: step.operation?.description as string,
    imagesLabel: "Responsible Parties",
    images: step?.responsibleUsers?.map((x) => ({
      name: fullname(x?.user?.firstName as string, x?.user?.lastName as string),
      url: x?.user?.avatar,
    })),
  })) as TimelineItemProps[];
  return (
    <ScrollablePageWrapper className="px-10 py-5">
      <TimelineLayout steps={activities} />
    </ScrollablePageWrapper>
  );
};

export default Board;
