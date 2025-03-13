// import { useRouter } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import {
  ActivityStepStatus,
  ErrorResponse,
  cn,
  getInitials,
  isErrorResponse,
  routes,
} from "@/lib";
import {
  ProductionStatus,
  usePutApiV1ProductionScheduleActivityStepByProductionStepIdStatusMutation,
} from "@/lib/redux/api/openapi.generated";
import { commonActions } from "@/lib/redux/slices/common";

import { AvatarStack } from "../avatar-stack";
import { Button } from "../button";
import { Icon } from "../icon";
import { Label } from "../label";
import { TimelineItemProps } from "./type";

interface Props {
  item: TimelineItemProps;
  className?: string;
  isComplete?: boolean;
  inProgress?: boolean;
  showFinalPacking?: boolean;
  activityId?: string;
}
const TimelineCard = ({
  item,
  className,
  isComplete,
  inProgress,
  showFinalPacking,
  activityId,
}: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [updateActivity, { isLoading }] =
    usePutApiV1ProductionScheduleActivityStepByProductionStepIdStatusMutation();

  const onComplete = async (status: ProductionStatus) => {
    try {
      await updateActivity({
        productionStepId: item.id as string,
        status,
      }).unwrap();
      toast.success("Activity completed successfully");
      dispatch(commonActions.setTriggerReload());
    } catch (error) {
      toast.error(isErrorResponse(error as ErrorResponse)?.description);
    }
  };

  const onFinalPacking = (id: string) => {
    router.push(routes.viewFinalPacking(id));
  };
  return (
    <div
      className={cn(
        "max-w-4xl rounded-2xl bg-white p-4 shadow transition-opacity",
        className,
      )}
    >
      <h3 className="mb-1 flex items-center justify-between text-lg font-semibold text-neutral-dark">
        {item.title}

        <span className="me-2 ms-3 rounded-2xl bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800">
          {ActivityStepStatus[item.status as ActivityStepStatus]}
        </span>
      </h3>

      <p className="mb-4 text-sm font-normal text-neutral-default">
        {item.description}{" "}
      </p>
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-2">
          <Label className="text-base font-semibold text-neutral-secondary">
            {item.imagesLabel}
          </Label>
          {item.images && (
            <AvatarStack
              fallbackClass={cn("bg-neutral-input text-neutral-dark")}
              avatars={item.images?.map((item) => ({
                name: getInitials(item?.name),
                fullname: item?.name,
                url: item?.url,
              }))}
            />
          )}
        </div>
        {item.extra}
        {inProgress && (
          <Button onClick={() => onComplete(ActivityStepStatus.InProgress)}>
            {isLoading ? (
              <Icon name="LoaderCircle" className="animate-spin" />
            ) : (
              ActivityStepStatus[ActivityStepStatus.InProgress]
            )}
          </Button>
        )}
        {isComplete && (
          <Button onClick={() => onComplete(ActivityStepStatus.Completed)}>
            {isLoading ? (
              <Icon name="LoaderCircle" className="animate-spin" />
            ) : (
              ActivityStepStatus[ActivityStepStatus.Completed]
            )}
          </Button>
        )}
        {showFinalPacking && (
          <Button onClick={() => onFinalPacking(activityId as string)}>
            <Icon name="Navigation" />
            <span>Final Packing</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default TimelineCard;
