"use client";
import PageWrapper from "@/components/layout/wrapper";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  Icon,
  Progress,
} from "@/components/ui";
import { useLazyGetApiV1ProductionScheduleActivityByProductionActivityIdQuery } from "@/lib/redux/api/openapi.generated";
import { useParams } from "next/navigation";
import ActivityLog from "@/components/activity-log";
import { useDispatch } from "react-redux";
import { useSelector } from "@/lib/redux/store";
import { useEffect, useState } from "react";
import { commonActions } from "@/lib/redux/slices/common";
import SkeletonLoadingPage from "@/shared/skeleton-page-loader";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import StepDetailsDailog from "@/components/StepDetailsDailog";

const Details = () => {
  const { id } = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);

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

  const progressDuration = "2025-05-06T14:56:16.139464Z";
  const progressDurationDate = new Date(progressDuration);
  const days = progressDurationDate.getUTCDate();
  const hours = progressDurationDate.getUTCHours();
  const minutes = progressDurationDate.getUTCMinutes();

  return (
    <ScrollablePageWrapper>
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
                  <span className="text-sm text-neutral-600">Discription</span>
                  <h1 className="text-xl">Production description</h1>
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
                <Avatar className="size-16 rounded-full shadow-md" />
              </div>
              {/* Buttons */}
              <div className="flex flex-col items-center justify-end">
                <StepDetailsDailog
                  isOpen={open}
                  onClose={() => setOpen(!open)}
                />
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
          <ActivityLog approvalLogs={data?.activityLogs} />
        </Card>
      </PageWrapper>
    </ScrollablePageWrapper>
  );
};

export default Details;
