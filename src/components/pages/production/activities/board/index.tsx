"use client";

import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

// import { Icon } from "@/components/ui";
import { TimelineLayout } from "@/components/ui/timeline";
import { TimelineItemProps } from "@/components/ui/timeline/type";
import { fullname } from "@/lib";
import { useLazyGetApiV1ProductionScheduleActivityByProductionActivityIdQuery } from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";
import { useSelector } from "@/lib/redux/store";
import BgWrapper from "@/shared/bg-wrapper";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import SkeletonLoadingPage from "@/shared/skeleton-page-loader";

const Board = () => {
  const { id } = useParams();
  const activityId = id as string;
  const dispatch = useDispatch();
  const triggerReload = useSelector((state) => state.common.triggerReload);
  const [loadActivity, { data, isLoading, isFetching }] =
    useLazyGetApiV1ProductionScheduleActivityByProductionActivityIdQuery();

  useEffect(() => {
    if (activityId) {
      loadActivity({ productionActivityId: activityId }).unwrap();
    }
    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activityId, triggerReload]);
  const steps = data?.steps;

  const activities = steps?.map((step) => ({
    id: step.id as string,
    title: step.operation?.name as string,
    isActive: step.id === data?.currentStep?.id,
    status: step.status,
    order: step.order,
    description: step.operation?.description as string,
    imagesLabel: "Responsible Parties",
    images: step?.responsibleUsers?.map((x) => ({
      name: fullname(x?.user?.firstName as string, x?.user?.lastName as string),
      url: x?.user?.avatar,
    })),
  })) as TimelineItemProps[];
  return (
    <BgWrapper>
      {(isLoading || isFetching) && <SkeletonLoadingPage />}

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
        <TimelineLayout steps={activities} activityId={activityId} />
      </ScrollablePageWrapper>
    </BgWrapper>
  );
};

export default Board;
