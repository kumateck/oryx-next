import { getEnumBadgeWithHexColors, ProductBMRStatus } from "@/lib";
import StatusBadge from "@/shared/status-badge";
import React from "react";
interface Props {
  status: ProductBMRStatus;
  title: string;
}
const BMRStatus = ({ status, title }: Props) => {
  const { label, style } = getEnumBadgeWithHexColors(ProductBMRStatus, status);
  return (
    <div>
      <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <span className="text-gray-500">{title}:</span>
        <StatusBadge label={label} style={style} />
      </div>
    </div>
  );
};

export default BMRStatus;
