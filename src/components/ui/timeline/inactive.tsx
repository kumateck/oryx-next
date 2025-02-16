import React from "react";

import TimelineCard from "./card";
import { TimelineItemProps } from "./type";

interface Props {
  item: TimelineItemProps;
}
const InActive = ({ item }: Props) => {
  return (
    <li className="mb-10 ms-6">
      <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-white text-white ring-8 ring-white">
        <span className="size-3 rounded-full bg-neutral-secondaryAlt"></span>
      </span>
      <TimelineCard
        item={item}
        className="pointer-events-none opacity-50 grayscale"
      />
    </li>
  );
};

export default InActive;
