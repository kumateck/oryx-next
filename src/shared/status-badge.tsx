import { cn, splitWords } from "@/lib";
import React from "react";

interface Props {
  label: string;
  colorClass: string;
}
const StatusBadge = ({ label, colorClass }: Props) => {
  return (
    <div className={cn(`rounded-full px-2 py-1 w-fit text-center`, colorClass)}>
      {splitWords(label)}
    </div>
  );
};

export default StatusBadge;
