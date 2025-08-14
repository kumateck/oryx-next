import { cn, getEnumBadge, ProductBMRStatus } from "@/lib";
import React from "react";
interface Props {
  status: ProductBMRStatus;
  title: string;
}
const BMRStatus = ({ status, title }: Props) => {
  const { label, colorClass } = getEnumBadge(ProductBMRStatus, status);
  return (
    <div>
      <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <span className="text-gray-500">{title}:</span>
        <span
          className={cn(
            "px-2 py-1 rounded-2xl text-xs font-semibold inline-block",
            colorClass,
          )}
        >
          {label}
        </span>
      </div>
    </div>
  );
};

export default BMRStatus;
