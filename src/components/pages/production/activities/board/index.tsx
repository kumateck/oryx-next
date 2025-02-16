"use client";

import { useParams } from "next/navigation";
import React from "react";

import { TimelineLayout } from "@/components/ui/timeline";
import { TimelineItemProps } from "@/components/ui/timeline/type";
import { ActivityStepStatus, fullname } from "@/lib";
import { useGetApiV1ProductionScheduleActivityByProductionActivityIdQuery } from "@/lib/redux/api/openapi.generated";
import BgWrapper from "@/shared/bg-wrapper";
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
    <BgWrapper>
      <div className="flex flex-col gap-0.5">
        <span className="text-2xl font-medium text-primary-inverted">
          {data?.product?.name}
        </span>
        <div>
          <ul className="flex items-center gap-4">
            <li>
              <span className="block text-sm font-normal">Product Code:</span>
              <span className="block font-semibold">
                {data?.product?.code}{" "}
              </span>
            </li>{" "}
            <li>
              <span className="block">Schedule Code:</span>
              <span className="block">{data?.productionSchedule?.code}</span>
            </li>
          </ul>
        </div>
        <span className="text-sm font-normal text-neutral-default">
          {data?.product?.description}
        </span>
      </div>
      <ScrollablePageWrapper className="px-10 py-5">
        <TimelineLayout steps={activities} />
      </ScrollablePageWrapper>
    </BgWrapper>
  );
};

export default Board;
