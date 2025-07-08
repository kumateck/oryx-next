// import { useRouter } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import FinishedGoodsTransfer from "@/components/pages/production/activities/finished-goods-note";
import {
  ActivityStepStatus,
  ErrorResponse,
  cn,
  getInitials,
  isErrorResponse,
  routes,
  splitWords,
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
import Link from "next/link";
import { TriangleAlertIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "../alert";

interface Props {
  item: TimelineItemProps;
  className?: string;
  isComplete?: boolean;
  inProgress?: boolean;
  showFinalPacking?: boolean;
  showFinishedGoods?: boolean;
  showExtraPackging?: boolean;
  isPendingExtraPacking?: boolean;
  showAtr?: boolean;
  showFullReturn?: boolean;
  showStockRequisition?: boolean;
  showBmrAndBprRequisition?: boolean;
  showDispatch?: boolean;

  activityId?: string;
  productId?: string;
  scheduleId?: string;
}
const TimelineCard = ({
  item,
  className,
  isComplete,
  inProgress,
  showFinishedGoods,
  showFinalPacking,
  activityId,
  scheduleId,
  productId,
  showExtraPackging,
  isPendingExtraPacking,
  showAtr,
  showFullReturn,
  showStockRequisition,
  showBmrAndBprRequisition,
  showDispatch,
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
  const onExtraPacking = (id: string) => {
    router.push(
      routes.viewExtraPacking(id, productId as string, scheduleId as string),
    );
  };

  const onStockRequisition = (id: string) => {
    console.log("first", id);
  };
  const onBmrAndBprRequisition = (id: string) => {
    console.log("first", id);
  };
  const onDispatch = (id: string) => {
    console.log("first", id);
  };
  const onAtr = (id: string) => {
    console.log("first", id);
  };
  const onFullReturn = (id: string) => {
    console.log("first", id);
  };

  return (
    <div className="relative">
      <div
        className={cn(
          "max-w-4xl rounded-2xl bg-white p-4 shadow transition-opacity relative",
          className,
        )}
      >
        <div className=" ">
          <span className=" rounded-full  h-6 w-6 bg-white ring-2  ring-lime-300 absolute -top-3 left-0 flex items-center justify-center">
            {item.order}
          </span>
        </div>
        <h3 className="mb-1 flex items-center justify-between text-lg font-semibold text-neutral-dark">
          {item.title}

          <span className="me-2 ms-3 rounded-2xl bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800">
            {splitWords(ActivityStepStatus[item.status as ActivityStepStatus])}
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

          <div className="flex items-center gap-2 justify-end">
            <Link
              href={`${routes.viewDetails(
                activityId as string,
                item?.id as string,
              )}?scheduleId=${scheduleId}&productId=${productId}`}
            >
              <Button variant="secondary" className="text-sm font-semibold">
                View Details
              </Button>
            </Link>

            {inProgress && (
              <Button onClick={() => onComplete(ActivityStepStatus.InProgress)}>
                {isLoading ? (
                  <Icon name="LoaderCircle" className="animate-spin" />
                ) : (
                  splitWords(ActivityStepStatus[ActivityStepStatus.InProgress])
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
            {showExtraPackging && (
              <Button onClick={() => onExtraPacking(activityId as string)}>
                <Icon name="Navigation" />
                <span>Extra Packing Request</span>
              </Button>
            )}

            {showAtr && (
              <Button onClick={() => onAtr(activityId as string)}>
                <Icon name="Navigation" />
                <span>ATR</span>
              </Button>
            )}

            {showFullReturn && (
              <Button onClick={() => onFullReturn(activityId as string)}>
                <Icon name="Navigation" />
                <span>Full Return</span>
              </Button>
            )}

            {showStockRequisition && (
              <Button onClick={() => onStockRequisition(item?.id as string)}>
                <Icon name="Navigation" />
                <span>Stock Requisition</span>
              </Button>
            )}
            {showBmrAndBprRequisition && (
              <Button
                onClick={() => onBmrAndBprRequisition(item?.id as string)}
              >
                <Icon name="Navigation" />
                <span>BMR/BPR Requisition</span>
              </Button>
            )}
            {showDispatch && (
              <Button onClick={() => onDispatch(item?.id as string)}>
                <Icon name="Navigation" />
                <span>Dispatch</span>
              </Button>
            )}
          </div>

          {showFinishedGoods && (
            <FinishedGoodsTransfer
              scheduleId={scheduleId as string}
              productId={productId as string}
              productionActivityStepId={item?.id as string}
            />
          )}
        </div>
        {isPendingExtraPacking && (
          <div className="pt-2  w-full">
            <Alert variant={"warning"}>
              <TriangleAlertIcon className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                Extra packing request is pending for approval
              </AlertDescription>
            </Alert>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelineCard;
