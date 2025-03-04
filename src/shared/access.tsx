import React from "react";

import { ProcurementType, SupplierType, cn } from "@/lib";

interface AccessTabsProps {
  type: SupplierType;
  handleTabClick: (tabType: SupplierType) => void;
}
const AccessTabs = ({ type, handleTabClick }: AccessTabsProps) => {
  return (
    <div>
      {
        <div
          className={cn(
            "flex h-10 w-48 items-center gap-1 space-x-1 rounded-full border border-neutral-input bg-white p-1",
          )}
        >
          <button
            onClick={() => handleTabClick(SupplierType.Foreign)}
            className={`w-full rounded-full px-4 py-1 text-sm font-medium transition-all duration-300 ${
              Number(type) === SupplierType.Foreign
                ? "h-full bg-primary-default text-white shadow-md"
                : "text-neutral-default"
            }`}
          >
            {ProcurementType.Foreign}
          </button>

          <button
            onClick={() => handleTabClick(SupplierType.Local)}
            className={`w-full rounded-full px-4 py-1 text-sm font-medium transition-all duration-300 ${
              Number(type) === SupplierType.Local
                ? "h-full bg-primary-default text-white shadow-md"
                : "text-neutral-default"
            }`}
          >
            {ProcurementType.Local}
          </button>
        </div>
      }
    </div>
  );
};

export default AccessTabs;
