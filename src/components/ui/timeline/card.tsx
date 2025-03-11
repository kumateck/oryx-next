import React from "react";

import { ActivityStepStatus, cn, getInitials } from "@/lib";

import { AvatarStack } from "../avatar-stack";
import { Label } from "../label";
import { TimelineItemProps } from "./type";

interface Props {
  item: TimelineItemProps;
  className?: string;
}
const TimelineCard = ({ item, className }: Props) => {
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
      </div>
    </div>
  );
};

export default TimelineCard;
