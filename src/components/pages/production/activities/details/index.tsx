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
import StepDetailsDailog from "@/components/StepDetailsDailog";
import { AuditModules, cn, fullname, getInitials } from "@/lib";

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

  const progressDuration = "2025-05-06T14:56:16.139464Z";
  const progressDurationDate = new Date(progressDuration);
  const days = progressDurationDate.getUTCDate();
  const hours = progressDurationDate.getUTCHours();
  const minutes = progressDurationDate.getUTCMinutes();

  return (
    <PageWrapper>
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
              <div>
                <span className="text-sm block text-neutral-600">
                  Status Action
                </span>
                <span>1/3</span>
                <Progress color="blue" className="" value={30} />
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
              <StepDetailsDailog isOpen={open} onClose={() => setOpen(!open)} />
              <div>
                <h2 className="text-neutral-600">Progress Duration</h2>
                <div className="grid text-sm p-1 grid-cols-3 border border-neutral-600 rounded">
                  <div className=" flex flex-col items-center justify-center">
                    <span className="">{days}</span>
                    <span>Days</span>
                  </div>
                  <div className=" flex flex-col items-center justify-center">
                    <span>{hours}</span>
                    <span>Hours</span>
                  </div>
                  <div className=" flex flex-col items-center justify-center">
                    <span>{minutes}</span>
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
