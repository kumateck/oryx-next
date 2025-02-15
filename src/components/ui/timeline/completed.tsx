import React from "react";

import { Icon } from "../icon";
import TimelineCard from "./card";
import { TimelineItemProps } from "./type";

interface Props {
  item: TimelineItemProps;
}
const Completed = ({ item }: Props) => {
  return (
    <li className="mb-10 ms-6">
      <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white ring-8 ring-white">
        <Icon name="Check" className="size-5" />
      </span>
      <TimelineCard item={item} />
    </li>
  );
};

export default Completed;
