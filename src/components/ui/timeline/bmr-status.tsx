import { cn, ProductBMRStatus } from "@/lib";
import React from "react";
interface Props {
  status: ProductBMRStatus;
  title: string;
}
const BMRStatus = ({ status, title }: Props) => {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <span className="text-gray-500">{title}:</span>
        <span
          className={cn("px-2 py-1 rounded-2xl text-xs font-semibold", {
            "bg-yellow-100 text-yellow-800":
              status === ProductBMRStatus.Requested,
            "bg-blue-100 text-blue-800": status === ProductBMRStatus.Issued,
          })}
        >
          {ProductBMRStatus[Number(status)]}
        </span>
      </div>
    </div>
  );
};

export default BMRStatus;
