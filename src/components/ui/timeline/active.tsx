import React from "react";
import { FaRegCircleDot } from "react-icons/fa6";

import TimelineCard from "./card";
import { TimelineItemProps } from "./type";

interface Props {
  item: TimelineItemProps;
}
const Active = ({ item }: Props) => {
  return (
    <li className="mb-10 ms-6">
      <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-white ring-8 ring-white">
        <FaRegCircleDot className="size-9 text-green-500" />
      </span>
      <TimelineCard item={item} className="border border-primary-inverted" />
    </li>
  );
};

export default Active;
