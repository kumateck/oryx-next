import { Fragment } from "react";

import { ActivityStepStatus } from "@/lib";

import Active from "./active";
import Completed from "./completed";
import InActive from "./inactive";
import { TimelineItemProps } from "./type";

interface Props {
  steps: TimelineItemProps[];
  activityId: string;
  productId: string;
  scheduleId: string;
}

export const TimelineLayout = ({
  steps,
  activityId,
  scheduleId,
  productId,
}: Props) => {
  return (
    <div className="mx-auto w-full pl-0 pr-0 sm:pl-2 md:pl-4 lg:pl-6 xl:pl-12 2xl:pl-24">
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
