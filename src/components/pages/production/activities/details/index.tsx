"use client";
import PageWrapper from "@/components/layout/wrapper";
import { useRouter } from "next/navigation";
import {
  AvatarStack,
  Button,
  Card,
  CardHeader,
  Icon,
  Progress,
} from "@/components/ui";
import {
  useLazyGetApiV1ProductionScheduleActivityByProductionActivityIdQuery,
  useLazyGetApiV1ProductionScheduleActivityStepByProductionActivityStepIdQuery,
} from "@/lib/redux/api/openapi.generated";
import { useParams } from "next/navigation";
import ActivityLog from "@/components/activity-log";
import { useDispatch } from "react-redux";
import { useSelector } from "@/lib/redux/store";
import { useEffect, useState } from "react";
import { commonActions } from "@/lib/redux/slices/common";
import SkeletonLoadingPage from "@/shared/skeleton-page-loader";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import { AuditModules, cn, fullname, getInitials } from "@/lib";
import StepDetailsDailog from "./StepDetailsDailog";

const Details = () => {
  const { id, sid } = useParams();
  const router = useRouter();
  const stepId = sid as string;
  const [open, setOpen] = useState(false);

  const activityId = id as string;
  const dispatch = useDispatch();
  const triggerReload = useSelector((state) => state.common.triggerReload);
  const [loadActivity, { data, isLoading, isFetching }] =
    useLazyGetApiV1ProductionScheduleActivityByProductionActivityIdQuery();

  const [loadActivityStep, { data: stepData }] =
    useLazyGetApiV1ProductionScheduleActivityStepByProductionActivityStepIdQuery();

  useEffect(() => {
    if (activityId) {
      loadActivity({
        productionActivityId: activityId,
        module: AuditModules.production.name,
        subModule: AuditModules.production.activities,
      }).unwrap();
    }
    if (stepId) {
      loadActivityStep({
        productionActivityStepId: stepId,
        module: AuditModules.production.name,
        subModule: AuditModules.production.steps,
      }).unwrap();
    }
    if (triggerReload) {
      dispatch(commonActions.unSetTriggerReload());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activityId, stepId, triggerReload]);

  return (
    <PageWrapper>
      {open && (
        <StepDetailsDailog
          isOpen={open}
          onClose={() => setOpen(!open)}
          stepId={stepData?.id as string}
        />
      )}
      <Button
        onClick={() => router.back()}
        variant="ghost"
        className="flex p-0 items-center justify-start"
      >
        <Icon name="ArrowLeft" />
        <span>Production Tracker</span>
      </Button>
      {isFetching || (isLoading && <SkeletonLoadingPage />)}
      <Card className=" w-full">
        <CardHeader className=" w-full">
          <div className="items-center justify-between flex">
            {/* Prosuction discription */}
            <div>
              <div className="mb-4">
                <span className="text-sm text-neutral-600">
                  {stepData?.operation?.name}
                </span>
                <h1 className="text-xl">{stepData?.operation?.description}</h1>
              </div>
              <div className="max-w-md">
                <span className="text-sm block text-neutral-600">
                  Status Action
                </span>
                <span>{`${stepData?.status}/${stepData?.responsibleUsers?.length}`}</span>
                <Progress
                  color="blue"
                  className=""
                  value={
                    stepData?.status ??
                    0 / (stepData?.responsibleUsers?.length ?? 0)
                  }
                />
              </div>
            </div>
            {/* Responsibility personels */}
            <div>
              {stepData?.responsibleUsers && (
                <AvatarStack
                  fallbackClass={cn("bg-neutral-input text-neutral-dark")}
                  avatars={stepData?.responsibleUsers?.map((item) => ({
                    name: getInitials(
                      fullname(
                        item?.createdBy?.firstName as string,
                        item?.createdBy?.lastName as string,
                      ),
                    ),
                    fullname: fullname(
                      item?.createdBy?.firstName as string,
                      item?.createdBy?.lastName as string,
                    ),
                    url: item?.createdBy?.avatar as string,
                  }))}
                />
              )}
            </div>
            {/* Buttons */}
            <div className="flex flex-col items-center justify-end">
              <Button
                onClick={() => setOpen(true)}
                variant="default"
                className="ml-auto mb-4"
              >
                Perform Activity
              </Button>
              <div>
                <h2 className="text-neutral-600">Progress Duration</h2>
                <div className="grid text-sm p-1 grid-cols-3 border border-neutral-600 rounded">
                  <div className=" flex flex-col items-center justify-center">
                    <span className="">
                      {getTimeSince(stepData?.operation?.createdAt)?.days}
                    </span>
                    <span>Days</span>
                  </div>
                  <div className=" flex flex-col items-center justify-center">
                    <span>
                      {getTimeSince(stepData?.operation?.createdAt)?.hours}
                    </span>
                    <span>Hours</span>
                  </div>
                  <div className=" flex flex-col items-center justify-center">
                    <span>
                      {getTimeSince(stepData?.operation?.createdAt)?.minutes}
                    </span>
                    <span>minutes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        {/* activity logs section*/}
        <ScrollablePageWrapper>
          <ActivityLog approvalLogs={data?.activityLogs} />
        </ScrollablePageWrapper>
      </Card>
    </PageWrapper>
  );
};

export default Details;

import { parseISO, intervalToDuration } from "date-fns";

function getTimeSince(dateString?: string) {
  if (!dateString) return;
  const then = parseISO(dateString);
  const now = new Date();

  const duration = intervalToDuration({ start: then, end: now });

  return {
    days: duration.days,
    hours: duration.hours,
    minutes: duration.minutes,
  };
}
