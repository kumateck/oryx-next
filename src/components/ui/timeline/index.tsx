import { Fragment } from "react";

import { ActivityStepStatus } from "@/lib";

import Active from "./active";
import Completed from "./completed";
import InActive from "./inactive";
import { TimelineItemProps } from "./type";
import { ProductionScheduleProductDtoRead } from "@/lib/redux/api/openapi.generated";
import { Card } from "../card";
import { Icon } from "../icon";

interface Props {
  steps: TimelineItemProps[];
  activityId: string;
  productId: string;
  scheduleId: string;
  productInfo?: ProductionScheduleProductDtoRead;
}

export const TimelineLayout = ({
  steps,
  activityId,
  scheduleId,
  productId,
  productInfo,
}: Props) => {
  const cancelled = productInfo?.cancelled;
  const reason = productInfo?.reasonForCancellation;

  // Render cancellation banner
  const renderCancellationBanner = () => {
    if (!cancelled) return null;

    return (
      <Card className="border-red-200 bg-red-50 p-4 mb-6">
        <div className="flex items-center gap-2">
          <Icon name="CircleX" className="h-5 w-5 text-red-600" />
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-red-800">
              Production Cancelled
            </h3>
            {reason && (
              <p className="text-sm text-red-700 mt-1">Reason: {reason}</p>
            )}
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="mx-auto w-full pl-0 pr-0 sm:pl-2 md:pl-4 lg:pl-6 xl:pl-12 2xl:pl-24">
      {renderCancellationBanner()}
      <ol className="relative border-s border-gray-200">
        {steps?.map((item, index) => {
          return (
            <Fragment key={index}>
              {item.isActive ? (
                <Active
                  scheduleId={scheduleId}
                  productId={productId}
                  activityId={activityId}
                  item={item}
                  productInfo={productInfo}
                />
              ) : (
                timeSwitch(item)
              )}
            </Fragment>
          );
        })}
      </ol>
    </div>
  );
};

const timeSwitch = (item: TimelineItemProps) => {
  switch (item.status) {
    case ActivityStepStatus.Completed:
      return <Completed item={item} />;
    case ActivityStepStatus.New:
      return <InActive item={item} />;
    default:
      return null;
  }
};
