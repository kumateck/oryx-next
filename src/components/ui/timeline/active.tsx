import React from "react";
import { FaRegCircleDot } from "react-icons/fa6";

import { ActivityStepStatus } from "@/lib";

import TimelineCard from "./card";
import { TimelineItemProps } from "./type";

interface Props {
  item: TimelineItemProps;
  activityId: string;
  productId: string;
  scheduleId: string;
}

const showProgress = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const showComplete = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15];
const showFinalPacking = [12];
const showFinishedGoods = [16];
const Active = ({ item, activityId, scheduleId, productId }: Props) => {
  return (
    <li className="mb-10 ms-6">
      <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-white ring-8 ring-white">
        <FaRegCircleDot className="size-9 text-green-500" />
      </span>
      <TimelineCard
        scheduleId={scheduleId}
        productId={productId}
        activityId={activityId}
        inProgress={
          showProgress.includes(Number(item.order)) &&
          item.status === ActivityStepStatus.New
        }
        isComplete={
          showComplete.includes(Number(item.order)) &&
          item.status === ActivityStepStatus.InProgress
        }
        showFinalPacking={
          showFinalPacking.includes(Number(item.order)) &&
          item.status === ActivityStepStatus.InProgress
        }
        showFinishedGoods={
          showFinishedGoods.includes(Number(item.order)) &&
          item.status === ActivityStepStatus.New
        }
        item={item}
        className="border border-primary-inverted"
      />
    </li>
  );
};

export default Active;
